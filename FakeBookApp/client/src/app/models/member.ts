import { Photo } from './photo';
import { Post } from './post';

export interface Member {
  id:           number;
  username:     string;
  photoUrl:     string;
  age:          number;
  knownAs:      string;
  created:      Date;
  lastActive:   Date;
  dateOfBirth:  Date;
  lastActice:   Date;
  introduction: string;

  interests:    string;
  city:         string;
  country:      string;
  photos:       Photo[];
  posts:        Post[];
}
