import { Component, OnDestroy, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { Subject, switchMap } from 'rxjs'
import { BackendService } from './services/backend.service'
import { ConfigsService } from './services/configs.service'
import { ConnectionsService } from './services/connections.service'

@Component({
    selector: 'cm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    title: any = 'clash-material'

    $switch_backend = new Subject()
    switch_backend_subscription = this.$switch_backend.pipe(
        switchMap(() => this.backend.switch()),
    ).subscribe()

    constructor(
        private dialog: MatDialog,
        private connections: ConnectionsService,
        public translate: TranslateService,
        public configs: ConfigsService,
        public backend: BackendService,
    ) {
        translate.setDefaultLang(configs.language)
    }

    ngOnInit() {
        this.connections.init()
    }

    ngOnDestroy() {
        this.switch_backend_subscription.unsubscribe()
    }
}
