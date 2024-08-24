import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastCancerComponent } from './breast-cancer.component';

describe('BreastCancerComponent', () => {
  let component: BreastCancerComponent;
  let fixture: ComponentFixture<BreastCancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreastCancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreastCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
