/* eslint-disable no-underscore-dangle */
import { randomUUID } from 'crypto';

interface ICategory {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ICreateCategory {
  id?: string;
  name: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Category {
  private _id: string;
  private props: ICategory;

  constructor(props: ICreateCategory) {
    this._id = props.id ? props.id : randomUUID();
    const createdAt = props.createdAt ? props.createdAt : new Date();
    const updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.props = {
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
    this.props.updatedAt = new Date();
  }

  public get description(): string {
    return this.props.description;
  }
  public set description(description: string) {
    this.props.description = description;
    this.props.updatedAt = new Date();
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}

export default Category;
