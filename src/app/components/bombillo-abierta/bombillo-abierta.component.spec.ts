import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BombilloAbiertaComponent } from './bombillo-abierta.component';

describe('BombilloAbiertaComponent', () => {
  let component: BombilloAbiertaComponent;
  let fixture: ComponentFixture<BombilloAbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BombilloAbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BombilloAbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
