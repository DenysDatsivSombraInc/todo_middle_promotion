import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertFormComponent } from './upsert-form.component';

describe('UpsertFormComponent', () => {
  let component: UpsertFormComponent;
  let fixture: ComponentFixture<UpsertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
