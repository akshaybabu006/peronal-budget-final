//Below code thought inspiration was from intex site author: Adrien Miquel.
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

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

  constructor(private http: HttpClient) {
   }

  async testData(){
    if(this.dataSource.datasets[0].data.length <= 1){
      await this.search();
    }
    return this.dataSource;
  }

  async search() {
    let promise = new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/budget')
        .toPromise()
        .then(
          (res: any) => { // Success
            for(var i = 0; i < res.myBudget.length; i++){
              this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
              this.dataSource.labels[i] = res.myBudget[i].title;
            }
            console.log(res);
            resolve();
          }
        );
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
