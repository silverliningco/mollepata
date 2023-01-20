import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// url endpoint
import {URL_SERVICIOS}  from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EndpointsService {

  constructor(
      private http: HttpClient
    ) { }

    // provicional
    Rebate(body: any): Observable<any> {

      let url = URL_SERVICIOS; 
  
      return this.http.post(url, body);
    }

    ProductLines(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/product-lines'; 
  
      return this.http.post(url, body);
    }

    Filters(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/filters'; 
  
      return this.http.post(url, body);
    }

    AvailableRebates(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/available-rebates'; 
  
      return this.http.post(url, body);
    }

    ElegibilityCriteria(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/eligibility-criteria' 

      return this.http.post(url, body);
    }

    Search(body: any): Observable<any> {

      let url = URL_SERVICIOS + '/search-equipment'; 

      return this.http.post(url, body);
    }

    //Function to load utility providers by state
    Utilities(state: any){

      let url = URL_SERVICIOS + '/utility-providers?country=US&state='+ state;

      return this.http.get(url);
      
    }

    ModelNrs(body: any){
      let url = URL_SERVICIOS + '/model-nrs'; 

      return this.http.post(url, body);
    }

}