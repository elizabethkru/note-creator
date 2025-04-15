/* eslint-disable @typescript-eslint/no-namespace */
export namespace DeleteNoteBoundaries {
  export interface Input {
    noteUuid: string;
  }

  export interface Output {
    success: boolean;
    message: string;
    deletedAt?: string;
  }
}
