import { Component, Input } from '@angular/core'

@Component({
    selector: 'cm-traffic-card',
    templateUrl: './traffic-card.component.html',
    styleUrls: ['./traffic-card.component.scss'],
})
export class TrafficCardComponent {
    @Input() name = ''
    @Input() value = ''
}
