import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { Subject, switchMap } from 'rxjs'
import { AutoUnsubscribe } from './lib/auto-unsubscribe'
import { BackendService } from './services/backend.service'
import { ConfigsService } from './services/configs.service'
import { ConnectionsService } from './services/connections.service'

@Component({
    selector: 'cm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends AutoUnsubscribe implements OnInit, OnDestroy {

    title: any = 'clash-material'

    $switch_backend = new Subject()

    constructor(
        private dialog: MatDialog,
        private connections: ConnectionsService,
        public translate: TranslateService,
        public configs: ConfigsService,
        public backend: BackendService,
    ) {
        super()
        this.subscription = [
            this.$switch_backend.pipe(
                switchMap(() => this.backend.switch()),
            ).subscribe()
        ]
        translate.setDefaultLang(configs.language)
    }

    ngOnInit() {
        this.connections.init()
    }
}
