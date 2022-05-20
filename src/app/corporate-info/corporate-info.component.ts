import { Component, OnInit } from '@angular/core';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { isScullyGenerated, TransferStateService } from '@scullyio/ng-lib';
import { ContentfulService } from '../../services/contentful.service';
import { CorporateInfo } from '../../models/corporate-info.model';

@Component({
  selector: 'app-corporate-info',
  templateUrl: './corporate-info.component.html',
  styleUrls: ['./corporate-info.component.scss']
})
export class CorporateInfoComponent {
  api$ = this.contentfulService.getCorporateInfo().pipe(
    catchError(() => of({} as CorporateInfo)),
    shareReplay(1)
  );

  corporateInfo$ = isScullyGenerated() ? this.transferState.getState<CorporateInfo>('corporate-info')
    : this.api$.pipe(tap((corporateInfo: CorporateInfo) =>
      {
        this.transferState.setState<CorporateInfo>('corporate-info', corporateInfo ?? {});
      })
    );

  constructor(private contentfulService: ContentfulService, private transferState: TransferStateService) {
  }
}
