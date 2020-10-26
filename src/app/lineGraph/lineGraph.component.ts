import { Component, Input } from '@angular/core';

import {} from '@nativescript/core/data/observable-array';

@Component({
    selector: 'tns-linegraph',
    styleUrls: [ './lineGraph.component.css' ],
    templateUrl: './lineGraph.component.html'
})
export class LineGraphComponent {
    @Input() data: any;

    get source() {
        const source = !this.data.series ? [] : this.data.series.splice(0,12).map((item) => {
            const { feels_like, rain, snow, temp, time } = item;
            return { feels: feels_like, rain, snow, temp: parseInt(temp, 10), time };
        });
        return source;
    }
}
