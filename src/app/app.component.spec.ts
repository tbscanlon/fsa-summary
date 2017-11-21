import { FsaApiService } from './fsa-api.service';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const APP_TITLE = 'FSA Summary';

describe('AppComponent', () => {
  let fixture;
  let app;
  let fsaStub;

  beforeEach(async(() => {
    fsaStub = jasmine.createSpyObj('fsaStub', ['getAuthorities', 'getScores']);

    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ {provide: FsaApiService, useValue: fsaStub} ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();


    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'FSA Summary'`, async(() => {
    expect(app.title).toEqual(APP_TITLE);
  }));

  describe('#ngOnInit', () => {
    it('should make an API call to get a list of Authorities', async(() => {
      app.ngOnInit();
      expect(fsaStub.getAuthorities).toHaveBeenCalled();
    }));
  });
});
