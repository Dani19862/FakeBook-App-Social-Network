import { UserParams } from './../models/userParams';
import { map, take } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Observable, of, tap } from 'rxjs';
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';
import { AccountService } from './account.service';




@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  //userParams: UserParams;
  //user: User;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  currentUser$: any;

  constructor(private http: HttpClient, /*private accountService: AccountService*/) {
    // accountService.currentUser$
    //   .pipe(take(1))
    //   .subscribe((user: any) => {
    //     this.user = user;
    //     this.userParams = new UserParams();
    //   });
   }

  // public get UserParams(): UserParams {
  //   return this.userParams
  // }

  // public set UserParams(userParams: UserParams) {
  //   this.userParams = userParams;
  // }

  // resetUserParams() {
  //   this.userParams = new UserParams();
  //   return this.userParams;
  // }
  // get all members with pagination => And httpParams
  getMembers(/*userParams: UserParams*/ page?:number, itemsPerPage?: number) : Observable <PaginatedResult<Member[]>> {

      // let params = this.getPaginationParams(userParams);

      // params = params.append('minAge', userParams.minAge.toString());
      // params = params.append('maxAge', userParams.maxAge.toString());


      // return this.getPaginatedResult<Member[]>(`${this.baseUrl}users`,params);

      let params = new HttpParams();
      if(page != null && itemsPerPage != null){
        params = params.append('pageNumber', page.toString());
        params = params.append('pageSize', itemsPerPage.toString());
      }

      //if (this.members.length === 0) return of(this.paginatedResult); //check cache

      return this.http.get<Member[]>(`${this.baseUrl}users`, {
        observe: 'response',
        params
      }).pipe(
        map((res: HttpResponse<Member[]>) => {
          this.paginatedResult.result = res.body as Member[];
          if(res.headers.get('Pagination') != null){
            this.paginatedResult.pagination = JSON.parse(res.headers.get('Pagination')|| '');
          }
          return this.paginatedResult;
        })
      )

    }

  // generic method to get paginated result
  // private getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {

  //   const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

  //   return this.http.get<T>(url,
  //     {
  //       observe: 'response',
  //       params
  //     }).pipe(
  //       map((res: HttpResponse<T>) => {
  //         paginatedResult.result = res.body as T;
  //         if (res.headers.get('Pagination') !== null) {
  //           paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
  //         }
  //         return paginatedResult;
  //       })
  //     );
  // }

  // get member by username
  getMember(username: string) : Observable<Member> {
    const member = this.members.find(m => m.username === username);
    if(member){
      return of(member); // return cached member if any
    }
     // get member by username from api url if member is not in cache
    return this.http.get<Member>(`${this.baseUrl}users/${username}`).pipe(
      tap(member => this.members.push(member)) // cache member
    )
  }

  // update member
  updateMember(member: Member)  {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      tap(() => {
        const index = this.members.findIndex(x=> x.id === member.id); // find index of member in cache
        this.members[index] = member; // update member in cache
      })
    )
  }

  // set Main photo

  setMainPhoto(photoId: number) : Observable<any> {
    return this.http.put(`${this.baseUrl}users/set-Main-Photo/${photoId}`, {});
  }

  // delete photo

  deletePhoto(photoId: number) : Observable<any> {
    return this.http.delete(`${this.baseUrl}users/delete-Photo/${photoId}`);
  }

  // private method for get Pegination Params => pageNumber, pageSize

  private getPaginationParams ({pageNumber, pageSize}: UserParams ) {
    let  params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

}

