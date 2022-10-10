function getAppExtensionPackage (packages) {
  const jetpack = require('fs-jetpack') // https://github.com/szwacz/fs-jetpack
  const path = require('path') // https://nodejs.org/api/path.html

  // recupera o package.json
  const appExtensionPackage = packages['app-extension']
  const packagePath = `${appExtensionPackage.path}package.json`
  const resolvedPackagePath = path.resolve(packagePath)

  return {
    packageData: jetpack.read(resolvedPackagePath, 'json'),
    resolvedPackagePath
  }
}

module.exports = getAppExtensionPackage
