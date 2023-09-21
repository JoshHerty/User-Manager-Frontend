import User from "./User";

export default interface UserSignup extends User {
  password_confirmation: string;
}
