import assert from 'node:assert/strict'
import test from 'node:test'
import telegramPosts from '../data/telegramPosts.js'
import { formatJournalDate, getJournalNeighbors, getRelatedJournalPosts, sortJournalPosts } from '../lib/journal.js'

test('journal posts have unique routes and complete content', () => {
  const slugs = new Set()
  const titles = new Set()

  for (const post of telegramPosts) {
    assert.match(post.slug, /^[a-z0-9-]+$/)
    assert.equal(slugs.has(post.slug), false, `Duplicate slug: ${post.slug}`)
    assert.equal(titles.has(post.title), false, `Duplicate title: ${post.title}`)
    assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/)
    assert.ok(post.text.length >= 100, `Short description: ${post.slug}`)
    assert.ok(post.body.length >= 1, `Empty article: ${post.slug}`)
    if (post.date === '2026-09-01') assert.ok(post.body.length >= 7, `Short new article: ${post.slug}`)
    assert.ok((post.links || []).every(([, href]) => href.startsWith('/') || href.startsWith('https://')), `Unsafe related link: ${post.slug}`)
    slugs.add(post.slug)
    titles.add(post.title)
  }
})

test('journal helpers provide stable sorting and navigation', () => {
  const sorted = sortJournalPosts(telegramPosts)
  assert.equal(sorted.length, telegramPosts.length)
  assert.ok(new Date(sorted[0].date) >= new Date(sorted.at(-1).date))
  assert.match(formatJournalDate('2026-09-01'), /1 сентября 2026/)

  const neighbors = getJournalNeighbors(telegramPosts, sorted[1].slug)
  assert.equal(neighbors.newer.slug, sorted[0].slug)
  assert.equal(neighbors.older.slug, sorted[2].slug)
  assert.ok(getRelatedJournalPosts(telegramPosts, sorted[0]).length > 0)
})
