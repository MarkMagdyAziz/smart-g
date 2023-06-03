import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription, delay} from 'rxjs';
import {LoaderService} from './core/services/loader.service';

@Component({
  selector: 'sg-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnDestroy,OnInit {
  loading: boolean = false
  loaderSubscription!:Subscription
  constructor(private loaderService: LoaderService){
  }
ngOnInit(): void {
  this.loader()
}

  loader() {
   this.loaderSubscription =  this.loaderService.loaderSubject$.pipe(delay(0))
      .subscribe((loading) => {
        this.loading = loading
      });
  }

  ngOnDestroy(): void {
    if(this.loaderSubscription){
      this.loaderSubscription.unsubscribe()
    }
  }
}
