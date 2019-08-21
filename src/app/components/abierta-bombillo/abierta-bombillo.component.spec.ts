import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiertaBombilloComponent } from './abierta-bombillo.component';

describe('AbiertaBombilloComponent', () => {
  let component: AbiertaBombilloComponent;
  let fixture: ComponentFixture<AbiertaBombilloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbiertaBombilloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbiertaBombilloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
