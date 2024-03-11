import { Component, OnInit, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_networkgraph from 'highcharts/modules/networkgraph';
HC_networkgraph(Highcharts);

@Component({
  selector: 'sectiongraph',
  templateUrl: './sectiongraph.component.html',
  styleUrls: ['./sectiongraph.component.css']
})
export class SectiongraphComponent implements OnInit, OnChanges {

  layer1 = [["POL-1", "PRO-1"]];
  layer2 = [["PRO-1", "Purpose"],
  ["PRO-1", "Authority Reference"],
  ["PRO-1", "A. Scope"],
  ["PRO-1", "B. Introduction"],
  ["PRO-1", "D. Process Steps"],
  ["PRO-1", "G. References"]];
  layer3 = [["Purpose", "PP&P Writing Management Guidance"]];
  layer4 = [["Authority Reference", "298-15-04138"]];
  layer5 = [["A. Scope", "OnePPPM"]];
  layer6 = [["B. Introduction", "298-19-05048"]];
  layer7 = [["D. Process Steps", "Service Request"],
  ["D. Process Steps", "298-19-05048"],
  ["D. Process Steps", "298-19-05048"]];
  layer8 = [["G. References", "298-15-04138"],
  ["G. References", "298-19-05048"],
  ["G. References", "392-15-00000"],
  ["G. References", "392-19-00000"],
  ["G. References", "392-19-00001"],
  ["G. References", "392-19-00003"],
  ["G. References", "392-19-00004"],
  ["G. References", "392-19-00008"],
  ["G. References", "682-23-00007"],
  ["G. References", "Approved Quality System List"],
  ["G. References", "BPI-1285"],
  ["G. References", "CM&R User Guide"],
  ["G. References", "ODA-300064-NM", "G. References"]];


  nest1 = [["PRO-13"]];
  nest2 = [["PRO-13", "Purpose"], ["PRO-13", "1. Requirements"]];
  nest3 = [["Purpose", "PRO-5213"], ["Purpose", "PRO-6608"], ["Purpose", "PRO-865"]];
  nest4 = [["1. Requirements", "PRO-6562"], ["1. Requirements", "PRO-1557"], ["1. Requirements", "PRO-5181"], ["1. Requirements", "PRO-6523"], ["1. Requirements", "PRO-6933"], ["1. Requirements", "PRO-6960"], ["1. Requirements", "PRO-70"], ["1. Requirements", "PRO-2227"], ["1. Requirements", "PRO-251"]];

  Highcharts: typeof Highcharts = Highcharts;
  queryText: string;

  chartOptions: Highcharts.Options = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: {
      text: "Boeing Policy Document Reference Diagram"
    },

    chart: {
      type: 'networkgraph',
      height: '1000',
      width: '1500'
    },

    plotOptions: {

      networkgraph: {
        // allowPointSelect: true,
        // clip: true,
        // lineWidth: 2000,

        dataLabels: {
          enabled: true,
          animation: true,
          borderRadius: 200,
          textPath: {
            enabled: true
          },
          linkFormat: '',
          allowOverlap: true
        },
        link: {
          color: 'red',
          dashStyle: 'LongDash'
        },
        keys: ['from', 'to'],
        layoutAlgorithm: {
          enableSimulation: false,
          linkLength: 25,
          friction: -0.9,
          initialPositions: "random",
          maxIterations: 2000,
          type: 'reingold-fruchterman'
        }
      }
    },

    // loadingOptions:{
    //   style:"highcharts-loading"
    // },

    series: [
      {
        showInLegend: false,
        allowPointSelect: false,
        draggable: true,
        marker: {
          radius: 30
        },
        type: 'networkgraph',
        dataLabels: {
          enabled: true
        },
        showCheckbox: true,
        showInNavigator: true,
        nodes: [],
        

        // data: this.nest1
       
        
        data: [
          ["PRO-13", "Purpose"],
          ["PRO-13", "1. Requirements"],
          ["PRO-13", "2. Responsibilities"],
          ["PRO-13", "3. Terms"],

          ["Purpose", "PRO-5213"],
          ["Purpose", "PRO-6608"],
          ["Purpose", "PRO-865"],

          ["1. Requirements", "PRO-6562"],
          ["1. Requirements", "PRO-1557"],
          ["1. Requirements", "PRO-5181"],
          ["1. Requirements", "PRO-6523"],
          ["1. Requirements", "PRO-6933"],
          ["1. Requirements", "PRO-6960"],
          ["1. Requirements", "PRO-70"],
          ["1. Requirements", "PRO-2227"],
          ["1. Requirements", "PRO-251"]
        ]
        
        // links: [
          // {from:"PRO-13", to: "Purpose"},
        //   {from:"PRO-13", to: "1. Requirements"},

        //   {from:"Purpose", to: "PRO-5213"},
        //   {from:"Purpose", to: "PRO-6608"},
        //   {from:"Purpose", to: "PRO-865"},

        //   {from:"1. Requirements", to: "PRO-6562"},
        //   {from:"1. Requirements", to: "PRO-1557"},
        //   {from:"1. Requirements", to: "PRO-5181"},
        //   {from:"1. Requirements", to: "PRO-6523"},
        //   {from:"1. Requirements", to: "PRO-6933"},
        //   {from:"1. Requirements", to: "PRO-6960"},
        //   {from:"1. Requirements", to: "PRO-70"},
        //   {from:"1. Requirements", to: "PRO-2227"},
        //   {from:"1. Requirements", to: "PRO-251"}
        // ]
          
        


      }
    ]
  };

  ngOnChanges(){
    var masterData = [
      ["PRO-13", "Purpose"],
      ["PRO-13", "1. Requirements"],

      ["Purpose", "PRO-5213"],
      ["Purpose", "PRO-6608"],
      ["Purpose", "PRO-865"],

      ["1. Requirements", "PRO-6562"],
      ["1. Requirements", "PRO-1557"],
      ["1. Requirements", "PRO-5181"],
      ["1. Requirements", "PRO-6523"],
      ["1. Requirements", "PRO-6933"],
      ["1. Requirements", "PRO-6960"],
      ["1. Requirements", "PRO-70"],
      ["1. Requirements", "PRO-2227"],
      ["1. Requirements", "PRO-251"]
    ];

    this.chartOptions.series[0].events = {
      click: ($event) => {
        console.log(`Clicked on a node`, $event.point['id']);
        var isRoot = $event.point['isRoot'];
        var isLeaf = $event.point['isLeaf'];

        console.log('isRoot >> ', isRoot);
        console.log('isLeaf >> ', isLeaf);

        // this.chartOptions.series[0]['data'] = [this.nest1, this.nest2]
        // Perform an action here
        if(isLeaf && confirm('Are you sure to open this document ('+ $event.point['id'] +') in a new window ?')){
          window.open('http://ec2-54-152-185-130.compute-1.amazonaws.com/ocms/Stage/controlleddocs/workspace://SpacesStore/6fb034c4-0493-4662-90b5-6e134e54f412|workspace://SpacesStore/38f20b07-ac06-4a01-bdaf-9899569c6746');
        }else{
          masterData.find(
            (node) => {
              // console.log('node[0] = ', node[0]);
              // console.log('$event.point["id"]', $event.point['id']);

              if(node[0] == $event.point['id']){
                console.log('Length BEFORE >>> ', this.chartOptions.series[0]['data'].length);
                this.chartOptions.series[0]['data'].push(node);
                console.log('Length AFTER >>> ', this.chartOptions.series[0]['data'].length);
                this.chartOptions.series[0]['nodes'].find(
                  node => {
                    node.visible = true;
                  }
                );


              }
            }
          )
        }

        // console.log('Data Length BEFORE = ', this.chartOptions.series[0]['data'].length);
        // this.chartOptions.series[0]['data'].push(this.nest2);
        // console.log('Data Length AFTER = ', this.chartOptions.series[0]['data'].length);


        // Highcharts.chart(this.chartOptions).update(this.chartOptions);

        const nextNodeId = $event.point['id'];
        console.log('nextNodeId >> ', nextNodeId);
        // Get the next node
        const nextNode = this.chartOptions.series[0]['data'].find(
          node => {
            if(node[0] == nextNodeId){
              console.dir(node);
            }
          }
        );

        console.dir(nextNode);
        // Display the next node
        // this.chartOptions.series[0].addPoint(nextNode);
      }
    };

  }
  
  ngOnInit() {

    var masterData = [
      ["PRO-13", "Purpose"],
      ["PRO-13", "1. Requirements"],

      ["Purpose", "PRO-5213"],
      ["Purpose", "PRO-6608"],
      ["Purpose", "PRO-865"],

      ["1. Requirements", "PRO-6562"],
      ["1. Requirements", "PRO-1557"],
      ["1. Requirements", "PRO-5181"],
      ["1. Requirements", "PRO-6523"],
      ["1. Requirements", "PRO-6933"],
      ["1. Requirements", "PRO-6960"],
      ["1. Requirements", "PRO-70"],
      ["1. Requirements", "PRO-2227"],
      ["1. Requirements", "PRO-251"]
    ];

    var rootNodeId = masterData[0][0];
    console.log('rootNode >> ', rootNodeId);

    masterData.find(
      (node) => {
        if(node[0] == rootNodeId){
          this.chartOptions.series[0]['data'].push(node);
        }
      }
    )



    this.chartOptions.series[0].events = {
      click: ($event) => {
        console.log(`Clicked on a node`, $event.point['id']);
        var isRoot = $event.point['isRoot'];
        var isLeaf = $event.point['isLeaf'];

        console.log('isRoot >> ', isRoot);
        console.log('isLeaf >> ', isLeaf);

        // this.chartOptions.series[0]['data'] = [this.nest1, this.nest2]
        // Perform an action here
        if(isLeaf && confirm('Are you sure to open this document ('+ $event.point['id'] +') in new window ?')){
          let URL = 'http://ec2-54-152-185-130.compute-1.amazonaws.com/ocms/Stage/controlleddocs/workspace://SpacesStore/6fb034c4-0493-4662-90b5-6e134e54f412|workspace://SpacesStore/'+$event.point['nodeId'];
          window.open(URL);
        }else{
          masterData.find(
            (node) => {
              // console.log('node[0] = ', node[0]);
              // console.log('$event.point["id"]', $event.point['id']);

              if(node[0] == $event.point['id']){
                console.log('Length BEFORE >>> ', this.chartOptions.series[0]['data'].length);
                this.chartOptions.series[0]['data'].push(node);
                console.log('Length AFTER >>> ', this.chartOptions.series[0]['data'].length);
                this.chartOptions.series[0]['nodes'].find(
                  node => {
                    if(node[0] == $event.point['id']){
                      node.visible = true;
                    }
                  }
                );


              }
            }
          )
        }

        // console.log('Data Length BEFORE = ', this.chartOptions.series[0]['data'].length);
        // this.chartOptions.series[0]['data'].push(this.nest2);
        // console.log('Data Length AFTER = ', this.chartOptions.series[0]['data'].length);


        // Highcharts.chart(this.chartOptions).update(this.chartOptions);

        const nextNodeId = $event.point['id'];
        console.log('nextNodeId >> ', nextNodeId);
        // Get the next node
        const nextNode = this.chartOptions.series[0]['data'].find(
          node => {
            if(node[0] == nextNodeId){
              console.dir(node);
            }
          }
        );

        console.dir(nextNode);
        // Display the next node
        // this.chartOptions.series[0].addPoint(nextNode);
      }
    };

    this.chartOptions.series[0]['nodes'].push(
      {
        id: 'PRO-13',
        color: Highcharts.getOptions().colors[2],
        isRoot: true,
        isLeaf: false,
        nodeId: '38f20b07-ac06-4a01-bdaf-9899569c6746'
      },
      {
        id: 'PRO-5213',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: '0375f0b0-b256-48cc-bde8-d2886051d7ad'
      },
      {
        id: 'PRO-6608',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: '52361fc1-a886-4dbd-8390-9d78ee3041a4'
      },
      {
        id: 'PRO-865',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: 'e0f0aaed-be7b-4d2a-91eb-da5935e9753a'
      },
      {
        id: 'PRO-6562',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: 'a43169a7-50b5-4a0f-a496-02f06f1d8d9f'
      },
      {
        id: 'PRO-1557',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: '50fbeedd-d78a-4561-9c22-1bc4370b1875'
      },
      {
        id: 'PRO-5181',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: '5979c4a0-2022-4772-9271-73cbdafe47f0'
      },
      {
        id: 'PRO-6523',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: ''
      },
      {
        id: 'PRO-6933',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: '1acf8719-63f5-4373-94d5-93fb7f626d1f'
      },
      {
        id: 'PRO-6960',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: ''
      },
      {
        id: 'PRO-70',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: ''
      },
      {
        id: 'PRO-2227',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: ''
      },
      {
        id: 'PRO-251',
        color: Highcharts.getOptions().colors[8],
        isRoot: false,
        isLeaf: true,
        visible:true,
        nodeId: ''
      });



  }

  fetchData(){

  }





}


