import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'app-favorite-character-picker',
  templateUrl: './favorite-character-picker.component.html',
  styleUrls: ['./favorite-character-picker.component.css']
})
export class FavoriteCharacterPickerComponent implements OnInit {

  characters : Character[]=[];
  constructor(private characterService: CharacterService, public router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.characterService.getCharacters().subscribe(data => {
      console.log(data);
      this.characters = data.data;

    });
  }


}
