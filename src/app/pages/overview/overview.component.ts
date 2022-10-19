import { DOCUMENT, isPlatformBrowser } from '@angular/common'
import { AfterViewInit, Component, Inject, PLATFORM_ID } from '@angular/core'
import { Chart, registerables } from 'chart.js'
import { tap } from 'rxjs'
import { AutoUnsubscribe } from '../../lib/auto-unsubscribe'
import { chart_styles, common_chart_options, common_dataset_props } from '../../lib/chart-lib'
import { seconds_to_str } from '../../lib/seconds-to-str'
import { ConfigsService } from '../../services/configs.service'
import { ConnectionsService } from '../../services/connections.service'
import { TrafficService } from '../../services/traffic.service'

Chart.register(...registerables)

@Component({
    selector: 'cm-overview',
    templateUrl: './overview.component.html',
    styleUrls: ['./overview.component.scss']
})
export class OverviewComponent extends AutoUnsubscribe implements AfterViewInit {

    public table: 'active' | 'closed' = 'active'
    private chart_ctx?: CanvasRenderingContext2D
    private chart?: Chart

    constructor(
        public configs: ConfigsService,
        public traffic: TrafficService,
        public connections: ConnectionsService,
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platform_id: any,
    ) {
        super()
        this.subscription = [
            this.traffic.$update.pipe(
                tap(() => this.chart?.update()),
            ).subscribe()
        ]
    }

    seconds_to_str(seconds: number) {
        return seconds_to_str(seconds)
    }

    ngAfterViewInit(): void {
        if (!isPlatformBrowser(this.platform_id)) {
            return
        }
        const canvas = this.document.getElementById('traffic-chart')! as HTMLCanvasElement
        this.chart_ctx = canvas.getContext('2d')!
        const traffic = this.traffic
        const configs = this.configs
        this.chart = new Chart(this.chart_ctx!, {
            type: 'line' as const,
            data: {
                labels: traffic.labels,
                datasets: [
                    {
                        ...common_dataset_props,
                        ...chart_styles[configs.chart_style].up,
                        label: 'Up',
                        data: traffic.up_arr,
                    },
                    {
                        ...common_dataset_props,
                        ...chart_styles[configs.chart_style].down,
                        label: 'Down',
                        data: traffic.down_arr,
                    },
                ],
            },
            options: { ...common_chart_options }
        })
    }

    override ngOnDestroy() {
        super.ngOnDestroy()
        this.chart?.destroy()
    }
}
