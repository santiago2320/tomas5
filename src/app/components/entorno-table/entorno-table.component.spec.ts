import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntornoTableComponent } from './entorno-table.component';

describe('EntornoTableComponent', () => {
  let component: EntornoTableComponent;
  let fixture: ComponentFixture<EntornoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntornoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntornoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
