export default interface UserData {
  username: string;
  email: string;
  country: string;
  createdFromFacebook: boolean;
  facebookUid?: string;
  birthdate: string;
  gender: string;
  postalCode?: number;
  mobileNumber?: string;
  mobileOperator?: string;
  mobileBrand?: string;
  creationTime: string;
}
