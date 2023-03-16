import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public accessToken: string = '';
  apiBaseUrl = environment.apiUrl;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json', 'Accept':'application/json'}),
    withCredentials: true
  };
  constructor(private http: HttpClient) { }

  login(credentials: any){
    return this.http.post<any>(this.apiBaseUrl+`/login`,
        JSON.stringify(credentials),
        this.httpOptions
        ).pipe(retry(0), catchError(this.handleError));

  }

  getAccessToken(){
    return this.accessToken;
  }

  logout(){
    this.accessToken='';
  }

  isAuthenticated(){
    return this.accessToken ? true : false;
  }

  getCurrentUser(){
    return this.http.get(this.apiBaseUrl+`/user`,this.httpOptions).pipe(retry(0), catchError(this.handleError));
  }

  getCsrfToken(){
    return this.http.get('http://localhost/sanctum/csrf-cookie',this.httpOptions).pipe(retry(0), catchError(this.handleError));
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
