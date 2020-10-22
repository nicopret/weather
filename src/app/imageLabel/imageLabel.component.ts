import { Component, Input } from '@angular/core';

@Component({
    selector: 'ImageLabel',
    styleUrls: [ './imageLabel.component.css' ],
    templateUrl: './imageLabel.component.html'
})
export class ImageLabelComponent {
    @Input() image: string;
    @Input() text: string;
}