import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { Subject, switchMap } from 'rxjs'
import { ApiService } from '../../services/api.service'
import { ConfigsService } from '../../services/configs.service'

@Component({
    selector: 'cm-configs',
    templateUrl: './configs.component.html',
    styleUrls: ['./configs.component.scss']
})
export class ConfigsComponent implements OnInit {

    http_proxy_port = ''
    socks5_proxy_port = ''
    redir_proxy_port = ''
    mixed_proxy_port = ''
    mode = ''
    log_level = ''
    allow_lan = false

    speed_url = 'http://www.gstatic.com/generate_204'
    language = 'en'

    res: any
    get_config = new Subject()
    get_config_subscription = this.get_config.pipe(
        switchMap(() => this.api.configs())
    ).subscribe(res => {
        this.res = res
        this.http_proxy_port = res.port + ''
        this.socks5_proxy_port = res['socks-port'] + ''
        this.redir_proxy_port = res['redir-port'] + ''
        this.mixed_proxy_port = res['mixed-port'] + ''
        this.mode = res.mode
        this.log_level = res['log-level']
        this.allow_lan = res['allow-lan']
    })

    constructor(
        private api: ApiService,
        public configs: ConfigsService,
        public translate: TranslateService,
    ) {
    }

    ngOnInit(): void {
        this.get_config.next(null)
    }

    ngOnDestroy() {
        this.get_config_subscription.unsubscribe()
    }
}
