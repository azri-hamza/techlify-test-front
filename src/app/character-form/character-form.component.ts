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
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private characterService: CharacterService, private notification : NzNotificationService) {
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
        console.log("ADD : ", data);
        this.notification.success(
          'Success',
          'Record added successfully',
        );

        console.log("Character component - add method");
        this.router.navigate(['/admin/characters']);

      },
      error:  err =>{
        console.log("Error add method - character form Component", err);
        this.notification.error(
          'Error',
          err.message
        );
      }
    }
    );
  }

  public update(character: Character){
    this.characterService.updateCharacter(character).subscribe({
      next: (data) => {
        console.log("UPDATE : ", data);
        this.notification.success(
          'Success',
          'Record updated successfully',
        );

        console.log("Character component - add method");
        this.router.navigate(['/admin/characters']);

      },
      error:  err =>{
        console.log("Error update method - character form Component", err);
        this.notification.error(
          'Error',
          err.message
        );
      }
    }
    );
  }

  submitForm(value:Character){
    if(value.id){
      console.log("UPDATE CASE");
      this.update(value);
    }else{
      console.log("ADD CASE");
      this.add(value)
    }

  }


  get f(){return this.characterForm.controls;}
  get name() { return this.characterForm.get('name');}
}
