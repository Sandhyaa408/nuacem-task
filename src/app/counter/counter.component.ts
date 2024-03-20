import { Component, OnInit } from '@angular/core';
import { CounterService } from '../Service/counter.service';
import { CommonService } from '../Service/common.service';
interface Counter {
  count: number;
}
@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent  implements OnInit{
  constructor(private counterService: CounterService,
    private commonService: CommonService){

  }
  ngOnInit(): void {
    this.counters = this.commonService.getArray('counters');
  }


  counters: Counter[] = [];

  addCounter() {
    this.counters.push({ count: 0 });
    this.updateCounterLoacalStorage();
    this.counterService.incrementCounter()

  }

  resetCounters() {
    this.counters = [];
    this.updateCounterLoacalStorage();
   this.counterService.resetCounter();
  }

  incrementCounter(counter: Counter) {
    counter.count++;
    this.updateCounterLoacalStorage();

  }

  decrementCounter(counter: Counter) {
    if (counter.count > 0) {
      counter.count--;

    }
    this.updateCounterLoacalStorage();

  }

  deleteCounter(index: number) {
    this.counters.splice(index, 1);
    this.updateCounterLoacalStorage();
    this.counterService.decrementCounter()


  }

  updateCounterLoacalStorage() {
    localStorage.setItem('counters', JSON.stringify(this.counters));
  }

}
