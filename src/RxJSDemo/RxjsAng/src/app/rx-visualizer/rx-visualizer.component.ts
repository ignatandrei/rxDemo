import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import mermaid from "mermaid";
import { TimeInterval } from 'rxjs';
import { KeyValuePairNumber } from '../lists.service';
@Component({
  selector: 'app-rx-visualizer',
  templateUrl: './rx-visualizer.component.html',
  styleUrls: ['./rx-visualizer.component.css']
})
export class RxVisualizerComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild('mermaid', { static: true })
  mermaidDiv: ElementRef;

  @ViewChild('mermaidGannt', { static: true })
  mermaidGanntDiv: ElementRef;

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
  rxName: string = "";

  @Input()
  rxName2: string = "";

  @Input()
  data: KeyValuePairNumber[] = [];

  @Input()
  dataPiped: KeyValuePairNumber[] = [];

  constructor() { }
  nr = 0;
  private mermaindNodes(dataArr: KeyValuePairNumber[], name: string) {
    var str = "";
    if (dataArr.length == 0) {
      str += 'id((NoData))' + '\r\n';
    }
    else if (dataArr.length == 1) {
      str += `id${name + dataArr[0].key}((${dataArr[0].value}))` + '\r\n';
    }
    else {
      for (var i = 1; i < dataArr.length; i++) {
        // var totalInterv = dataArr
        //   .filter((v, index) => index <= i)
        //   .reduce((accumVariable, curValue) => accumVariable + curValue.interval, 0);

        //var interv = (dataArr[i].interval / 1000).toFixed(0) + " sec";
        //var totalInterv =100000;
        var totalInterv =dataArr[i].RecTime.getTime()-dataArr[i-1].RecTime.getTime();;
        
        var interv = (totalInterv / 1000).toFixed(0) + " sec";
        
        

        str += `id${name + dataArr[i - 1].key}((${dataArr[i - 1].value}))-->|${interv}|id${name + dataArr[i].key}((${dataArr[i].value}))` + '\r\n';
        //str += `id${name + dataArr[i - 1].key}((${dataArr[i - 1].value}))-->|${interv} , ${this.dateFromString(dataArr[i].RecTime)}|id${name + dataArr[i].key}((${dataArr[i].value}))` + '\r\n';
        
      }
    }
    return str;
  }
  dateFromString(d: Date): string{
    if(d)
      return d.getMinutes()+"m"+ d.getSeconds()+"s";
    else
      return "noDate";
  }
  constructMermaind() {
    const element: any = this.mermaidDiv.nativeElement;
    var graphDefinition = 'graph LR ' + '\r\n';
    graphDefinition = 'flowchart LR' + '\r\n';
    graphDefinition += "subgraph "+ this.rxName2 + '\r\n';
    graphDefinition += "direction LR" + '\r\n';
    // console.log(this.data.length);
    // console.log(this.data);
    graphDefinition += this.mermaindNodes(this.dataPiped, "piped");
    graphDefinition += "end" + '\r\n';
    graphDefinition += "subgraph "+ this.rxName + '\r\n';
    graphDefinition += "direction LR" + '\r\n';
    // console.log(this.data.length);
    // console.log(this.data);
    graphDefinition += this.mermaindNodes(this.data, "orig");
    graphDefinition += "end" + '\r\n';

    //id1([This is the text in the box])
    //    graphDefinition = `gantt 
    //dateFormat HH:mm:ss
    //axisFormat %H:%M:%S
    //section First
    //Andrei1 : milestone, m1, 17:49:47,1sec
    //Andrei3 : milestone, m1, 17:49:53,1sec
    //section  Separator
    //Separator           :a1, 17:49:47, 50sec
    //section  Second
    //Andrei7 : milestone, m1, 17:49:47,1sec
    //Andrei2 : milestone, m1, 17:50:03,1sec
    //Andrei9 : milestone, m1, 17:50:33,1sec
    //`;
    //    console.log(graphDefinition);


    this.nr++;
    // console.log(this.nr);
    mermaid.render('graphDiv' + this.rxName + this.nr, graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
      bindFunctions(element);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataPiped.length > 0) {
      this.dataPiped[0].value = "Start"+this.rxName2;
    }
    this.constructMermaind();
    var b = (this.data.findIndex(it => it.finish === true, 0) > 0) && (this.dataPiped.findIndex(it => it.finish === true, 0) > 0);
    //if (b)
    {
      // console.log('done ' + b);
      // console.log(this.data);
      // console.log(this.dataPiped);
      this.constructGantt();
    }


  }
  ngAfterViewInit(): void {
    mermaid.initialize(this.config);
    mermaid.init();

    this.constructMermaind();
    //this.constructGantt();
  }
  with2Digits(a: number):string {
    var x = a.toFixed(0);
    if (x.length == 1)
      x = "0" + x;

    return x;
    }
  ngOnInit(): void {
  }

  private constructGanntFromData(dt:Date,dataToSum: KeyValuePairNumber[]):string {

    var msOrig = "";
    var intSec = 0;
    for (var i = 0; i < dataToSum.length ; i++) {
      //intSec = parseInt((dataToSum[i].interval / 1000).toFixed(0), 10);
      //intSec =10;
      //dt.setSeconds(dt.getSeconds() + 10);
      var dt = dataToSum[i].RecTime;
      var h = this.with2Digits(dt.getHours()) + ":" + this.with2Digits(dt.getMinutes()) + ":" + this.with2Digits(dt.getSeconds());
      msOrig += " " + dataToSum[i].value + " : milestone, m1, " + h + ",1sec" + '\r\n';
      
    }
    return msOrig;
  }
  constructGantt() {
    if(this.data.length<1)
      return;
    if(this.data[0] == null)
      return;
    var dt = this.data[0].RecTime;
    var h = this.with2Digits(dt.getHours()) + ":" + this.with2Digits(dt.getMinutes()) + ":" + this.with2Digits(dt.getSeconds());

    var msOrig = this.constructGanntFromData(new Date(dt),this.data);
    var msPiped = this.constructGanntFromData(new Date(dt) ,this.dataPiped);
//    var graphDefinition = `gantt
//dateFormat HH:mm:ss
//axisFormat %H:%M:%S
//section First
//Andrei1 : milestone, m1, 17:49:47,1sec
//Andrei3 : milestone, m1, 17:49:53,1sec
//section  Separator
//Separator           :a1, 17:49:47, 50sec
//section  Second
//Andrei7 : milestone, m1, 17:49:47,1sec
//Andrei2 : milestone, m1, 17:50:03,1sec
//Andrei9 : milestone, m1, 17:50:33,1sec
//`;
    // var durOrig = this.data.reduce((accumVariable, curValue) => accumVariable + curValue.interval, 0);
    // var durPipe = this.dataPiped.reduce((accumVariable, curValue) => accumVariable + curValue.interval, 0);
    var durOrig =this.data[this.data.length-1].RecTime.getTime()-this.data[0].RecTime.getTime();
    var durPipe=this.dataPiped[this.dataPiped.length-1].RecTime.getTime()-this.dataPiped[0].RecTime.getTime();
    ;
    var maxDur = durOrig > durPipe ? durOrig : durPipe;
    if(maxDur % 2 == 1)
      maxDur+=1;
    
    maxDur = parseInt((maxDur / 1000).toFixed(0), 10);
    maxDur += 1;
    var graphDefinition = `gantt
dateFormat HH:mm:ss
axisFormat %H:%M:%S
section ${this.rxName}
${msOrig}
section  Separator
Separator           :a1, ${h}, ${maxDur}sec
section  Piped
${msPiped}
`;

    // console.log(graphDefinition);
    const element: any = this.mermaidGanntDiv.nativeElement;

    
    mermaid.render('graphGannt' + this.rxName + this.nr, graphDefinition, (svgCode, bindFunctions) => {
      element.innerHTML = svgCode;
      bindFunctions(element);
    });
  }

}

