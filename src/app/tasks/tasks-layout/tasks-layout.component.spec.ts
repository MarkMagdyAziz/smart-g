import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksLayoutComponent } from './tasks-layout.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('TaskLayoutComponent', () => {
  let component: TasksLayoutComponent;
  let fixture: ComponentFixture<TasksLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TasksLayoutComponent ],
      imports:[RouterModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            /* Mock or provide any required properties/methods for testing */
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
