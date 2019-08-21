import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRiesgosComponent } from './grid-riesgos.component';

describe('GridRiesgosComponent', () => {
  let component: GridRiesgosComponent;
  let fixture: ComponentFixture<GridRiesgosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRiesgosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRiesgosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
