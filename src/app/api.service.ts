import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor() { }

    private apiUrl = "https://jsonplaceholder.typicode.com/todos/1"
    http = inject(HttpClient)
    
    
    getPosts(){
       
     return this.http.get<any>(this.apiUrl).pipe(catchError(this.handleError));
     
    }

    private handleError(error:any){
      console.log(error);
      return error;
    }


  // Example method to GET data from the API
//   getData(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/data`);
//   }
  
}
