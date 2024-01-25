
export type ItemType = 'file' | 'folder';

export interface Item {
  id: string;
  uid: string | null;
  author?: {
    avatar?: string;
    name?: string;
  };
  createdAt?: number | null;
  extension?: string;
  isFavorite?: boolean;
  size?: number;
  isPublic?: boolean;
  items?: Item[];
  itemsCount?: number;
  name: string;
  shared?: {
    avatar?: string;
    name?: string;
  }[];

  tags?: string[];
  type: ItemType;
  updatedAt?: number | null;
}
