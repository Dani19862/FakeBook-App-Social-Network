

export interface Like {
  id:number;
  likerId:number;
  username:string;
  postId:number;
  created:Date;
  isliked:boolean;
  likeCount?: number;
}
