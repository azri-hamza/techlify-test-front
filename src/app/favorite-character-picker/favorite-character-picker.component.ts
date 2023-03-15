import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Character } from '../models/character';
import { Vote } from '../models/vote';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-favorite-character-picker',
  templateUrl: './favorite-character-picker.component.html',
  styleUrls: ['./favorite-character-picker.component.css']
})
export class FavoriteCharacterPickerComponent implements OnInit {


@Component({
  selector: 'app-favorite-character-picker',
  templateUrl: './favorite-character-picker.component.html',
  styleUrls: ['./favorite-character-picker.component.css']
})

  characters : Character[]=[];
  constructor(private voteService: VoteService, private router: Router, private  notification : NzNotificationService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.voteService.getCharacters().subscribe(data => {
      console.log(data);
      this.characters = data.data;

    });
  }

  public vote(character: Character){
    console.log("VOTE", character);
    this.voteService.addVote(new Vote({id:0, character_id: character.id})).subscribe({
      next: (data)=> {
        this.notification.success(
          'Vote done successfully',
          `You voted for <b>${character.name}</b>.`,
        );
        this.router.navigate(['/thank-you']);
      },
      error: (err) =>{

      }
    });
  }


}

