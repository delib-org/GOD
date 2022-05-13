export interface Solution {
  _id?: string,
  title: string;
  description: string;
  parentId?: string;
  parentType?: string;
  likes?: Object;
}
