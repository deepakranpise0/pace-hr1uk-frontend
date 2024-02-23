import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../services/api/api.service';
import { APIEnum } from '../common/enum/APIEnum';
import { LoginModel } from '../common/models/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [MatCardModule, MatInputModule, MatIconModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(
    private formBuilder: FormBuilder,
    private _apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      // const data = await this._apiService.post(
      //   APIEnum.LOGIN,
      //   this.loginForm.value
      // );
      // if (data) {
      //   console.log(data);
      // }
      console.log(this.loginForm.value);
      (
        await this._apiService.post(APIEnum.LOGIN, this.loginForm.value)
      ).subscribe(
        (res: any) => {
          if (res) {
            console.log(res);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
