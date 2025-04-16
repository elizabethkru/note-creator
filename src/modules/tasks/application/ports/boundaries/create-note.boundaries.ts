/* eslint-disable @typescript-eslint/no-namespace */
export namespace CreateNoteBoundaries {
  export interface Input {
    title: string;
    content: string;
    userId: string;
  }

  export interface Output {
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }
}
