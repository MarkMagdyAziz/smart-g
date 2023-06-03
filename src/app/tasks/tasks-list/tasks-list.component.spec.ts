import { ComponentFixture, TestBed,tick ,fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TasksListComponent } from './tasks-list.component';
import {DataService} from 'src/app/core/services/data.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {SharedModule} from 'src/app/shared/shared.module';
import { of} from 'rxjs';
import {LoaderService} from 'src/app/core/services/loader.service';
import {ITask} from 'src/app/core/interfaces/itask';
import {TaskItemComponent} from '../task-item/task-item.component';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let dataService: DataService;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksListComponent ,TaskItemComponent],
      imports: [HttpClientTestingModule,SharedModule],
      providers: [DataService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    dataService =fixture.debugElement.injector.get(DataService)
    loaderService =fixture.debugElement.injector.get(LoaderService)
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('make sure  data service has been injected successfuly', () => {
    expect(dataService).toBeTruthy();
  });
  it('should call dataService.getData and update tasks on ngOnInit', () => {
    const mockData:[ITask[]] = [[]];
    const getDataSpy = spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(getDataSpy).toHaveBeenCalled();
    expect(component.tasks).toEqual(mockData);
  });
  it('should update paginatedTasks and setLoading on subscription', () => {
    const mockData:[ITask[]] = [[]];
    spyOn(dataService, 'getData').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.paginatedTasks).toEqual(mockData[component.currentPage]);
    expect(loaderService.loaderSubject$.subscribe(load=>expect(load).toBeFalse()));
  });

  it('should set loading to true before calling dataService.getData', () => {
    const mockData:[ITask[]] = [[]];
    spyOn(dataService, 'getData').and.returnValue(of(mockData));
    const setLoadingSpy = spyOn(loaderService, 'setLoading');

    component.ngOnInit();

    expect(dataService.getData).toHaveBeenCalled();
    expect(setLoadingSpy).toHaveBeenCalledWith(true);
    expect(loaderService.loaderSubject$.subscribe(load=>expect(load).toBeTrue()));

  });

  it('should render sg-task-item components for each task in paginatedTasks', () => {
  const tasks: ITask[] = [
    { id: '1', name: 'Task 1', status: 'Finished', createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] },
    { id: '1', name: 'Task 2', status: 'Queued', createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] },
    { id: '1', name: 'Task 3', status: 'Queued', createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] },
  ];

  component.paginatedTasks = tasks;

  fixture.detectChanges();

    const taskItemElements = fixture.debugElement.queryAll(By.css('sg-task-item'));
    expect(taskItemElements.length).toBe(3);
  });

  it('should pass the correct task input to sg-task-item components', () => {
  const tasks: ITask[] = [
    { id: '1', name: 'Task 1', status: 'Finished', createdAt: new Date(2023, 5, 3, 15, 50, 49), operations: ['op1','op2'], selectionCriteria: ['cr1' ,'crt2' ,'crt3'], tsk210: ['tsk1','tsk2'] },
    { id: '2', name: 'Task 2', status: 'Queued', createdAt: new Date(2023, 5, 3, 15, 50, 49), operations: ['op1','op2'], selectionCriteria: ['cr1' ,'crt2' ,'crt3'], tsk210: ['tsk1','tsk2'] },
    { id: '3', name: 'Task 3', status: 'Queued', createdAt: new Date(2023, 5, 3, 15, 50, 49), operations: ['op1','op2'], selectionCriteria: ['cr1' ,'crt2' ,'crt3'], tsk210: ['tsk1','tsk2'] },
  ];

  component.paginatedTasks = tasks;

  fixture.detectChanges();
    const taskItemElements = fixture.debugElement.queryAll(By.css('sg-task-item'));
    expect(taskItemElements.length).toBe(3);

    const taskComponents = taskItemElements.map(element => element.componentInstance);
    expect(taskComponents[0].task).toEqual(tasks[0]);
    expect(taskComponents[1].task).toEqual(tasks[1]);
    expect(taskComponents[2].task).toEqual(tasks[2]);
  });
  it('should pass the correct task input to sg-task-item components', () => {
    const tasks: ITask[] = [
      { id: '1', name: 'Task 1', status: 'Finished', createdAt: new Date(2023, 5, 3, 15, 50, 49), operations: ['op1','op2'], selectionCriteria: ['cr1' ,'crt2' ,'crt3'], tsk210: ['tsk1','tsk2'] },
      { id: '2', name: 'Task 2', status: 'Queued', createdAt: new Date(2023, 5, 3, 15, 50, 49), operations: ['op1','op2'], selectionCriteria: ['cr1' ,'crt2' ,'crt3'], tsk210: ['tsk1','tsk2'] },
      { id: '3', name: 'Task 3', status: 'Queued', createdAt: new Date(2023, 5, 3, 15, 50, 49), operations: ['op1','op2'], selectionCriteria: ['cr1' ,'crt2' ,'crt3'], tsk210: ['tsk1','tsk2'] },
    ];
    component.paginatedTasks = tasks;

    fixture.detectChanges();

    const taskItemElements = fixture.debugElement.queryAll(By.css('sg-task-item'));

    expect(taskItemElements.length).toBe(3);
    const taskComponents = taskItemElements.map(element => element.componentInstance);
    expect(taskComponents[0].task).toEqual(tasks[0]);
    expect(taskComponents[1].task).toEqual(tasks[1]);
    expect(taskComponents[2].task).toEqual(tasks[2]);
  });
  it('should call onPageChange method when sg-pagination emits changePage event', () => {
    const paginationComponent = fixture.debugElement.query(By.css('sg-pagination')).componentInstance;
    spyOn(fixture.componentInstance, 'onPageChange');
    paginationComponent.changePage.emit(2);
    expect(fixture.componentInstance.onPageChange).toHaveBeenCalledWith(2);
  });
});
