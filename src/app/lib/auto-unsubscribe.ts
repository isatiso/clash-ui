import { Directive, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

@Directive()
export class AutoUnsubscribe implements OnDestroy {

    protected subscription?: Subscription[]

    ngOnDestroy(): void {
        this.subscription?.forEach(s => s.unsubscribe())
    }
}
