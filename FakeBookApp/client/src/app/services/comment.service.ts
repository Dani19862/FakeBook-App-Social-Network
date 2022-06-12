import { User } from './../models/user';
import { AccountService } from './account.service';
import { Post } from 'src/app/models/post';
import { MembersService } from 'src/app/services/members.service';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, tap, pipe, ReplaySubject } from 'rxjs';
import { Member } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private accountService: AccountService, private memberService :MembersService  ){ }

  baseUrl = environment.apiUrl;
  comments: Comment[] = [];
  post : Post;
  comment: Comment
  member : Member;
  user : User






  // get all comments of Post
  getComments(postId: number) : Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}comment/${postId}`)
    .pipe( tap((comments: any) => this.comments = comments));
  }

  // create new comment
  createComment(comment: Comment|any, post: Post, member: Member) : Observable<Comment> {
    let commentId = post.id;

    //return this.http.post<Comment>(`${this.baseUrl}comment/${commentId}`, content)
    const payload= {
      postId: commentId,
      content: comment.content,
      username: this.member.username,
      photoUrl: this.member.photoUrl
      }
    return this.http.post<Comment>(`${this.baseUrl}comment`, payload);
    }

  }


