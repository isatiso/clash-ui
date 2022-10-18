import { Component, Input } from '@angular/core'
import { Subject, switchMap, tap } from 'rxjs'
import { AutoUnsubscribe } from '../../../lib/auto-unsubscribe'
import { ApiService } from '../../../services/api.service'
import { ProxiesService } from '../../../services/proxies.service'

@Component({
    selector: 'cm-proxy-group',
    templateUrl: './proxy-group.component.html',
    styleUrls: ['./proxy-group.component.scss']
})
export class ProxyGroupComponent extends AutoUnsubscribe {

    @Input() group?: string

    expand = false

    switch_proxy$ = new Subject<{ group: string, name: string }>()

    constructor(
        public api: ApiService,
        public proxies: ProxiesService,
    ) {
        super()
        this.subscription = [
            this.switch_proxy$.pipe(
                switchMap(({ group, name }) => this.api.switch_proxies(group, name)),
                tap(() => this.proxies.$request.next(null)),
            ).subscribe()
        ]
    }
}
