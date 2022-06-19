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

  memberCache = new Map<string, PaginatedResult<Member[]>>();
  userParams: UserParams;
  user: User | null;
  paginatedResult: PaginatedResult<Member[]> = new PaginatedResult<Member[]>();
  //currentUser$: any;

  constructor(private http: HttpClient,private accountService: AccountService) {
    accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams();
    });
   }

  public get UserParams(): UserParams {
    return this.userParams
  }

  public set UserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  resetUserParams() {
    this.userParams = new UserParams();
    return this.userParams;
  }
  // get all members with pagination => And httpParams
  getMembers(userParams: UserParams)  {

      const cacheKey = Object.values(userParams).join('_');
      const response = this.memberCache.get(cacheKey);

      if(response) return of(response);

      let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);

      return this.getPaginatedResult<Member[]>(`${this.baseUrl}users`,params).pipe(
        tap(res => this.memberCache.set(cacheKey, res))
      )

    }

  // generic method to get paginated result
  private getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {

    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url,
      {
        observe: 'response',
        params
      }).pipe(
        map((res: HttpResponse<T>) => {
          paginatedResult.result = res.body as T;
          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
          }
          return paginatedResult;
        })
      );
  }


  getPaginationHeaders(pageNumber:number, pageSize:number) {
    let headers = new HttpParams();
    headers = headers.append('pageNumber', pageNumber.toString());
    headers = headers.append('pageSize', pageSize.toString());
    return headers;

  }

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

  private getPaginationParams (pageNumber: number, pageSize: number) {
    let  params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

}

