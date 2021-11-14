import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
// == The Express way to do this ==
// import { Controller, Get, Post, Put, Delete, Body, Req, Res} from '@nestjs/common';
// import { Request, Response } from 'express';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  // == Express way to do this ==
  // findAll(@Req() req: Request, @Res() res: Response): Response {
  // Before, for testing purposes, findall() was returning a string
  // findAll(): string {
  // Now let's return return an array of Items
  findAll(): Promise<Item[]> {
    // == Express way to do this ==
    // console.log(req.url);
    // return res.send('Hello World');
    // Before, for testing purposes I was just returning a string
    // return 'Get all items';
    // Now let's return from our ItemsService:
    return this.itemsService.findAll();
  }
  // @Get(':id')
  // findOne(@Param() param): string {
  //   return `Item ${param.id}`;
  // }
  // We could make the above method shorter by passing up ID like this:
  @Get(':id')
  // Before, for testing purposes, findOne() was returning a string
  // findOne(@Param('id') id): string {
  // Now let's return return a single Item
  findOne(@Param('id') id): Promise<Item> {
    // Before, for testing purposes I was just returning a string
    // return `Item ${id}`;
    // Now let's return from our ItemsService:
    return this.itemsService.findOne(id);
  }
  @Post()
  // Before, for testing purposes, create() was returning a string:
  // create(@Body() createItemDto: CreateItemDto): string {
  // Now it returns a Promise with a Generic of Item
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    // Before, for testing purposes, create() was returning a string
    // return `Name: ${createItemDto.name} Desc: ${createItemDto.description}`;
    return this.itemsService.create(createItemDto);
  }
  @Delete(':id')
  // Before, for testing purposes, delete() was returning a string
  // delete(@Param('id') id): string {
  // Now it will return a Promise, with a generic of Item
  delete(@Param('id') id): Promise<Item> {
    // Before, for testing purposes, delete() was returning a string
    // return `Delete ${id}`;
    return this.itemsService.delete(id);
  }
  @Put(':id')
  // Before, for testing purposes, update() was returning a string
  // update(@Body() updateItemDto: CreateItemDto, @Param('id') id): string {
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id): Promise<Item> {
    // Before, for testing purposes, update() was returning a string
    // return `Update ${id} - Name: ${updateItemDto.name}`;
    return this.itemsService.update(id, updateItemDto);
  }
}
