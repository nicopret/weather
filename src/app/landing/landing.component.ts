import { Component, OnInit } from '@angular/core';

import { Page } from '@nativescript/core/ui/page';

import * as geolocation from 'nativescript-geolocation';
import { Accuracy } from '@nativescript/core/ui/enums';

import { ApiService } from '../api/api.service';
import { Formatters } from '../util/formatters'

@Component({
    providers: [ ApiService, Formatters ],
    selector: 'tns-landing',
    styleUrls: [ './landing.component.css' ],
    templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {

    currentDay: any;
    currentLocation: any = {};
    currentWeather: any;
    currentWindSpeed: number;
    hourly: any = {};

    constructor(private apiService: ApiService, private formatter: Formatters, private page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        this.enableLocation();
        this.getLocation();
    }

    getData = (latitude, longitude) => {
        this.getWeather(latitude, longitude);
        setTimeout(() => {
            this.getData(latitude, longitude);
        }, 61000);
    }

    getLocation = () => {
        geolocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000
        }).then(loc => {
            if (loc) {
                const { latitude, longitude } = loc;
                this.getData(latitude, longitude);
            }
        }, (e) => {
            console.log(`Error: ${e.message || e}`);
        })
    }

    getWeather = async (latitude: Number, longitude: Number) => {
        const data: any = await this.apiService.weather(latitude, longitude);
        if (data) {
            const { dt, main, name,
                sys: { sunrise, sunset },
                weather,
                wind: {speed} } = data;
            this.currentLocation.date = this.formatter.dateFormatter(dt * 1000);
            this.currentLocation.place = name;
            this.currentDay = {
                sunrise: `${this.formatter.timeFormatter(sunrise * 1000)} am`,
                sunset: `${this.formatter.timeFormatter(sunset * 1000)} pm`
            };
            this.currentWindSpeed = speed;
            this.currentWeather = { weather, main };
        }
        const onecall: any = await this.apiService.onecall(latitude, longitude);
        if (onecall) {
            this.hourly.label = "Hourly";
            this.hourly.series = onecall.hourly.map((item) => {
                const {dt, temp, feels_like, wind_speed} = item;
                const rain = item.rain && item.rain['1h'] ? item.rain['1h'] : 0;
                const snow = item.snow && item.snow['1h'] ? item.snow['1h'] : 0;
                return {
                    feels_like, rain, snow, temp,
                    time: this.formatter.hourFormatter(dt * 1000), wind_speed
                }
            });
        }
    }

    enableLocation = () => {
        geolocation.isEnabled().then((isEnabled) => {
            if (!isEnabled) {
                geolocation.enableLocationRequest(true, true).then(() => {
                    console.log('User enabled location service');
                }, (e) => {
                    console.log(`Error: ${e.message || e}`);
                }).catch(ex => {
                    console.log('Unable to enable location', ex);
                });
            }
        });
    }
}
