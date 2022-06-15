import { Photo } from './photo';
import { Post } from './post';

export interface Member {
  id:           number;
  username:     string;
  photoUrl:     string;
  age:          number;
  knownAs:      string;
  created:      Date;
  dateOfBirth:  Date;
  lastActice:   Date;
  introduction: string;
  city:         string;
  country:      string;
  photos:       Photo[];
  posts:        Post[];
}
