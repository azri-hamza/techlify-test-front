import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { FavoriteCharacterPickerComponent } from './favorite-character-picker/favorite-character-picker.component';

const routes: Routes = [
  {path: 'favorite-character', component: FavoriteCharacterPickerComponent},
  {path: 'characters-list', component: CharacterListComponent},
  {path: 'characters-list/:id', component: CharacterFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
