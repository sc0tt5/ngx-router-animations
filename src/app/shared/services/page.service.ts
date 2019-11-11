import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from '@core/models/page';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private http: HttpClient) {}

  getPage(param: string): Observable<Page> {
    // for demo put json in assets folder (you would not do this in a real world app)
    const api = 'http://localhost:4200/assets/demo.json';

    return this.http.get<Page[]>(api).pipe(
      map(pages => pages.find(page => page.param === param)),
      catchError((error: any) => of(error))
    );
  }
}
