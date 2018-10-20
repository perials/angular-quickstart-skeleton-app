import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User, UserFactory } from '../../classes/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Input() user:User;
  @Output() updateUserList = new EventEmitter<Boolean>();
  names = "abc";
  error = undefined;
  loading = false;
  showSuccessMsg = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  
  getUser() {
    return JSON.stringify(this.user, null, 2);
  }
  
  addUser(user, userform) {
    this.userService.add(user)
      .subscribe(
        response => {
          this.resetForm(userform);
          this.afterSuccess();
        },
        error => {
          this.error = error;    
        }
      )
  }
  
  editUser(user, userform) {
    this.userService.edit(user)
      .subscribe(
        response => {
          console.log(response);
          this.afterSuccess();
        },
        error => {
          this.error = error;
        }
      )
  }
  
  flashSuccessMessage() {
    this.showSuccessMsg = true;
    setTimeout(() => this.showSuccessMsg = false, 3000)
  }
  
  afterSuccess() {
    this.flashSuccessMessage();
    this.updateUserList.emit(true);
    this.loading = false;
  }
  
  resetForm(userform) {
    userform.reset();
    this.user = UserFactory.getInstance();
  }
  
  save(userform) {
    this.error = undefined;
    this.loading = true;
    if (this.user.id === 0) {
      this.addUser(this.user, userform);
    }
    else {
      this.editUser(this.user, userform);
    }
  }

}
