import { Component, Input, OnInit } from '@angular/core'
import { Subject, switchMap } from 'rxjs'
import { ApiService } from '../../../services/api.service'
import { ProxiesService } from '../../../services/proxies.service'

@Component({
    selector: 'cm-proxy-group',
    templateUrl: './proxy-group.component.html',
    styleUrls: ['./proxy-group.component.scss']
})
export class ProxyGroupComponent implements OnInit {

    @Input() group?: string

    expand = false

    switch_proxy = new Subject<{ group: string, name: string }>()
    switch_proxy_subscription = this.switch_proxy.pipe(
        switchMap(({ group, name }) => this.api.switch_proxies(group, name)),
    ).subscribe(() => this.proxies.$request.next(null))

    constructor(
        public api: ApiService,
        public proxies: ProxiesService,
    ) {

    }

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.switch_proxy_subscription.unsubscribe()
    }

}
