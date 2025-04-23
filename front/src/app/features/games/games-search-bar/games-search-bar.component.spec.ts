import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesSearchBarComponent } from './games-search-bar.component';

describe('GamesSearchBarComponent', () => {
  let component: GamesSearchBarComponent;
  let fixture: ComponentFixture<GamesSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesSearchBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
