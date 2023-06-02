import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TasksListComponent} from './tasks-list/tasks-list.component';
import {TaskItemComponent} from './task-item/task-item.component';
import { RouterModule, Routes } from '@angular/router';
import {TasksLayoutComponent} from './tasks-layout/tasks-layout.component';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: TasksLayoutComponent,
    children: [
      { path: '',component:TasksListComponent }
    ]
  },
]

@NgModule({
  declarations: [
    TasksListComponent,
    TaskItemComponent,
    TasksLayoutComponent
  ],
  imports: [
    CommonModule,RouterModule.forRoot(routes),
    SharedModule
  ]
})
export class TasksModule { }
