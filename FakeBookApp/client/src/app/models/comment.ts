export interface Comment {
  id: number;
  content: string;
  created: Date;
  postId: number;
  username : string;
  appUserId : number;
  photoUrl : string;

}
