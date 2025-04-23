import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSearchTableComponent } from './games-search-table.component';

describe('GamesSearchTableComponent', () => {
  let component: GamesSearchTableComponent;
  let fixture: ComponentFixture<GamesSearchTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesSearchTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
