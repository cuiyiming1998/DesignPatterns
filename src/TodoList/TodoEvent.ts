import { ITodo } from "../types.d"

type Id = ITodo['id']

class TodoEvent {
  private static instance: TodoEvent
  private todoData: ITodo[] = []

  // 单例
  public static create () {
    if (!TodoEvent.instance) {
      TodoEvent.instance = new TodoEvent()
    }
    return TodoEvent.instance
  }

  public addTodo(todo: ITodo): Promise<ITodo> {
    return new Promise((resolve, reject) => {
      // 是否存在
      const isExist = this.todoData.some(item => todo.content === item.content)
      if (isExist) {
        alert('该项已存在!')
        return reject(1001)
      }
      this.todoData.push(todo)
      console.log('添加后的list', this.todoData)
      resolve(todo)
    })
  }

  public removeTodo(id: Id): Promise<Id> {
    return new Promise((resolve, reject) => {
      this.todoData = this.todoData.filter(item => id !== item.id)
      console.log('删除后的list', this.todoData)
      resolve(id)
    })
  }

  public toggleTodo(id: Id): Promise<Id> {
    return new Promise((resolve, reject) => {
      const data = this.todoData.find(item => id === item.id)
      data.completed = !data.completed
      resolve(id)
    })
  }
}

export default TodoEvent
