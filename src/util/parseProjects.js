export function parseProjects(source) {
  const blocks = source
    .split(/^---$/m)
    .map(block => block.trim())
    .filter(Boolean)

  const projects = []

  for (let i = 0; i < blocks.length; i += 2) {
    const metadata = JSON.parse(blocks[i])
    const content = blocks[i + 1] || ''

    projects.push({
      ...metadata,
      content: content.trim()
    })
  }

  return projects
}