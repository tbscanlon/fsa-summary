import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  const APP_TITLE = 'FSA Summary';
  const APP_DESCRIPTION = 'Small description goes here';

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let de: DebugElement;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Shows "FSA Summary" in the h1 element for the app', () => {
    de = fixture.debugElement.query(By.css('h1'));
    element = de.nativeElement;

    expect(element.textContent).toContain(APP_TITLE);
  });

  it('Shows a description for the app', () => {
    de = fixture.debugElement.query(By.css('p'));
    element = de.nativeElement;

    expect(element.textContent).toContain(APP_DESCRIPTION);
  });
});
