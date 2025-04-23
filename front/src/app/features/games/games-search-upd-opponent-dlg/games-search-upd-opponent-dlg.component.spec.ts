import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSearchUpdOpponentDlgComponent } from './games-search-upd-opponent-dlg.component';

describe('GamesSearchUpdOpponentDlgComponent', () => {
  let component: GamesSearchUpdOpponentDlgComponent;
  let fixture: ComponentFixture<GamesSearchUpdOpponentDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesSearchUpdOpponentDlgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesSearchUpdOpponentDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
