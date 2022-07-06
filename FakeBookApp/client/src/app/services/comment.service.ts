import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Comment } from './../models/comment';
import { Post } from 'src/app/models/post';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Member } from '../models/member';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private toastr: ToastrService){ }

  baseUrl = environment.apiUrl;
  comments: Comment[] = [];
  members: Member[] = [];



  // get all comments of Post
    getComments(postId: number) : Observable<Comment[]> {
      return this.http.get<Comment[]>(`${this.baseUrl}comment/${postId}`)
      .pipe( tap((comments: any) => this.comments = comments));
    }

    // create new comment
    createComment(comment: Comment |any, post: Post) : Observable<Comment> {
      let commentId = post.id;

      const payload = {
      postId: commentId,
      content: comment.content,
      }
      debugger;
      return this.http.post<Comment>(`${this.baseUrl}comment/create`, payload);
    }

    // Get Photo URL of Member
    getPhotoURL(username: string)  {
      return this.http.get<Member>(`${this.baseUrl}users/${username}`).pipe(
      tap(member => {this.members.push(member)})
     )}

      // delete comment
      deleteComment(commentId: number) {
        return this.http.delete(`${this.baseUrl}comment/${commentId}`);
      }

      // edit comment
      editComment(comment: Comment) {
        debugger;
        return this.http.put(`${this.baseUrl}comment/edit`, comment);

      }

  }


