import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocapontosPage } from './trocapontos.page';

describe('TrocapontosPage', () => {
  let component: TrocapontosPage;
  let fixture: ComponentFixture<TrocapontosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrocapontosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrocapontosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
