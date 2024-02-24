import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import { APIEnum } from '../common/enum/APIEnum';
import { LoginModel } from '../common/models/Login';
import { ApiService } from '../services/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  constructor(
      private formBuilder: FormBuilder,
      private _apiService: ApiService,
      private router:Router
    
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['deepakranpise0@gmail.com', [Validators.required, Validators.email]],
      password: ['Deepak@0613', Validators.required],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._apiService
        .post(APIEnum.LOGIN, this.loginForm.value as LoginModel)
        .subscribe(
          (res: any) => {
            if (res) {
                console.log(res);
              this._apiService.setAccessToken(res.access_token);
                this.router.navigate(['/home'])
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
}
