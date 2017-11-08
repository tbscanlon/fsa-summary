import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Search', () => {
    beforeEach(() => {
      de = fixture.debugElement.query(By.css('.input-group'));
      element = de.nativeElement;
    });

    it('Renders a search input', () => {
      expect(element.firstElementChild.id).toBe('borough-search');
    });

    it('Has search field empty by default', () => {
      expect(element.firstElementChild.textContent).toBe('');
    });

    it('Has a search button', () => {
      expect(element.lastElementChild.className).toBe('input-group-btn');
    });

    it('Has a search icon in the search button', () => {
      const icon = element.lastElementChild.firstElementChild.firstElementChild;
      expect(icon.className).toBe('glyphicon glyphicon-search');
    });
  });
});
