import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<Todo[]>('/api/todos');
  }
  getCompletedTodos() {
    return this.http.get<Todo[]>('/api/completedTodos');
  }
  getNotcompletedTodos() {
    return this.http.get<Todo[]>('/api/notcompletedTodos');
  }
  getTodo(id: number) {
    return this.http.get<Todo>(`/api/todos/${id}`);
  }
  addTodo(name: string, completed: boolean) {
    return this.http.post<{success: boolean}>(`/api/addTodo`,{
      name,
      completed
    });
  }
  updateState(id: number, isCompleted: boolean) {
    return this.http.post<{success: boolean}>(`/api/updateState`,{
      id,
      isCompleted
    });
  }
  deleteTodo(id: number) {
    return this.http.post<{success: boolean}>(`/api/deleteTodo`,{
      id,
    });
  }
}
