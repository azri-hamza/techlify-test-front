import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, retry, throwError, catchError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Character } from '../models/character';


@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  apiBaseUrl = environment.apiUrl;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept':'application/json'}), withCredentials: true};

  constructor(private http: HttpClient) { }

  public getCharacters(charcterName:string):Observable<any>{
    console.log("NAME VALUE : ",charcterName);
      let options = Object.assign(this.httpOptions,{params: {search: charcterName}});
      console.log("options", options);
      return this.http.get<any>(this.apiBaseUrl+'/characters', options).pipe(retry(1), catchError(this.handleError));

  }

  public getCharacter(id:number):Observable<any>{
    return this.http.get<Character>(this.apiBaseUrl+`/characters/${id}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  public addCharacter(character: Character):Observable<any>{
    return this.http.post<any>(this.apiBaseUrl+`/characters`,
        JSON.stringify(character),
        this.httpOptions
        ).pipe(retry(1), catchError(this.handleError));
  }

  public updateCharacter(character: Character):Observable<any>{
    return this.http.patch<any>(this.apiBaseUrl+`/characters/${character.id}`,
        JSON.stringify(character),
        this.httpOptions
        ).pipe(retry(1), catchError(this.handleError));
  }

  public deleteCharacter(character: Character) {
    return this.http
    .delete<any>(
      this.apiBaseUrl + `/characters/${character.id}`,
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.handleError));

  }
  // Error handling
  private handleError(error: any) {
    console.log("error : ", error.message);
    let errorMessage = '';
    if (error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.statusCode} \n ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      const error: any = new Error(errorMessage);
      error.timestamp = Date.now();
      return error;
    });
  }
}
