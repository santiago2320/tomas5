import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbiertaComponent } from './abierta.component';

describe('AbiertaComponent', () => {
  let component: AbiertaComponent;
  let fixture: ComponentFixture<AbiertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbiertaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbiertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
