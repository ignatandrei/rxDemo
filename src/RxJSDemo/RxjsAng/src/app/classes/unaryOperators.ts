import {
  Observable,
  map,
  tap,
  first,
  skip,
  skipLast,
  take,
  takeLast,
  elementAt,
  distinct,
  distinctUntilChanged,
  startWith,
  delay,
  debounceTime,
  debounce
} from 'rxjs';
import { KeyValuePairNumber } from '../lists.service';

export enum OperatorsUnary {
  'None' = '',
  ChangeValues = 'map',
  JustFirstValue = 'first',
  SeeValues = 'tap',
  SkipValuesBegin = 'skip',
  SkipValuesLast = 'skipLast',
  TakeFromBegin = 'take',
  TakeFromLast = 'takeLast',
  ElementAt = "elementAt",
  Distinct = "distinct",
  DistinctUntilChanged = "distinctUntilChanged",
  startWith = "startWith",
  delay = "delay",
  debounceTime ="debounceTime"

}
export class unaryOperators {

  constructor(o: unaryOperators = null) {
    if (o == null)
      return;
    Object.keys(o).forEach(v => (this as any)[v] = o[v]);
  }

  public operatorToApply: OperatorsUnary = OperatorsUnary.None;

  public functionToApply: string;
  public valueToApply: string = '10';
  //static propertyType: Array<string> = Object.keys(OperatorsUnary).filter(key => isNaN(+key))

  public static applyPipe(
    obs: Observable<KeyValuePairNumber>,
    thePipe: OperatorsUnary,
    functionToApply: string,
    valueToApply: string
  ): Observable<KeyValuePairNumber> {
    switch (thePipe) {
      case OperatorsUnary.ChangeValues:
        return obs.pipe(
          map((value, index) => {
            var newVal = new KeyValuePairNumber();
            newVal.key = value.key;

            newVal.value = unaryOperators.applyFunction(
              value.value,
              functionToApply,
              valueToApply
            );
            return newVal;
          })
        );
      case OperatorsUnary.SeeValues:
        return obs.pipe(
          tap(value =>
            unaryOperators.applyFunction(
              value.value,
              functionToApply,
              valueToApply
            )
          )
        );
      case OperatorsUnary.JustFirstValue:
        return obs.pipe(first());
      case OperatorsUnary.SkipValuesBegin:
        return obs.pipe(
          skip(
            parseInt(
              unaryOperators.applyFunction('', functionToApply, valueToApply)
            )
          )
        );
      case OperatorsUnary.TakeFromBegin:
        return obs.pipe(
          take(
            parseInt(
              unaryOperators.applyFunction('', functionToApply, valueToApply)
            )
          )
        );
      case OperatorsUnary.TakeFromLast:
        return obs.pipe(
          takeLast(
            parseInt(
              unaryOperators.applyFunction('', functionToApply, valueToApply)
            )
          )
        );
          case OperatorsUnary.SkipValuesLast:
        return obs.pipe(
          skipLast(
            parseInt(
              unaryOperators.applyFunction('', functionToApply, valueToApply)
            )
          )
        );

        case OperatorsUnary.ElementAt:
            return obs.pipe(
              elementAt(
                parseInt(
                  unaryOperators.applyFunction('', functionToApply, valueToApply)
                )
              )
            );
      case OperatorsUnary.Distinct:
        return obs.pipe(
          distinct(it=>it.value)          
        );

      case OperatorsUnary.DistinctUntilChanged:
        return obs.pipe(
          distinctUntilChanged((a,b)=>a.value==b.value)
        );

      case OperatorsUnary.startWith:
        return obs.pipe(
          startWith(unaryOperators.getNewKVP(valueToApply))        
        );
      case OperatorsUnary.delay:
        console.log('delay ' + parseInt(valueToApply));
        return obs.pipe(
          delay(parseInt( valueToApply))
        );
      case OperatorsUnary.debounceTime:
        return obs.pipe(
          debounceTime(parseInt(valueToApply))
        );
      default:
        return obs;
    }
  }
  private static getNewKVP(value: string) {
    var kvp = new KeyValuePairNumber();
    kvp.key = -100;
    kvp.value = value;
    return kvp;
  }
  public functionsFromOperator(operatorToApply: OperatorsUnary): string[] {
    switch (operatorToApply) {
      case OperatorsUnary.ChangeValues:
        return ['multiply', 'add', 'value'];
      case OperatorsUnary.SeeValues:
        return ['log', 'alert'];
      case OperatorsUnary.SkipValuesBegin:
        return ['numberToSkip'];
      case OperatorsUnary.TakeFromBegin:
        return ['numberToTake'];
    case OperatorsUnary.TakeFromLast:
            return ['numberToTake'];
    case OperatorsUnary.SkipValuesLast:
        return ['numberToSkip'];
    case OperatorsUnary.ElementAt:
        return ['position'];
      case OperatorsUnary.startWith:
        return ['numberToTake'];
      case OperatorsUnary.delay:
        return ['numberToTake'];
      case OperatorsUnary.debounceTime:
        return ['numberToTake'];
    case OperatorsUnary.Distinct:
        return [];
    case OperatorsUnary.DistinctUntilChanged:
        return [];
    default:
        return [];
    }
  }
  public static getKeyName(value: string): any {
    console.log('!!!' + value);
    var data = Object.entries(OperatorsUnary).find(
      ([key, val]) => val === value
    );
    if (data != null) return data?.[0];

    return '';
  }

  public static applyFunction(
    value: string,
    functionApply: string,
    valueToApply: string
  ): string {
    // console.log("value:"+value);
    // console.log(functionApply);
    // console.log(valueToApply);
    switch (functionApply) {
      case 'multiply':
        return (parseInt(value) * parseInt(valueToApply)).toFixed(0);
      case 'add':
        return (parseInt(value) + parseInt(valueToApply)).toFixed(0);
      case 'value':
        return valueToApply;
      case 'log':
        console.log(value);
        return '';
      case 'alert':
        window.alert(value);
        return '';
      case 'numberToSkip':
        return parseInt(valueToApply).toFixed(0);
      case 'numberToTake':
        return parseInt(valueToApply).toFixed(0);
    case 'position':
            return parseInt(valueToApply).toFixed(0);
          default:
        return value;
    }
  }
}
