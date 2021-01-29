export default function (first, second) {
  if ((typeof first !== 'number') || (typeof second !== 'number')) {
    throw new Error('Arguments need to be a number.')
  }

  first = Math.abs(first)
  second = Math.abs(second)

  while (second) {
    const temporary = second
    second = first % second
    first = temporary
  }

  return first
}
