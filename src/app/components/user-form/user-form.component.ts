import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../../interfaces/user.interface';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'b-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user: User;
  id;
  userForm: FormGroup = new FormGroup({});
  keys: string[] = [];
  error: string;

  ngOnInit(): void {}

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      if (params.id == 'create') {
        this.user = {
          address: '',
          company: '',
          email: '',
          id: '',
          name: '',
          phone: '',
          username: '',
          website: '',
        };
        this.initForm();
      } else {
        this.id = params.id;
        this.dataService.getOne(params.id).then((user) => {
          this.user = user;
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.userForm = new FormGroup({
      address: new FormControl(this.user.address, [Validators.required]),
      company: new FormControl(this.user.company, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      id: new FormControl(this.user.id, [Validators.required]),
      name: new FormControl(this.user.name, [Validators.required]),
      phone: new FormControl(this.user.phone, [Validators.required]),
      username: new FormControl(this.user.username, [Validators.required]),
      website: new FormControl(this.user.website, [Validators.required]),
    });
    this.keys = Object.keys(this.user);
  }

  submit() {
    if (!this.userForm.valid) {
      this.error = 'complete the required information';
      return;
    } else this.user = this.userForm.value;
    if (!this.id)
      this.dataService
        .create(this.user)
        .then(() => {
          this.router.navigate(['/users']);
        })
        .catch((err) => {
          this.error = err;
        });
    else
      this.dataService
        .edit(this.id, this.user)
        .then(() => {
          this.router.navigate(['/users']);
        })
        .catch((err) => {
          this.error = err;
        });
  }
}
