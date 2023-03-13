import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';

@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

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
