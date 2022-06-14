import { CommentService } from 'src/app/services/comment.service';
import { Comment } from './../../models/comment';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Member } from 'src/app/models/member';



@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private commentService: CommentService) { }

  @Input() comment!: Comment ;
  @Input () post!: Post;
  member: Member;


  ngOnInit() {
    // console.log(this.comment);
    // ToDo: make func get photo more efficient
    this.getPhoto()
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
    return this.commentService.getPhotoURL(this.comment.username).subscribe(member => {
      this.member = member;
      if(this.member.photoUrl)
        {console.log(this.member.photoUrl);}
      else{
        this.member.photoUrl = "./assets/user.png";
        {console.log(this.member.photoUrl);}
      }

     }
    );
  }


}
