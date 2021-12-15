import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({
  name: 'youtubeUrl'
})
export class YoutubeUrlPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(url :any ) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
