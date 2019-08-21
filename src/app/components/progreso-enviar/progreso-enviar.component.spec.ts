import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoEnviarComponent } from './progreso-enviar.component';

describe('ProgresoEnviarComponent', () => {
  let component: ProgresoEnviarComponent;
  let fixture: ComponentFixture<ProgresoEnviarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgresoEnviarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgresoEnviarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
