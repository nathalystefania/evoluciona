import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PcaFormComponent } from './pca-form.component';

describe('PcaFormComponent', () => {
  let component: PcaFormComponent;
  let fixture: ComponentFixture<PcaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PcaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PcaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
