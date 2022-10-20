import { Component, OnInit } from '@angular/core'
import { ProxiesService } from '../../services/proxies.service'

@Component({
    selector: 'cm-proxies',
    templateUrl: './proxies.component.html',
    styleUrls: ['./proxies.component.scss']
})
export class ProxiesComponent implements OnInit {

    constructor(
        public proxies: ProxiesService,
    ) {
    }

    ngOnInit(): void {
        this.proxies.request$.next(null)
    }
}
