import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../Service/common.service';
import { WeatherService } from '../Service/weather.service';
import { DatePipe } from '@angular/common';

interface Location {
  name: string;
  temperature: number;
  id: number
  showSpinner : boolean;
}
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  cityName = '';
  currentCityName = '';
  errorMessage = '';
  showSpinner: boolean = false;
  locations: Location[] = [];
  forecastData: any =  [];

  constructor(private http: HttpClient,
    private commonService: CommonService,
    private weatherService: WeatherService,
    private datePipe: DatePipe
    ) { }
  ngOnInit(): void {
    this.locations = this.commonService.getArray('locations');
    if(this.locations.length > 0 ){
      this.getForecast(this.locations[0].name)
    }
  }

  addLocation() {
    if (this.cityName) {
      this.showSpinner = true;
      this.http.get<any>(`${this.apiUrl}?q=${this.cityName}&appid=${this.apiKey}&units=metric`).subscribe(
        (response) => {
          this.showSpinner = false;

          if (response.cod == 200) {

            this.locations.unshift({ name: response.name, temperature: response.main.temp, id: this.locations.length, showSpinner : false
            });
            if (this.locations.length > 8) {
              this.locations.pop();
            }

            this.updateLocationsLoacalStorage();
            this.errorMessage = '';
            this.cityName = '';
          } else {
            this.errorMessage = 'City Not Found'
          }
        },
        (error) => {
          this.showSpinner = false;


          this.errorMessage = 'City Not Found'
            ;
        }
      );
    }
  }

  removeLocation(location: Location) {
    const index = this.locations.indexOf(location);
    if (index !== -1) {
      this.locations.splice(index, 1);
    }

    this.updateLocationsLoacalStorage();
  }

  updateLocation(event: any,location: Location) {
    event.stopPropagation();
    if (location.name) {
      location.showSpinner = true;
      this.http.get<any>(`${this.apiUrl}?q=${location.name}&appid=${this.apiKey}&units=metric`).subscribe(
        (response) => {
          if (response.cod == 200) {
            location.showSpinner = false;

            const index = this.locations.indexOf(location);
            if (index !== -1) {
              let loc = { name: response.name, temperature: response.main.temp, id: index , showSpinner: false};

              this.locations[index] = loc;
            }

            this.updateLocationsLoacalStorage();

          } else {
            location.showSpinner = false;

          }
        },
        (error) => {
          location.showSpinner = false;

          ;
        }
      );
    }
    /////

  }

  clearLocations() {
    this.locations = [];
    this.updateLocationsLoacalStorage();
  }

  

  getForecast(location: any): void {
    this.currentCityName = location;
    
    this.weatherService.getForecast(location)
      .subscribe(data => {
        if(data.cod == 200){
          this.forecastData =  this.filterForecastForOneWeek(data.list);


        }
        
      });
  }

  filterForecastForOneWeek(data: any): any[] {
    // Filter data for one week based on your logic
    // For example, you could filter data for the next 7 days
    const currentDate = new Date();
    const oneWeekFromNow = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return data.filter((item: any) => new Date(item.dt_txt) <= oneWeekFromNow && item.dt_txt.includes('12:00:00'));
  }
  updateLocationsLoacalStorage() {
    localStorage.setItem('locations', JSON.stringify(this.locations));
  }



getDay(timestamp: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(timestamp);
  return days[date.getDay()];
}
getDate(timestamp: number): any {
  console.log(timestamp)

  return this.datePipe.transform(timestamp, 'dd');
}

}
