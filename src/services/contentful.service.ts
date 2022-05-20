// ./src/app/contentful.service.ts
import { Injectable } from '@angular/core';
// import Contentful createClient and type for `Entry`
import { createClient, Entry } from 'contentful';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CorporateInfo } from '../models/corporate-info.model';

// configure the service with tokens and content type ids
// SET YOU OWN CONFIG here
const CONFIG = {
  space: 'u962r8i34sue',
  accessToken: 'eRuvWzVNoxiJzUSaudErIjzqS9IkwqMyxXJ-8cxbGdU',

  contentTypeIds: {
    banner: 'banner',
    corporateInfo: 'corporateInfo'
  }
};

@Injectable()
export class ContentfulService {
  private cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() {}

  getBanner(query?: object): Observable<string> {
    return from(
      this.cdaClient.getEntries({
        ...query,
        content_type: CONFIG.contentTypeIds.banner
      })
    ).pipe(
      map(res => {
        // @ts-ignore
        return res.items[0].fields.title.toString()
      })
    );
  }

  getCorporateInfo(query?: object): Observable<CorporateInfo> {
    return from(
      this.cdaClient.getEntries({
        ...query,
        content_type: CONFIG.contentTypeIds.corporateInfo
      })
    ).pipe(
      map(res => {
        // @ts-ignore
        const flattenedContent = res.items[0].fields.description.content.flatMap((x) => x.content);
        // @ts-ignore
        return { title: res.items[0].fields.title.toString(), description: flattenedContent.map((content) => content.value) } as CorporateInfo
      })
    );
  }
}
