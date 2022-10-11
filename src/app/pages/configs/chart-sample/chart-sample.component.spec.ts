import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartSampleComponent } from './chart-sample.component';

describe('ChartSampleComponent', () => {
  let component: ChartSampleComponent;
  let fixture: ComponentFixture<ChartSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartSampleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
