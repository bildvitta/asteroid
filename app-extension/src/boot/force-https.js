const force = process.env.FORCE_HTTPS ?? process.env.PROD
const protocol = 'https:'

if (location.protocol !== protocol && force) {
  location.protocol = protocol
}
