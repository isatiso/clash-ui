import { NgModule } from '@angular/core'
import { TransferState } from '@angular/platform-browser'
import { ServerModule } from '@angular/platform-server'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

import { AppModule } from './app.module'
import { AppComponent } from './app.component'
import { translateServerLoaderFactory } from './loaders/translate-server.loader'

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: translateServerLoaderFactory,
                deps: [TransferState]
            }
        })
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
