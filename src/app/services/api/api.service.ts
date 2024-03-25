import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

import axios from 'axios';
import firebase from 'firebase/compat/app';
import {
  BehaviorSubject,
  catchError,
  Observable,
  throwError,
} from 'rxjs';
import { APIEnum } from 'src/app/common/enum/APIEnum';
import { MasterDataType } from 'src/app/common/enum/AppEnum';
import { UserTypeConstant } from 'src/app/common/enum/UserTypeConstant';
import { QuestionMarkModel } from 'src/app/common/models/QuestionMarkModel';
import {
  CompletedInterviewResponse,
  InterviewResponse,
  TemplateModel,
  Users,
} from 'src/types';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  public isUserLoggedIn = new BehaviorSubject<boolean>(false);
  axiosInstance = axios.create();
  accessToken: string|null = '';
  user: firebase.User | null | undefined;
  uid: string | null | undefined;
  email: string | null | undefined;
  role: UserTypeConstant = UserTypeConstant.USER;
  constructor(
    private http: HttpClient,
    private router: Router,
    private afAuth: AngularFireAuth,
    public firestore: AngularFirestore,
  ) {
    this.afAuth.authState.subscribe((user) => {
      console.log(user);
      if (user) {
        this.addUserToFirestore(user);
      } else {
        this.isUserLoggedIn.next(false);
      }
    });
    
  }

  async addUserToFirestore(user: firebase.User) {
    this.user = user;
    const { uid, email } = this.user;

    try {
      const userDocRef = this.firestore.collection('users').doc(uid);
      const userDocSnapshot = await userDocRef.get().toPromise();

      if (userDocSnapshot !== undefined && !userDocSnapshot.exists) {
        await userDocRef.set({ isAllowed: false, email });
        console.log('User data added to Firestore:', { uid, email });
      } else if (userDocSnapshot !== undefined && userDocSnapshot.exists) {
        console.log('User document already exists in Firestore:');
        const data = userDocSnapshot.data() as {
          isAllowed: boolean;
          role: string;
        };
        if (data.isAllowed) {
          this.role = data.role as UserTypeConstant;
          const accessToken = await user.getIdToken();
          console.log('Access Token:', accessToken);
          this.accessToken = accessToken;
          this.axiosInstances();
          this.isUserLoggedIn.next(true);
        } else {
          this.router.navigate(['/login']);
        }
      }
    } catch (error) {
      console.error('Error adding user data to Firestore:', error);
    }
  }

  axiosInstances() {
    if (this.accessToken) {
         this.axiosInstance.interceptors.request.use(
        (config) => {
          config.headers['Authorization'] = `Bearer ${this.accessToken}`;
          config.headers['Content-Type'] = 'application/json'; // Optional content type header
          return config;
        },
        (error) => {
          if (error.code === 'auth/id-token-expired') {
            this.refreshToken();
          } else {
            throw new Error('Invalid Firebase ID token.');
          }
        });
    }
  }

  async refreshToken() {
  try {
    this.accessToken = await this.afAuth.currentUser.then((user: firebase.User | null) => user && user.getIdToken(true));
    
    console.log('Token refreshed successfully');
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
}

  public httpOptions = {
    headers: new HttpHeaders({
      Token: `Bearer `,
    }),
  };

  get isLoggedIn() {
    return this.isUserLoggedIn.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something went wrong; please try again later.');
  }

  get<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url).pipe(catchError(this.handleError));
  }

  post<T, U>(endpoint: string, data: U, _id: string = ''): Observable<T> {
    let url = `${this.baseUrl}/${endpoint}`;
    console.log(_id);
    if (_id != '') {
      url += `/${_id}`;
      return this.http.put<T>(url, data).pipe(catchError(this.handleError));
    }

    return this.http.post<T>(url, data).pipe(catchError(this.handleError));
  }

  delete<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.delete<T>(url).pipe(catchError(this.handleError));
  }

  async getAllUsers(): Promise<Users[]> {
    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/users`);
      console.log('Response:', response.data);
      return response.data;
    } catch (error) {
      // Log any errors
      console.error('Error:', error);
      return [];
    }
  }

  async fetchSections() {
    try {
      let endPoint = APIEnum.GET_MASTER + MasterDataType.SECTION;
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${endPoint}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async fetchTemplateData() {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.INTERVIEW_TEMPLATES}`
      );
      return response.data;
    } catch (error) {
      // Log any errors
      console.error('Error:', error);
    }
  }

  async submitTemplate(body: TemplateModel) {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/${APIEnum.INTERVIEW_TEMPLATES}`,
        body
      );
      return response.data;
    } catch (error) {
      // Log any errors
      console.error('Error:', error);
    }
  }

  async submitInterviewFeedback(body: InterviewResponse) {
    try {
      const response = await this.axiosInstance.post(
        `${this.baseUrl}/${APIEnum.INTERVIEW_RESPONSES}`,
        body
      );
      return response.data;
    } catch (error) {
      // Log any errors
      console.error('Error:', error);
    }
  }

  async fetchIndicators() {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.GET_MASTER}indicators`
      );
      return response.data;
    } catch (error) {
      // Log any errors
      console.error('Error:', error);
    }
  }

  async fetchCompletedInterview(): Promise<CompletedInterviewResponse[]> {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.INTERVIEW_RESPONSES}`
      );
      return response.data;
    } catch (error) {
      // Log any errors
      console.error('Error:', error);
      return [];
    }
  }

  async signInWithGooglePopup() {
    try {
      const result = await this.afAuth.signInWithPopup(
        new firebase.auth.GoogleAuthProvider()
      );
      this.router.navigate(['home']);
      const uid = result.user?.uid;
      const email = result.user?.email;
      if (uid && email) {
        const userDoc = this.firestore.collection('users').doc(uid);
        const userDocSnapshot:
          | firebase.firestore.DocumentSnapshot<unknown>
          | undefined = await userDoc.get().toPromise();
        if (userDocSnapshot !== undefined && !userDocSnapshot.exists) {
          await userDoc.set({ isAllowed: false, email });
        }
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('Logout successful');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  async fetchQuestions() {
     try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.GET_Questions}`
      );
       response.data.forEach((question: QuestionMarkModel) => {
              question.isSelected = false; // Set isSelected to false for each entry
            });
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async fetchDomains() {
     try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.GET_MASTER}${MasterDataType.DOMAIN}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  async fetchAssessments() {
     try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.GET_MASTER}${MasterDataType.ASSESSMENT_TYPE}`
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async generatePdf(id:string): Promise<Blob> {
    const response = await this.axiosInstance.get(
        `${this.baseUrl}/${APIEnum.INTERVIEW_RESPONSES}/download/${id}`,{
      responseType: 'blob'
    });
    return response.data;
  }
}
