import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoletaPage } from './roleta.page';

describe('RoletaPage', () => {
  let component: RoletaPage;
  let fixture: ComponentFixture<RoletaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoletaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoletaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
