/* eslint-disable no-underscore-dangle */
import User from '@accounts/models/User';
import Car from '@car/models/Car';
import { randomUUID } from 'crypto';

interface IRental {
  carId: string;
  car?: Car;
  userId: string;
  user?: User;
  startDate: Date;
  endDate: Date | null;
  total?: number;
  expectedReturnDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface IRentalConstructor {
  id?: string;
  carId: string;
  userId: string;
  startDate?: Date;
  endDate?: Date | null;
  expectedReturnDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class Rental {
  private _id: string;
  private props: IRental;

  constructor(props: IRentalConstructor) {
    this._id = props.id ? props.id : randomUUID();
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    const startDate = props.startDate ? props.startDate : new Date();
    const endDate = props.endDate ? props.endDate : null;
    this.props = {
      createdAt,
      updatedAt,
      startDate,
      endDate,
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get carId(): string {
    return this.props.carId;
  }
  public set carId(carId: string) {
    this.props.carId = carId;
    this.props.updatedAt = new Date();
  }

  public get car(): Car {
    return this.props.car;
  }
  public set car(car: Car) {
    this.props.car = car;
  }

  public get userId(): string {
    return this.props.userId;
  }

  public get user(): User {
    return this.props.user;
  }
  public set user(user: User) {
    this.props.user = user;
  }

  public get startDate(): Date {
    return this.props.startDate;
  }
  public set startDate(startDate: Date) {
    this.props.startDate = startDate;
    this.props.updatedAt = new Date();
  }

  public get endDate(): Date | null {
    return this.props.endDate;
  }
  public set endDate(endDate: Date) {
    this.props.startDate = endDate;
    this.props.updatedAt = new Date();
  }

  public get expectedReturnDate(): Date {
    return this.props.expectedReturnDate;
  }
  public set expectedReturnDate(expectedReturnDate: Date) {
    this.props.expectedReturnDate = expectedReturnDate;
    this.props.updatedAt = new Date();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
}

export default Rental;
