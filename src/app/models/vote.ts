import { VoteShape } from "../interfaces/VoteShape";

export class Vote implements VoteShape{
  id: number;
  character_id: number;

  constructor(obj?: VoteShape){
    this.id=obj && obj.id || 0;
    this.character_id =obj && obj.character_id || 0;
  }
}
