import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CervicalCancerComponent } from './cervical-cancer.component';

describe('CervicalCancerComponent', () => {
  let component: CervicalCancerComponent;
  let fixture: ComponentFixture<CervicalCancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CervicalCancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CervicalCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
