import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export class Post {
  id?: number;
  title?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) { }

  getPosts(i: number): Observable<any> {
    return this.http.get(this.url + '?_start=' + i * 3 + '&_end=' + (i * 3 + 3));
  }

  private paginationSubject = new Subject<any>();
  tableDataAction$ = this.paginationSubject.asObservable();
  paginationData(pageSize: number, currentPage: number) {
    this.http.get(this.url + '?_start=0&_end=3').subscribe(
      (resp) => this.paginationSubject.next(resp))
  }
}
