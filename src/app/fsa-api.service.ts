import { RatingService } from './rating.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FsaApiService {
  public url = 'http://api.ratings.food.gov.uk/Establishments';
  public version = '2';

  constructor(private http: HttpClient, private ratingService: RatingService) { }

  public getScores(localAuthorityId, pageSize) {
    this.http.get(
      this.createRequestURL(localAuthorityId, pageSize),
      {headers: new HttpHeaders().set('x-api-version', this.version)}
    )
    .subscribe(response => {
      this.ratingService.saveScores(response);
    });
  }

  private createRequestURL(localAuthorityId, pageSize): string {
    return this.url + this.createQueryString(localAuthorityId, pageSize);
  }

  private createQueryString(localAuthorityId, pageSize): string {
    return `?localAuthorityId=${localAuthorityId}&pageSize=${pageSize}&pageNumber=1`;
  }
}
