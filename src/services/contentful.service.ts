// ./src/app/contentful.service.ts
import {Injectable} from '@angular/core';
// import Contentful createClient and type for `Entry`
import {createClient, Entry, EntryCollection} from 'contentful';
import { from, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {CorporateInfo} from '../models/corporate-info.model';
import {News} from "../models/news.model";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

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
export class ContentfulService {
  protected cdaClient = createClient({
    space: CONFIG.space,
    accessToken: CONFIG.accessToken
  });

  constructor() {
  }

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
        return {
          title: (res as any).items[0].fields.title.toString(),
          description: flattenedContent.map((content: { value: any; }) => content.value)
        } as CorporateInfo
      })
    );
  }

  getNews(query?: object): Observable<News> {
    return from(
      this.cdaClient.getEntries<NewsItemResponse>({
        ...query,
        content_type: CONFIG.contentTypeIds.news
      })
    ).pipe(
      map((res: EntryCollection<NewsItemResponse>) => {

        return {
          items: res.items.map((item: Entry<NewsItemResponse>) => {
            return {
              title: item.fields.title.toString(),
              subTitle: item.fields.subtitle?.toString() || '',
              date: item.fields.date.substring(0, 10),
              content: documentToHtmlString(item.fields.message),
            };
          })
        } as News;
      })
    );
  }
}

interface NewsItemResponse {
      title: String,
      date: String,
      subtitle?: String,
      message: any,
      image: unknown // TODO
}

