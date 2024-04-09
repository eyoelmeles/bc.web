export interface Folder {
  id: string;
  name: string;
  image?: FolderFileImages[];
}

export interface FolderFileImages {
  image: string;
  imageDetails: Array<{
    details: string;
  }>;
}
