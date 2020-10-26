import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';

@Component({
    selector: 'tns-current',
    styleUrls: [ './current.component.css' ],
    templateUrl: './current.component.html'
})
export class CurrentComponent implements OnInit {

    feelsLike;
    icon;
    maximum;
    minimum;
    temperature;

    constructor(private apiService: ApiService) {}

    ngOnInit() {
        this.apiService.currentWeather.subscribe((value) => {
            this.feelsLike = `Feels like ${value.main.feels_like} °C`
            this.icon = `res://icon_${value.weather[0].icon}`;
            this.maximum = `Max: ${value.main.temp_max} °C`;
            this.minimum = `Min: ${value.main.temp_min} °C`;
            this.temperature = `${value.main.temp} °C`
        });
    }

}
