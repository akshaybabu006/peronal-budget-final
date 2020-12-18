import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-enterexpense',
  templateUrl: './enterexpense.component.html',
  styleUrls: ['./enterexpense.component.scss']
})
export class EnterexpenseComponent implements OnInit {
  selectedMonth: string = '1';
  userId: string = localStorage.getItem('id');

  txtValue:string = '';
  message : string;
  public header = new HttpHeaders();
  constructor(public htttp:HttpClient,
              private router:Router) { }

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
      this.htttp.post<any>('http://localhost:3000/api/budgetupdate?id='+this.userId
      +'&month='+this.selectedMonth+'&category='+category+'&budget='+amount,null,
      {headers:this.header}).subscribe((res) => {
            console.log(res)
            console.log(res.success)
            if(res && res.affectedRows>0){
              console.log("Expense updated");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "Expense updated for the category";

            }else{
              console.log("Expense not updated");
              (<HTMLInputElement>document.getElementById('result')).innerHTML = "Expense not updated for the category, may be category not added for particular month in configure budget";
            }
        }, (err)=>{
          if(err.status=='400'){
            this.router.navigate(['/abc']);
          }
        })
    }
  }
}
