import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BienvenidoRojoComponent } from './bienvenido-rojo.component';

describe('BienvenidoRojoComponent', () => {
  let component: BienvenidoRojoComponent;
  let fixture: ComponentFixture<BienvenidoRojoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BienvenidoRojoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BienvenidoRojoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
