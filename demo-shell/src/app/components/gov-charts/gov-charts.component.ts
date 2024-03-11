/* eslint-disable @cspell/spellchecker */
/* eslint-disable license-header/header */
/* eslint-disable @typescript-eslint/brace-style */
/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable license-header/header */
/* eslint-disable no-console */
/* eslint-disable license-header/header */
/* eslint-disable no-trailing-spaces */
/* eslint-disable license-header/header */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @typescript-eslint/quotes */

//reference for subscribe and forkjoin: https://stackblitz.com/edit/angular-ivy-pht1qw?file=src%2Fapp%2Fapp.component.ts,src%2Fapp%2Fapp.module.ts

import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
// import { Observable, of } from 'rxjs';
// import { Node } from '@alfresco/js-api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { forkJoin, of } from 'rxjs';
@Component({
  selector: 'gov-charts',
  templateUrl: './gov-charts.component.html',
  styleUrls: ['./gov-charts.component.css']
})
export class GovChartsComponent implements OnInit, AfterViewInit {


  //********variables********

  ctx: any;
  public chart: any = [];
  @ViewChild('MyChart') canvasRef: ElementRef;
  //replace global below with entry from env file
  globalSearchUrl = "http://rwilds741.alfdemo.com/alfresco/api/-default-/public/search/versions/1/search";
  //globalSearchUrl = "http://localhost:4200/alfresco/api/-default-/public/search/versions/1/search";
  response: any;
  holdCount: number;
  readyForDestructCount: number;
  incompleteCount: number;
  readyForCutoffCount: number;
  tempVal: number;
  chartData: any;

  holdQuery: string = `{
    "query": {
    "query": "ASPECT:\\"rma:frozen\\""
    }
    }`;

  readyForDestructQuery = `{
    "query": {
    "query": "rma:recordSearchDispositionActionName:'destroy'"
    }
    }`;

  readyForCutOffQuery = `{
    "query": {
    "query": "ASPECT:\\"rma:cutoff\\""
    }
    }`;

  incompleteQuery = `{
    "query": {
      "query": "rma:recordSearchHasDispositionSchedule:false AND NOT ASPECT:\\"rma:declaredRecord\\""
    },
    "fields": ["count"]
  }`;

  testQuery = `{
    "query": {
      "query": "foo"
    }
  }`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    //this.getCounts().subscribe( (countArray) => {console.log("counts from subscribe: " + countArray);});
  }
  ngAfterViewInit() {

    //alert('in afterview');
    this.getCounts().then((val) => { this.chartData = val; this.createChart(); console.log('getcounts done'); });

  }

  //********functions********

  async getCounts() {


    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", "Basic ZGVtbzpkZW1v");

    const holdval = await this.http.post(this.globalSearchUrl, this.holdQuery, { headers }).toPromise();
    const holdCount = holdval['list']['pagination']['count'];

    const rfdval = await this.http.post(this.globalSearchUrl, this.readyForDestructQuery, { headers }).toPromise();
    const rfdCount = rfdval['list']['pagination']['count'];

    const incompleteval = await this.http.post(this.globalSearchUrl, this.incompleteQuery, { headers }).toPromise();
    const incompleteCount = incompleteval['list']['pagination']['count'];

    const rfcval = await this.http.post(this.globalSearchUrl, this.readyForCutOffQuery, { headers }).toPromise();
    const rfcCount = rfcval['list']['pagination']['count'];

    //console.log('all Counts inside async: ' + holdCount + ' ' + rfdCount + ' ' + incompleteCount + ' ' + rfcCount);
    console.log([rfcCount, incompleteCount, holdCount, rfdCount]);

    return [rfcCount, incompleteCount, holdCount, rfdCount];
  }

  createChart() {
    // console.log('chart data is: ' + val + ' ' + this.chartData);
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: ['CutOff', 'Incomplete', 'Hold', 'DeleteReady'],
        datasets: [{
          label: 'Status Count',
          data: this.chartData,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        //cutoutPercentage: 40,
        responsive: false

      }
    });

  }


}
