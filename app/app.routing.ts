import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServerComponent }      from './components/server/server.component';
import { SampleComponent }      from './sample/sample.component';

const appRoutes: Routes = [
  {
    path: 'servers',
    component: ServerComponent
  },
  {
    path: 'sample',
    component: SampleComponent
  },
  {
    path: '',
    component: ServerComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const routedComponents = [SampleComponent, ServerComponent];