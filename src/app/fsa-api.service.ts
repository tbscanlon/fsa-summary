import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { StoreService } from './store.service';
import { RatingService } from './rating.service';

@Injectable()
export class FsaApiService {
  public url = 'http://api.ratings.food.gov.uk/';
  public version = '2';

  constructor(
    private http: HttpClient,
    private ratingService: RatingService,
    private store: StoreService
  ) { }

  public getScores(localAuthorityId, pageSize) {
    this.get(this.createEstablishmentsURL(localAuthorityId, pageSize))
    .subscribe(response => {
      this.ratingService.saveScores(response);
    });
  }

  public getAuthorities() {
    this.get(`${this.url}authorities/basic`)
    .subscribe(response => {
      response['authorities'].forEach(element => {
        this.store.addAuthority(
          element['LocalAuthorityId'],
          element['Name'],
          element['EstablishmentCount']);
      });
    });
  }

  private get(url: string): Observable<object> {
    return this.http.get(
      url,
      {headers: new HttpHeaders().set('x-api-version', this.version)}
    );
  }

  private createEstablishmentsURL(localAuthorityId: number, pageSize: number) {
    return this.url + 'Establishments' + this.createQueryString(localAuthorityId, pageSize);
  }

  private createQueryString(localAuthorityId, pageSize) {
    return `?localAuthorityId=${localAuthorityId}&pageSize=${pageSize}&pageNumber=1`;
  }
}
