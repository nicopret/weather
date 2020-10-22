import { Component, Input } from '@angular/core';

@Component({
    selector: 'tns-place',
    styleUrls: [ './place.component.css' ],
    templateUrl: './place.component.html'
})
export class PlaceComponent {
    @Input() data: any;

}
