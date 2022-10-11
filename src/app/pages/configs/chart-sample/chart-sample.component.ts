import { AfterViewInit, Component, Input, OnDestroy } from '@angular/core'
import { Chart } from 'chart.js'
import { chart_styles, common_chart_options, common_dataset_props } from '../../../lib/chart-lib'
import { ConfigsService } from '../../../services/configs.service'

@Component({
    selector: 'cm-chart-sample',
    templateUrl: './chart-sample.component.html',
    styleUrls: ['./chart-sample.component.scss'],
})
export class ChartSampleComponent implements AfterViewInit, OnDestroy {

    @Input() id = 0
    private chart_ctx?: CanvasRenderingContext2D
    private chart?: Chart

    constructor(
        public configs: ConfigsService
    ) {
    }

    ngAfterViewInit(): void {
        const canvas = document.getElementById('chart-' + this.id)! as HTMLCanvasElement
        this.chart_ctx = canvas.getContext('2d')!
        this.chart = new Chart(this.chart_ctx!, {
            type: 'line' as const,
            data: {
                labels: [23e3, 35e3, 46e3, 33e3, 90e3, 68e3, 23e3, 45e3],
                datasets: [
                    {
                        ...common_dataset_props,
                        ...chart_styles[this.id].up,
                        data: [23e3, 35e3, 46e3, 33e3, 90e3, 68e3, 23e3, 45e3],
                    },
                    {
                        ...common_dataset_props,
                        ...chart_styles[this.id].down,
                        data: [184e3, 183e3, 196e3, 182e3, 190e3, 186e3, 182e3, 189e3],
                    },
                ],
            },
            options: {
                ...common_chart_options,
                plugins: {
                    legend: { display: false },
                },
                scales: {
                    x: { display: false, type: 'category' },
                    y: { display: false, type: 'linear' },
                },
            }
        })
    }

    ngOnDestroy() {
        this.chart?.destroy()
    }
}
