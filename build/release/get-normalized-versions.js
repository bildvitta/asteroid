function getNormalizedVersions (versions = {}) {
  const normalizedVersion = {
    beta: {},
    stable: {},
    all: {}
  }

  const nonAcceptableKey = ['created', 'modified']

  for (const key in versions) {
    if (nonAcceptableKey.includes(key)) continue

    normalizedVersion.all[key] = versions[key]

    if (key.includes('-beta')) {
      normalizedVersion.beta[key] = versions[key]
    } else {
      normalizedVersion.stable[key] = versions[key]
    }
  }

  return normalizedVersion
}

module.exports = getNormalizedVersions
