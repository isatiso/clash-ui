import { ScrollingModule } from '@angular/cdk/scrolling'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatChipsModule } from '@angular/material/chips'
import { MatRippleModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatTableModule } from '@angular/material/table'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ConfigsComponent } from './pages/configs/configs.component'
import { ConnectionsComponent } from './pages/connections/connections.component'
import { LogsComponent } from './pages/logs/logs.component'
import { OverviewComponent } from './pages/overview/overview.component'
import { TrafficCardComponent } from './pages/overview/traffic-card/traffic-card.component'
import { ProxiesComponent } from './pages/proxies/proxies.component'
import { ProxyGroupComponent } from './pages/proxies/proxy-group/proxy-group.component'
import { RulesComponent } from './pages/rules/rules.component'
import { ChartSampleComponent } from './pages/configs/chart-sample/chart-sample.component'
import { MatMenuModule } from '@angular/material/menu'
import { FilterComponent } from './components/filter/filter.component'
import { MatToolbarModule } from '@angular/material/toolbar'
import { HeaderComponent } from './components/header/header.component'
import { BodyComponent } from './components/body/body.component';
import { BackendComponent } from './components/backend/backend.component'

@NgModule({
    declarations: [
        AppComponent,
        BackendComponent,
        BodyComponent,
        ChartSampleComponent,
        ConfigsComponent,
        ConnectionsComponent,
        FilterComponent,
        HeaderComponent,
        LogsComponent,
        OverviewComponent,
        ProxiesComponent,
        ProxyGroupComponent,
        RulesComponent,
        TrafficCardComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatListModule,
        MatRippleModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        ScrollingModule,
        MatTableModule,
        MatButtonToggleModule,
        FormsModule,
        MatSlideToggleModule,
        MatChipsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
                deps: [HttpClient]
            }
        }),
        MatMenuModule,
        MatToolbarModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
