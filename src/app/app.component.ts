import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  data : any;
  title = 'xlsx';
  constructor(private http: HttpClient){}

  ngOnInit(){
    this.http.get("assets/test.xlsx", { responseType: 'blob' }).subscribe(data => {      
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(data);
      reader.onload = (e: any) => {
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      this.data = data;
      console.log(data);
    };
  })
  
} 
}

