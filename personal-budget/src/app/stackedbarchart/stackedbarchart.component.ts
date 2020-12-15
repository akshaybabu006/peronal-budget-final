import { Component, OnInit } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
import { BrowserModule } from '@angular/platform-browser';
import { Item, DataService } from '../data.service';

// @NgModule({
//   // declarations: [
//   //    AppComponent
//   // ],
//   imports: [
//      BrowserModule,GoogleChartsModule
//   ]
//   // providers: [], bootstrap: [AppComponent]
// })

@Component({
  selector: 'pb-stackedbarchart',
  templateUrl: './stackedbarchart.component.html',
  styleUrls: ['./stackedbarchart.component.scss'],

})



export class StackedbarchartComponent implements OnInit {

  constructor(private dataService: DataService) { }
  title = 'Red:allocated Budget and blue: Used Budget';
   type = 'BarChart';
   data = this.dataService.dataGroupChart
  //  [
  //     ["rent", 900, 390],
  //     ["food", 1000, 400],
  //     ["grocery", 1170, 440],
  //     ["medical", 1250, 480],
  //     ["school", 1530, 540]
  //  ];
   columnNames = ['expense', 'spent','set'];
   options = {
      hAxis: {
         title: 'Money'
      },
      vAxis:{
         minValue:0
      }
   };
   width = 650;
   height = 400;
  // title = 'Population (in millions)';
  // type = 'BarChart';
  // data = [
  //    ["2012", 900, 390],
  //    ["2013", 1000, 400],
  //    ["2014", 1170, 440],
  //    ["2015", 1250, 480],
  //    ["2016", 1530, 540]
  // ];
  // columnNames = ['Year', 'Asia','Europe'];
  //  options = {
  //     hAxis: {
  //        title: 'Year'
  //     },
  //     vAxis:{
  //        minValue:0
  //     },
  //     isStacked:true
  //  };
  //  width = 550;
  //  height = 400;

  async ngOnInit(): Promise<void> {
    // await this.dataService.testData('2','1');
  }

}
