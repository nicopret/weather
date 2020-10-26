import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Formatters } from '../util/formatters';

@Component({
    selector: 'tns-place',
    styleUrls: [ './place.component.css' ],
    templateUrl: './place.component.html'
})
export class PlaceComponent implements OnInit {

    date;
    place;

    constructor(private apiService: ApiService, private formatter: Formatters) {}

    ngOnInit() {
        this.apiService.currentWeather.subscribe((value) => {
            const { dt, name } = value;
            this.date = this.formatter.dateFormatter(dt * 1000);
            this.place = name;
        });
    }
}
