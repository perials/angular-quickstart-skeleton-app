import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User, UserFactory } from '../../classes/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  userToEdit = UserFactory.getInstance();
  error = undefined;
  loading = false;
  
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  
  getUsers() {
    this.loading = true;
    this.userService.getAll()
    .subscribe(
      users => {
        this.users = users;
        this.loading = false;
      },
      error => {
        this.error = error;
      }
    );
  }
  
  editUser(user) {
    this.userToEdit = {...user};
    console.log(this.userToEdit);
  }

}
