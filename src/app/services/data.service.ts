import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user.interface';

import { users } from './data';
import { findIndex } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataService {
  // variable used to simulate persistence in DB at editing;
  myUsers: User[];

  constructor(private readonly http: HttpClient) {
    this.myUsers = users;
  }

  getAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.myUsers);
      }, 10);
    });
    //return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users').toPromise();
  }

  getOne(id): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.myUsers.find((user) => user.id == id));
      }, 10);
    });
  }

  edit(id, user: User) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          id != user.id &&
          this.myUsers.findIndex((usr) => usr.id == user.id) != -1
        ) {
          reject('This ID already exist');
        } else {
          this.myUsers.splice(
            this.myUsers.findIndex((usr) => usr.id == id),
            1,
            user
          );
          resolve({});
        }
      }, 10);
    });
  }

  create(user: User) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.myUsers.findIndex((usr) => usr.id == user.id) != -1) {
          reject('This ID already exist');
        } else {
          this.myUsers.push(user);
          resolve({});
        }
      }, 10);
    });
  }
}
