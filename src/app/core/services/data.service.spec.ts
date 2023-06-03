import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {CoreModule} from '../core.module';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,CoreModule],
      providers: [DataService]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return paginated items from dummyData.json', () => {
    const dummyData: any[] = [
      { id: '1', name: 'Task 1' },
      { id: '2', name: 'Task 2' },
      { id: '3', name: 'Task 3' },
      { id: '4', name: 'Task 4' },
      { id: '5', name: 'Task 5' },
      { id: '6', name: 'Task 6' },
    ];
    const expectedPaginatedItems: any[][] = [
      [
        { id: '1', name: 'Task 1' },
        { id: '2', name: 'Task 2' },
        { id: '3', name: 'Task 3' },
        { id: '4', name: 'Task 4' },
        { id: '5', name: 'Task 5' },
        { id: '6', name: 'Task 6' },
      ],
    ];
    service.getData().subscribe((result) => {
      expect(result).toEqual(expectedPaginatedItems);
    });

    const req = httpMock.expectOne('assets/dummyData.json');
    expect(req.request.method).toBe('GET');
    req.flush(dummyData);
  });


  describe('chunkArray', () => {
    it('should chunk the array into subarrays of specified size', () => {
      // Define the input array and the expected chunked array
      const inputArray: any[] = [
        { id: '1', name: 'Task 1' },
        { id: '2', name: 'Task 2' },
        { id: '3', name: 'Task 3' },
        { id: '4', name: 'Task 4' },
        { id: '5', name: 'Task 5' },
      ];
      const chunkSize = 2;
      const expectedChunks: any[][] = [
        [
          { id: '1', name: 'Task 1' },
          { id: '2', name: 'Task 2' },
        ],
        [
          { id: '3', name: 'Task 3' },
          { id: '4', name: 'Task 4' },
        ],
        [
          { id: '5', name: 'Task 5' },
        ],
      ];

      // Call the function and check the result
      const result = service.chunkArray(inputArray, chunkSize);
      expect(result).toEqual(expectedChunks);
    });
  });
});
