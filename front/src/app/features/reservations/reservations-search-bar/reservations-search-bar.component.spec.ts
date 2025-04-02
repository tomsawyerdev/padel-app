import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsSearchBarComponent } from './reservations-search-bar.component';

describe('ReservationsSearchBarComponent', () => {
  let component: ReservationsSearchBarComponent;
  let fixture: ComponentFixture<ReservationsSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
