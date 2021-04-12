import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dota2Page } from './dota2.page';

describe('Dota2Page', () => {
  let component: Dota2Page;
  let fixture: ComponentFixture<Dota2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dota2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dota2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
