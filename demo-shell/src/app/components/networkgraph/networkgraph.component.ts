import { Component, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { AppConfigService } from '@alfresco/adf-core';
import * as Highcharts from 'highcharts';
import HC_networkgraph from 'highcharts/modules/networkgraph';
HC_networkgraph(Highcharts);

import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'networkgraph',
  templateUrl: './networkgraph.component.html',
  styleUrls: ['./networkgraph.component.scss']
})
export class NetworkgraphComponent implements OnInit, OnChanges, AfterViewInit {

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    
  }

  acsHostName = this.appConfig.get<string>('BASE_URL'); 
  globalSearchUrl = this.acsHostName + "/alfresco/api/-default-/public/search/versions/1/search";

  updateFlag = false;
  previouslyClickedNode = "";
  graphData_network = [];
  graphData_section = [];
  graphData_L1_section = [];
  graphData_ALL_section = [];
  nodeMap = new Map();

  Highcharts: typeof Highcharts = Highcharts;


  chartOptions_network: Highcharts.Options = {
    colors: ['#058DC7', '#50B432', '#287a05', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: {
      text: "Boeing Writings - Network Graph Diagram"
    },

    chart: {
      type: 'networkgraph',
      height: '1000',
      width: '2000'
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
          linkLength: 50,
          friction: -0.9,
          initialPositions: 'random',
          maxIterations: 2000,
          type: 'reingold-fruchterman'
        }
      }
    },
    // tooltip:
    // {
    //   enabled: true,
    //   formatter: function () {
    //     return "<div> <span> My tooltip information </span> </div>"
    //   }
    // },

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
        data: this.graphData_network,
        cursor: 'pointer',
        point: {
          events: {
            click: ($event) => {
              // console.log('CLICKED !!! - thanks to the Custom Events plugin', $event.point['id']);
              // console.log('CLICKED !!! - thanks to the Custom Events plugin', $event.point['color']);
              // console.log('CLICKED !!! - thanks to the Custom Events plugin', $event.point['isRoot']);
              // console.log('CLICKED !!! - thanks to the Custom Events plugin', $event.point['nodeId']);
              var isShiftKeyPressed = $event.shiftKey;

              this.drillDownNetworkNode($event.point['id']);
              this.updateFlag = true;

              if(isShiftKeyPressed){
                console.log('Going to open Node ID >> ', this.nodeMap.get($event.point['id']));
                if (confirm('Are you sure to open this document (' + $event.point['id'] + ') in a new window ?')) {
                  window.open(this.acsHostName+'/ocms/Stage/controlleddocs/workspace://SpacesStore/223a2a78-be07-46c9-9980-320f3bd7de6b|workspace://SpacesStore/'+this.nodeMap.get($event.point['id']));
                }
              }else{
                confirm('Are you sure to expand the node ' + $event.point['id'] + ' ?');
              }
              
              this.chartOptions_network.series[0]['nodes'].forEach(
                elem => {
                  if(elem.id == $event.point['id']) {
                    elem.marker = { lineColor: "blue", lineWidth: 3 };
                    elem.color = Highcharts.getOptions().colors[2];
                  }
                  if(elem.id == this.previouslyClickedNode){
                    elem.marker = {};
                    elem.color = Highcharts.getOptions().colors[10];
                  }
                }
              );
              this.previouslyClickedNode = $event.point['id'];
            }
          }
        }
      }
    ]
  };


  chartOptions_section: Highcharts.Options = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    title: {
      text: "Boeing Writings - Section Graph Diagram"
    },

    chart: {
      type: 'networkgraph',
      height: '1000',
      width: '2000'
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
          linkLength: 75,
          friction: -0.9,
          initialPositions: "circle",
          maxIterations: 2000
          // type: 'reingold-fruchterman'
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
        data: this.graphData_section,
        cursor: 'pointer',
        point: {
          events: {
            click: ($event) => {
              console.log('CLICKED !!! - thanks to the Custom Events plugin >> ', $event.point['id']);
              this.drillDownSectionNode($event.point['id']);
            }
          }
        }

      }
    ]
  };




  title: string;
  queryText: string;
  showResultsArea = false;
  showSpinner = false;

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // this.getNetworkNodes().then((val) => { 
    //   this.graphData = val; 
    //   this.updateFlag = true;
    //   console.log('getcounts done'); 
    // });



    // this.chartOptions_network.series[0].events = {
    //   click: ($event) => {
    //     console.log(`Clicked on a node`, $event);
    //     // console.log(`Clicked on a node`, $event.point['id']);
    //     // this.drillDownNetworkNode($event.point['id']);
    //   }
    // };
  }

  ngOnChanges(): void {
    console.log('>>> CAPTURED AN ONCHANGE >>>');
  }






  // createGraph2() {
  //   this.graphData2 = [["aaa", "bbb"], ["aaa", "zzz"]];

  //   this.chartOptions2 = {
  //     colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
  //     title: {
  //       text: "Boeing Writings - Network Graph Diagram"
  //     },

  //     chart: {
  //       type: 'networkgraph',
  //       height: '1000',
  //       width: '1500'
  //     },

  //     plotOptions: {

  //       networkgraph: {
  //         // allowPointSelect: true,
  //         // clip: true,
  //         // lineWidth: 2000,

  //         dataLabels: {
  //           enabled: true,
  //           animation: true,
  //           borderRadius: 200,
  //           textPath: {
  //             enabled: true
  //           },
  //           linkFormat: '',
  //           allowOverlap: true
  //         },
  //         link: {
  //           color: 'red',
  //           dashStyle: 'LongDash'
  //         },
  //         keys: ['from', 'to'],
  //         layoutAlgorithm: {
  //           enableSimulation: false,
  //           linkLength: 25,
  //           friction: -0.9,
  //           initialPositions: "random",
  //           maxIterations: 2000,
  //           type: 'reingold-fruchterman'
  //         }
  //       }
  //     },

  //     // loadingOptions:{
  //     //   style:"highcharts-loading"
  //     // },

  //     series: [
  //       {
  //         showInLegend: false,
  //         allowPointSelect: false,
  //         draggable: true,
  //         marker: {
  //           radius: 30
  //         },
  //         type: 'networkgraph',
  //         dataLabels: {
  //           enabled: true
  //         },
  //         showCheckbox: true,
  //         showInNavigator: true,
  //         nodes: [
  //           {
  //             id: 'aaa',
  //             color: Highcharts.getOptions().colors[2]
  //           },
  //           {
  //             id: 'bbb',
  //             color: Highcharts.getOptions().colors[2]
  //           },
  //           {
  //             id: 'zzz',
  //             color: Highcharts.getOptions().colors[2]
  //           }
  //         ],
  //         data: []

  //         // data: this.initialNodes


  //         // data: this.waitAndGet()

  //         //data: []//this.waitAndGet()

  //       }
  //     ]
  //   };
  // }


  // createGraph() {

  //   this.graphData2 = [["aaa", "bbb"], ["aaa", "zzz"]];

  //   this.chartOptions.colors = ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'];
  //   this.chartOptions.title = { text: "Boeing Writings - Network Graph Diagram" };
  //   this.chartOptions.chart = { type: 'networkgraph', height: '1000', width: '1500' };
  //   this.chartOptions.plotOptions = {};

  //   this.chartOptions.plotOptions.networkgraph = {};
  //   this.chartOptions.plotOptions.networkgraph.dataLabels = {};
  //   this.chartOptions.plotOptions.networkgraph.dataLabels.textPath = {enabled: true};
  //   this.chartOptions.plotOptions.networkgraph.dataLabels.enabled = true;
  //   this.chartOptions.plotOptions.networkgraph.dataLabels.animation = true;
  //   this.chartOptions.plotOptions.networkgraph.dataLabels.borderRadius =200;
  //   this.chartOptions.plotOptions.networkgraph.dataLabels.linkFormat = '';
  //   this.chartOptions.plotOptions.networkgraph.dataLabels.allowOverlap = true;

  //   this.chartOptions.plotOptions.networkgraph.link = {};
  //   this.chartOptions.plotOptions.networkgraph.link.color = 'red';
  //   this.chartOptions.plotOptions.networkgraph.link.dashStyle = 'LongDash';

  //   this.chartOptions.plotOptions.networkgraph.keys = ['from', 'to'];

  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm = {};

  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm.enableSimulation = false;
  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm.linkLength = 25;
  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm.friction = -0.9;
  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm.initialPositions = "random";
  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm.maxIterations = 2000;
  //   this.chartOptions.plotOptions.networkgraph.layoutAlgorithm.type = 'reingold-fruchterman';

  //   this.chartOptions.series = [
  //     {
  //       showInLegend: false,
  //       allowPointSelect: false,
  //       draggable: true,
  //       marker: {
  //         radius: 30
  //       },
  //       type: 'networkgraph',
  //       dataLabels: {
  //         enabled: true
  //       },
  //       showCheckbox: true,
  //       showInNavigator: true,
  //       nodes: [],
  //       data: this.graphData2
  //     }];
  // }

  fetchData() {
    this.showSpinner = true;
    this.showResultsArea = true;
    this.updateFlag = true;
    this.fetchNetworkData();
  }

  fetchNetworkData() {
    console.log('Fetching Data >>> ', this.queryText);

    this.getNetworkNodes().then(() => {
      // this.graphData_network = val; 
      this.chartOptions_network.series[0]['data'] = this.graphData_network;
      this.chartOptions_section.series[0]['data'] = this.graphData_section;
      this.updateFlag = true;
      this.showSpinner = false;
      console.log('getcounts done');
    });

  }

  async getNetworkNodes() {
    const myNetworkDataList = [];
    const mySectionDataList = [];
    const levelOneDataList = [];

    if (this.queryText != "") {
      var myQuery = `{
        "query": {
          "query": "tsg:documentNumber:',${this.queryText},'"
        },
        "include": ["aspectNames", "properties"]
      }`;
      var rootNode = this.queryText;
      const headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", "Basic ZGVtbzpkZW1v");
      const response = await this.http.post<any>(this.globalSearchUrl, myQuery, { headers }).toPromise();
      const entries = response['list']['entries'];
      this.setNode(this.chartOptions_network, rootNode);
      if (entries && entries[0]) {
        // var nodeName = entries[0]['entry']['properties']['tsg:documentNumber'];
        // var nodeId = entries[0]['entry']['id'];
        // this.nodeMap.set(nodeName, nodeId);

        this.title = entries[0]['entry']['properties']['cm:title'];
        console.log('>>> TITLE >>>', this.title);

        const referenceDocsProperty = entries[0]['entry']['properties']['tsg:referenceDocuments'];
        if (referenceDocsProperty) {
          referenceDocsProperty.forEach(nodeName => {
            myNetworkDataList.push([this.queryText, nodeName]);
            this.setNode(this.chartOptions_network, nodeName);
          });
        }

        // console.log("referencesList", JSON.parse(referencesList));

        var referencesListProperty = entries[0]['entry']['properties']['boeing:referencesList'];
        if (referencesListProperty) {
          var referencesListJSON = referencesListProperty.replace(/(\\n)/g, "").replace(/(\\")/g, '"').replace(/(\\\\r)/g, "").replace(/(\\\\t)/g, " ").replace(/("{)/g, "{").replace(/(}")/g, "}");
          var referencesList = JSON.parse(referencesListJSON);

          // var referencesList = JSON.parse(entries[0]['entry']['properties']['boeing:referencesList'].replace(/(\\n)/g, "").replace(/(\\")/g, '"').replace(/(\\\\r)/g, "").replace(/(\\\\t)/g, " ").replace(/("{)/g, "{").replace(/(}")/g, "}"));
          referencesList.forEach(element => { levelOneDataList.push([this.queryText, element['sectionName']]); });
          referencesList.forEach(element => { mySectionDataList.push([this.queryText, element['sectionName']]); });
          referencesList.forEach(element => { mySectionDataList.push([element['sectionName'], element['hyperlinkName']]); });
          this.setNode(this.chartOptions_section, this.queryText);
        }

        this.graphData_network = myNetworkDataList;
        this.graphData_section = levelOneDataList;
        this.graphData_L1_section = levelOneDataList;
        this.graphData_ALL_section = mySectionDataList;
      }
    }

    // return myNetworkDataList;
  }

  setNodeMap(nodeName) {
    if (!this.nodeMap.has(nodeName)) {
      // this.nodeMap.set(nodeName, '-unknown-');
      this.getNodeId(nodeName).then((nodeId) => {
        this.nodeMap.set(nodeName, nodeId);
        console.log("Map Size", this.nodeMap.size)
        console.log(nodeName + " <<>> " + this.nodeMap.get(nodeName))
      });
    }
  }

  setNode(chartOptions, nodeName) {
    this.setNodeMap(nodeName);
    // setTimeout(() => {
    chartOptions.series[0]['nodes'].push({
      id: nodeName,
      root: (nodeName == this.queryText.toUpperCase),
      color: ((nodeName == this.queryText) ? Highcharts.getOptions().colors[2] : Highcharts.getOptions().colors[10]),
      isRoot: (nodeName == this.queryText.toUpperCase),
      nodeId: "-unknown-for-me-"
    });
    // }, 5000);

  }

  async getNodeId(nodeName) {
    var myQuery = `{
      "query": {
        "query": "tsg:documentNumber:',${nodeName},'"
      }
    }`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", "Basic ZGVtbzpkZW1v");
    const response = await this.http.post<any>(this.globalSearchUrl, myQuery, { headers }).toPromise();
    const entries = response['list']['entries'];
    var nodeId = '-unknown-';

    if (entries && entries[0]) {
      nodeId = entries[0]['entry']['id'];
    }

    return nodeId;
  }


  async drillDownNetworkNode(nodeName) {
    this.updateFlag = true;
    console.log('START of drillDownNetworkNode for >> ', nodeName);
    var myQuery = `{
      "query": {
        "query": "tsg:documentNumber:',${nodeName},'"
      },
      "include": ["aspectNames", "properties"]
    }`;
    const headers = new HttpHeaders().set("Content-Type", "application/json").set("Authorization", "Basic ZGVtbzpkZW1v");
    const response = await this.http.post<any>(this.globalSearchUrl, myQuery, { headers }).toPromise();
    const entries = response['list']['entries'];

    if (entries && entries[0]) {
      const referenceDocsProperty = entries[0]['entry']['properties']['tsg:referenceDocuments'];
      if (referenceDocsProperty) {
        referenceDocsProperty.forEach(element => { this.graphData_network.push([nodeName, element]); });
      }
    }
    this.updateFlag = true;
    console.dir(this.graphData_network)
  }


  drillDownSectionNode(nodeName) {
    this.updateFlag = true;
    console.log('START of drillDownSectionNode for >> ', nodeName);
    console.log('this.graphData_ALL_section length >> ', this.graphData_ALL_section.length);
    console.log('this.graphData_section length >> ', this.graphData_section.length);

    this.graphData_ALL_section.forEach((element) => {
      if (element[0] == nodeName) {
        console.log("Adding >> ", element)
        this.chartOptions_section.series[0]['data'].push(element);
      }
    });
  }

  openinnewwindow(){
    console.log(">>> openinnewwindow >>>");
    window.open("http://localhost:3000/#/boeing-network");
  }

  reload(){
    this.fetchData();
  }

  routeToPolicyTree(){
    window.open("http://localhost:3000/#/policy-tree");
  }

}
