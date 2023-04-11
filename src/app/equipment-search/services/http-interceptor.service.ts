import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
//import { LoaderService } from './endpoints.service';
import { LoaderService } from '../services/loader.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor{

  private totalRequests = 0;

  constructor(private loadingService: LoaderService) {}  

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'x-api-key': environment.apiKey
      }      
    });

    this.totalRequests++;
    this.loadingService.setLoading(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );    
  }  
}
