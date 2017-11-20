import { Authority } from './authority.model';

export const URL = 'http://api.ratings.food.gov.uk/';
export const VERSION = '2';
export const ID = 1;
export const PAGE_SIZE = 1;
const AUTHORITY = new Authority(100, 'Testville', 500);
export const AUTHORITIES = {
  authorities:
    [
      {
        LocalAuthorityId: 100,
        Name: 'Testville',
        EstablishmentCount: 500
      }
    ]
};

export const ENG_JSON = {
  establishments: [
    { RatingValue: 5 },
    { RatingValue: 2 },
  ]
};

export const SCT_JSON = {
  establishments: [
    { RatingValue: 'Pass' },
    { RatingValue: 'Needs Improvement' },
  ]
};

export const ENG_RETURN_OBJECT = {
  5: 1,
  2: 1
};

export const SCT_RETURN_OBJECT = {
  'Pass': 1,
  'Needs Improvement': 1
};

export const SCORES = {
  2: 1,
  5: 1
};
