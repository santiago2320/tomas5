import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaHomeComponent } from './carga-home.component';

describe('CargaHomeComponent', () => {
  let component: CargaHomeComponent;
  let fixture: ComponentFixture<CargaHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
