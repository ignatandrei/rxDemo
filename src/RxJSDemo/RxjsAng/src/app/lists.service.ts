import { KeyValue } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OperatorsUnary, unaryOperators } from './classes/unaryOperators';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  baseUrl: string = environment.url;
  
  constructor(private http: HttpClient) { }
  public urlNumbers(fromNumber: number, count: number,repeat:number, delaySec: number): string {
   return (this.baseUrl + "Lists/GetNumbers/" + fromNumber + "/" + count + "/" + repeat +"/"+ delaySec);
    }
  
  
  
  public GetNumbersObservable(fromNumber: number, count: number,repeat:number, delaySec: number): Observable<KeyValuePairNumber> {
    var url = this.urlNumbers(fromNumber,count,repeat,delaySec);
    return this.fromFetchStream(url).pipe(map(it=>new KeyValuePairNumber(it)));
  }
  public urlCountries(name: string, milliSecondsDelay: number){
      return (this.baseUrl + "Lists/GetCountries/" + name + "/" + milliSecondsDelay);
  }
  public GetCountriesObservable(name: string, milliSecondsDelay: number): Observable<KeyValuePairNumber> {
    var url = this.urlCountries(name,milliSecondsDelay);
    return this.fromFetchStream(url).pipe(map(it=>new KeyValuePairNumber(it)));
  }


  //https://gist.github.com/markotny/d21ef4e1af3d6ea5332b948c9c9987e5
  //https://medium.com/@markotny97/streaming-iasyncenumerable-to-rxjs-front-end-8eb5323ca282
  public fromFetchStream<T>(input: RequestInfo, init?: RequestInit): Observable<T> {
    return new Observable<T>(observer => {
      const controller = new AbortController();

      fetch(input, { ...init, signal: controller.signal })
        .then(async response => {
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('Failed to read response');
          }
          const decoder = new JsonStreamDecoder();

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (!value) continue;

            decoder.decodeChunk<T>(value, item => observer.next(item));
          }
          observer.complete();
          reader.releaseLock();
        })
        .catch(err => observer.error(err));

      return () => controller.abort();
    });
  }

}

export class KeyValuePairNumber{
  constructor(private o: Partial<KeyValuePairNumber> = null) {
    this.RecTime=new Date();
    if (o == null)
      return;
    Object.keys(o).forEach(v => (this as any)[v] = o[v]);
    this.RecTime=new Date();
  }
  public key: number;
  public value: string;
  public finish: boolean = false;
  public start: boolean = true;
  public RecTime:Date;
}

class JsonStreamDecoder {
  /** item starts and ends at level 0 */
  private level = 0;

  /** when an item is split in two */
  private partialItem = '';

  private decoder = new TextDecoder();

  public decodeChunk<T>(
    value: Uint8Array,
    decodedItemCallback: (item: T) => void
  ): void {
    const chunk = this.decoder.decode(value);
    let itemStart = 0;

    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] === JTOKEN_START_OBJECT) {
        if (this.level === 0) {
          itemStart = i;
        }
        this.level++;
      }
      if (chunk[i] === JTOKEN_END_OBJECT) {
        this.level--;
        if (this.level === 0) {
          let item = chunk.substring(itemStart, i + 1);
          if (this.partialItem) {
            item = this.partialItem + item;
            this.partialItem = '';
          }
          decodedItemCallback(JSON.parse(item));
        }
      }
    }
    if (this.level !== 0) {
      this.partialItem = chunk.substring(itemStart);
    }
  }
}
const JTOKEN_START_OBJECT = '{';
const JTOKEN_END_OBJECT = '}';
