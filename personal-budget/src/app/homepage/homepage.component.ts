import { AfterViewInit, Component, OnInit, ViewEncapsulation, Inject, ViewChild, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Chart } from 'chart.js';
import { Item,DataService } from '../data.service';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import * as d3 from 'd3';
// import { time } from 'console';
// import { MatDialog, MatDialogConfig ,MAT_DIALOG_DATA} from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  template: `<div id="pie"><svg></svg></div>`,
  encapsulation: ViewEncapsulation.None
})


export class HomepageComponent implements AfterViewInit {
  selectedMonth: string = '1';
  userId:  string='';
  token:  string='';
  modalTitle: string;
  refreshToken: boolean=true;
  public header = new HttpHeaders();
  constructor(private http: HttpClient,
             private dataService: DataService
             ) {
  }
  title = 'Red:allocated Budget and blue: Used Budget';
   type = 'BarChart';
   dataChart = this.dataService.dataGroupChart
   columnNames = ['expense', 'spent','set'];
   options = {
      hAxis: {
         title: 'Money'
      },
      vAxis:{
         minValue:0
      }
   };
   widths = 650;
   heights = 400;


   public dataSourceTemp = {
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


// statr here pie chart
   get height(): number { return parseInt(d3.select('body').style('height'), 10); }
   get width(): number { return parseInt(d3.select('body').style('width'), 10); }
   radius: number;

   // Arcs & pie
   private arc: any;  private pie: any;  private slices: any;
   private color: any;
   // Drawing containers
   private svg: any;  private mainContainer: any;
   // Data
   sample: Item[];

   private arcLabel: any;
   private texts: any;
   public myChart = null;


  async ngOnInit(): Promise<void> {
    // await this.dataService.testData('2',this.selectedMonth);
    // this.createChart();
    this.userId = localStorage.getItem('id');
    this.token = localStorage.getItem('jwt');
  }

  async ngAfterViewInit(): Promise<void> {

    await this.dataService.testData(this.userId,this.selectedMonth);
    this.createChart();
    this.createPieChart();
    this.checkTimer();


  }
  checkTimer(){
    const token = localStorage.getItem('jwt');
        if(token){
            var base64Url = token.split('.')[1];
            console.log("inside timer ")
            var decodedToken = JSON.parse(window.atob(base64Url));
            var test = JSON.parse(window.atob(base64Url))
            console.log('timer');
            console.log(test.username)
            console.log(decodedToken);
            const { exp } = decodedToken;
            console.log(exp);
            if (Date.now() >= exp * 1000) {
              console.log("expiered stimer timer ")
                localStorage.removeItem('jwt');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('id');
                window.location.href = '/';
                return;
            }
            if(Date.now()> ((exp*1000)-20000) && this.refreshToken){
              console.log("20 sec left, you wish to continue ?")
              if(window.confirm('20 sec left, you wish to continue ?')){
                console.log('call api');
                this.header = this.header.set('Authorization', 'Bearer '+token);
              this.refreshToken=false;
              this.http.post<any>('http://localhost:3000/api/refreshtoken?username='+test.username+'&refreshToken='+localStorage.getItem('refreshToken')+'&id='+localStorage.getItem('id'),null,
              {headers:this.header}).subscribe((res) => {
                  console.log('inside http call')
                  console.log(res)
                  console.log(res.success)
                  if(res && res.success){
                    console.log("token refresh done");
                    localStorage.setItem('jwt', res.token);
                    this.refreshToken=true;
                  }else{
                    console.log("token refresh not done");
                    this.refreshToken=true;
                  }
                })
              }else{
                this.refreshToken=false;
              }
            }
            console.log("time left  ")
            var timeLeft = (((exp*1000)-20000) - new Date().getTime());
            console.log(timeLeft)
            setTimeout(()=>{ console.log("time out  "); this.checkTimer() }, timeLeft);
        }
  }

  createChart(){
    var ctx = document.getElementById('myChart');
    if(this.myChart!= null){
      this.myChart.destroy();
    }
    this.myChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataService.dataSource
    });
  }
  async selectChangeHandler (event: any) {
    //update the ui
    this.selectedMonth = event.target.value;
    await this.dataService.testData(this.userId,this.selectedMonth);
    this.createChart();
    this.createPieChart();
    // this.data=this.dataService.dataGroupChart;
    // console.log("akshay")
    console.log(this.dataService.dataGroupChart)
    this.dataChart.push( this.dataService.dataGroupChart );
    this.dataChart = Object.assign( [], this.dataService.dataGroupChart);
  }

  createPieChart(){
    const temp = [];
    // await this.dataService.testData('2',this.homeComponent.selectedMonth); //sdjfksjdf skdjf kjdfjasdf sfkjskfd
    for(var i= 0; i < this.dataService.dataSource.labels.length ; i++){
      temp.push({
        name: this.dataService.dataSource.labels[i],
        value: this.dataService.dataSource.datasets[0].data[i],
        abs: Math.abs(this.dataService.dataSource.datasets[0].data[i])
      });

    }
    this.sample = temp;
    this.svg = d3.select('#pie').select('svg');
    // this.svg.innerHTML ='';
    this.setSVGDimensions();
    this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    this.pie = d3.pie().sort(null).value((d: any) => d.abs);
    this.draw();
  }

  private setSVGDimensions() {
    this.radius = 150;
    this.svg.attr('width', 2 * this.radius).attr('height', 2 * this.radius);
    this.svg.select('g').attr('transform', 'translate(' + this.radius + ',' + this.radius + ')');
  }

  private draw() {
    this.setArcs();
    this.drawSlices();
    this.drawLabels();
  }

  private setArcs() {
    this.arc = d3.arc().outerRadius(this.radius).innerRadius(this.radius * .5);

    this.arcLabel = d3.arc().innerRadius(this.radius * .8).outerRadius(this.radius * .8);
  }

  private drawLabels() {
    this.texts = this.mainContainer.selectAll('text')
      .remove().exit()
      .data(this.pie(this.sample))
      .enter().append('text')
      .attr('text-anchor', 'middle').attr('transform', d => `translate(${this.arcLabel.centroid(d)})`).attr('dy', '0.35em');
    this.texts.append('tspan').filter(d => (d.endAngle - d.startAngle) > 0.05)
      .attr('x', 0).attr('y', 0).style('font-weight', 'bold')
      .text(d => d.data.name);
    this.texts.append('tspan').filter(d => (d.endAngle - d.startAngle) > 0.25)
      .attr('x', 0).attr('y', '1.3em').attr('fill-opacity', 0.7)
      .text(d => d.data.value);
  }

  private drawSlices() {
    this.slices = this.mainContainer.selectAll('path')
      .remove().exit()
      .data(this.pie(this.sample))
      .enter().append('g').append('path')
      .attr('d', this.arc);
    this.slices
      .attr('fill', (d, i) => this.color(i));
  }

}
