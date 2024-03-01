import {
  Component,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import {
  MatTabChangeEvent,
  MatTabGroup,
} from '@angular/material/tabs';

export interface Feedback {
  low: string;
  rating: number;
  high: string;
}

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.css'],
})
export class InterviewFeedbackComponent {
  @ViewChild('tabGroup')
  tabGroup!: MatTabGroup;

  tabs: any[] = [];
  currentTabIndex = 0;
   observations = [
    { label: 'Poor(1)', value: 1 },
    { label: 'Fair(2)', value: 2 },
    { label: 'Average(3)', value: 3 },
    { label: 'Good(4)', value: 4 },
    { label: 'Excellent(5)', value: 5 }
  ];

  constructor(private formBuilder: FormBuilder) {
    this.initializeTabs();
  }

  toggleStar(behavior: any, starIndex: number) {
    behavior.controls.rating.setValue(starIndex);
  }

   tabChanged(event: MatTabChangeEvent): void {
    console.log('Tab changed:', event.index);
  }

  previousTab() {
     const selectedIndex = this.tabGroup.selectedIndex||0;
    if (selectedIndex > 0) {
      this.tabGroup.selectedIndex = selectedIndex - 1;
    }
  }

  nextTab() {
    const selectedIndex = this.tabGroup.selectedIndex||0;
    if (selectedIndex < this.tabGroup._tabs.length - 1) {
      this.tabGroup.selectedIndex = selectedIndex + 1;
    }
  }

  

  submit() {
    // Handle form submission
    console.log('Form submitted:', this.tabs.map(tab => tab.form.value));
  }

  initializeTabs() {
    const tabData = [
      { label: 'Communication' },
      { label: 'Presentation' },
      { label: 'Group Discussion' }
    ];

    tabData.forEach(tab => {
      let form = this.formBuilder.group({
        behaviors: this.formBuilder.array([
          this.createBehaviorFormGroup(),
        ]),
        notes:['Engages the audience and demonstrates passion and energy through e.g. varied tone, pace etc.Engages the audience and demonstrates passion and energy through e.g. varied tone, pace etc.',Validators.nullValidator]
      });
      this.tabs.push({ label: tab.label, form });
    });
  }

  createBehaviorFormGroup() {
    return this.formBuilder.group({
      low: ['Enter Response manually', Validators.required],
      ratings: [0, Validators.required],
      high: ['Engages the audience and demonstrates passion and energy through e.g. varied tone, pace etc.', Validators.required],
    });
  }
}
