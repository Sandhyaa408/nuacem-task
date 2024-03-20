import { Component, OnInit } from '@angular/core';
import { CounterService } from './Service/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  counter: number = 0;

  constructor(private counterService: CounterService){

  }
  ngOnInit(): void {
    this.counterService.counter$.subscribe((value) => {
      this.counter = this.getArray('counters').length;
    });  }
  title = 'nuacem';


getArray(key: string): any[] {
  // Retrieve JSON string from local storage
  const json = localStorage.getItem(key);
  // Parse JSON string to array
  if (json !== null) {
    // Parse JSON string to array
    return JSON.parse(json);
  } else {
    // If key doesn't exist, return an empty array
    return [];
  }  }
}
