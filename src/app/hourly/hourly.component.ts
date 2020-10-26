import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Formatters } from '../util/formatters';

@Component({
    selector: 'tns-hourly',
    styleUrls: [ './hourly.component.css' ],
    templateUrl: './hourly.component.html'
})
export class HourlyComponent implements OnInit {

    temperature: any[];

    constructor(private apiService: ApiService, private formatters: Formatters) {}

    ngOnInit() {
        this.apiService.hourlyForecast.subscribe((value) => {
            this.temperature = value.splice(0, 12).map((item) => {
                const { dt, feels_like, temp } = item;
                return { feels: feels_like, temp, time: this.formatters.hourFormatter(dt * 1000)}
            });
        });
    }

}
