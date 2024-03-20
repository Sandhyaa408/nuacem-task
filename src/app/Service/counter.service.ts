import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private counterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  counter$: Observable<number> = this.counterSubject.asObservable();

  constructor() {}

  incrementCounter() {
    this.counterSubject.next(this.counterSubject.value + 1);
  }

  decrementCounter() {
    let value = 0;
    if (this.counterSubject.value > 0) {
      this.counterSubject.next(this.counterSubject.value - 1);

    }else{
      this.counterSubject.next(0);

    }
  }

  getCounterValue(): number {
    return this.counterSubject.value;
  }
  resetCounter(){
    this.counterSubject.next(0);

  }
}
