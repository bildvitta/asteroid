import { ref } from 'vue'
import { SessionStorage } from 'quasar'
import { filterObject } from '../helpers'

const cachedFilters = ref(SessionStorage.getItem('cachedFilters') || {})

function updateSessionStorage () {
  SessionStorage.set('cachedFilters', cachedFilters)
}

function addOne (key, { label, value }) {
  cachedFilters[key][label] = value
  updateSessionStorage()
}

function addMany (key, filters) {
  cachedFilters[key] = filters
  updateSessionStorage()
}

function findOne (key, filter) {
  return cachedFilters[key][filter]
}

function findAll (key) {
  return cachedFilters[key]
}

function clearOne (key, filter) {
  delete cachedFilters[key][filter]
  updateSessionStorage()
}

function clearAll (key, { exclude = [] }) {
  if (exclude.length) {
    cachedFilters[key] = filterObject(cachedFilters[key], exclude)
  } else {
    delete cachedFilters[key]
  }

  updateSessionStorage()
}

export {
  addOne,
  addMany,
  findOne,
  findAll,
  clearOne,
  clearAll,
  cachedFilters
}
