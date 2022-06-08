import { PaginatedResult, Pagination } from './../../models/pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MembersService } from 'src/app/services/members.service';



@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: Member[];
  pagination: Pagination;
  pageNumber  = 1;
  pageSize = 5;
  //userParams: UserParams;
  // genderList= [{
  //   value: 'male',
  //   display: 'Males'
  // },{
  //   value: 'female',
  //   display: 'Females'
  // }];

  constructor(private memberService: MembersService) {
    //this.userParams = this.memberService.userParams;
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe((response: PaginatedResult<Member[]>) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });


  }

  pageChanged({ page }: any) {
   this.pageNumber = page;
    this.loadMembers();
  }

  // resetFilters() {
  //   this.userParams = this.memberService.resetUserParams();
  //   this.loadMembers();
  // }
}

