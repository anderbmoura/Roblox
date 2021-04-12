import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterstrikePage } from './counterstrike.page';

describe('CounterstrikePage', () => {
  let component: CounterstrikePage;
  let fixture: ComponentFixture<CounterstrikePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterstrikePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterstrikePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
