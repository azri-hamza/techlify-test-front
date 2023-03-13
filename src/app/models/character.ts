import { CharacterShape } from "../interfaces/CharacterShape";

export class Character implements CharacterShape{
  id: number;
  name: string;

  constructor(obj?: CharacterShape){
    this.id=obj && obj.id || 0;
    this.name =obj && obj.name || '';
  }
}
