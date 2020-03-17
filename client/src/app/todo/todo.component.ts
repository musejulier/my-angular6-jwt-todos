import { Component, OnInit } from '@angular/core';
// import { TodoService } from '../../todo.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
// import { Todo } from '../../todo';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

//   todo$: Observable<Todo[]>;

 constructor(private auth: AuthService){}

  ngOnInit() {
    // this.todo$ = this.todos.getNotcompletedTodos();
  }

}
