export interface User {
  id: string;
  name: string;
  surName: string;
  fullName: string;
  email: string;
  birthDate: string;
  telephone: string;
  employment: string;
  userAgreement: boolean;
}

export interface CreateUserDto {
  name: string;
  surName: string;
  password: string;
  fullName: string;
  email: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
  userAgreement?: boolean;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password' | 'email'>>;
