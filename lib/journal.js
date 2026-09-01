const ruDateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC'
})

export function formatJournalDate(value) {
  const date = new Date(`${value}T00:00:00Z`)
  return Number.isNaN(date.getTime()) ? String(value || '') : ruDateFormatter.format(date)
}

export function sortJournalPosts(posts) {
  return [...posts].sort((a, b) => {
    const dateDifference = new Date(b.date) - new Date(a.date)
    return dateDifference || a.title.localeCompare(b.title, 'ru')
  })
}

export function getRelatedJournalPosts(posts, currentPost, limit = 3) {
  const currentLinks = new Set((currentPost.links || []).map(([, href]) => href))

  return posts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const sharedLinks = (post.links || []).filter(([, href]) => currentLinks.has(href)).length
      const score = sharedLinks * 3 + (post.category === currentPost.category ? 2 : 0)
      return { post, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date) - new Date(a.post.date))
    .slice(0, limit)
    .map(({ post }) => post)
}

export function getJournalNeighbors(posts, currentSlug) {
  const sorted = sortJournalPosts(posts)
  const index = sorted.findIndex((post) => post.slug === currentSlug)

  return {
    newer: index > 0 ? sorted[index - 1] : null,
    older: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null
  }
}
