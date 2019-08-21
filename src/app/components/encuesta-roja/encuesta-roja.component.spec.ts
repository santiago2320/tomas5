import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaRojaComponent } from './encuesta-roja.component';

describe('EncuestaRojaComponent', () => {
  let component: EncuestaRojaComponent;
  let fixture: ComponentFixture<EncuestaRojaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaRojaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaRojaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
