import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { FavoriteCharacterPickerComponent } from './favorite-character-picker/favorite-character-picker.component';
import { CharacterFormComponent } from './character-form/character-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { VotesHeatmapComponent } from './votes-heatmap/votes-heatmap.component';
import { HeatMapModule, Legend, Tooltip, LegendService, TooltipService  } from '@syncfusion/ej2-angular-heatmap';

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    FavoriteCharacterPickerComponent,
    CharacterListComponent,
    CharacterFormComponent,
    LoginComponent,
    AdminHomeComponent,
    ThankYouComponent,
    VotesHeatmapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN'
    }),
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    HeatMapModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {provide : NzModalService},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    LegendService,
    TooltipService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
