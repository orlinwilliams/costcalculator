import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechFactorsTableComponent } from './tech-factors-table.component';

describe('TechFactorsTableComponent', () => {
  let component: TechFactorsTableComponent;
  let fixture: ComponentFixture<TechFactorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechFactorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechFactorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
