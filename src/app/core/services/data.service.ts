import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {ITask} from '../interfaces/itask';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }
  getData(): Observable<ITask[][]> {
    return this.http.get<ITask[]>('assets/dummyData.json').pipe(map((res:ITask[])=>{
      let paginatedItems = this.chunkArray(res,6)
      return paginatedItems
    }))
  }
  chunkArray(array: ITask[], size: number):ITask[][] {
    let chunkedSlides:ITask[][] = []
    let indexStart = 0;
    while (indexStart < array.length) {
      chunkedSlides.push(array.slice(indexStart, indexStart + size));
      indexStart = indexStart + size;
    }
    return chunkedSlides
  }
}
