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
import { PostsService } from 'src/app/services/posts.service';



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


  currentUser$: Observable<User | null>;
  showTextArea = false;
  numberOFComments: number;
  showComments: boolean = false;

  @ViewChild('editForm') editForm: NgForm

  constructor(private commentService: CommentService,private accountService: AccountService, private toastr: ToastrService, private postsService: PostsService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User);
   }


  ngOnInit() {

    // TODO: make func get photo more efficient
    this.getPhoto()
    this.showCommentsFunc();
  }

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

  // edit comment => show text area and fill the form with the current comment
  editComment(comment: Comment | any) {
    this.commentService.editComment(comment).subscribe(() => {
        this.comment = comment;
        this.toastr.success('Comment edited successfully');
        this.showTextArea = false;
    });
  }

  // show comments => subscribe to the showComments behavior subject un the post service to find out whther to show comments or not
  showCommentsFunc(){
    this.postsService.showComments.subscribe(show =>{
      if(show.id == this.post.id){
        this.showComments = show.show;
      }
    })
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
