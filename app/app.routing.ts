import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ServerComponent } from "./components/server/server.component";
import { TaskComponent } from "./components/task/task.component";
import { ExecutionsComponent } from "./components/executions/executions.component";
import { SecretComponent } from "./components/secret/secret.component";
import { SchedulesComponent } from "./components/schedules/schedules.component";

const appRoutes: Routes = [
  {
    path: "servers",
    component: ServerComponent
  },
  {
    path: "tasks",
    component: TaskComponent
  },
  {
    path: "executions",
    component: ExecutionsComponent
  },
  {
    path: "secrets",
    component: SecretComponent
  },
  {
    path: "schedules",
    component: SchedulesComponent
  },
  {
    path: "",
    component: ServerComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const routedComponents = [ServerComponent, TaskComponent, ExecutionsComponent, SecretComponent, SchedulesComponent];