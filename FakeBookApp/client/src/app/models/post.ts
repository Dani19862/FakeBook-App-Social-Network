import {Comment} from '../models/comment';
import { Like } from './like';

export interface Post {
  id: number;
  content: string;
  created: Date;
  memberId : number;
  username : string;
  photoUrl: string;
  comments: Comment[];
  likes: Like [] ;


}
