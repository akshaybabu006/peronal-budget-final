//Below code thought inspiration was from intex site author: Adrien Miquel.
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Item, DataService } from '../data.service';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { HomepageComponent } from '../homepage/homepage.component';


@Component({
  selector: 'pb-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  template: `<div id="pie"><svg></svg></div>`,
  encapsulation: ViewEncapsulation.None
})
export class PieChartComponent implements OnInit {
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

  constructor(private dataService: DataService,
              private http: HttpClient,
              private homeComponent: HomepageComponent) {
  }

  async ngOnInit(): Promise<void> {
    const temp = [];
    await this.dataService.testData('2',this.homeComponent.selectedMonth); //sdjfksjdf skdjf kjdfjasdf sfkjskfd
    for(var i= 0; i < this.dataService.dataSource.labels.length ; i++){
      temp.push({
        name: this.dataService.dataSource.labels[i],
        value: this.dataService.dataSource.datasets[0].data[i],
        abs: Math.abs(this.dataService.dataSource.datasets[0].data[i])
      });

    }
    this.sample = temp;
    this.svg = d3.select('#pie').select('svg');
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
//This implementation is according to the post mentioned in piazza
//debugger;
    // if(this.dataService.dataSource.datasets[0].data.length < 1){
    //   this.dataService.getDataBack().subscribe((res: any) => {

    //     console.log(res);

    //     for(var i = 0; i < res.myBudget.length; i++){
    //       // this.dataService.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
    //       // this.dataService.dataSource.labels[i] = res.myBudget[i].title;
    //       // temp.push({
    //       //   name: res.myBudget[i].title,
    //       //   value: res.myBudget[i].budget,
    //       //   abs: Math.abs(res.myBudget[i].budget)
    //       // });
    //     }
    //     //debugger;
    //     const k = this.dataService.dataSource.datasets[0].data.length;
    //     this.sample = temp;
    //     this.svg = d3.select('#pie').select('svg');
    //     this.setSVGDimensions();
    //     this.color = d3.scaleOrdinal(d3.schemeCategory10);
    //     this.mainContainer = this.svg.append('g').attr('transform', `translate(${this.radius},${this.radius})`);
    //     this.pie = d3.pie().sort(null).value((d: any) => d.abs);
    //     this.draw();

    //   });
    // }else{
    //   for(var i= 0; i < this.dataService.dataSource.labels.length ; i++){
    //     temp.push({
    //       name: this.dataService.dataSource.labels[i],
    //       value: this.dataService.dataSource.datasets[0].data[i],
    //       abs: Math.abs(this.dataService.dataSource.datasets[0].data[i])
    //     });

    //   }


    // }
    //this.dataSource =this.dataService.testData();
    // this.radius = (Math.min(this.width, this.height)) / 2;
