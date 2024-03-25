import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedInterviewComponent } from './completed-interview.component';

describe('CompletedInterviewComponent', () => {
  let component: CompletedInterviewComponent;
  let fixture: ComponentFixture<CompletedInterviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompletedInterviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedInterviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
