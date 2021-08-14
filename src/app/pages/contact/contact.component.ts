import { Component, OnInit } from '@angular/core';
import { Seller } from 'src/app/interfaces/seller';
import { SellersService } from 'src/app/services/sellers.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private service: SellersService) { }
  sellers: any;
  uCompany!: string;
  uAvatar: File | null = null;
  updId!: number;
  updCompany!: string;
  successfulNew!: boolean;
  successfulDelete!: boolean;
  successfulUpd!: boolean;
  uId!: number;
  fileToUpload!: File;

  ngOnInit(): void {
    this.successfulNew = false;
    this.successfulDelete = false;
    this.successfulUpd = false;
    this.service.getSellers().subscribe((result: Seller[]) => {
      this.sellers = result;
      console.log(result);
    });
  }

  handleFileInput( event: any) {
    this.fileToUpload = event.target.files.item(0) as File;
  }

  saveNew(){
    const newSeller = {comp_name:this.uCompany, icon: "logo.jpg"}
    this.service.addSeller(newSeller).subscribe(seller => {
      this.successfulNew = true;
      this.sellers.push(seller);
    });
  }

  uploadFileToActivity() {
    this.service.postFile(this.uCompany, this.fileToUpload).subscribe(data => {
        this.successfulNew = true;
        this.sellers.push(data);
      }, error => {
        console.log(error);
      });
  }

  deleteSeller(){
    this.service.deleteSeller(this.uId).subscribe(() => this.successfulDelete = true);
  }

  updateSeller(){
    const sellerToUpdate = {id_comp: this.updId, comp_name: this.updCompany}
    this.service.updateSeller(sellerToUpdate).subscribe(() => this.successfulUpd = true);
  }

}
