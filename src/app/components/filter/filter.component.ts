import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { debounceTime, Subject } from 'rxjs'

@Component({
    selector: 'cm-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnDestroy {

    @Output() change = new EventEmitter<string>()

    $filter_change = new Subject<string>()
    private filter_subscription = this.$filter_change.pipe(
        debounceTime(100)
    ).subscribe(res => this.change.emit(res))

    ngOnDestroy() {
        this.filter_subscription.unsubscribe()
    }
}
