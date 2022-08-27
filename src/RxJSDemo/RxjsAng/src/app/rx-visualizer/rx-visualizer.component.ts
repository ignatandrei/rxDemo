import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import  mermaid from "mermaid";
import { KeyValuePairNumber } from '../lists.service';
@Component({
  selector: 'app-rx-visualizer',
  templateUrl: './rx-visualizer.component.html',
  styleUrls: ['./rx-visualizer.component.css']
})
export class RxVisualizerComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('mermaid', { static: true }) mermaidDiv: ElementRef;
  config = {
    startOnLoad: true,
    flowchart: {
      useMaxWidth: true,  
      htmlLabels: true,
      curve: 'cardinal'
    },
    securityLevel: 'loose',
  };


  @Input()
  rxName: string = "asdasdasdasd";

  @Input()
  data: KeyValuePairNumber[] = [];

  @Input()
  dataPiped: KeyValuePairNumber[] = [];

  constructor() { }
  nr = 0;
  private mermaindNodes(dataArr: KeyValuePairNumber[],name:string) {
    var str = "";
    if (dataArr.length == 0) {
      str += 'id((NoData))' + '\r\n';
    }
    else if (this.data.length == 1) {
      str += `id${name+dataArr[0].key}((${dataArr[0].value}))` + '\r\n';
    }
    else {
      for (var i = 1; i < dataArr.length; i++) {
//        str += `id${name + dataArr[i - 1].key}((${dataArr[i - 1].value}))--${dataArr[i - 1].key}my${dataArr[i].key}-->id${name +dataArr[i].key}((${dataArr[i].value}))` + '\r\n';
        str += `id${name + dataArr[i - 1].key}((${dataArr[i - 1].value}))-->id${name + dataArr[i].key}((${dataArr[i].value}))` + '\r\n';
      }
    }
    return str;
  }
  constructMermaind() {
   

    const element: any = this.mermaidDiv.nativeElement;
    var graphDefinition = 'graph LR ' + '\r\n';
    graphDefinition = 'flowchart LR' + '\r\n';
    graphDefinition += "subgraph original" + '\r\n';
    graphDefinition += "direction LR" + '\r\n';
    // console.log(this.data.length);
    // console.log(this.data);
    graphDefinition += this.mermaindNodes(this.data,"orig");
    graphDefinition +=  "end" + '\r\n';
    graphDefinition += "subgraph piped" + '\r\n';
    graphDefinition += "direction LR" + '\r\n';
    // console.log(this.data.length);
    // console.log(this.data);
    graphDefinition += this.mermaindNodes(this.dataPiped,"piped");
    graphDefinition += "end" + '\r\n';

    if (this.dataPiped.length > 0) {
      for (var i = 0; i < this.dataPiped.length; i++) {
        var key = this.dataPiped[i].key;
        if (this.data.length > 0) {
          var existing = this.data.find(it => it.key == key);
          if (existing) {
            var existing = this.data[i];
            //graphDefinition += `idpiped${this.dataPiped[i].key}<-->idorig${existing.key}` + '\r\n';
          }
        }

      }

    }
    //id1([This is the text in the box])

    console.log(graphDefinition);


    this.nr++;
    // console.log(this.nr);
    mermaid.render('graphDiv'+this.rxName + this.nr, graphDefinition, (svgCode,bindFunctions) => {
      element.innerHTML = svgCode;
      bindFunctions(element);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('on changes');
      this.constructMermaind();
    }
  ngAfterViewInit(): void {
    mermaid.initialize(this.config);
    mermaid.init();
      this.constructMermaind();
    }

  ngOnInit(): void {
  }

}
