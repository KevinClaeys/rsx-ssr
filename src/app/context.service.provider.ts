import { environment } from '../environments/environment';
import { ContentfulService } from '../services/contentful.service';
import { FaketentfulService } from '../services/faketentful.service';

const contentfulServiceFactor = () => {
  new FaketentfulService();
  // if(environment.isScullyEnabled) {
  //   console.log('real');
  //   return new ContentfulService();
  // } else {
  //   console.log('fake');
  //   return new FaketentfulService();
  // }
}

export const contentfulServiceProvider =
  { provide: ContentfulService,
    useFactory: contentfulServiceFactor
  };

