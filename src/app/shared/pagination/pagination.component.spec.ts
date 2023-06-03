import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize with default values', () => {
    expect(component.currentPage).toEqual(1);
    expect(component.total).toEqual(0);
    expect(component.limit).toEqual(20);
    expect(component.pages).toEqual([]);
  });
  it('should generate correct range of pages', () => {
    component.total = 100;
    component.limit = 10;
    component.ngOnInit();
    expect(component.pages).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
  it('should emit changePage event when onNextOrPrev is called with "prev"', () => {
    spyOn(component.changePage, 'emit');
    component.currentPage = 3;
    component.onNextOrPrev('prev');
    expect(component.currentPage).toEqual(2);
    expect(component.changePage.emit).toHaveBeenCalledWith(2);
  });
  it('should emit changePage event when onNextOrPrev is called with "next"', () => {
    spyOn(component.changePage, 'emit');
    component.currentPage = 3;
    component.onNextOrPrev('next');
    expect(component.currentPage).toEqual(4);
    expect(component.changePage.emit).toHaveBeenCalledWith(4);
  })
  it('should render the Previous button', () => {
    const prevButton = fixture.nativeElement.querySelector('.pagination .page-item:first-child');
    expect(prevButton.textContent.trim()).toBe('Previous');
    expect(prevButton.classList).toContain('disable');
  });
  it('should render the Next button', () => {
    const nextButton = fixture.nativeElement.querySelector('.pagination .page-item:last-child');
    expect(nextButton.textContent.trim()).toBe('Next');
    expect(nextButton.classList).not.toContain('disable');
  });
  it('should call onNextOrPrev method when Previous button is clicked', () => {
    spyOn(component, 'onNextOrPrev');
    const prevButton = fixture.nativeElement.querySelector('.pagination .page-item:first-child');
    prevButton.click();
    expect(component.onNextOrPrev).toHaveBeenCalledWith('prev');
  });
  it('should call onNextOrPrev method when Next button is clicked', () => {
    spyOn(component, 'onNextOrPrev');
    const nextButton = fixture.nativeElement.querySelector('.pagination .page-item:last-child');
    nextButton.click();
    expect(component.onNextOrPrev).toHaveBeenCalledWith('next');
  });

});
