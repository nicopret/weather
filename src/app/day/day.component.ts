import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Formatters } from '../util/formatters';

@Component({
    providers: [ Formatters ],
    selector: 'tns-day',
    styleUrls: [ './day.component.css' ],
    templateUrl: './day.component.html'
})
export class DayComponent implements OnInit {

    sunrise;
    sunset;

    constructor(private apiService: ApiService, private formatter: Formatters) {}

    ngOnInit() {
        this.apiService.currentWeather.subscribe((value) => {
            this.sunrise = `${this.formatter.timeFormatter(value.sys.sunrise * 1000)} am`;
            this.sunset = `${this.formatter.timeFormatter(value.sys.sunset * 1000)} pm`;
        })
    }
}