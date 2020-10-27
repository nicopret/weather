import { Component, OnInit } from '@angular/core';
import { isAndroid } from '@nativescript/core/platform';

import { Page } from '@nativescript/core/ui/page';

import * as androidLocation from 'nativescript-geolocation';
import * as iosLocation from '@nativescript/geolocation';
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
    currentWeather: any;
    hourly: any = {};
    message: string = 'a';

    show: boolean = false;
    
    constructor(private apiService: ApiService, private formatter: Formatters, private page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit() {
        isAndroid ? this.enableAndroidLocation() : this.enableIosLocation();
        isAndroid ? this.getAndroidLocation() : this.getIosLocation();
    }

    getAndroidLocation = () => {
        androidLocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000
        }).then(loc => {
            if (loc) {
                const { latitude, longitude } = loc;
                this.apiService.current(latitude, longitude);
                this.apiService.onecall(latitude, longitude);
            }
        }, (e) => {
            console.log(`Error: ${e.message || e}`);
        })
    }

    getIosLocation = () => {
        iosLocation.getCurrentLocation({
            desiredAccuracy: Accuracy.high,
            maximumAge: 5000,
            timeout: 10000
        }).then(loc => {
            if (loc) {
                const { latitude, longitude } = loc;
                this.apiService.current(latitude, longitude);
                this.apiService.onecall(latitude, longitude);
            }
        }, (e) => {
            console.log(`Error: ${e.message || e}`);
        })
    }

    enableAndroidLocation = () => {
        androidLocation.isEnabled().then((isEnabled) => {
            if (!isEnabled) {
                androidLocation.enableLocationRequest(true, true).then(() => {
                    console.log('User enabled location service');
                }, (e) => {
                    console.log(`Error: ${e.message || e}`);
                }).catch(ex => {
                    console.log('Unable to enable location', ex);
                });
            }
        });
    }

    enableIosLocation = () => {
        iosLocation.isEnabled().then((isEnabled) => {
            if (!isEnabled) {
                iosLocation.enableLocationRequest(true, true).then(() => {
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
