import { Component, OnInit } from '@angular/core';
import {catchError, shareReplay} from "rxjs/operators";
import { of } from 'rxjs';
import {ContentfulService} from "../../services/contentful.service";
import {News} from "../../models/news.model";
import { TransferStateService} from "@scullyio/ng-lib";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  news$ = this.transferState.useScullyTransferState<News>('news', this.contentfulService.getNews())

  constructor(private contentfulService: ContentfulService, private transferState: TransferStateService) { }
}
