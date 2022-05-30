import { EventType, TodoList} from './TodoList/index'
import type { ITodo } from './types.d'

((doc) => {
  const oTodoList: HTMLElement = doc.querySelector('.todo-list')
  const oAddBtn: HTMLElement = doc.querySelector('.add-btn')
  const oInput: HTMLInputElement = doc.querySelector('input')

  const todoList: TodoList = TodoList.create(oTodoList)

  const init = (): void => {
    bindEvent()
  }

  function bindEvent() {
    oAddBtn.addEventListener('click', handleAddBtnClick, false)
    oTodoList.addEventListener('click', handleListClick, false)
  }

  function handleAddBtnClick() {
    const val: string = oInput.value.trim()

    if (!val.length) {
      return
    }
    todoList.notify<ITodo>(EventType.ADD, {
      id: new Date().getTime(),
      content: val,
      completed: false
    })
    oInput.value = ''
  }
  function handleListClick(e: MouseEvent) {
    const tar = e.target as HTMLElement
    const tarId = parseInt(tar.dataset.id)
    const tagName = tar.tagName.toLowerCase()
    const typeMap: Record<'input' | 'button', EventType> = {
      input: EventType.TOGGLE,
      button: EventType.REMOVE
    }

    if (['button', 'input'].includes(tagName)) {
      todoList.notify<ITodo['id']>(typeMap[tagName], tarId)
    }
  }

  init()
})(document)