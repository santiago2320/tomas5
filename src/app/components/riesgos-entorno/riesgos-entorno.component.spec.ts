import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiesgosEntornoComponent } from './riesgos-entorno.component';

describe('RiesgosEntornoComponent', () => {
  let component: RiesgosEntornoComponent;
  let fixture: ComponentFixture<RiesgosEntornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiesgosEntornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiesgosEntornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
