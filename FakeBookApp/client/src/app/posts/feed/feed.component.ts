import { PostDetailComponent } from './../post-detail/post-detail.component';
import { PostParams } from './../../models/postParams';
import { ToastrService } from 'ngx-toastr';
import { Comment } from './../../models/comment';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
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
export class FeedComponent implements OnInit, OnChanges {
  pagination: Pagination;
  pageNumber  = 1;
  pageSize = 5;
  posts$: Post[] = [];
  //comments$: Comment[] = [];
  post$ : Post
  //comment$!: Comment
  //member : Member;
  commentsCount: number;

   showComments = false;

  postParams : PostParams = {
    pageNumber: 1,
    pageSize: 5,
    search: ''
  }

  @ViewChild('postForm') postForm: NgForm;
  @ViewChild('commentForm') commentForm: NgForm;
  @ViewChild('filterForm') filterForm: NgForm;
  @ViewChild('showComments') PostDetailComponent: PostDetailComponent;





  constructor(private PostServices: PostsService, private commentService: CommentService, private toastr: ToastrService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.resetFilter();
  }


  ngOnInit(): void {
    this.getAllPosts();
  }


    //get all posts without pagination
    getAllPosts()  {
      this.PostServices.getAllPosts(this.postParams).subscribe(posts => {
        this.posts$ = posts;
        this.commentsCount = this.post$.comments.length;
      })
    }

    // get posts with Search Filter
    getPostsWithSearchFilter() {
      this.PostServices.getAllPosts(this.postParams).subscribe(posts => {
        this.posts$ = posts;
        this.filterForm.reset();


      })
    }

    // create new post
    createPost(postForm: NgForm) {
      this.PostServices.createPost(postForm.value).subscribe(() => {
        this.postForm.reset();
        this.toastr.success('Post created successfully');
        this.getAllPosts();


      })
    }

    getPost(id: number) {
      this.PostServices.getPost(id).subscribe(post => {
        this.post$ = post;
      });
    }

    // create new comment
    createComment(commentForm: NgForm, post: Post, postParams: PostParams) {
      const content = commentForm.value.content;

      this.commentService.createComment(commentForm.value, post).subscribe(() => {
        this.commentForm.reset();
        this.toastr.success('Comment created successfully');
        this.getAllPosts();
        // console.log(this.comment);

      })
    }

    resetFilter() {
      this.PostServices.resetFilter().subscribe(posts => {
        this.posts$ = posts;
        this.filterForm.reset();
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


    showComment($event: boolean) {
      this.showComments = $event;
    }

}
