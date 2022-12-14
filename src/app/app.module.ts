import { ScrollingModule } from '@angular/cdk/scrolling'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatChipsModule } from '@angular/material/chips'
import { MatRippleModule } from '@angular/material/core'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BackendComponent } from './components/backend/backend.component'
import { BodyComponent } from './components/body/body.component'
import { FilterComponent } from './components/filter/filter.component'
import { FloatActionComponent } from './components/float-action/float-action.component'
import { HeaderComponent } from './components/header/header.component'
import { WarningComponent } from './components/warning/warning.component'
import { SecretInterceptor } from './interceptors/secret-interceptor'
import { TranslateBrowserLoader } from './loaders/translate-browser.loader'
import { ChartSampleComponent } from './pages/configs/chart-sample/chart-sample.component'
import { ConfigsComponent } from './pages/configs/configs.component'
import { LogsComponent } from './pages/logs/logs.component'
import { OverviewComponent } from './pages/overview/overview.component'
import { TrafficCardComponent } from './pages/overview/traffic-card/traffic-card.component'
import { ProxiesComponent } from './pages/proxies/proxies.component'
import { ProxyGroupComponent } from './pages/proxies/proxy-group/proxy-group.component'
import { RulesComponent } from './pages/rules/rules.component'

@NgModule({
    declarations: [
        AppComponent,
        BackendComponent,
        BodyComponent,
        ChartSampleComponent,
        ConfigsComponent,
        FilterComponent,
        HeaderComponent,
        LogsComponent,
        OverviewComponent,
        ProxiesComponent,
        ProxyGroupComponent,
        RulesComponent,
        TrafficCardComponent,
        FloatActionComponent,
        WarningComponent,
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSnackBarModule,
        MatTableModule,
        MatToolbarModule,
        ReactiveFormsModule,
        ScrollingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateBrowserLoader
            }
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: SecretInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
