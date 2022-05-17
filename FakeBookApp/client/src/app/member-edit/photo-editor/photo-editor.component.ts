import { ToastrService } from 'ngx-toastr';
import { MembersService } from './../../services/members.service';
import { AccountService } from './../../services/account.service';
import { User } from './../../models/user';
import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { take, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() member:  Member;
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean = false;
  baseUrl = environment.apiUrl;
  user:User;

  constructor(private accounteService: AccountService,
              private membersService: MembersService,
              private toastr:ToastrService ) {
    this.accounteService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as User);
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader(){
   const options: FileUploaderOptions = {      // set the options for the uploader
      url: `${this.baseUrl}users/add--photo`,  // set the url for the uploader
      authToken: `Bearer ${this.user.token}`,  // set the auth token for the uploader
      isHTML5: true,                           // set the html5 to true
      allowedFileType: ['image'],              // set the allowed file type for the uploader
      removeAfterUpload: true,                 // set the remove after upload to true
      autoUpload: false,                       // set the auto upload to false
      maxFileSize: 10 * 1024 * 1024            // set the max file size to 10mb
    };
    this.uploader = new FileUploader(options);      // create the uploader
    this.uploader.onAfterAddingFile = (file) => {   // set the onAfterAddingFile callback function
      file.withCredentials = false;                 // set the withCredentials to false
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {     // set the onSuccessItem callback function
      if(response){                                                          // if the response is not null
        const photo: Photo = JSON.parse(response);                             // parse the response to a photo object
        this.member.photos.push(photo);                                        // set the photoUrl to the photoUrl
        this.toastr.success('Photo has been uploaded successfully');          // show a success toastr

        if (photo.isMain){                                                      // if the photo is main
          this.user.photoUrl = photo.url;                                       // set the photoUrl to the user photoUrl
          this.member.photoUrl = photo.url;                                     // set the photoUrl to the member photoUrl
          this.accounteService.setCurrentUser(this.user);                       // set the current user to the user
        }
      }
    }


  }

  fileOverBase(e: any): void {        // set the file over base callback function to the event e (the file) --> drag file over the drop zone
    this.hasBaseDropZoneOver = e;     // set the hasBaseDropZoneOver to true
  }

  setMainPhoto(photo: Photo){
    this.membersService.setMainPhoto(photo.id).subscribe(() => {
      this.user.photoUrl = photo.url;
      this.accounteService.setCurrentUser(this.user);

      this.member.photoUrl = photo.url;   // set the new photoUrl
      this.member.photos.forEach(p => {   // for each photo in the photos array
        if(p.isMain) p.isMain = false;    // if the photo isMain => set it to false
        if(p.id === photo.id) p.isMain = true;  // if the p.id is equal to the photo.id set it to true => set the photo to main
        this.toastr.success('Photo has been set as main successfully');  // show a success toastr
        //same condition as above
        // this.member.photos.forEach(p => p.isMain = p.id === photo.id);

      })

    })
  }

  deletePhoto(photoId: number){
    this.membersService.deletePhoto(photoId).subscribe(() => {
      this.member.photos = this.member.photos.filter(p => p.id !== photoId);
      this.toastr.success('Photo has been deleted successfully');  /// show a success toastr to delete the photo
    })
  }



}
