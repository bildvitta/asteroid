const jetpack = require('fs-jetpack')
const yaml = require('js-yaml')
const path = require('path')
const rimraf = require('rimraf')

const components = path.resolve(__dirname, '../ui/src/components')
const ui = path.resolve(__dirname, '../ui')

const files = jetpack.find(components, { matching: ['**/*.yml', '**/*.yaml'] })

// Clean build artifacts!
rimraf.sync('ui/dist/api')

// Create files!
jetpack.dir(`${ui}/dist/api`)

for (const file of files) {
  const name = path.basename(file, path.extname(file))

  const data = yaml.load(
    jetpack.read(file, 'utf8')
  )

  jetpack.write(
    `${ui}/dist/api/${name}.json`,
    JSON.stringify(data, null, 2)
  )
}
