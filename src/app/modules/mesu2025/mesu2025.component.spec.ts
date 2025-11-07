import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mesu2025Component } from './mesu2025.component';

describe('Mesu2025Component', () => {
  let component: Mesu2025Component;
  let fixture: ComponentFixture<Mesu2025Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Mesu2025Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mesu2025Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
