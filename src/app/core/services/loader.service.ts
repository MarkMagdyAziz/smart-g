import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loaderSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loaderSubject$ = this.loaderSubject.asObservable();

  constructor() { }

  setLoading(loading: boolean): void {
      this.loaderSubject.next(loading)
  }
}
