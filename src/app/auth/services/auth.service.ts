import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Api } from 'src/global/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api= new Api().backendLink;
  url= 'users/auth'
  urlEmployee= 'employees'
  urlClient= 'clients'

  constructor(private http: HttpClient) { }

  httpOptions:any = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    observe: 'response'
  }

  handleError(error: HttpErrorResponse) {
    if(error.error instanceof ErrorEvent) {
      console.log(`Ann error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError( ()  => new Error('Something happened with request, please try again later'));
  }

  login(object: any){
    return this.http.post(this.api+this.url+'/sign-in',object,this.httpOptions)
    .pipe(
      retry(2), catchError(this.handleError)
    );
  }

  register(object: any){
    return this.http.post(this.api+this.url+'/sign-up',object,this.httpOptions)
    .pipe(
      retry(2), catchError(this.handleError)
    );
  }

  createClient(item: object,id: any):Observable<object> {
    return this.http.post(this.api+this.urlClient+'/'+id, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError),
      )
  }

  createEmployee(item: object,userId: any,serviceId: any):Observable<object> {
    return this.http.post(this.api+this.urlEmployee+'/'+userId+'/'+serviceId, item, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
}
