export class User {
  constructor(
    private username: string,
    private password: string,
    private fullName: string
  ) {
    if (!username) {
      throw new Error('Username is required');
    }
    if (!password) {
      throw new Error('Password is required');
    }
    if (!fullName) {
      throw new Error('Full name is required');
    }
  }

  public getUsername() {
    return this.username;
  }

  public getPassword() {
    return this.password;
  }

  public getFullName() {
    return this.fullName;
  }
}
