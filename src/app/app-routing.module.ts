import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';
import { CharacterFormComponent } from './character-form/character-form.component';
import { CharacterListComponent } from './character-list/character-list.component';
import { FavoriteCharacterPickerComponent } from './favorite-character-picker/favorite-character-picker.component';
import { LoginComponent } from './login/login.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { VotesHeatmapComponent } from './votes-heatmap/votes-heatmap.component';

const routes: Routes = [
  { path: '', component: FavoriteCharacterPickerComponent },
  { path: 'thank-you', component: ThankYouComponent },
  {
    path: 'admin', component: AdminHomeComponent,
    children: [

      { path: 'characters', component: CharacterListComponent, canActivate: [AuthGuard] },
      // { path: 'characters/:id', component: CharacterFormComponent },
      { path: 'characters/:id', component: CharacterFormComponent, canActivate: [AuthGuard] },
      { path: 'popularity-report', component: VotesHeatmapComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
