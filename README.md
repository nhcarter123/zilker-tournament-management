# Zilker Tournament Client
This is the client for our tournament management solution. Players join, get parings, and enter their math results on their phones.\
Visit https://zilkerchess.com to find out more!

The [Zilker Tournament Server](https://github.com/nhcarter123/zilker-tournament-server) is the backend that this client communicates with.


### Stack
- Graphql
- Apollo client
- Typescript / React

### Live Data
Notably this client implements websocket to sync the data in real time. There are reconnection hooks that refetch data after lost connection e.g. a player takes their phone out of their pocket after playing chess for 10 minutes.

### Getting started

Download [NodeJS](https://nodejs.org/en/download/), if you don't have it. (I'm using v16.5.0)

Install yarn, if you don't have it
```
npm i yarn -g
```

Install dependencies
```
yarn
```

Start the app
```
npm run start
```

### TODOs
- Organizations - allow other people to host tournaments (med priority)
- Tournament performance history in profile (low priority)
- Achievements/badges/trophies (low priority)
- Implement a way for players to join without having a phone (low priority - solutions have high lift)