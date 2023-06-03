import { Component, Input} from '@angular/core';
import {ITask} from 'src/app/core/interfaces/itask';

@Component({
  selector: 'sg-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: ITask = {} as ITask
  constructor(){}

getStatusIcon(status:string): string{
  switch (status) {
    case 'Running':
      return 'assets/icons/running.svg'
    case 'Finished':
      return 'assets/icons/finsihed.svg'
    case 'Queued':
      return 'assets/icons/running-time.svg'
    default:
      return 'assets/icons/new.svg'
  }
}

}
