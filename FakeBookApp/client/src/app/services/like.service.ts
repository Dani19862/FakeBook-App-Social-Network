import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';
import { Post } from '../models/post';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenType } from '../models/token.type';

@Injectable({
  providedIn: 'root',
})
export class LikeService {

  baseUrl = environment.apiUrl;
  helper = new JwtHelperService();
  constructor(private http: HttpClient) {}


  // add like  == like
  addLike(post: Post | undefined) {
    let like: Like = {
      id: 0,
      likerId: post!.memberId,
      postId: post!.id,
      isliked: true,
      created: new Date(),
      username: post!.username,
    };

      // get userId from token => LikerId
    let tempUser = JSON.parse(localStorage.getItem('user') as string);
    if (tempUser) {
      const user = tempUser;
      let payload:TokenType = this.helper.decodeToken(user.token);
      like.likerId = payload.nameid;

      return this.http.post(`${this.baseUrl}like`, like).pipe(
        map((res: number | any) => {
          return res;
        })
      );
    }
    return of(0)
  }
   // delete like ==  unlike
  deleteLike(post: Post) {
    let liketoDelete :Like | any = {
      likerId: post.memberId,
    };
    let tempUser = JSON.parse(localStorage.getItem('user') as string);
    if (tempUser) {
      const user = tempUser;
      let payload:TokenType = this.helper.decodeToken(user.token);
      liketoDelete.likerId = payload.nameid;

     return this.http.delete(`${this.baseUrl}like/${post!.id},${liketoDelete.likerId}`).pipe(
        map((res: number | any) => {
          return res;
        })
     )
    }
    return of(0)
  }


  // get all likes for a post
  getLikeCount(post: Post): Observable<any> {
    return this.http.get(`${this.baseUrl}like/${post.id}`);
  }
}
