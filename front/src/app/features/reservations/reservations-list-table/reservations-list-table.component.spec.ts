import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsListTableComponent } from './reservations-list-table.component';

describe('ReservationsListTableComponent', () => {
  let component: ReservationsListTableComponent;
  let fixture: ComponentFixture<ReservationsListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsListTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
