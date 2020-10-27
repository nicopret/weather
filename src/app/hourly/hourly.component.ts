import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Formatters } from '../util/formatters';

@Component({
    providers: [ Formatters ],
    selector: 'tns-hourly',
    styleUrls: [ './hourly.component.css' ],
    templateUrl: './hourly.component.html'
})
export class HourlyComponent implements OnInit {

    show: boolean = false;
    temperature: any[];
    windCollection: any[];

    constructor(private apiService: ApiService, private formatters: Formatters) {}

    ngOnInit() {
        this.apiService.hourlyForecast.subscribe((value) => {
            this.show = !(!value);
            this.temperature = value.slice(0, 12).map((item) => {
                const { dt, feels_like, temp } = item;
                return { feels: feels_like, temp, time: this.formatters.hourFormatter(dt * 1000)};
            });
            this.windCollection = value.slice(0, 12).map((item, index) => {
                const { dt, wind_speed } = item;
                const rain = item.rain ? item.rain['1h'] : 0;
                const snow = item.snow ? item.snow['1h'] : 0;
                return { rain, snow, time: this.formatters.hourFormatter(dt * 1000), wind: wind_speed * 3.6 };
            });
        });
    }

}
