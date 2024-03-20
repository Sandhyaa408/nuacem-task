import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
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
