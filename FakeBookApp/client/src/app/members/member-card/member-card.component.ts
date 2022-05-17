import { MembersService } from './../../services/members.service';
import { AccountService } from './../../services/account.service';
import { Member } from 'src/app/models/member';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberCardComponent implements OnInit {
  @Input() member!: Member;
  countMembers: any;

  constructor(private membersService: MembersService) {

  }
   

  ngOnInit() {

  }

}
