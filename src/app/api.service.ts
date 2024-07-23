import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor() { }

    private popUrl = 'https://api.worldbank.org/v2/country/'
    private baseUrl = 'https://api.worldbank.org/v2';
    http = inject(HttpClient)
   

    getCountryData(countryCode: string): Observable<any> {
      const url = `${this.baseUrl}/country/${countryCode}?format=json`;
   
      return this.http.get<any>(url);
    }
    getPopData(countryCode: string): Observable<any> {
      
      const pop = `${this.popUrl}/${countryCode}/indicator/SP.POP.TOTL?format=json`
      console.log(pop) 
      return this.http.get<any>(pop);
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
