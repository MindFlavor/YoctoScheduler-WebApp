import { NgModule }                         from '@angular/core';
import { BrowserModule }                    from '@angular/platform-browser';
import { FormsModule }                      from '@angular/forms';
import { HttpModule }                       from '@angular/http';
import { AppComponent }                     from './app.component';
import { routing, routedComponents }        from './app.routing';

import {PopoverModule}                      from "ng2-popover";


import { ServerDetailComponent }            from './components/server/server-detail.component';
import { TaskDetailComponent }              from './components/task/task-detail.component';
import { ROTaskDetailComponent }            from './components/task/ro.task-detail.component';
import { TaskWaitComponent }                from './components/task/task-wait.component';
import { ROTaskWaitComponent }              from './components/task/ro.task-wait.component';
import { TaskTSQLComponent }                from './components/task/task-tsql.component';
import { ROTaskTSQLComponent  }             from './components/task/ro.task-tsql.component';
import { TaskPowerShellComponent }          from './components/task/task-powershell.component';
import { ROTaskPowerShellComponent }        from './components/task/ro.task-powershell.component';
import { TaskSSISComponent }                from './components/task/task-ssis.component';
import { ROTaskSSISComponent }              from './components/task/ro.task-ssis.component';
import { ExecutionsDetailComponent }        from './components/executions/executions-detail.component';
import { SecretDetailComponent }            from './components/secret/secret-detail.component';

import { ServerService, MockServerService } from './services/server.service';
import { TaskService, MockTaskService  }    from './services/task.service';
import { SecretService }                    from './services/secret.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, routing, PopoverModule ],
  declarations: [ AppComponent, routedComponents, ServerDetailComponent, TaskDetailComponent, 
                  TaskWaitComponent, TaskTSQLComponent, TaskPowerShellComponent, 
                  TaskSSISComponent, ExecutionsDetailComponent, SecretDetailComponent,
                  ROTaskDetailComponent, ROTaskWaitComponent, ROTaskTSQLComponent,
                  ROTaskPowerShellComponent, ROTaskSSISComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ ServerService, MockServerService, TaskService, MockTaskService, SecretService ]
})
export class AppModule { }