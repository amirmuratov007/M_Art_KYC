export function normalizeSafeReportUrl(value) {
  const raw = String(value || '').trim()
  if (!raw || raw.length > 1000 || /[\u0000-\u001f\u007f]/.test(raw)) return ''

  if (raw.startsWith('/') && !raw.startsWith('//')) {
    try {
      const parsed = new URL(raw, 'https://www.heimdall-group.ru')
      return `${parsed.pathname}${parsed.search}${parsed.hash}`
    } catch (_) {
      return ''
    }
  }

  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password) return ''
    return parsed.toString()
  } catch (_) {
    return ''
  }
}

