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
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept':'application/json'})};

  constructor(private http: HttpClient) { }

  public getCharacters():Observable<any>{

      return this.http.get<any>(this.apiBaseUrl+'/characters').pipe(retry(1), catchError(this.handleError));

  }

  public getCharacter(id:number):Observable<any>{
    return this.http.get<Character>(this.apiBaseUrl+`/characters/${id}`).pipe(retry(1), catchError(this.handleError));
  }

  public addCharacter(character: Character):Observable<any>{
    return this.http.post<any>(this.apiBaseUrl+`/characters`,
        JSON.stringify(character),
        this.httpOptions
        ).pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    console.log("error : ", error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.statusCode} \n ${error.error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => {
      const error: any = new Error(errorMessage);
      //error.timestamp = Date.now();
      return error;
    });
  }
}
