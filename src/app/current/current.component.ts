import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'tns-current',
    styleUrls: [ './current.component.css' ],
    templateUrl: './current.component.html'
})
export class CurrentComponent implements OnChanges {
    @Input() data: any;

    feelsLike;
    icon;
    maximum;
    minimum;
    temperature;

    ngOnChanges() {
        if (this.data) {
            this.feelsLike = `Feels like ${this.data.main.feels_like} °C`
            this.icon = `~/images/${this.data.weather[0].icon}.png`;
            this.maximum = `Max: ${this.data.main.temp_max} °C`;
            this.minimum = `Min: ${this.data.main.temp_min} °C`;
            this.temperature = `${this.data.main.temp} °C`
        }
    }
}
