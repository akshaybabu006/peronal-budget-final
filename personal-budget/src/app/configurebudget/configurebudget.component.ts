import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'pb-configurebudget',
  templateUrl: './configurebudget.component.html',
  styleUrls: ['./configurebudget.component.scss']
})
export class ConfigurebudgetComponent implements OnInit {
  selectedMonth: string = '1';
  userId: string = '2';
  public header = new HttpHeaders();
  constructor(public htttp:HttpClient) { }

  ngOnInit(): void {
  }
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedMonth = event.target.value;
  }

  updateExpense(){
    var token = localStorage.getItem('jwt');
    this.header = this.header.set('Authorization', 'Bearer '+token);
    const category = (<HTMLInputElement>document.getElementById('category')).value;
    const amount = (<HTMLInputElement>document.getElementById('amount')).value;
    // const result = (<HTMLInputElement>document.getElementById('result')).value;
    if(category == '' || amount==''){
      (<HTMLInputElement>document.getElementById('result')).innerHTML = "One of the text field is empty";
    }else{
      (<HTMLInputElement>document.getElementById('result')).innerHTML ="";
      this.htttp.post<any>('http://localhost:3000/api/budgetinsert?id='+this.userId+'&month='+this.selectedMonth+'&category='+category+'&allocatedBudget='+amount,null, {headers:this.header}).subscribe((res) => {
            console.log(res)
            console.log(res.success)
            if(res && res.affectedRows>0){
              console.log("New category added");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "New category added";

            }else{
              console.log("Unable to add new category");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "Unable to add new category";
            }
        })
    }
  }

}
