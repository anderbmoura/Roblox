import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumerosdasortePage } from './numerosdasorte.page';

describe('NumerosdasortePage', () => {
  let component: NumerosdasortePage;
  let fixture: ComponentFixture<NumerosdasortePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumerosdasortePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumerosdasortePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
