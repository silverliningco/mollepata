import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(
      private http: HttpClient
    ) { }
/*
   Filters(body: any): Observable<any> {

      let url = environment.apiURL + '/filters'; 
  
      return this.http.post(url, body);
    }
*/
   ElegibilityCriteria(body: any): Observable<any> {

      let url = environment.apiURL + '/eligibility-criteria' 

      return this.http.post(url, body);
    }

    Search(body: any): Observable<any> {

      let url = environment.apiURL + '/search-hvac-systems'; 

      return this.http.post(url, body);
    }

    //Function to load utility providers by state
    Utilities(state: any){

      let url = environment.apiURL + '/utility-providers?country=US&state='+ state;

      return this.http.get(url);
      
    }

}
