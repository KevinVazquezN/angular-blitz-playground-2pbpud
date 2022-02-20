import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user.interface';

import { users } from './data';

@Injectable({providedIn: 'root'})
export class DataService {
  constructor(private readonly http: HttpClient){  }

  getAll(): Promise<User[]>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(users);
      }, 10);
    })
    //return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').toPromise();
  }
}