import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JaganheiPage } from './jaganhei.page';

describe('JaganheiPage', () => {
  let component: JaganheiPage;
  let fixture: ComponentFixture<JaganheiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JaganheiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JaganheiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
