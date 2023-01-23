/* eslint-disable no-underscore-dangle */
import { randomUUID } from 'crypto';

interface ICar {
  name: string;
  description: string;
  dailyRate: number;
  available: boolean;
  licencePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICarConstructor {
  id?: string;
  name: string;
  description: string;
  dailyRate: number;
  available?: boolean;
  licencePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Car {
  private _id: string;
  private props: ICar;

  constructor(props: ICarConstructor) {
    this._id = props.id ? props.id : randomUUID();
    const available = props.available ? props.available : true;
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.props = {
      available,
      createdAt,
      updatedAt,
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this.props.name;
  }
  public set name(name: string) {
    this.props.name = name;
    this.update();
  }

  public get description(): string {
    return this.props.description;
  }
  public set description(description: string) {
    this.props.description = description;
    this.update();
  }

  public get dailyRate(): number {
    return this.props.dailyRate;
  }
  public set dailyRate(dailyRate: number) {
    this.props.dailyRate = dailyRate;
    this.update();
  }

  public get available(): boolean {
    return this.props.available;
  }
  public rentCar(): void {
    this.props.available = true;
    this.update();
  }
  public unrentCar(): void {
    this.props.available = false;
    this.update();
  }

  public get licencePlate(): string {
    return this.props.licencePlate;
  }
  public set licencePlate(licencePlate: string) {
    this.props.licencePlate = licencePlate;
    this.update();
  }

  public get fineAmount(): number {
    return this.props.fineAmount;
  }
  public set fineAmount(fineAmount: number) {
    this.props.fineAmount = fineAmount;
    this.update();
  }

  public get brand(): string {
    return this.props.brand;
  }
  public set brand(brand: string) {
    this.props.brand = brand;
    this.update();
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }
  public set categoryId(categoryId: string) {
    this.props.categoryId = categoryId;
    this.update();
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
  public get updatedAt(): Date {
    return this.props.updatedAt;
  }
  private update(): void {
    this.props.updatedAt = new Date();
  }
}

export { Car };
