import { ComponentFixture, TestBed } from '@angular/core/testing';

import { API } from './api';

describe('API', () => {
  let component: API;
  let fixture: ComponentFixture<API>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [API],
    }).compileComponents();

    fixture = TestBed.createComponent(API);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
