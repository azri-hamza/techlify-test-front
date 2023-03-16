import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Vote } from '../models/vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  apiBaseUrl = environment.apiUrl;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept':'application/json'}), withCredentials: true};

  constructor(private http: HttpClient) { }

  public addVote(vote: Vote):Observable<any>{
    return this.http.post<any>(this.apiBaseUrl+`/votes`,
        JSON.stringify(vote),
        this.httpOptions
        ).pipe(retry(1), catchError(this.handleError));
  }

  public getCharacters():Observable<any>{

    return this.http.get<any>(this.apiBaseUrl+'/votes/characters', this.httpOptions).pipe(retry(1), catchError(this.handleError));

  }
  public getAllVotes():Observable<any>{

    return this.http.get<any>(this.apiBaseUrl+'/votes/daily', this.httpOptions).pipe(retry(1), catchError(this.handleError));

  }

  public getCharacterVotes(id: number):Observable<any>{

    return this.http.get<any>(this.apiBaseUrl+`/votes/daily/${id}`, this.httpOptions).pipe(retry(1), catchError(this.handleError));

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
