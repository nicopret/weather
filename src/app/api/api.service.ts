import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';
import { Observable } from '@nativescript/core/data/observable';

import { Config } from './config';

@Injectable()
export class ApiService {

    constructor(private http: HttpClient) {}

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
        return await this.getData(`${base}?${params}`);
    }

    weather = async (latitude: Number, longitude: Number) => {
        const base = [ Config.BASE_URL, Config.BASE_WEATHER ].join('/');
        const params = [ `lat=${latitude}`, `lon=${longitude}`, 'units=metric', Config.API_KEY ].join('&');        
        return await this.getData(`${base}?${params}`);
    }
}
