import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSearchNewOpponentDlgComponent } from './games-search-new-opponent-dlg.component';

describe('GamesSearchNewOpponentDlgComponent', () => {
  let component: GamesSearchNewOpponentDlgComponent;
  let fixture: ComponentFixture<GamesSearchNewOpponentDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesSearchNewOpponentDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesSearchNewOpponentDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
