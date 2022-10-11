import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
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
        private connections: ConnectionsService,
        public translate: TranslateService,
        public configs: ConfigsService,
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
}
