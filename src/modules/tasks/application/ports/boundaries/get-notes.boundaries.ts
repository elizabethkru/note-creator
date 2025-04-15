/* eslint-disable @typescript-eslint/no-namespace */
export namespace GetNoteBoundaries {
  export interface Input {
    noteUuid: string;
  }
  export interface Output {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }
  export interface MultipleNotesOutput {
    notes: Output[];
    count: number;
  }
}
