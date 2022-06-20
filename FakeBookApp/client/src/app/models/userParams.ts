// For filtering the user list

export class UserParams {
  userName: string;
  minAge: 18;
  maxAge: 120;
  pageNumber = 1;
  pageSize = 5;
  orderBy = 'lastActive';

  constructor() {

    this.minAge = 18;
    this.maxAge = 120;
    this.pageNumber = 1;
    this.pageSize = 5;
    this.orderBy = 'lastActive';


  }


}
