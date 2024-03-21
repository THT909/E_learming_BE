import { Injectable } from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CrudService<T extends Document, C, U> {
  constructor(@InjectModel('YourModel') protected readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<T> {
    return await this.model.findById(id).exec();
  }

  async create(createDto: C): Promise<T> {
    const createdModel = await this.model.create({
      ...createDto,
      createAt: new Date(),
    });
    return createdModel;
  }

  async update(id: string, updateDto: U): Promise<T> {
    const updateModel = await this.model
      .findByIdAndUpdate(
        id,
        { ...updateDto, competedAt: new Date() },
        { new: true },
      )
      .exec();
    return updateModel;
  }

  async delete(id: string): Promise<T> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
