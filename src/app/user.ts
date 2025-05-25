export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  age: number;
  sex: UserSex;
  children?: User[];

}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
