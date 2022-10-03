import { Component, OnInit } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransferStateService } from '@scullyio/ng-lib';
import { ContentfulService } from '../../services/contentful.service';
import { CorporateInfo } from '../../models/corporate-info.model';

@Component({
  selector: 'app-corporate-info',
  templateUrl: './corporate-info.component.html',
  styleUrls: ['./corporate-info.component.scss']
})
export class CorporateInfoComponent {
  corporateInfo$ = this.contentfulService.getCorporateInfo().pipe(catchError(() => of({} as CorporateInfo)));
  // corporateInfo$ = this.transferState.useScullyTransferState<News>('corporateInfo', this.contentfulService.getNews())

  constructor(private contentfulService: ContentfulService, private transferState: TransferStateService) {}
}
