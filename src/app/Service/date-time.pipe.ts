import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateTime'
})
export class DateTimePipe implements PipeTransform {

  transform(value: string): any {
    // Split the string by space to get the date part
    const datePart = value.split(' ')[0];

    // Extract the day part from the date
    const day = new DatePipe('en-US').transform(datePart, 'd');

    return day;
  }

}
