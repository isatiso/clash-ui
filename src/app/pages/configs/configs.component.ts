import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
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

    speed_url = 'http://www.gstatic.com/generate_204'
    language = 'en'

    res: any
    get_config = new Subject()
    settings_form = this.fb.group({
        'port': [0, Validators.pattern(/^\d+$/)],
        'socks_port': [0, Validators.pattern(/^\d+$/)],
        'redir_port': [0, Validators.pattern(/^\d+$/)],
        // 'tproxy_port': [0, Validators.pattern(/^\d+$/)],
        'mixed_port': [0, Validators.pattern(/^\d+$/)],
        'allow_lan': [false],
        'mode': [''],
        'log_level': [''],
        // 'ipv6': [false],
    })
    get_config_subscription = this.get_config.pipe(
        switchMap(() => this.api.configs())
    ).subscribe(res => {
        const { port, mixed_port, redir_port, socks_port, mode, allow_lan, log_level } = res
        this.settings_form.setValue({ port, mixed_port, redir_port, socks_port, mode, allow_lan, log_level })
    })

    constructor(
        private api: ApiService,
        public configs: ConfigsService,
        public translate: TranslateService,
        private fb: FormBuilder,
    ) {
        this.settings_form.valueChanges.subscribe(value => console.log(value))
    }

    ngOnInit(): void {
        this.get_config.next(null)
    }

    ngOnDestroy() {
        this.get_config_subscription.unsubscribe()
    }
}
