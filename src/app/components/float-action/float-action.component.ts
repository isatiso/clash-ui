import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { filter, Subject, switchMap, tap, throttleTime } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'
import { ApiService } from '../../services/api.service'
import { ConfigsService } from '../../services/configs.service'
import { ProxiesService } from '../../services/proxies.service'
import { WarningComponent } from '../warning/warning.component'

@Component({
    selector: 'cm-float-action',
    templateUrl: './float-action.component.html',
    styleUrls: ['./float-action.component.scss']
})
export class FloatActionComponent extends AutoUnsubscribe implements OnInit {

    expand = false
    close$ = new Subject()
    network_check$ = new Subject()

    constructor(
        private _api: ApiService,
        private _proxies: ProxiesService,
        public dialog: MatDialog,
        public translate: TranslateService,
        public configs: ConfigsService,
    ) {
        super()
        this.subscription = [
            this.close$.pipe(
                throttleTime(200),
                switchMap(() => this.dialog.open(WarningComponent, { data: { msg_id: 'common.close-all-connections' } }).afterClosed()),
                filter(data => !!data),
                switchMap(() => this._api.close_all_connections()),
            ).subscribe(),
            this.network_check$.pipe(
                throttleTime(1000),
                tap(() => this._proxies.speed_test())
            ).subscribe(),
        ]
    }

    ngOnInit(): void {
    }

    toggle_theme() {
        if (this.configs.theme === 'dark') {
            this.configs.theme = 'light'
        } else {
            this.configs.theme = 'dark'
        }
    }

    close() {
        if (this.expand) {
            this.expand = false
        }
    }
}
