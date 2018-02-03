import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabulateComponent } from './tabulate.component';

describe('TabulateComponent', () => {
  let component: TabulateComponent;
  let fixture: ComponentFixture<TabulateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabulateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
