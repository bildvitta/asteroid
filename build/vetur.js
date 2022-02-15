const jetpack = require('fs-jetpack')
const yaml = require('js-yaml')
const { kebabCase } = require('lodash')
const path = require('path')
const rimraf = require('rimraf')

function parseTypes (types) {
  if (Array.isArray(types)) {
    types = types.join('|')
  }

  return types.toLowerCase()
}

const attributes = {}
const tags = {}

const components = path.resolve(__dirname, '../ui/src/components')
const ui = path.resolve(__dirname, '../ui')

const files = jetpack.find(components, { matching: ['**/*.yml', '**/*.yaml'] })

for (const file of files) {
  const name = kebabCase(
    path.basename(file, path.extname(file))
  )

  const data = yaml.load(
    jetpack.read(file, 'utf8')
  )

  tags[name] = {
    attributes: data.props ? Object.keys(data.props) : [],
    description: data.meta?.desc || `Componente "${name}" do Asteroid.`
  }

  if (!data.props) {
    continue
  }

  for (const prop in data.props) {
    const propData = data.props[prop]

    attributes[`${name}/${prop}`] = {
      description: propData.desc,
      type: parseTypes(propData.type)
    }
  }
}

// Clean build artifacts!
rimraf.sync('ui/dist/vetur')

// Create files!
jetpack.dir(`${ui}/dist/vetur`)

jetpack.write(
  `${ui}/dist/vetur/asteroid-attributes.json`,
  JSON.stringify(attributes, null, 2)
)

jetpack.write(
  `${ui}/dist/vetur/asteroid-tags.json`,
  JSON.stringify(tags, null, 2)
)
