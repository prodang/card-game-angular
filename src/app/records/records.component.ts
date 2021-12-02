import { Component, OnInit } from '@angular/core';
import {UserRestService} from "../shared/user-rest.service";
import {record} from "../shared/model/record.model";
import {ToastrService} from "ngx-toastr";
import {AuthMngService} from "../shared/managers/auth-mng.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  records: record[] = [];
  personals: record[] = [];
  isToken = false;
  isPersonals = false;

  constructor(private conex: UserRestService,  private toastr: ToastrService, private auth: AuthMngService) { }

  ngOnInit(): void {
    let token = this.auth.getToken(),
      user = this.auth.getUser();
    if(token){
      this.conex.getRecordsPersonals(user).subscribe(
        (value: record[]) => {
            this.personals = value;
            this.isToken = true;
            if(value.length > 0){
              this.isPersonals = true;
            }
          },
        error => {
            if( error.status == 401){
              this.toastr.error('Token incorrecto');
            }else if( error.status == 500){
              this.toastr.error('Error interno. Inténtalo más tarde');
            }
          }
      );
    }

    this.conex.getRecords().subscribe(
      (value: record[]) => {this.records = value;},
      error => {
        if( error.status == 500){
          this.toastr.error('Error interno. Inténtalo más tarde');
        }
      }
    );
  }

  change(record: any){
    let date,realDate;
    date = new Date();
    date.setTime(record);
    realDate = date.getDate()+'/'+ (date.getMonth() + 1) +'/'+date.getFullYear();
    return realDate;
  }

  deletePersonals(){
    this.conex.deleteRecordsPersonals().subscribe(
      value => {
          this.isPersonals = false;
          this.ngOnInit();
        },
      error => {
        if(error.status == 401){
          this.toastr.error('Token incorrecto');
        }
      }
    );
  }

}
