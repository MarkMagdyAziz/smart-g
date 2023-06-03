import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TasksLayoutComponent} from './tasks/tasks-layout/tasks-layout.component';
import {TasksListComponent} from './tasks/tasks-list/tasks-list.component';

const routes: Routes = [
  { path: '', component: TasksLayoutComponent,
    children: [
      { path: '',component:TasksListComponent }
    ]
  },
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
