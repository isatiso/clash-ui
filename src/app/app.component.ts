import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { BackendComponent } from './components/backend/backend.component'
import { BackendService } from './services/backend.service'
import { ConfigsService } from './services/configs.service'
import { ConnectionsService } from './services/connections.service'

@Component({
    selector: 'cm-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title: any = 'clash-material'

    constructor(
        public dialog: MatDialog,
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

    toggle_theme() {
        if (this.configs.theme === 'light') {
            this.configs.theme = 'dark'
        } else {
            this.configs.theme = 'light'
        }
    }

    change_backend() {
        return this.dialog.open(BackendComponent).afterClosed()
            .subscribe()
    }
}
