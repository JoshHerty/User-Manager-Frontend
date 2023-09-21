import UserLogin from "./UserLogin";

export default interface User extends UserLogin {
  id?: number | null;
  name: string;
  created_at?: string;
  password_confirmation?: string;
}
