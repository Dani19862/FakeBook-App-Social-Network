import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Comment } from './../../models/comment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CommentComponent } from 'src/app/comment/comment/comment.component';
import { LikeService } from 'src/app/services/like.service';
import { Like } from 'src/app/models/like.interface';



@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  @Input() post: Post;
  @Output() showCommentsEvent = new EventEmitter<boolean>();
  //showComments: boolean = false;
  likeCount: any;
  isLiked = false;
  like: Like;
  isComment = false;



  constructor(private likeService : LikeService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getLikeCount(this.post)
    console.log(this.post.comments);
  }


  // display the current count of likes each post has
  getLikeCount(post: Post) {
    this.likeService.getLikeCount(post).subscribe((data) => {
      this.likeCount = data.likeCount;
      this.isLiked = data.isLiked;

      // console.log(data.likeCount);
    });
  }

  addLike(post: Post) {
    this.likeService.addLike(post)?.subscribe((likeCount) => {
      this.toastr.success(`You liked ${post.username}'s post`);
      this.likeCount = likeCount;
      // console.log(likeCount);
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

  showCommentsButton() {
   this.showCommentsEvent.emit(true);

  }







}




