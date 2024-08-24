import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareForOlderAdultsComponent } from './care-for-older-adults.component';

describe('CareForOlderAdultsComponent', () => {
  let component: CareForOlderAdultsComponent;
  let fixture: ComponentFixture<CareForOlderAdultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareForOlderAdultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareForOlderAdultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
