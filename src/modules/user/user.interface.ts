export interface User {
  name: {
    first_name: string;
    last_name: string;
  };
  birthday: Date;
  code_account: string;
  phone_number: string;
  email: string;
  password: string;
  username: string;
  avatar: string;
  role: 'teacher' | 'student';
  course: string[];
}
