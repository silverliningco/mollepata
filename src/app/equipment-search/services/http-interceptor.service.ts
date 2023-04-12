import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

/* HttpInterceptorService class implements the HttpInterceptor interface to intercept all HTTP requests
and add headers to them before sending them to the server. It also uses the LoaderService to display
a loading indicator during HTTP requests.*/
export class HttpInterceptorService implements HttpInterceptor{

  private totalRequests = 0;

  constructor(private loadingService: LoaderService) {}  

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    // Add custom headers to the HTTP request.
    request = request.clone({
      setHeaders: {
        'x-api-key': environment.apiKey
      }
    });

    // Increment the total number of requests and show the loading indicator.
    this.totalRequests++;
    this.loadingService.setLoading(true);

    // Handle the HTTP request and listen for the response event stream.
    return next.handle(request).pipe(
      // Once the response event stream is complete, decrement the total requests counter
      // and hide the loading indicator if no more requests are in progress.
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
