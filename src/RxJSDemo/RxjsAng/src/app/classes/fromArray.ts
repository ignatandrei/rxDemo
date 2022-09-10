import { delay, from, interval, map, merge, mergeMap, Observable, take, tap } from "rxjs";
import { KeyValuePairNumber } from "../lists.service";

export class fromArray {
  public StringToSplit: string = 'Andrei,Ignat';
  public delayBetweenMilliseconds: number = 2000;


  constructor(o: Partial<fromArray>=null) {
    if (o == null)
      return;
    
      Object.keys(o).forEach(v => (this as any)[v] = o[v]);


  }
  public obs(): Observable<KeyValuePairNumber>{
    var arr= this.StringToSplit.split(',');
    var ret= 
      interval(this.delayBetweenMilliseconds)
      .pipe(
        // tap(it=>console.log(" interval " +it)),
        take(arr.length),
      map((index)=> {          
          var kvp=new KeyValuePairNumber();
          kvp.key=index+1;
          kvp.value=arr[index];
          return kvp;
        })
        
        );

      return ret;
  }

}
