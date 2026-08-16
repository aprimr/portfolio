export function parseBlog(source) {
  const parts = source.split(/^---$/m)

  if (parts.length < 3) {
    throw new Error('Invalid blog format')
  }

  const metadata = JSON.parse(parts[1].trim())
  const content = parts.slice(2).join('---').trim()

  return {
    ...metadata,
    content
  }
}