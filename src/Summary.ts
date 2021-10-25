import { MatchData } from "./MatchData";
import { WinsAnalysis } from "./analyzers/WinsAnalysis";
import { ConsoleReport } from "./reportTargets/ConsolReport";

export interface Analyzer {
  run(matches: MatchData[]):string ;
}

export interface OutputTarget {
  print(report: string): void ;
}

export class Summary {

  static analysisWithReport(team:string):Summary {
    return new Summary (new WinsAnalysis(team), new ConsoleReport());
  }

  constructor (public analyzer: Analyzer , public outputTarget: OutputTarget) {}

  buildAndPrintReport (matches: MatchData[]):void {
    const output = this.analyzer.run(matches) ;
    this.outputTarget.print(output);
  }
}