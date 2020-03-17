import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { CompletedListComponent } from './todo/completed-list/completed-list.component';
import { NotcompletedListComponent } from './todo/notcompleted-list/notcompleted-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo/todos', pathMatch: 'full'},
  { 
    path: 'todo', 
    component: TodoComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'todos', pathMatch: 'full'},
      { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
      { path: 'completed', component: CompletedListComponent, canActivate: [AuthGuard] },
      { path: 'notcompleted', component: NotcompletedListComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: 'login', component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
