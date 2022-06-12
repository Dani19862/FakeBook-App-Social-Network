import { Comment } from './../../models/comment';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {  Pagination } from '../../models/pagination';
import { Post } from '../../models/post';
import { PostsService } from '../../services/posts.service';
import { CommentService } from 'src/app/services/comment.service';
import { Member } from 'src/app/models/member';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  pagination: Pagination;
  pageNumber  = 1;
  pageSize = 5;
  posts: Post[] = [];
  comments: Comment[] = [];
  post : Post
  comment!: Comment
  member : Member;



  @ViewChild('postForm') postForm: NgForm;
  @ViewChild('postForm') commentForm: NgForm;



  // @Input() comment: Comment;

  constructor(private PostServices: PostsService, private commentService: CommentService) {}


     ngOnInit(): void {
    this.getallPosts();
  }


    //get all posts without pagination
    getallPosts()  {
       this.PostServices.getallPosts().subscribe(posts => {
          this.posts = posts;
          console.log(this.posts);
        });
    }

    // create new post
    createPost(postForm: NgForm) {
      this.PostServices.createPost(postForm.value).subscribe(() => {
        this.postForm.reset();
        this.getallPosts();

      })
    }

    getPost(id: number) {
      this.PostServices.getPost(id).subscribe(post => {
        this.post = post;
      });
    }

    createComment(commentForm: NgForm, post: Post, member: Member) {
      this.commentService.createComment(commentForm.value, post, member).subscribe(() => {
        this.commentForm.reset();
        this.getallPosts();
      })
    }


    // get all posts with pagination
    // getllPosts() {
    //   this.PostServices.getallPosts(this.pageNumber, this.pageSize).subscribe((response:PaginatedResult<Post[]>) => {
    //     this.posts = response.result;
    //     this.pagination = response.pagination;
    //   });

  // pageChanged({page}: any) {
  //   this.pageNumber = page;
  //   this.getllPosts();
  // }



}
