import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Character } from '../models/character';
import { CharacterService } from '../services/character.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrls: ['./character-form.component.css']
})
export class CharacterFormComponent implements OnInit {
  characterForm: FormGroup;
  character: Character = new Character();
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private characterService: CharacterService) {
    this.characterForm = this.formBuilder.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {

      if (params.get('id')) {
        this.characterService.getCharacter(Number(params.get('id'))).subscribe(data => {
          this.characterForm.setValue(data.data);
          this.character = new Character(data.data);

        } );
      } else {
        this.character = new Character();
      };
  });

  }

  public add(character: Character){
    this.characterService.addCharacter(character).subscribe({
      next: (data) => {
        this.notification.success(
          'Success',
          'Record adde successfully',
        );

        console.log("Character component - add method");
        this.router.navigate(['/character-list']);

      },
      error:  err =>{
        this.notification.error(
          Error,
          err.message
        );
      }
    }
    );
  }

  submitForm(value:Character){
    this.characterService.addCharacter(value).subscribe(data =>{
      console.log("ADD : ", data);
    });
  }

  test(){
    const saveSuccessToastEle = document.getElementById('saveSuccessToast')
        const  saveSuccessToast = new Toast('saveSuccessToast');
        console.log(saveSuccessToastEle);
        saveSuccessToast.show();

  }

  get f(){return this.characterForm.controls;}
  get name() { return this.characterForm.get('name');}
}
