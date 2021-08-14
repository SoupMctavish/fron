import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: UsersService) { }
  users!: User[];
  uName!: string;
  uLastname!: string;
  uAvatar: File | null = null;
  updId!: number;
  updName!: string;
  updAvatar!: string;
  updLastname!: string;
  successfulNew!: boolean;
  successfulDelete!: boolean;
  successfulUpd!: boolean;
  uId!: number;
  fileToUpload!: File;

  ngOnInit(): void {
    this.successfulNew = false;
    this.successfulDelete = false;
    this.successfulUpd = false;
    this.service.getUsers().subscribe((result: User[]) => {
      this.users = result;
      console.log(result);
    });
  }

  handleFileInput( event: any) {
    this.fileToUpload = event.target.files.item(0) as File;
  }

  saveNew(){
    const newUser = {user_name:this.uName, user_las: this.uLastname, avatar: "avatar.jpg"}
    this.service.addUser(newUser).subscribe(user => {
      this.successfulNew = true;
      this.users.push(user);
    });
  }
  uploadFileToActivity() {
    this.service.postFile(this.uName, this.uLastname, this.fileToUpload).subscribe(data => {
        this.successfulNew = true;
        this.users.push(data);
      }, error => {
        console.log(error);
      });
  }
  deleteUser(){
    this.service.deleteUser(this.uId).subscribe(() => this.successfulDelete = true);
  }
  updateUser(){
    const userToUpdate = {id_user: this.updId, user_name: this.updName, user_las: this.updLastname}
    this.service.updateUser(userToUpdate).subscribe(() => this.successfulUpd = true);
  }

}
