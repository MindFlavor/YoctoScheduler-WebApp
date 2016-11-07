import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerComponent } from './components/server/server.component';
import { TaskComponent } from './components/task/task.component';
import { ExecutionsComponent } from './components/executions/executions.component';

const appRoutes: Routes = [
  {
    path: 'servers',
    component: ServerComponent
  },
  {
    path: 'tasks',
    component: TaskComponent
  },
  {
    path: 'executions',
    component: ExecutionsComponent
  },
  {
    path: '',
    component: ServerComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const routedComponents = [ServerComponent, TaskComponent, ExecutionsComponent];