import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pipe, Observable, of, tap } from 'rxjs';
import { Member } from '../models/member';



@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) { }


  // get all members
  getMembers() : Observable<Member[]> {
    if(this.members.length){
      return of(this.members); // return cached members if any
    }
      // get all members from api url if members are not in cache
    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
      tap(members => this.members = members) // cache members
      )
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



}

