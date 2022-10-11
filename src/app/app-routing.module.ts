import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ConfigsComponent } from './pages/configs/configs.component'
import { ConnectionsComponent } from './pages/connections/connections.component'
import { LogsComponent } from './pages/logs/logs.component'
import { OverviewComponent } from './pages/overview/overview.component'
import { ProxiesComponent } from './pages/proxies/proxies.component'
import { RulesComponent } from './pages/rules/rules.component'

const routes: Routes = [
    { path: 'overview', component: OverviewComponent },
    { path: 'proxies', component: ProxiesComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'connections', component: ConnectionsComponent },
    { path: 'configs', component: ConfigsComponent },
    { path: 'logs', component: LogsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'overview' },
    { path: '**', redirectTo: '' },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
