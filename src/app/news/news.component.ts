import { Component, OnInit } from '@angular/core';
import {catchError, shareReplay, tap} from "rxjs/operators";
import {of} from "rxjs";
import {ContentfulService} from "../../services/contentful.service";
import {News} from "../../models/news.model";
import {isScullyGenerated, TransferStateService} from "@scullyio/ng-lib";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  api$ = this.contentfulService.getNews().pipe(
    catchError(() => of({} as News)),
    shareReplay(1)
  );

  news$ = isScullyGenerated() ? this.transferState.getState<News>('news')
    : this.api$.pipe(tap((news: News) =>
      {
        this.transferState.setState<News>('news', news ?? {});
      })
    );

  constructor(private contentfulService: ContentfulService, private transferState: TransferStateService) { }

  ngOnInit(): void {
  }

}
