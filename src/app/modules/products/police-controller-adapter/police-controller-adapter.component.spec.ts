import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliceControllerAdapterComponent } from './police-controller-adapter.component';

describe('PoliceControllerAdapterComponent', () => {
  let component: PoliceControllerAdapterComponent;
  let fixture: ComponentFixture<PoliceControllerAdapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliceControllerAdapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliceControllerAdapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
