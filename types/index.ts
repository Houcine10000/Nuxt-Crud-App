export interface IBook {
  _id?: string;
  title: string;
  isbn: string;
  pageCount: number;
  publisched: string;
  author: IAuthor;
}

export interface IAuthor {
  name: string;
  _id?: string;
}
