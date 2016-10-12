import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { AppComponent }                     from './app.component';
import { routing, routedComponents }        from './app.routing';
import { ServerDetailComponent }            from './components/server/server-detail.component';
import { TaskDetailComponent }              from './components/task/task-detail.component';
import { TaskWaitComponent }                from './components/task/task-wait.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, routedComponents, ServerDetailComponent, TaskDetailComponent, TaskWaitComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }