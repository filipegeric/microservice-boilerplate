import { Column, Entity } from 'typeorm';

@Entity()
export class User {
  @Column({ unique: true, primary: true })
  public username: string;

  @Column({ select: false })
  public password: string;

  @Column({ name: 'full_name' })
  public fullName: string;
}
