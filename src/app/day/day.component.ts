import { Component, Input } from '@angular/core';

@Component({
    selector: 'tns-day',
    styleUrls: [ './day.component.css' ],
    templateUrl: './day.component.html'
})
export class DayComponent {

    @Input() data: any;

}