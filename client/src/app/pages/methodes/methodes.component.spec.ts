import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodesComponent } from './methodes.component';

describe('MethodesComponent', () => {
  let component: MethodesComponent;
  let fixture: ComponentFixture<MethodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
