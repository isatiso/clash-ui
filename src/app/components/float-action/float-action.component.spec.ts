import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatActionComponent } from './float-action.component';

describe('FloatActionComponent', () => {
  let component: FloatActionComponent;
  let fixture: ComponentFixture<FloatActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloatActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
