import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuvidasPage } from './duvidas.page';

describe('DuvidasPage', () => {
  let component: DuvidasPage;
  let fixture: ComponentFixture<DuvidasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuvidasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuvidasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
