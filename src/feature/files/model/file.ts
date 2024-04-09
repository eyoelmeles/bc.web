import { Folder } from "./folder";

export interface FileModel {
  id: string;
  file: string;
  folder: Folder;
  fileName: string;
  fileDetails: Array<{
    details: string;
    fileType: string;
    x?: number;
    y?: number;
  }>;
}
