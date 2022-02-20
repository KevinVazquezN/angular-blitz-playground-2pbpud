import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { User } from '../../interfaces/user.interface';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'b-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  ngOnInit(): void {}
}
