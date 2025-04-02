import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsSearchTableCourtsComponent } from './reservations-search-table-courts.component';

describe('ReservationsSearchTableCourtsComponent', () => {
  let component: ReservationsSearchTableCourtsComponent;
  let fixture: ComponentFixture<ReservationsSearchTableCourtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsSearchTableCourtsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsSearchTableCourtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
