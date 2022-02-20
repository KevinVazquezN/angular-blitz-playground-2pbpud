import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../interfaces/user.interface';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'b-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  columnNames: string[] = [];
  searchControl = new FormControl('');
  sortedColumn: string;
  sortedOrder: 'A' | 'D';
  users: User[] = [];
  filterUsers: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private readonly dataService: DataService) {}

  ngOnInit(): void {
    this.columnNames = ['id', 'name', 'username', 'email', 'phone'];
    this.getUsers();

    this.sortBy(this.columnNames[0]);
    this.searchControl.valueChanges.subscribe((val) => {
      val = val.trim().toLowerCase();
      if (val == '') this.filterUsers.next(this.users);
      this.filterUsers.next(
        this.users.filter((user) => {
          for (let key in user) {
            if (user[key].trim().toLowerCase().includes(val)) {
              return true;
            }
          }
          return false;
        })
      );
    });
  }

  sortBy(columnName: string) {
    if (this.sortedColumn != columnName) {
      this.sortedColumn = columnName;
      this.sortedOrder = 'D';
    } else if (this.sortedOrder == 'D') {
      this.sortedOrder = 'A';
    } else {
      if (this.sortedColumn != this.columnNames[0]) {
        this.sortBy(this.columnNames[0]);
        return;
      } else {
        this.sortedOrder = 'D';
      }
    }
    let sortedArray: User[] = this.filterUsers.value;
    // descending
    if (this.sortedOrder == 'D')
      sortedArray.sort((user1, user2) =>
        user1[this.sortedColumn] < user2[this.sortedColumn] ? -1 : 1
      );
    // ascending
    else
      sortedArray.sort((user1, user2) =>
        user1[this.sortedColumn] > user2[this.sortedColumn] ? -1 : 1
      );
    this.filterUsers.next(sortedArray);
  }

  async getUsers(): Promise<void> {
    this.users = await this.dataService.getAll();
    this.filterUsers.next(this.users);
  }
}
