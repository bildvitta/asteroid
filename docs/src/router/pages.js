function isIndex (fileName) {
  return !!fileName.toLowerCase().match(/^index\./)
}

export default function () {
  return require.context('../pages', true, /\.(md|vue)$/).keys().map(key => {
    const filePath = key.replace(/^\.\//, '')
    const fileName = filePath.replace(/^.*[\\/]/, '')

    const path = filePath.replace(isIndex(fileName) ? /[^/]*$/ : /\.\w+$/, '')

    return { component: () => import(`../pages/${filePath}`), path }
  })
}
