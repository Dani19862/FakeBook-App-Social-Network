import { PaginatedResult, Pagination } from './../../models/pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';
import { UserParams } from 'src/app/models/userParams';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  // pageNumber  = 1;
  // pageSize = 5;
  userParams: UserParams;


  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.userParams;
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.UserParams = this.userParams;
    this.memberService.getMembers(this.userParams).subscribe(
      response => {
        this.members = response.result;
        this.pagination = response.pagination;
      }
    )
  }

  resetFilters() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged({ page }: any) {
   this.userParams.pageNumber = page;
   this.memberService.UserParams = this.userParams;
    this.loadMembers();
  }

  // resetFilters() {
  //   this.userParams = this.memberService.resetUserParams();
  //   this.loadMembers();
  // }
}

