import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const sourceDir = path.join(__dirname, '../node_modules/@fs/zion-icon/dist/es/icons')
const targetDir = path.join(__dirname, '../src/icons')

// Read all icon files
const files = fs.readdirSync(sourceDir)
  .filter(f => f.endsWith('.js') && f !== 'index.js')
  .map(f => f.replace('.js', ''))

console.log(`Found ${files.length} icons to copy...`)

// Read and convert each icon
let successCount = 0
let skipCount = 0

files.forEach(iconName => {
  const sourcePath = path.join(sourceDir, `${iconName}.js`)
  const targetPath = path.join(targetDir, `${iconName}.jsx`)

  // Skip if already exists
  if (fs.existsSync(targetPath)) {
    skipCount++
    return
  }

  try {
    const sourceContent = fs.readFileSync(sourcePath, 'utf-8')

    // Extract the path(s) from the React.createElement calls
    const pathMatches = sourceContent.matchAll(/createElement\("path",\s*\{([^}]+)\}/g)
    const paths = []

    for (const match of pathMatches) {
      const attrs = match[1]
      paths.push(attrs)
    }

    // Extract group elements if any
    const groupMatches = sourceContent.matchAll(/createElement\("g",\s*\{([^}]+)\}/g)
    const hasGroup = Array.from(groupMatches).length > 0

    // Generate the JSX component
    const componentContent = `import React from 'react'
import PropTypes from 'prop-types'

/**
 * ${iconName} Icon
 */
export const ${iconName} = ({ width = '24px', height = '24px', ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
${generateSVGContent(sourceContent)}
    </svg>
  )
}

${iconName}.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string
}
`

    fs.writeFileSync(targetPath, componentContent)
    successCount++

    if (successCount % 20 === 0) {
      console.log(`  Processed ${successCount} icons...`)
    }
  } catch (error) {
    console.error(`Error processing ${iconName}:`, error.message)
  }
})

console.log(`\nCompleted!`)
console.log(`  Created: ${successCount} icons`)
console.log(`  Skipped: ${skipCount} icons (already exist)`)
console.log(`  Total: ${files.length} icons`)

// Helper function to extract and convert SVG content
function generateSVGContent(sourceContent) {
  // Extract all path elements
  const lines = []

  // Match path elements
  const pathRegex = /createElement\("path",\s*\{([^}]+)\}/g
  let match

  while ((match = pathRegex.exec(sourceContent)) !== null) {
    const attrs = match[1]

    // Extract d attribute
    const dMatch = attrs.match(/d:\s*"([^"]+)"/)
    if (!dMatch) continue
    const d = dMatch[1]

    // Extract fillRule if present
    const fillRuleMatch = attrs.match(/fillRule:\s*"([^"]+)"/)
    const fillRule = fillRuleMatch ? ` fillRule="${fillRuleMatch[1]}"` : ''

    // Extract className if present (we'll skip these for now)
    const classNameMatch = attrs.match(/className:\s*\w+/)

    if (classNameMatch) {
      // Icon has special styling, keep it simple
      lines.push(`      <path d="${d}"${fillRule} />`)
    } else {
      lines.push(`      <path${fillRule ? fillRule : ''} d="${d}" />`)
    }
  }

  // If no paths found, try to extract the full SVG more carefully
  if (lines.length === 0) {
    // Just return a comment for complex icons
    return '      {/* Complex icon - needs manual conversion */}'
  }

  return lines.join('\n')
}
