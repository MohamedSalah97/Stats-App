import { dateStringToDate } from './utils';
import { MatchResult } from './MatchResult';
import {MatchData} from './MatchData' ;
import {CsvFileReader} from './CsvFileReader' ;

interface DataReader {
  read():void;
  data: string[][]
}

export class MatchReader {

  static fromCsv(csvFileName: string): MatchReader {
    return new MatchReader(new CsvFileReader(csvFileName)) ;
  }

  matches: MatchData[] = [];

  constructor(public reader:DataReader){}

  load():void {
    // generate the two dimentional arrays of strings
    this.reader.read();
    // do the conversion
    this.matches = this.reader.data.map((row: string[]):MatchData =>{
      return [
        dateStringToDate(row[0]),
        row[1],row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchResult ,
        row[6]
      ]
    })
  }
}