import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core'
import { debounceTime, Subject, tap } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'

@Component({
    selector: 'cm-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends AutoUnsubscribe implements OnDestroy {

    @Input() placeholder = 'Filter'
    @Output() change = new EventEmitter<string>()

    change$ = new Subject<string>()

    constructor() {
        super()
        this.subscription = [
            this.change$.pipe(
                debounceTime(200),
                tap(res => this.change.emit(res)),
            ).subscribe(),
        ]
    }
}
