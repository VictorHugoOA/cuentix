export class User {
  constructor(
    public usuario: String,
    public email: String,
    public password: String,
    public passwordCon: String,
    public descripcion: String,
    public type: String
  ) {}
}
