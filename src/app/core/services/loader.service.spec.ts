import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should set loading to true', () => {
    service.setLoading(true);
    service.loaderSubject$.subscribe(loading => {
      expect(loading).toBeTrue();
    });
  });
  it('should set loading to false', () => {
    service.setLoading(false);
    service.loaderSubject$.subscribe(loading => {
      expect(loading).toBeFalse();
    });
  });
});
