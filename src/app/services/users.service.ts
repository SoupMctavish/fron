import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
    // this.getUsers().subscribe((result: UserResult) => {
    //   console.log(result.data);
    // });
   }
   getUsers() {
    return this.http.get<User[]>("https://back1a.herokuapp.com/users");
   }
   addUser(user: User){
     console.log(user)
     return this.http.post<User>("https://back1a.herokuapp.com/users", user);
   }
   deleteUser(id: number){
     return this.http.delete(`https://back1a.herokuapp.com/users/${id}`);
   }
   updateUser(user: User){
     return this.http.put<User>('https://back1a.herokuapp.com/users', user);
   }
   postFile(uName: string, uLastname: string, fileToUpload: File) {
    const endpoint = 'https://back1a.herokuapp.com/users/upload';
    const formData: FormData = new FormData();
    formData.append('user_name', uName);
    formData.append('user_las', uLastname);
    formData.append('image', fileToUpload, fileToUpload.name);
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'origin'
    });
    return this.http.post<User>(endpoint ,formData, {headers});
}
}
