import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../../todo';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-completed-list',
  templateUrl: './completed-list.component.html',
  styleUrls: ['./completed-list.component.css']
})
export class CompletedListComponent implements OnInit {
  todo$: Observable<Todo[]>;

  constructor(private todos: TodoService) { }

  ngOnInit() {
    this.todo$ = this.todos.getCompletedTodos();
  }
}
