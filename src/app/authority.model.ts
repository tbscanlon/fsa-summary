export class Authority {
  public scores: object;

  constructor(
    public id: number,
    public name: string,
    public establishments: number,
  ) { }

  public addScores(scores: object) {
    this.scores = scores;
  }
}
