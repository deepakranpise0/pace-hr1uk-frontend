import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditPopupComponent } from './add-edit-popup.component';

describe('AddEditPopupComponent', () => {
  let component: AddEditPopupComponent;
  let fixture: ComponentFixture<AddEditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
