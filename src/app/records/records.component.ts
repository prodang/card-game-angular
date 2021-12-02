import { Component, OnInit } from '@angular/core';
import {UserRestService} from "../shared/user-rest.service";
import {record} from "../shared/model/record.model";

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

  constructor(private conex: UserRestService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem('token'),
      user = sessionStorage.getItem('user');
    if( token != ''){
      this.conex.getRecordsPersonals(user,token).subscribe(
        (value: record[]) => {
            this.personals = value;
            this.isToken = true;
            if(value.length > 0){
              this.isPersonals = true;
            }
          },
        error => {
            if( error.status == 401){
              alert('Token incorrecto');
            }else if( error.status == 500){
              alert('Error interno. Inténtalo más tarde');
            }
          }
      );
    }

    this.conex.getRecords().subscribe(
      (value: record[]) => {this.records = value;},
      error => {
        if( error.status == 500){
          alert('Error interno. Inténtalo más tarde');
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
    let token = sessionStorage.getItem('token');
    this.conex.deleteRecordsPersonals(token).subscribe(
      value => {
          this.isPersonals = false;
          this.ngOnInit();
        },
      error => {
        if(error.status == 401){
          alert('Token incorrecto');
        }
      }
    );
  }

}
