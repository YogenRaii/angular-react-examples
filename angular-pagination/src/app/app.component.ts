import { Component, OnInit, ViewChild, AfterViewInit, Injectable } from '@angular/core';
import { PostService, Post } from './post.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, merge, of } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';


import {MatPaginatorIntl} from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-pagination';

  dataSource: Post[] = [];
  resultsLength = 0;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private postService: PostService) { }

  nextPage = false;
  length = 0;
  finalized = false;

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;

    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          // this.isLoadingResults = true;
          console.log(this.paginator.pageIndex);
          return this.postService.getPosts(this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          // this.isLoadingResults = false;
          // this.isRateLimitReached = false;
          if (!this.finalized) {
            if (data.length < 3) {
              this.resultsLength += data.length;
              this.finalized = true;
            } else {
              this.resultsLength = Math.max(this.resultsLength, (this.paginator.pageIndex + 1) * 3 + 1);
            }
          }
          
          console.log(data);
          return data;
        }),
        catchError(() => {
          // this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          // this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => this.dataSource = data);
  }

  displayedColumns: string[] = ['id', 'title', 'author'];
}

@Injectable({providedIn: 'root'})
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items par page';
  nextPageLabel     = 'Page Prochaine';
  previousPageLabel = 'Page Précedente';

  getRangeLabel = function(page: number, pageSize: number, length: number) {
    if (length === 0) return '';
    console.log(page + " " + pageSize + " " + length);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return (startIndex + 1) + ' - ' + endIndex + ' of ' + (startIndex + pageSize < length ? 'many' : length);
  };
}