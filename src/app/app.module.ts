import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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


@NgModule({
  declarations: [
    AppComponent,
    FavoriteCharacterPickerComponent,
    CharacterListComponent,
    CharacterFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NzNotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
