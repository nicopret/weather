import { Component, Input, OnChanges } from '@angular/core';

const windSpeedTypes = [
    { color: '#ffffff', min: 0, type: 'Calm' },
    { color: '#aef1f9', min: 0.5, type: 'Light air' },
    { color: '#96f7dc', min: 1.6, type: 'Light breeze' },
    { color: '#96f7b4', min: 3.4, type: 'Gentle breeze' },
    { color: '#6ff46f', min: 5.5, type: 'Moderate breeze' },
    { color: '#73ed12', min: 8, type: 'Fresh breeze' },
    { color: '#a4ed12', min: 10.8, type: 'String breeze' },
    { color: '#daed12', min: 13.9, type: 'High wind' },
    { color: '#edc212', min: 17.2, type: 'Gale' },
    { color: '#ed8f12', min: 20.8, type: 'Strong gale' },
    { color: '#ed6312', min: 24.5, type: 'Storm' },
    { color: '#ed2912', min: 28.5, type: 'Violent Storm' },
    { color: '#d5102d', min: 32.7, type: 'Hurricane' }
];

@Component({
    selector: 'tns-wind',
    styleUrls: [ './wind.component.css' ],
    templateUrl: './wind.component.html'
})
export class WindComponent implements OnChanges {
    @Input() data;

    color;
    speed;

    ngOnChanges () {
        const windType = windSpeedTypes.reduce((type, item) => this.data >= item.min ? item : type, windSpeedTypes[0]);
        this.color = windType.color;
        this.speed = `${windType.type}: ${Number(this.data * 3.6).toFixed(1)} km/h`;
    }
}