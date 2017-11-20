import { Authority } from './authority.model';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {
  private _authorities: Authority[];

  constructor() {
    this._authorities = [];
  }

  get authorities() {
    return this._authorities.slice();
  }

  public addAuthority(id: number, name: string, establishments: number) {
    this._authorities.push(new Authority(id, name, establishments));
  }

  public saveScore(authorityId: number, scores: object) {
    const authority = this.getAuthority(authorityId);
    if (authority === undefined) {
      throw new Error('Authority not Found');
    }
    authority.addScores(scores);
    console.log(authority);
    // TODO: emit an event so the tableComponent can update itself
  }

  private getAuthority(id: number): Authority {
    let found: Authority;
    this.authorities.filter(element => {
      if (element.id === id) {
        found = element;
      }
    });
    return found;
  }
}
