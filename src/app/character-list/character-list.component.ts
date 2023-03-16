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
  searchName: string = '';


  constructor(private characterService: CharacterService, public router: Router, private modal: NzModalService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    console.log("Search name value ", this.searchName);
    if(this.searchName){
      this.characterService.getCharacters(this.searchName).subscribe(data => {
        console.log(data);
        this.characters = data.data;

      });
    }else{
      this.characterService.getCharacters('').subscribe(data => {
        console.log(data);
        this.characters = data.data;
      });
    }
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

  addNew(){
    this.router.navigate(['/admin/characters/0']);
  }

  setSearchValue(event:any){
    console.log("NEW imput value ", event.target.value);
    this.searchName=event.target.value;
  }
}
