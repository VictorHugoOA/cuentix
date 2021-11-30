export class User {
  constructor(
    public usuario: string,
    public email: string,
    public password: string,
    public passwordCon: string,
    public type: string
  ) {}
}
