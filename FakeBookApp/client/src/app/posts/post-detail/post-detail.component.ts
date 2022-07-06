import { PostsService } from 'src/app/services/posts.service';
import { ShowComments } from './../../models/showComments';
import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { LikeService } from 'src/app/services/like.service';
import { Like } from 'src/app/models/like';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  likeCount: number;
  isLiked = false;
  like: Like;
  commentsCount: number;
  showComments : ShowComments;


  constructor(private likeService : LikeService, private toastr: ToastrService, private postService: PostsService) { }


  ngOnInit(): void {
    this.getLikeCount(this.post)
    this.showComments = {show: false, id: this.post.id};
    this.commentsCount = this.post.comments.length;
    this.showCommentsFunc();

  }

  // display the current count of likes each post has
  getLikeCount(post: Post) {
    this.likeService.getLikeCount(post).subscribe((data) => {
      this.likeCount = data.likeCount;
      this.isLiked = data.isLiked;

    });
  }

  addLike(post: Post) {
    this.likeService.addLike(post)?.subscribe((likeCount) => {
      this.toastr.success(`You liked ${post.username}'s post`);
      this.likeCount = likeCount;
      this.isLiked = true;
      });
  }

  deleteLike(post: Post) {
    this.likeService.deleteLike(post)?.subscribe((likeCount : number | any) => {
      this.toastr.success(`You unliked ${post.username}'s post`);
      this.likeCount = likeCount;
      this.isLiked = false;
    });
  }

  //show comments for a post
  showCommentsFunc(){
    this.postService.showComments.subscribe(show =>{
      if (show.id == this.post.id){
        this.showComments.show = show.show;
      }
    })
  }



  showCommentsButton() {
   if (this.showComments.id == this.post.id && this.commentsCount > 0){
      this.showComments.show = !this.showComments.show;
      this.postService.showComments.next(this.showComments);
    }
    else if (this.commentsCount <= 0){
      this.showComments.show = true;
      this.postService.showComments.next(this.showComments);
      this.toastr.error(`You have no comments to show`);
    }

  }







}




