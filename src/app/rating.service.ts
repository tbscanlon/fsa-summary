import { Injectable } from '@angular/core';

@Injectable()
export class RatingService {
  private scores = {};

  constructor() { }

  public saveScores(json) {
    json.establishments.forEach(est => {
      this.addScore(est.RatingValue);
    });
    console.log(this.scores);
  }

  private addScore(ratingValue) {
    if (this.scores.hasOwnProperty(ratingValue)) {
      this.scores[ratingValue] += 1;
    } else {
      this.scores[ratingValue] = 1;
    }
  }
}
