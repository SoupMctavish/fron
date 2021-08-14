import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../interfaces/item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) {
  }
  getItems() {
    return this.http.get<Item[]>("https://back1a.herokuapp.com/items");
  }
  addItem(item: Item){
    return this.http.post<Item>("https://back1a.herokuapp.com/items", item);
  }
  deleteItem(id: number){
    return this.http.delete(`https://back1a.herokuapp.com/items/${id}`);
  }
  updateItem(item: Item){
    return this.http.put<Item>('https://back1a.herokuapp.com/items', item);
  }
  postFile(uName: string, uDescription: string, uPrice: string, fileToUpload: File) {
    const endpoint = 'https://back1a.herokuapp.com/items/upload';
    const formData: FormData = new FormData();
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin':'origin'
    });
    formData.append('g_name', uName);
    formData.append('g_description', uDescription);
    formData.append('g_price', uPrice);
    formData.append('image', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData, {headers});
  }
}
