import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationCreateDialogComponent } from './reservation-create-dialog.component';

describe('ReservationCreateDialogComponent', () => {
  let component: ReservationCreateDialogComponent;
  let fixture: ComponentFixture<ReservationCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservationCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
