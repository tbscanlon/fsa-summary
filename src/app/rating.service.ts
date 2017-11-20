import { StoreService } from './store.service';
import { Injectable } from '@angular/core';

@Injectable()
export class RatingService {
  private _scores = {};

  constructor(private storeService: StoreService) { }

  get scores() {
    return this._scores;
  }

  public saveScores(json) {
    this.resetScores();
    json.establishments.forEach(est => {
      this.addScore(est.RatingValue);
    });
    return this._scores;
  }

  private addScore(ratingValue) {
    if (this._scores.hasOwnProperty(ratingValue)) {
      this._scores[ratingValue] += 1;
    } else {
      this._scores[ratingValue] = 1;
    }
  }

  private resetScores() {
    for (const member in this._scores) {
      if (this._scores.hasOwnProperty(member)) {
        delete this._scores[member];
      }
    }
  }
}
