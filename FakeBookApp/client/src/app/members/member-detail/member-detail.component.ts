import { MessageService } from './../../services/message.service';
import { PostsService } from 'src/app/services/posts.service';
import { MembersService } from './../../services/members.service';
import { Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { ActivatedRoute } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { Post } from 'src/app/models/post';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})


export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  posts: Post[] = [];
  messages:Message[] = [];
  activeTab: TabDirective;

  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent;

  constructor(private memberService: MembersService, private route: ActivatedRoute, private postService: PostsService, private messageService: MessageService) { }


  ngOnInit() {
    this.loadMember();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];

    this.route.queryParams.subscribe(params => {
      params['tab'] ? this.selectTab(params['tab']) : this.selectTab(0);
    });
    this.getUsersPosts();

    // console.log(this.member);
  }

  getImages(): NgxGalleryImage[]{
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.memberService.getMember(username).subscribe(member => {
      this.member = member;
      this.galleryImages = this.getImages();
    })
  }

  getUsersPosts() {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.postService.getUsersPosts (username).subscribe(posts => {
      this.posts = posts;
    })

  }

  //TODO - check this Error in the console: "Cannot read 'tabs'
  selectTab(tabId: number) {
    //this.memberTabs.tabs[tabId].active = true;

  }

  onTabActivated(data: TabDirective){
    this.activeTab = data;
    if(this.activeTab?.heading === 'Messages' && this.messages?.length === 0) {
      this.loadMessages();
    }
  }

  loadMessages() {
    this.messageService.getMessageThread(this.member.username).subscribe(messages => {
      this.messages = messages;
    })
  }



}
