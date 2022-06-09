import { MembersService } from 'src/app/services/members.service';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private postService: PostsService, private memberService :MembersService )
  { }

  baseUrl = environment.apiUrl;
  comments: Comment[] = [];


  // get all comments of Post
  getComments(postId: number) {
    return this.http.get<Comment[]>(`${this.baseUrl}comment/${postId}`)
    .pipe( tap((comments: any) => this.comments = comments));
  }

  // create new comment
  createComment(comment: Comment) : Observable<Comment> {
    return this.http.post<Comment>(`${this.baseUrl}comment`, comment);
  }

}
