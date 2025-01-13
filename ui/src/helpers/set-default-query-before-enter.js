export default function setDefaultQueryBeforeEnter (to, from, next, query = 'company') {
  if (!to.query.page) {
    next({ query: { ...to.query, page: 1 } })
    return
  }

  next()
}
