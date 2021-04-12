import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaspadinhaPage } from './raspadinha.page';

describe('RaspadinhaPage', () => {
  let component: RaspadinhaPage;
  let fixture: ComponentFixture<RaspadinhaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaspadinhaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaspadinhaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
