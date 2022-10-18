import { Component, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { debounceTime, Subject, switchMap } from 'rxjs'
import { ApiService, Config } from '../../services/api.service'
import { BackendService } from '../../services/backend.service'
import { ConfigsService } from '../../services/configs.service'

@Component({
    selector: 'cm-configs',
    templateUrl: './configs.component.html',
    styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

    $get_config = new Subject()
    get_config_subscription = this.$get_config.pipe(
        switchMap(() => this._api.configs())
    ).subscribe(res => {
        const { port, mixed_port, redir_port, socks_port, mode, allow_lan, log_level } = res
        this.settings_form.setValue({ port, mixed_port, redir_port, socks_port, mode, allow_lan, log_level })
    })

    $switch_backend = new Subject()
    switch_backend_subscription = this.$switch_backend.pipe(
        switchMap(() => this.backend.switch()),
    ).subscribe()

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

    settings_subscription = this.settings_form.valueChanges.pipe(
        debounceTime(400),
        switchMap(config => this._api.update_config(config))
    ).subscribe()

    constructor(
        private _api: ApiService,
        private _dialog: MatDialog,
        private _fb: FormBuilder,
        public backend: BackendService,
        public configs: ConfigsService,
        public translate: TranslateService,
    ) {

    }

    ngOnInit(): void {
        this.$get_config.next(null)
    }

    ngOnDestroy() {
        this.get_config_subscription.unsubscribe()
        this.settings_subscription.unsubscribe()
        this.switch_backend_subscription.unsubscribe()
    }
}
