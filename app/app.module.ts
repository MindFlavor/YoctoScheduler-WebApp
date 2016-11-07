import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { AppComponent }                     from './app.component';
import { routing, routedComponents }        from './app.routing';
import { ServerDetailComponent }            from './components/server/server-detail.component';
import { TaskDetailComponent }              from './components/task/task-detail.component';
import { TaskWaitComponent }                from './components/task/task-wait.component';
import { TaskTSQLComponent }                from './components/task/task-tsql.component';
import { TaskPowerShellComponent }          from './components/task/task-powershell.component';
import { TaskSSISComponent }                from './components/task/task-ssis.component';
import { ExecutionsDetailComponent }    from './components/executions/executions-detail.component';

import {ServerService, MockServerService } from './services/server.service'
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing ],
  declarations: [ AppComponent, routedComponents, ServerDetailComponent, TaskDetailComponent, TaskWaitComponent,
                  TaskTSQLComponent, TaskPowerShellComponent, TaskSSISComponent, 
                  ExecutionsDetailComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ServerService, MockServerService]
})
export class AppModule { }