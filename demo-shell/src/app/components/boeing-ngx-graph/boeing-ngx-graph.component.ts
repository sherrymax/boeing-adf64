import { Component, OnInit } from '@angular/core';
// import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './boeing-ngx-graph.component.html',
  styleUrls: ['./boeing-ngx-graph.component.css']
})
export class BoeingNgxGraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // const ctx = document.getElementById('my-chart') as HTMLCanvasElement;
  //   const myChart = new Chart(ctx, {
  //     type: 'network',
  //     data: {
  //       nodes: [
  //         { id: 1, label: 'Node 1' },
  //         { id: 2, label: 'Node 2' },
  //         { id: 3, label: 'Node 3' }
  //       ],
  //       edges: [
  //         { from: 1, to: 2 },
  //         { from: 2, to: 3 },
  //         { from: 3, to: 1 }
  //       ]
  //     },
  //     options: {
  //       layout: {
  //         hierarchical: {
  //           enabled: true
  //         }
  //       }
  //     }
  //   });
  }

}