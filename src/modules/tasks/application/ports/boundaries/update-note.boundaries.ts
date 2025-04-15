/* eslint-disable @typescript-eslint/no-namespace */
export namespace UpdateNoteBoundaries {
  export interface Input {
    id: string;
    title: string;
    content: string;
  }

  export interface Output {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
}
