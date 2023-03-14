import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css']
})
export class CharacterListComponent implements OnInit {

  characters : Character[]=[];
  confirmModal?: NzModalRef;

  constructor(private characterService: CharacterService, public router: Router, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.characterService.getCharacters().subscribe(data => {
      console.log(data);
      this.characters = data.data;

    });
  }

  delete(character: Character){
    this.characterService.deleteCharacter(character).subscribe(data => {
      //Refres data
      this.getData();
    });
  }

  showDeleteConfirm(character: Character): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Attention',
      nzContent: 'Do you Want to delete this character?',
      nzOnOk: () => this.delete(character)
    });

    // this.confirmModal.triggerOk
  }
}
