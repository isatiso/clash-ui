import { Component, HostListener, Input } from '@angular/core'
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

    expand_panel(event: Event) {
        this.expand = !this.expand
    }

    constructor(
        public api: ApiService,
        public proxies: ProxiesService,
    ) {
        super()
        this.subscription = [
            this.switch_proxy$.pipe(
                switchMap(({ group, name }) => this.api.switch_proxies(group, name)),
                tap(() => this.proxies.request$.next(null)),
            ).subscribe()
        ]
    }

    getLabelColor(delay?: number) {
        if (!delay) {
            return '#909399'
        } else if (delay < 300) {
            return '#67c23a'
        } else if (delay < 1000) {
            return '#d4b75c'
        } else {
            return '#e67f3c'
        }
    }
}
