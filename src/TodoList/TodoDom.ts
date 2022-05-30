import { ITodo } from '../types.d'
type Id = ITodo['id']

class TodoDom {
  private static instance: TodoDom
  private oTodoList: HTMLElement

  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList
  }

  public static create(oTodoList: HTMLElement) {
    if (!TodoDom.instance) {
      TodoDom.instance = new TodoDom(oTodoList)
    }
    return TodoDom.instance
  }

  public addItem(todo: ITodo): Promise<void> {
    return new Promise((resolve, reject) => {
      // 生成element
      const oItem: HTMLElement = document.createElement('div')
      oItem.className = 'todo-item'
      oItem.innerHTML = this.todoView(todo)
      // 放入list
      this.oTodoList.appendChild(oItem)
      resolve()
    })
  }

  public removeItem(id: Id): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItems: HTMLCollection = document.getElementsByClassName('todo-item')
      // 寻找id
      const currentDom = Array.from(oItems).find(item => {
        const _id = parseInt(item.querySelector('button').dataset.id)
        return _id === id
      })
      if (currentDom) {
        currentDom.remove()
        return resolve()
      }
      return reject(1002)
    })
  }

  public toggleItem(id: Id): Promise<void> {
    return new Promise((resolve, reject) => {
      const oItems: HTMLCollection = document.getElementsByClassName('todo-item')
      // 寻找id
      const currentDom = Array.from(oItems).find(item => {
        const _id = parseInt(item.querySelector('input').dataset.id)
        return _id === id
      })
      if (currentDom) {
        const oContent: HTMLElement = currentDom.querySelector('span')
        const oCheckbox: HTMLInputElement = currentDom.querySelector('input')
        oContent.style.textDecoration = oCheckbox.checked ? 'line-through' : 'none'
        return resolve()
      }
      return reject(1002)
    })
  }

  private todoView({ id, content, completed }: ITodo) {
    return `
      <input type="checkbox" ${ completed ? 'checked' : '' } data-id="${ id }" />
      <span style="text-decoration: ${ completed ? 'line-through' : 'none' }">${ content }</span>
      <button data-id="${ id }">删除</button>
    `
  }
}

export default TodoDom
