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
    json.establishments.forEach(est => {
      this.addScore(est.RatingValue);
    });
    console.log(this._scores);
    // TODO: Save the score to the relevant authority here
    // this.storeService.saveScore()
  }

  private addScore(ratingValue) {
    if (this._scores.hasOwnProperty(ratingValue)) {
      this._scores[ratingValue] += 1;
    } else {
      this._scores[ratingValue] = 1;
    }
  }
}
