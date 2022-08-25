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


  constructor() { }
  nr = 0;
  constructMermaind() {
   

    const element: any = this.mermaidDiv.nativeElement;
    var graphDefinition = 'graph LR ' + '\r\n';
    // console.log(this.data.length);
    // console.log(this.data);
    if (this.data.length == 0) {
      graphDefinition += 'id((NoData))';
    }
    else if (this.data.length == 1) {
      graphDefinition += `id${this.data[0].key}((${this.data[0].value}))`;
    }
    else {
      for (var i = 1; i < this.data.length; i++) {
        graphDefinition += `id${this.data[i - 1].key}((${this.data[i - 1].value}))-->id${this.data[i].key}((${this.data[i].value}))` + '\r\n';
      }
    }
    //id1([This is the text in the box])

    // console.log(graphDefinition);
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
