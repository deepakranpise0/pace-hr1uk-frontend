import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  public spinner: boolean = true;

  constructor() {}

  public showSpinner() {
    this.spinner = true;
  }
  public hideSpinner() {
    this.spinner = false;
  }
}
