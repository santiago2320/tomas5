import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestaAzulComponent } from './encuesta-azul.component';

describe('EncuestaAzulComponent', () => {
  let component: EncuestaAzulComponent;
  let fixture: ComponentFixture<EncuestaAzulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestaAzulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestaAzulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
