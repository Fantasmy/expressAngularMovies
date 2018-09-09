import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCreatePageComponent } from './movie-create-page.component';

describe('MovieCreatePageComponent', () => {
  let component: MovieCreatePageComponent;
  let fixture: ComponentFixture<MovieCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
