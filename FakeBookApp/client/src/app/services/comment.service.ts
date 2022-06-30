import { Post } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';
import { Member } from '../models/member';



@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private postService: PostsService){ }

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

      const payload= {
      postId: commentId,
      content: comment.content,
      }
      return this.http.post<Comment>(`${this.baseUrl}comment`, payload);
    }

    // Get Photo URL of Member
    getPhotoURL(username: string)  {
      return this.http.get<Member>(`${this.baseUrl}users/${username}`).pipe(
      tap(member => {this.members.push(member)}) // cache member
     )}

      // delete comment
      deleteComment(commentId: number) {
        return this.http.delete(`${this.baseUrl}comment/${commentId}`);
      }

      // edit comment

      editComment(comment: Comment) {
        return this.http.put(`${this.baseUrl}comment`, comment);
      }

  }


