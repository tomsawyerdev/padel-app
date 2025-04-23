import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsListUpdOpponentDlgComponent } from './reservations-list-upd-opponent-dlg.component';

describe('ReservationsListUpdOpponentDlgComponent', () => {
  let component: ReservationsListUpdOpponentDlgComponent;
  let fixture: ComponentFixture<ReservationsListUpdOpponentDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationsListUpdOpponentDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsListUpdOpponentDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
