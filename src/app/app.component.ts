import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../services/contentful.service';
import { Entry } from 'contentful';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  api$ = this.contentfulService.getBanner().pipe(
    catchError(() => of('')),
    shareReplay(1)
  );

  title$ = isScullyGenerated() ? this.transferState.getState<string>('banner')
    : this.api$.pipe(tap((title: string) =>
    {
      this.transferState.setState<string>('banner', title ?? '');
    })
    );

  constructor(private contentfulService: ContentfulService, private transferState: TransferStateService) {
  }
}
