import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../todo.service';
import { Observable } from 'rxjs';
import { Todo } from '../../todo';

@Component({
  selector: 'app-notcompleted-list',
  templateUrl: './notcompleted-list.component.html',
  styleUrls: ['./notcompleted-list.component.css']
})
export class NotcompletedListComponent implements OnInit {

  todo$: Observable<Todo[]>;

  constructor(private todos: TodoService) { }

  ngOnInit() {
    this.todo$ = this.todos.getNotcompletedTodos();
  }

}
