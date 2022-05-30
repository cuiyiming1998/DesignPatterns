import TodoEvent from './TodoEvent'
import TodoDom from './TodoDom'
import type { ITodo } from '../types.d'

export enum EventType {
  ADD = 'add',
  REMOVE = 'remove',
  TOGGLE = 'toggle'
}

export class TodoList {

  private static instance: TodoList
  private oTodoList: HTMLElement
  private todoEvent: TodoEvent
  private todoDom: TodoDom
  private addHandlers: any[] = []
  private removeHandlers: any[] = []
  private toggleHandlers: any[] = []

  constructor(oTodoList: HTMLElement) {
    this.oTodoList = oTodoList
    this.initTodo()
  }

  public static create(oTodoList: HTMLElement) {
    if (!TodoList.instance) {
      TodoList.instance = new TodoList(oTodoList)
    }
    return TodoList.instance
  }

  private initTodo() {
    this.todoEvent = TodoEvent.create()
    this.todoDom = TodoDom.create(this.oTodoList)

    for (let k in EventType) {
      this.initHandlers(EventType[k])
    }
  }

  private initHandlers(type: EventType) {
    switch(type) {
      case EventType.ADD:
        this.addHandlers.push(this.todoEvent.addTodo.bind(this.todoEvent))
        this.addHandlers.push(this.todoDom.addItem.bind(this.todoDom))
        break
      case EventType.REMOVE:
        this.removeHandlers.push(this.todoEvent.removeTodo.bind(this.todoEvent))
        this.removeHandlers.push(this.todoDom.removeItem.bind(this.todoDom))
        break
      case EventType.TOGGLE:
        this.toggleHandlers.push(this.todoEvent.toggleTodo.bind(this.todoEvent))
        this.toggleHandlers.push(this.todoDom.toggleItem.bind(this.todoDom))
        break
      default:
        break
    }
  }

  public notify<T>(type: string, param: T) {
    const eventTypeMap: Record<EventType, any[]> = {
      [EventType.ADD]: this.addHandlers,
      [EventType.REMOVE]: this.removeHandlers,
      [EventType.TOGGLE]: this.toggleHandlers
    }
    let i: number = 0
    let res: any
    let handlers: any[] = eventTypeMap[type] || []
    // 开始执行
    res = handlers[i](param)
    while(i < handlers.length - 1) {
      i ++
      res = res.then(param => {
        return handlers[i](param)
      })
    }
  }
}
