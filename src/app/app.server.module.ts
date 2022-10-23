import { NgModule } from '@angular/core'
import { ServerModule } from '@angular/platform-server'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { AppComponent } from './app.component'

import { AppModule } from './app.module'
import { TranslateServerLoader } from './loaders/translate-server.loader'

@NgModule({
    imports: [
        AppModule,
        ServerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateServerLoader
            }
        })
    ],
    bootstrap: [AppComponent],
})
export class AppServerModule {
}
