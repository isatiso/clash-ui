import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { debounceTime, map, Subject, switchMap, tap } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'
import { ApiService, Config } from '../../services/api.service'
import { BackendService } from '../../services/backend.service'
import { ConfigsService } from '../../services/configs.service'

@Component({
    selector: 'cm-configs',
    templateUrl: './configs.component.html',
    styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent extends AutoUnsubscribe implements OnInit {

    get_config$ = new Subject()
    switch_backend$ = new Subject()
    settings_form = this._fb.nonNullable.group({
        port: [0],
        socks_port: [0],
        redir_port: [0],
        mixed_port: [0],
        allow_lan: [false],
        mode: ['' as Config['mode']],
        log_level: ['' as Config['log_level']],
        // 'tproxy_port': [0, Validators.pattern(/^\d+$/)],
        // 'ipv6': [false],
    })

    constructor(
        private _api: ApiService,
        private _dialog: MatDialog,
        private _fb: FormBuilder,
        public backend: BackendService,
        public configs: ConfigsService,
        public translate: TranslateService,
    ) {
        super()
        this.subscription = [
            this.switch_backend$.pipe(
                switchMap(() => this.backend.switch())
            ).subscribe(),
            this.get_config$.pipe(
                switchMap(() => this._api.configs()),
                map(({ port, mixed_port, redir_port, socks_port, mode, allow_lan, log_level }) => ({ port, mixed_port, redir_port, socks_port, mode, allow_lan, log_level })),
                tap(data => this.settings_form.setValue(data))
            ).subscribe(),
            this.settings_form.valueChanges.pipe(
                debounceTime(400),
                switchMap(config => this._api.update_config(config))
            ).subscribe(),
        ]
    }

    ngOnInit(): void {
        this.get_config$.next(null)
    }
}
