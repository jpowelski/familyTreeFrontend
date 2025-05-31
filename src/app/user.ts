export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: UserSex;
  mother: User;
  father: User;
  children?: User[];
  fatherUserId?: number;
  motherUserId?: number;
}

export enum UserSex {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}
