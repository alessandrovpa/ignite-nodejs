/* eslint-disable no-underscore-dangle */
import { randomUUID } from 'crypto';

interface ICarImage {
  image: string;
  carId: string;
  createdAt: Date;
}

interface ICarImageContructor {
  id?: string;
  image: string;
  carId: string;
  createdAt?: Date;
}

class CarImage {
  private _id: string;
  private props: ICarImage;

  constructor(props: ICarImageContructor) {
    this._id = props.id ? props.id : randomUUID();
    const createdAt = props.createdAt ? props.createdAt : new Date();
    this.props = {
      createdAt,
      ...props,
    };
  }

  public get id(): string {
    return this._id;
  }

  public get image(): string {
    return this.props.image;
  }

  public get carId(): string {
    return this.props.carId;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export default CarImage;
