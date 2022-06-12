import {Comment} from '../models/comment';

export interface Post {
  id: number;
  content: string;
  created: Date;
  memberId : number;
  username : string;
  photoUrl: string;
  comments: Comment[];
  comment: Comment;

}
