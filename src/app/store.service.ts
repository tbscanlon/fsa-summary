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
}
