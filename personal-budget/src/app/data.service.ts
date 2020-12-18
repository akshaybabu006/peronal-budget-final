//Below code thought inspiration was from intex site author: Adrien Miquel.
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

export interface Item {
  name: string;
  value: number;
  abs: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly MIN_ITEM = 10;
  private readonly MAX_ITEM = 20;
  private readonly MAX_VALUE = 100;


  public dataSource = {
    datasets: [{
        data: [],
        backgroundColor: [
            '#ffcd56',
            '#ff6384',
            '#36a2eb',
            '#fd6b19',
            '#f6db19',
            '#fdbb19',
            '#f2d6b19',
        ],
    }],
    labels: []
  };

  public dataGroupChart =[[]];

  constructor(private http: HttpClient,
              private router:Router) {
   }
   public header = new HttpHeaders();

  async testData(id:string, month:string){
    await this.search(id, month);
    return this.dataSource;
  }

  async search(id:string, month:string) {
    var token = localStorage.getItem('jwt');
    this.header = this.header.set('Authorization', 'Bearer '+token);
    console.log(this.header)
    let promise = new Promise((resolve, reject) => {
      console.log('id got :'+id)
      this.http.post('http://localhost:3000/api/budget?id='+id+'&month='+month,null, {headers:this.header})
        .toPromise()
        .then(
          (res: any) => { // Success
            if(res.length>0){
              for(var i = 0; i < res.length; i++){
                this.dataSource.datasets[0].data[i] = res[i].budget;
                this.dataSource.labels[i] = res[i].title;
                this.dataGroupChart[i] = [res[i].title, res[i].budget, res[i].allocatedBudget];
              }
            }else{
              this.dataGroupChart = [[]];
              this.dataSource = {
                datasets: [{
                    data: [],
                    backgroundColor: [
                        '#ffcd56',
                        '#ff6384',
                        '#36a2eb',
                        '#fd6b19',
                        '#f6db19',
                        '#fdbb19',
                        '#f2d6b19',
                    ],
                }],
                labels: []
              };
            }

            console.log('Data from data service');
            console.log(this.dataGroupChart);
            resolve();
          }
        ), (err)=>{
          console.log('came in chart error api')
          if(err.status=='400'){
            this.router.navigate(['/abc']);
          }
        };
    });
    return promise;
  }
}

//  getDataBack(){
  //    //debugger;
  //   //  const i = this.dataSource.datasets[0].data.length;
  //   // const temp = [];
  //   // debugger;
  //   // await this.http.get('http://localhost:3000/budget').toPromise().then
  //   // ((res: any) => {
  //   //   // debugger;
  //   //   console.log(res);

  //   //   for(var i = 0; i < res.myBudget.length; i++){
  //   //     this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
  //   //     this.dataSource.labels[i] = res.myBudget[i].title;
  //   //     // this.createChart();
  //   //     this.globalTemp.push({
  //   //       name: this.dataSource.labels[i],
  //   //       value: this.dataSource.datasets[0].data[i],
  //   //       abs: Math.abs(this.dataSource.datasets[0].data[i])
  //   //     });
  //   //     debugger;
  //   //     //return temp;
  //   //   }
  //   //   // debugger;
  //   // // return this.dataSource;
  //   // });
  //   // return this.globalTemp;
  //   return this.http.get('http://localhost:3000/budget');
  // }
