import { FsaApiService } from './fsa-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FSA Summary';

  constructor(private fsaApi: FsaApiService) { }

  ngOnInit() {
    this.fsaApi.getScores(100, 1758);
  }
}
