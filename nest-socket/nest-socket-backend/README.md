# NestJS Practice Project - a Chat App with Websockets (Socket.io)

- [NestJS Practice Project - a Chat App with Websockets (Socket.io)](#nestjs-practice-project---a-chat-app-with-websockets-socketio)
  - [Description](#description)
  - [Installation](#installation)
  - [Running the app](#running-the-app)
  - [Test](#test)
- [My Notes](#my-notes)
  - [The `@WebSocketGateway()` decorator in `chat.gateway.ts`](#the-websocketgateway-decorator-in-chatgatewayts)
  - [Tell NestJS about our `ChatGateway`](#tell-nestjs-about-our-chatgateway)
  - [Event handlers inside `ChatGateway`'s `class`](#event-handlers-inside-chatgateways-class)

## Description

- This is a [NestJS](https://github.com/nestjs/nest) practive project I've done based on the [course by Michael Guay](https://youtu.be/7xpLYk4q0Sg) from Youtube with bug fixes in regards to socket.io client version and compability (and also some CORS issues).

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

# My Notes

## The `@WebSocketGateway()` decorator in `chat.gateway.ts`

- First thing we do is create this `chat.gateway.ts` inside `src` and a gateway is NestJS' abstraction of Sockets, they call it Gateways.

- And before we create and export the `class` called `ChatGateway` it is important to tell NestJS that this is a `@WebSocketGateway()` implementation so we need to put this decorator.

## Tell NestJS about our `ChatGateway`

- So now that we setup the gateway we also need to go ahead and tell NestJS about it, so to do that we will add `ChatGateway` to the `providers` array of `app.module.ts`

## Event handlers inside `ChatGateway`'s `class`

- And inside our `ChatGateway` class we will add all of the event handlers for the incoming messages socket messages, so in our example for our chat application we are going to have to handle incoming messages and we are going to want to broadcast them to all listeners of this gateway (a bi-directional flow to it)

- And to do this we will create a new method there called `handleMessage()` inside our `ChatGateway`'s `class` which will handle any incoming Socket message and send it back out and we will need to decorate this with `@SubscribeMessage` from `@nestjs/websockets` and then we provide it a `string` which is the name of the message that we are listening for from the client, and in this case the name will be `'message'`, we can call it aything but it makes sense to call it `'message'` in our case.
