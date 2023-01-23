/* eslint-disable no-underscore-dangle */
import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

interface IUserProps {
  name: string;
  email: string;
  password: string;
  driverLicence: string;
  isAdmin: boolean;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface IConstructorUserProps {
  id?: string;
  name: string;
  email: string;
  password: string;
  driverLicence: string;
  isAdmin?: boolean;
  avatar?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

class User {
  private _id: string;
  private props: IUserProps;

  constructor(props: IConstructorUserProps) {
    this._id = props.id ? props.id : randomUUID();
    const avatar = props.avatar ? props.avatar : null;
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    const isAdmin = props.isAdmin ? props.isAdmin : false;
    this.props = {
      createdAt,
      updatedAt,
      isAdmin,
      avatar,
      ...props,
    };
    // if (!props.id) this.hashPassword();
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public get email(): string {
    return this.props.email;
  }
  public set email(email: string) {
    this.props.email = email;
    this.props.updatedAt = new Date();
  }

  public get password(): string {
    return this.props.password;
  }
  public set password(password: string) {
    this.props.password = password;
    this.hashPassword();
    this.props.updatedAt = new Date();
  }
  private hashPassword() {
    this.props.password = hashSync(this.props.password, 8);
  }

  public get driverLicense(): string {
    return this.props.driverLicence;
  }
  public set driverLicense(driverLicense: string) {
    this.props.driverLicence = driverLicense;
    this.props.updatedAt = new Date();
  }

  public toggleAdmin(): void {
    this.props.isAdmin = !this.props.isAdmin;
  }

  public get avatar(): string {
    return this.props.avatar;
  }
  public set avatar(avatar: string) {
    this.props.avatar = avatar;
    this.props.updatedAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export default User;
