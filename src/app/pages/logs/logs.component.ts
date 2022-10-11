import { Component, OnInit } from '@angular/core'
import { LogType } from '../../services/api.service'
import { LogsService } from '../../services/logs.service'

@Component({
    selector: 'cm-logs',
    templateUrl: './logs.component.html',
    styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

    constructor(
        public logs: LogsService,
    ) {
    }

    ngOnInit(): void {
    }

    log_level_color(type: LogType['type']) {
        switch (type) {
            case 'debug':
                return '#28792c'
            case 'info':
                return ''
            case 'warning':
                return '#b99105'
            case 'error':
                return '#c11c1c'
            default:
                return ''
        }
    }
}
