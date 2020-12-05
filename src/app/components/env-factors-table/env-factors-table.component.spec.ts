import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvFactorsTableComponent } from './env-factors-table.component';

describe('EnvFactorsTableComponent', () => {
  let component: EnvFactorsTableComponent;
  let fixture: ComponentFixture<EnvFactorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvFactorsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvFactorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
