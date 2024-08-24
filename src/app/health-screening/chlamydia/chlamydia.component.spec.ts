import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChlamydiaComponent } from './chlamydia.component';

describe('ChlamydiaComponent', () => {
  let component: ChlamydiaComponent;
  let fixture: ComponentFixture<ChlamydiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChlamydiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChlamydiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
