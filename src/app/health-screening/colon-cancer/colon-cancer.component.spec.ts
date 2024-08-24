import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColonCancerComponent } from './colon-cancer.component';

describe('ColonCancerComponent', () => {
  let component: ColonCancerComponent;
  let fixture: ComponentFixture<ColonCancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColonCancerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColonCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
