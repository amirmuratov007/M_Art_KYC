export const config = {
  api: {
    bodyParser: { sizeLimit: '30mb' },
    responseLimit: false
  }
}

const MAX_FILE_BYTES = 12 * 1024 * 1024
const MAX_TEXT_CHARS = 650000

function safeText(value) {
  return typeof value === 'string' ? value : value == null ? '' : String(value)
}

function extensionOf(name = '') {
  const match = safeText(name).toLowerCase().match(/\.([a-z0-9]+)$/i)
  return match?.[1] || ''
}

function decodeXml(value = '') {
  return safeText(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
}

function cleanExtractedText(value) {
  return safeText(value)
    .replace(/\u0000/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim()
    .slice(0, MAX_TEXT_CHARS)
}

function parseBase64(dataBase64 = '') {
  const value = safeText(dataBase64)
  const payload = value.includes(',') ? value.split(',').pop() : value
  return Buffer.from(payload || '', 'base64')
}

async function extractPdf(buffer) {
  const mod = await import('pdf-parse')
  const pdfParse = mod.default || mod
  const result = await pdfParse(buffer)
  return result?.text || ''
}

async function extractDocx(buffer) {
  const mammoth = await import('mammoth')
  const result = await mammoth.extractRawText({ buffer })
  return result?.value || ''
}

function extractTextFromXml(xml = '') {
  const pieces = []
  const matches = safeText(xml).matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)
  for (const match of matches) pieces.push(decodeXml(match[1]))
  return pieces.join(' ')
}

async function extractPlainDocxFallback(buffer) {
  const JSZip = (await import('jszip')).default
  const zip = await JSZip.loadAsync(buffer)
  const document = await zip.file('word/document.xml')?.async('string')
  return extractTextFromXml(document || '')
}

function parseSharedStrings(xml = '') {
  const values = []
  const items = safeText(xml).matchAll(/<si[^>]*>([\s\S]*?)<\/si>/g)
  for (const item of items) {
    const textParts = []
    const textMatches = item[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)
    for (const text of textMatches) textParts.push(decodeXml(text[1]))
    values.push(textParts.join(''))
  }
  return values
}

function columnIndex(cellRef = '') {
  const letters = safeText(cellRef).match(/^[A-Z]+/i)?.[0]?.toUpperCase() || 'A'
  let index = 0
  for (const letter of letters) index = index * 26 + (letter.charCodeAt(0) - 64)
  return Math.max(0, index - 1)
}

function parseWorksheet(xml = '', sharedStrings = []) {
  const rows = []
  const rowMatches = safeText(xml).matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)
  for (const rowMatch of rowMatches) {
    const cells = []
    const cellMatches = rowMatch[1].matchAll(/<c\b([^>]*)>([\s\S]*?)<\/c>/g)
    for (const cellMatch of cellMatches) {
      const attrs = cellMatch[1] || ''
      const body = cellMatch[2] || ''
      const ref = attrs.match(/\br="([^"]+)"/)?.[1] || ''
      const type = attrs.match(/\bt="([^"]+)"/)?.[1] || ''
      const value = body.match(/<v[^>]*>([\s\S]*?)<\/v>/)?.[1] || ''
      const inline = body.match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1] || ''
      const index = columnIndex(ref)

      let cellValue = ''
      if (type === 's') cellValue = sharedStrings[Number(value)] || ''
      else if (type === 'inlineStr') cellValue = decodeXml(inline)
      else cellValue = decodeXml(value)

      if (cellValue) cells[index] = cellValue
    }
    const line = cells.map((cell) => safeText(cell).replace(/\s+/g, ' ').trim()).join('\t').trim()
    if (line) rows.push(line)
  }
  return rows.join('\n')
}

async function extractXlsx(buffer) {
  const JSZip = (await import('jszip')).default
  const zip = await JSZip.loadAsync(buffer)
  const sharedXml = await zip.file('xl/sharedStrings.xml')?.async('string')
  const sharedStrings = parseSharedStrings(sharedXml || '')
  const sheets = Object.keys(zip.files)
    .filter((name) => /^xl\/worksheets\/sheet\d+\.xml$/i.test(name))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  const parts = []
  for (let index = 0; index < sheets.length; index += 1) {
    const xml = await zip.file(sheets[index]).async('string')
    const text = parseWorksheet(xml, sharedStrings)
    if (text) parts.push(`Лист ${index + 1}\n${text}`)
  }
  return parts.join('\n\n')
}

async function extractText({ fileName, mimeType, buffer }) {
  const ext = extensionOf(fileName)
  const mime = safeText(mimeType).toLowerCase()

  if (['txt', 'csv', 'tsv', 'json', 'md', 'html', 'htm'].includes(ext) || mime.startsWith('text/') || mime.includes('json')) {
    return buffer.toString('utf8')
  }

  if (ext === 'pdf' || mime.includes('pdf')) return extractPdf(buffer)

  if (ext === 'docx' || mime.includes('wordprocessingml')) {
    try {
      return await extractDocx(buffer)
    } catch (error) {
      return extractPlainDocxFallback(buffer)
    }
  }

  if (ext === 'xlsx' || mime.includes('spreadsheetml')) return extractXlsx(buffer)

  if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'tif', 'tiff', 'heic'].includes(ext) || mime.startsWith('image/')) {
    const error = new Error('Файл похож на скан или изображение. OCR пока не подключен, поэтому текст из него не извлечен.')
    error.code = 'OCR_NOT_CONFIGURED'
    throw error
  }

  const error = new Error('Формат пока не поддержан. Поддерживаются TXT, CSV, JSON, PDF, DOCX и XLSX.')
  error.code = 'UNSUPPORTED_FILE'
  throw error
}

function buildSource({ fileName, mimeType, size, text, status = 'extracted', error = '' }) {
  const cleanText = cleanExtractedText(text)
  return {
    id: `src-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    file_name: safeText(fileName).slice(0, 180) || 'uploaded-file',
    mime_type: safeText(mimeType).slice(0, 120),
    size: Number(size || 0),
    characters: cleanText.length,
    status,
    error,
    extracted_at: new Date().toISOString(),
    text: cleanText
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  try {
    const files = Array.isArray(req.body?.files) ? req.body.files.slice(0, 8) : []
    if (!files.length) return res.status(400).json({ ok: false, error: 'Нет файлов для обработки' })

    const sources = []
    for (const file of files) {
      const fileName = safeText(file?.name || file?.fileName)
      const mimeType = safeText(file?.type || file?.mimeType)
      const buffer = parseBase64(file?.dataBase64 || file?.base64)
      const size = Number(file?.size || buffer.length || 0)

      if (!buffer.length) {
        sources.push(buildSource({ fileName, mimeType, size, status: 'error', error: 'Пустой файл', text: '' }))
        continue
      }

      if (buffer.length > MAX_FILE_BYTES) {
        sources.push(buildSource({ fileName, mimeType, size, status: 'error', error: 'Файл больше 12 МБ. Разделите материал на части.', text: '' }))
        continue
      }

      try {
        const text = await extractText({ fileName, mimeType, buffer })
        sources.push(buildSource({ fileName, mimeType, size, text }))
      } catch (error) {
        sources.push(buildSource({ fileName, mimeType, size, status: error.code === 'OCR_NOT_CONFIGURED' ? 'needs_ocr' : 'error', error: error.message || 'Не удалось извлечь текст', text: '' }))
      }
    }

    return res.status(200).json({ ok: true, sources })
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message || 'Ошибка извлечения текста' })
  }
}
