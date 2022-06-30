import { PostsService } from './../../services/posts.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, take } from 'rxjs';
import { AccountService } from './../../services/account.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from './../../models/comment';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Member } from 'src/app/models/member';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {


  @Input() comment!: Comment ;
  @Input () post!: Post;

  member: Member;
  user:User;
  // commentsToShow: number[];

  currentUser$: Observable<User | null>;
  showTextArea = false;
   numberOFComments: number;

  @ViewChild('editForm') editForm: NgForm

  constructor(private commentService: CommentService,private accountService: AccountService, private toastr: ToastrService, private postService:PostsService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User);
   }


  ngOnInit() {
    // console.log(this.comment);
    // TODO: make func get photo more efficient
    this.getPhoto()
    // this.getCommentsToShow()

  }

  // getCommentsToShow() {
  //   console.log('Hello')
  //   this.commentsToShow = this.commentService.commentsToShow;
  //   if (this.commentsToShow.includes(this.comment.id)) {
  //     return true;
  //   }
  //   return false;
  // }

  getPhoto(){
    this.member = {  id: 1,
      username: '',
      photoUrl: './assets/user.png',
      age: 1,
      knownAs: '',
      created:  new Date(),
      dateOfBirth:  new Date(),
      lastActice: new Date(),
      introduction:   '',
      city:   '',
      country:  '',
      photos: [],
      posts:  []
    }
    return this.commentService.getPhotoURL(this.comment.username)
    .subscribe(member => {
      this.member = member;
      // if(this.member.photoUrl)
      //   {console.log(this.member.photoUrl);}
      // else{
      //   this.member.photoUrl = "./assets/user.png";
      //   {console.log(this.member.photoUrl);}
      // }
     }
    );
  }

  // delete comment
  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe(() => {
      this.post.comments.splice(this.post.comments.findIndex(comment => comment.id === commentId ), 1)
      this.toastr.success('Comment deleted successfully');
    });
  }

  // edit comment
  editComment(comment: Comment | any) {
    this.commentService.editComment(comment).subscribe(() => {
        this.comment = comment;
        this.toastr.success('Comment edited successfully');
        this.showTextArea = false;
    });
  }

  like(){
    this.toastr.error('not implemented yet');
  }

  replay(){
    this.toastr.error('not implemented yet');
  }

  share(){
    this.toastr.error('not implemented yet');
  }

}
