import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridControlesComponent } from './grid-controles.component';

describe('GridControlesComponent', () => {
  let component: GridControlesComponent;
  let fixture: ComponentFixture<GridControlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridControlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridControlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
