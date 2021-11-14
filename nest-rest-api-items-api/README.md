- [NestJS Practice Project](#nestjs-practice-project)
  - [Description](#description)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Test](#test)
- [My personal notes for future reference are below:](#my-personal-notes-for-future-reference-are-below)
  - [Creating an item controller](#creating-an-item-controller)
  - [DTO (Data Transfer Object) schema](#dto-data-transfer-object-schema)
      - [**`create-cat.dto.ts`**](#create-catdtots)
  - [Generating a service](#generating-a-service)
  - [Using databases](#using-databases)
      - [**`app.module.ts`** (partial)](#appmodulets-partial)
      - [**`app.module.ts`** (partial)](#appmodulets-partial-1)
      - [**`items.module.ts`** (partial)](#itemsmodulets-partial)
      - [**`items.module.ts`** (partial)](#itemsmodulets-partial-1)
  - [The endpoints:](#the-endpoints)
    - [GET `/`](#get-)
    - [GET `/items`](#get-items)
    - [POST `/items`](#post-items)
    - [GET `/items/{id}`](#get-itemsid)
    - [DELETE `/items/{id}`](#delete-itemsid)
    - [PUT `/items/{id}`](#put-itemsid)

# NestJS Practice Project

## Description

- This is a [NestJS](https://github.com/nestjs/nest) practice project I've done based on the [Crash Course by Traversy Media](https://www.youtube.com/watch?v=wqhNoDE6pb4) from Youtube with some differences, improvements and bugfixes, this project consists of:

  - [NestJS](https://github.com/nestjs/nest)
  - [MongoDB](https://www.mongodb.com/) database
  - [SwaggerAPI](https://docs.nestjs.com/openapi/introduction)(OpenAPI)

- One of the main differennces is the implementation of the Swagger UI I've done and also the bug fix for the following error his course was throwing:

  ```
  Nest can't resolve dependencies of the ItemsService (?). Please make sure that the argument at index [0] is available in the AppModule context
  ```

- The API main endpoint is at http://localhost:3000/

- The Swagger API endpoint is at http://localhost:3000/api/

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# My personal notes for future reference are below:

- So the structure basically is:
  - We have the `controller` which defines the endpoints, gets the parameters or the body for creating/updating something
  - And then simply calls a `service` method and that's where we do anything to do with our data.

## Creating an item controller

- To create my Items controller this is what I've done:

  ```sh
  nest g controller items
  ```

- After running that, in the `src` directory, it created a sub-directory for us called `items` and anythign that we create now that has to do with `items` is going to go into this directory.

## DTO (Data Transfer Object) schema

- A DTO is an object that defines how the data will be sent over the network. We could determine the DTO schema by using TypeScript interfaces, or by simple classes. Interestingly, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable at runtime.

- Refering to [Docs](https://docs.nestjs.com/controllers)

- 'Let's create the CreateCatDto class"

  #### **`create-cat.dto.ts`**

  ```js
  export class CreateCatDto {
    name: string;
    age: number;
    breed: string;
  }
  ```

## Generating a service

- We will need a service in order to deal with the database and get the actual data and stuff like that, so I went ahead and **generated a service**, so I ran this on the terminal:

  ```sh
  nest g service items
  ```

- Output was:

  ```sh
  CREATE src/items/items.service.spec.ts (453 bytes)
  CREATE src/items/items.service.ts (89 bytes)
  UPDATE src/app.module.ts (394 bytes)
  ```

- And after the following file was created `src/items/items.service.ts`.

- And inside this file we see it imports `Injectable` and what this does is it allow us to inject a dependency into our `constructor`. Now inside this `ItemsService` class we are going to have a bunch of methods that we are going to call from the controller but before we do that we also want to create a **module**.

- We want everything to be wrapped in a **module**, so inside the `items` directory we are going to create a new file called `items.module.ts` and this is going to be set up very similar to the `app.module.ts` so we are actually just going to copy the contents of that and adjust accordingly.

## Using databases

- This is for using Relational Databases, using `typeorm`:

  - Link for the [Documentation](https://docs.nestjs.com/techniques/database)

- In this project I am actually using **Mongo** so this is the documentation for that:

  - Link for the [Documentation](https://docs.nestjs.com/techniques/mongodb)

- So we will do :

  ```sh
  npm install --save @nestjs/mongoose mongoose
  ```

- On `app.module.ts` we will add this:

  ```js
  import { MongooseModule } from '@nestjs/mongoose';
  ```

- We create a directory named `config` and inside this directory we create a `key.ts`, we place this inside our `key.ts` file:

  ```js
  export default {
    mongoURI: '',
  };
  ```

- So we go to MongoDB atlas and on our cluster we click in the "Connect" button and we copy the string to connect and paste in the empty string ont the object above.

- So now inside `app.module.ts` we add `import config from './config/keys'`

  #### **`app.module.ts`** (partial)

  ```js
  import config from './config/keys';
  ```

- And we add this to `@Module` decorator inside `imports` in the `MongooseModule.forRoot()`:

  #### **`app.module.ts`** (partial)

  ```diff
  @Module({
  +  imports: [ItemsModule, MongooseModule.forRoot(config.mongoURI)],
    controllers: [AppController, ItemsController],
    providers: [AppService, ItemsService],
  })
  ```

- And now we create a schema.

- We create this sub-directory inside `items` called `schemas`.

- Inside `schemas` we are going to create one file for our `items` schema, so we will create this file called `item.schema.ts` with this content:

  ```js
  import * as mongoose from 'mongoose';

  export const ItemSchema = new mongoose.Schema({
    name: String,
    qty: Number,
    description: String,
  });
  ```

- And then in `items.module.ts`, we will import `MongooseModule` and also `ItemSchema`:

  #### **`items.module.ts`** (partial)

  ```diff
  import { Module } from '@nestjs/common';
  +import { MongooseModule } from '@nestjs/mongoose';
  import { ItemsController } from './items.controller';
  import { ItemsService } from './items.service';
  +import { ItemSchema } from './schemas/item.schema';
  ```

- And also we will add `MongooseModule` in the `@Module` decorator, inside `imports`:

  #### **`items.module.ts`** (partial)

  ```js
  @Module({
    imports: [MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }])],
    controllers: [ItemsController],
    providers: [ItemsService],
  })
  ```

- So now in our `items.service.ts` we can now bring in our `InjectModel` from `@nestjs/mongoose` and then we can inject that as a dependency with `constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}` and then we can use Mongoose.

## The endpoints:

### GET `/`

- This endpoint takes no parameters and just returns a `'Hello World'`

### GET `/items`

- This endpoint takes no parameters and returns all `items`

### POST `/items`

- This endpoint takes no parameters but requires a request body which is an `application/json` object like this:

  ```json
  {
    "name": "Item Three",
    "qty": 34,
    "description": "This is item three"
  }
  ```

- It uses the `CreateItemDTO` DTO which is:

  ```js
  export class CreateItemDto {
    readonly name: string;
    readonly description: string;
    readonly qty: number;
  }
  ```

### GET `/items/{id}`

- This endpoint takes no parameters and takes in the `id` in the URL where `{id}` is. It will return a JSON object like this:

  ```json
  {
    "_id": "6191415150bc1e4b297bd37a",
    "name": "Item One",
    "qty": 100,
    "description": "This is item one",
    "__v": 0
  }
  ```

### DELETE `/items/{id}`

- This endpoint takes no parameters and takes in the `id` in the URL where `{id}` is. It will return a JSON object of the deleted item:

### PUT `/items/{id}`

- This endpoint takes no parameters but requires a request body which is an `application/json` object like this:

  ```json
  {
    "qty": 1000
  }
  ```

- It uses the `CreateItemDTO` DTO which is:

  ```js
  export class CreateItemDto {
    readonly name: string;
    readonly description: string;
    readonly qty: number;
  }
  ```
