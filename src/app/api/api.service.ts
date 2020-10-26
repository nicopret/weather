import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Config } from './config';
import { Subject } from 'rxjs';

@Injectable()
export class ApiService {

    currentWeather = new Subject<any>();
    hourlyForecast = new Subject<any>();

    count = 0;

    constructor(private http: HttpClient) {}

    current = async(latitude: Number, longitude: Number) => {
        const base = [ Config.BASE_URL, Config.BASE_WEATHER ].join('/');
        const params = [ `lat=${latitude}`, `lon=${longitude}`, 'units=metric', Config.API_KEY ].join('&');        
        const data = await this.getData(`${base}?${params}`);
        this.currentWeather.next(data);
        setTimeout(() => {
            this.current(latitude, longitude);
        }, 61000);
    }

    getData = (url) => {
        return new Promise(resolve => {
            this.http.get(url).subscribe(data => {
                resolve(data);
            });
        });
    }

    onecall = async (latitude: Number, longitude: Number) => {
        const base = [ Config.BASE_URL, Config.BASE_ONECALL ].join('/');
        const params = [ `lat=${latitude}`, `lon=${longitude}`, 'units=metric', Config.API_KEY ].join('&');
        const data: any = await this.getData(`${base}?${params}`);
        this.hourlyForecast.next(data.hourly);
        setTimeout(() => {
            this.onecall(latitude, longitude);
        }, 61000);
    }

}
