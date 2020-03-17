import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../todo';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todo$: Observable<Todo[]>;
  name: string;
  completed: boolean = false;
  showEditArea: boolean = false;
  constructor(private todos: TodoService) { }

  ngOnInit() {
    this.todo$ = this.todos.getTodos();
  }
  /**
   * 添加任务
   */
  addTodo() {
    if(!this.name) {
      alert("任务内容不能为空！");
      return;
    }
    this.todos.addTodo(this.name,this.completed).subscribe((val) => {
      if(val.success) {
        alert("添加成功！");
        this.showEditArea = false;
        this.todo$ = this.todos.getTodos();
      }
    });
  }
   /**
   * 删除任务
   */
  updateState(id,isCompleted) {
    this.todos.updateState(id,isCompleted).subscribe((val) => {
      if(val.success) {
        this.todo$ = this.todos.getTodos();
      }
    });
  }
  /**
   * 删除任务
   */
  deleteTodo(id) {
    this.todos.deleteTodo(id).subscribe((val) => {
      if(val.success) {
        alert("删除成功！");
        this.todo$ = this.todos.getTodos();
      }
    });
  }
  /**
   * 点击添加按钮
   */
  showEdit() {
    this.showEditArea = true;
  }
}
