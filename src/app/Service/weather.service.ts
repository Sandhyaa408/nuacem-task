import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = 'd4594364698122bfd1c4b3eb5f2ff19f';
  apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
  constructor(private http: HttpClient) { }

  getForecast(city: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}`;
    return this.http.get<any>(url);
  }
  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get<any>(url);
  }


}
