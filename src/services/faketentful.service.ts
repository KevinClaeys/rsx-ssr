// ./src/app/contentful.service.ts
import {Injectable} from '@angular/core';
// import Contentful createClient and type for `Entry`
import {createClient, Entry, EntryCollection} from 'contentful';
import { from, Observable, of } from 'rxjs';
import {map} from 'rxjs/operators';
import {CorporateInfo} from '../models/corporate-info.model';
import {News} from "../models/news.model";
import { ContentfulService } from './contentful.service';

// configure the service with tokens and content type ids
// SET YOU OWN CONFIG here
const CONFIG = {
  space: 'u962r8i34sue',
  accessToken: 'eRuvWzVNoxiJzUSaudErIjzqS9IkwqMyxXJ-8cxbGdU',

  contentTypeIds: {
    banner: 'banner',
    corporateInfo: 'corporateInfo',
    news: 'news'
  }
};

@Injectable()
export class FaketentfulService extends ContentfulService{
  constructor() {
    super();
  }

  override getBanner(query?: object): Observable<string> {
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

  override getCorporateInfo(query?: object): Observable<CorporateInfo> {
    return of({} as CorporateInfo);
  }

  override getNews(query?: object): Observable<News> {
    return of({ items: [] } as News);
  }
}

interface NewsItemResponse {
  title: String,
  date: String,
  subtitle?: String,
  message: any,
  image: unknown // TODO
}

