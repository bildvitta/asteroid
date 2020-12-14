export default {
  name: 'test',

  bind (element, { arg: argument, value }) {
    if (element && argument) {
      element.dataset.test = argument
    }
  
    if (element && value) {
      element.dataset.testKey = value
    }
  }
}
