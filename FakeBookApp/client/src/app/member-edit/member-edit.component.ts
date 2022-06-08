import { NgForm } from '@angular/forms';
import { take } from 'rxjs';
import { MembersService } from './../services/members.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Member } from '../models/member';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../models/post';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;
  @ViewChild('editForm') editForm: NgForm
  posts: Post[] = [];


  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any){
    if (this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(
    private accounteService: AccountService,
    private memberService: MembersService,
    private toastr : ToastrService,private route: ActivatedRoute,
    private postService: PostsService
  )
  {
       this.accounteService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User);
    }

  ngOnInit() {
    this.loadMember();
    this.getUsersPosts()
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe(member => {
      this.member = member;
    });
  }

  updateMember(){
    this.memberService.updateMember(this.member).subscribe(() =>{
      this.toastr.success('Member updated successfully');
      this.editForm.reset(this.member); // reset the form to the original state
      console.log(this.member);
    });

  }

  getUsersPosts() {
    this.postService.getUsersPosts(this.user.username).subscribe(posts => {
      this.posts = posts;
      console.log(posts);
    })
  }

}
