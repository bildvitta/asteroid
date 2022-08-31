import { boot } from 'quasar/wrappers'
import { onCLS, onFCP, onFID, onLCP, onTTFB } from 'web-vitals'

const vitalsUrl = 'https://vitals.vercel-analytics.com/v1/vitals'

function getConnectionSpeed () {
  return 'connection' in navigator && navigator.connection && 'effectiveType' in navigator.connection
    ? navigator.connection.effectiveType
    : ''
}

export function sendToVercelAnalytics (metric = {}, options = {}) {
  const analyticsId = options.analyticsId || ''

  if (!analyticsId) {
    return
  }

  const body = {
    dsn: analyticsId,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: getConnectionSpeed()
  }

  const blob = new Blob([new URLSearchParams(body).toString()], {
    type: 'application/x-www-form-urlencoded'
  })

  if (navigator.sendBeacon) {
    navigator.sendBeacon(vitalsUrl, blob)
  } else {
    fetch(vitalsUrl, {
      body: blob,
      method: 'POST',
      credentials: 'omit',
      keepalive: true
    })
  }
}

export function reportWebVitals (options) {
  try {
    onFID(metric => sendToVercelAnalytics(metric, options))
    onTTFB(metric => sendToVercelAnalytics(metric, options))
    onLCP(metric => sendToVercelAnalytics(metric, options))
    onCLS(metric => sendToVercelAnalytics(metric, options))
    onFCP(metric => sendToVercelAnalytics(metric, options))
  } catch (error) {
    console.error('[Analytics]', error)
  }
}

export default boot(() => {
  reportWebVitals({ analyticsId: process.env.VERCEL_ANALYTICS_ID })
})
