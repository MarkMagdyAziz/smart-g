import {Component,OnInit} from '@angular/core';
import {finalize} from 'rxjs';
import {ITask} from 'src/app/core/interfaces/itask';
import {DataService} from 'src/app/core/services/data.service';
import {LoaderService} from 'src/app/core/services/loader.service';

@Component({
  selector: 'sg-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  tasks: ITask[][] = [[]]
  paginatedTasks: ITask[] = []
  currentPage: number = 1

  constructor (private dataService: DataService,private loaderService: LoaderService) {
  }
  ngOnInit (): void {
    this.loaderService.setLoading(true)
    this.dataService.getData().pipe(finalize(()=>{
      this.loaderService.setLoading(false)
    })).subscribe((res:ITask[][])=>{
      this.tasks = res;
      this.paginatedTasks = this.tasks[this.currentPage]
    });
  }
  onPageChange (page: number) {
    this.currentPage = page;
    this.paginatedTasks = this.tasks[this.currentPage].length > 0 ? this.tasks[this.currentPage] : this.paginatedTasks
  }
}
