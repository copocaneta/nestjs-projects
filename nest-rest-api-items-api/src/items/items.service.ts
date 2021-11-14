import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from './interfaces/item.interface';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}
  // Before using Mongoose we were using this as a dummy for our data:
  //
  // private readonly items: Item[] = [
  //   {
  //     id: '3424242425',
  //     name: 'Item One',
  //     qty: 100,
  //     description: 'This is a item one',
  //   },
  //   {
  //     id: '94949292',
  //     name: 'Item Two',
  //     qty: 50,
  //     description: 'This is a item two',
  //   },
  // ];

  // Before using Mongoose we were using this as a dummy for our data:
  //
  // findAll(): Item[] {
  //   return this.items;
  // }

  // And this is for the Mongoose one, that returns a Promise and thats why async and await
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  // Before using Mongoose we were using this as a dummy for our data:
  //
  // findONe(id: string): Item {
  //   return this.items.find((item) => item.id === id);
  // }

  // And this is for the Mongoose one, that returns a Promise and thats why async and await
  async findOne(id: string): Promise<Item> {
    return await this.itemModel.findOne({ _id: id });
  }

  // Did this create method to create Item on Mongo
  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return await newItem.save();
  }

  // Did this delete method to delete Item from Mongo

  async delete(id: string): Promise<Item> {
    return await this.itemModel.findByIdAndRemove(id);
  }

  // Did thid update method to update Item from Mongo:

  async update(id: string, item: Item): Promise<Item> {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
