import { Component, OnInit } from '@angular/core'
import { Subject, switchMap, tap } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'
import { FilterArray } from '../../lib/filter'
import { ApiService, RuleDef } from '../../services/api.service'

const type_colors: Record<string, string> = {
    DIRECT: '#f5bc41',
    REJECT: '#cb3166',
    default: '#59caf9',
}

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
                tap(res => res.rules.forEach(r => r.color = type_colors[r.proxy] ?? type_colors['default'])),
                tap(res => this.list.update_origin(res.rules)),
            ).subscribe()
        ]
    }

    ngOnInit(): void {
        this.request_rules$.next(null)
    }
}
