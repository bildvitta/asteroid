/**
 * Função para filtrar um array de objeto, usando a logica na propriedade `handle
 * e adicionando o que tem dentro da propriedade `item`.
 *
 * @param {Object[]} list Array de objetos, contendo `handle` e `item`.
 * @returns {Array}
 *
 * @example
 * filterListByHandle(
 * [
 *  {
 *    handle: true,
 *    item: 'item 1'
 *  },
 *  {
 *    handle: false,
 *    item: 'item 2'
 *  }
 * ) // retorna ['item 1']
 */
export default function (list = []) {
  const formattedList = []

  list.forEach(itemList => {
    if (itemList.handle) {
      formattedList.push(itemList.item)
    }
  })

  return formattedList
}
