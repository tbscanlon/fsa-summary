import { Observable } from 'rxjs/Observable';
import { Authority } from './../authority.model';
import { StoreService } from './../store.service';
import { FsaApiService } from './../fsa-api.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public authorities: Authority[] = [];

  constructor(private store: StoreService, private fsaApiService: FsaApiService) { }

  ngOnInit() {
    this.fsaApiService.fetchAuthorities().subscribe(res => {
      res['authorities'].forEach(element => {
        this.authorities.push(
          new Authority(
            element['LocalAuthorityId'],
            element['Name'],
            element['EstablishmentCount'])
        );
      });
      console.log(this.authorities.filter(auth => auth.name.length >= 20));
    });
  }

  // search(text: Observable<string>) {
  //   text.debounceTime(200).distinctUntilChanged().map(term => {
  //     if (term !== '') {
  //       this.authorities.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10);
  //     }
  //   });
  // }

  // TODO: Create method for typeahead business logic
  public search = (text: Observable<string>) =>
  text
  .debounceTime(200)
  .distinctUntilChanged()
  .map(term => term === '' ? []
  : console.log(this.authorities)) // TODO: make this not delete the authorities or something
  // this.authorities.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
}
