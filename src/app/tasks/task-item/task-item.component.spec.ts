import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TaskItemComponent } from './task-item.component';
import {ITask} from 'src/app/core/interfaces/itask';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display correct status icon', () => {
    const task: any = { id: '1', name: 'Task 1', status: 'Running', createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] };
    component.task = task;
    fixture.detectChanges();

    const statusIcon = fixture.debugElement.query(By.css('.status-icon')).nativeElement as HTMLImageElement;

    expect(statusIcon.src).toContain('assets/icons/running.svg');
  });
  it('should set the task property correctly', () => {
    const task: ITask = { id: '1', name: 'Task 1', status: 'Running', createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] };
    component.task = task;
    expect(component.task).toEqual(task);
  });
  it('should display the task name in the template', () => {
    const taskName = 'Task 1';
    component.task = { id: '1', name: taskName, status: 'Running', createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] };
    fixture.detectChanges();

    const taskNameElement = fixture.nativeElement.querySelector('.item-header');
    expect(taskNameElement.textContent).toContain(taskName);
  });
  it('should display the correct status with the correct icon', () => {
    const status = 'Running';
    component.task = { id: '1', name: 'Task 1', status: status, createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] };
    fixture.detectChanges();

    const statusElement = fixture.nativeElement.querySelector('.status');
    const statusIconElement = fixture.nativeElement.querySelector('.status-icon');
    expect(statusIconElement.getAttribute('src')).toContain(component.getStatusIcon(status));
    expect(statusElement.textContent).toContain(status);

  });
  it('should display the selection criteria', () => {
    const selectionCriteria = ['Criteria 1', 'Criteria 2'];
    component.task = { id: '1', name: 'Task 1', status: 'Running', createdAt: new Date(), operations: [], selectionCriteria: selectionCriteria, tsk210: [] };
    fixture.detectChanges();

    const selectionCriteriaElements = fixture.nativeElement.querySelectorAll('.criteria');
    for (let i = 0; i < selectionCriteria.length; i++) {
      expect(selectionCriteriaElements[i].textContent).toContain(selectionCriteria[i]);
    }
  });
  it('should apply the correct CSS class based on the task status', () => {
    const status = 'Running';
    component.task = { id: '1', name: 'Task 1', status: status, createdAt: new Date(), operations: [], selectionCriteria: [], tsk210: [] };
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.content');
    expect(containerElement.classList.contains('status-running')).toBeTrue();
    expect(containerElement.classList.contains('status-finished')).toBeFalse();
    expect(containerElement.classList.contains('status-queued')).toBeFalse();
    expect(containerElement.classList.contains('status-new')).toBeFalse();
  });
});
