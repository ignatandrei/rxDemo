import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxVisualizerComponent } from './rx-visualizer.component';

describe('RxVisualizerComponent', () => {
  let component: RxVisualizerComponent;
  let fixture: ComponentFixture<RxVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxVisualizerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RxVisualizerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
