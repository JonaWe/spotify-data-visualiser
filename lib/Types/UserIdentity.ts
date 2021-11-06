export default interface UserIdentity {
  displayName: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  largeImageUrl?: string;
  tasteMaker: boolean;
  verified: boolean;
}
