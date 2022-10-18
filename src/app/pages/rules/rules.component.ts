import { Component, OnInit } from '@angular/core'
import { Subject, switchMap, tap } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'
import { FilterArray } from '../../lib/filter'
import { ApiService, RuleDef } from '../../services/api.service'

@Component({
    selector: 'cm-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss']
})
export class RulesComponent extends AutoUnsubscribe implements OnInit {

    list = new FilterArray<RuleDef>(
        (key, obj) => obj.payload.indexOf(key) !== -1)

    request_rules$ = new Subject()

    constructor(
        public api: ApiService,
    ) {
        super()
        this.subscription = [
            this.request_rules$.pipe(
                switchMap(() => this.api.rules()),
                tap(res => res.rules.forEach(r => r.color = this.get_color(r.proxy))),
                tap(res => this.list.update_origin(res.rules)),
            ).subscribe()
        ]
    }

    get_color(proxy: string) {
        if (proxy === 'DIRECT') {
            return '#f5bc41'
        } else if (proxy === 'REJECT') {
            return '#cb3166'
        } else {
            return '#59caf9'
        }
    }

    ngOnInit(): void {
        this.request_rules$.next(null)
    }
}
