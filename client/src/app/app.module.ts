import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { CompletedListComponent } from './todo/completed-list/completed-list.component';
import { TodoService } from './todo.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './login/login.component';
import { NotcompletedListComponent } from './todo/notcompleted-list/notcompleted-list.component';
import { InterceptorService } from './Interceptor.service';
import { TodoComponent } from './todo/todo.component';



@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    CompletedListComponent,
    NotcompletedListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/api/auth']
      }
    })
  ],
  providers: [
    TodoService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('access_token');
}



