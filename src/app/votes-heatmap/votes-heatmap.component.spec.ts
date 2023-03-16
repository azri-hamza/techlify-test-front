import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesHeatmapComponent } from './votes-heatmap.component';

describe('VotesHeatmapComponent', () => {
  let component: VotesHeatmapComponent;
  let fixture: ComponentFixture<VotesHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VotesHeatmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotesHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
