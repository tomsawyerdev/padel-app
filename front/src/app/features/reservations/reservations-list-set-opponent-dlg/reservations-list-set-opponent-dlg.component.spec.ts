import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsListSetOpponentDlgComponent } from './reservations-list-set-opponent-dlg.component';

describe('ReservationsListSetOpponentDlgComponent', () => {
  let component: ReservationsListSetOpponentDlgComponent;
  let fixture: ComponentFixture<ReservationsListSetOpponentDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsListSetOpponentDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsListSetOpponentDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
