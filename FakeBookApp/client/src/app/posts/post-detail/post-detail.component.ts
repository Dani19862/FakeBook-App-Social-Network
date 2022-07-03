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
  // @Output() showCommentsEvent = new EventEmitter<number>();
  likeCount: number;
  isLiked = false;
  like: Like;
  numberOfComments: number;



  constructor(private likeService : LikeService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getLikeCount(this.post)
    this.numberOfComments = this.post.comments.length;

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

  // showCommentsButton(post: Post) {
  //   if(post.comments.length > 0){
  //     this.showCommentsEvent.emit(post.id);
  //     console.log('pd', post.id)
  //   }
  //   else{
  //     this.toastr.error(`No comments for this post`);
  //   }
  // }







}




