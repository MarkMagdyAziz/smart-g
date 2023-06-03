import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import {SharedModule} from './shared/shared.module';
import {TasksModule} from './tasks/tasks.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,LayoutModule,HttpClientModule,RouterModule,SharedModule,TasksModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render sg-layout', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('sg-layout')?.textContent).toBeTruthy();
  });
});
