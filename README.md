
## clone or download
```terminal
$ git clone https://github.com/SnehaS1/JCB-FS.git
$ yarn # or npm i
```
## project structure
```terminal
server/
   package.json
   .env (to create .env, check [prepare your secret session])
client/
   package.json
...
```

# Usage (run fullstack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^21.7.1
- [npm](https://nodejs.org/en/download/package-manager/)

  notice, you need client and server runs concurrently in different terminal session, in order to make them talk to each other
  
## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // this will compile the react code using webpack and generate a folder called docs in the root level
$ npm run start // this will run the files in docs, this behavior is exactly the same how gh-pages will run your static site
```

## Server-side usage(PORT: 8080)

### Prepare your secret

setup the .env for server

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm run start:dev // run it locally
```
# Screenshots of this project

**Dashboard with Charts**
<img width="1135" alt="image" src="https://github.com/SnehaS1/JCB-FS/assets/18303528/090c1939-a13c-45b4-9747-33963eb4055d">
**Vehicles List**
<img width="1135" alt="image" src="https://github.com/SnehaS1/JCB-FS/assets/18303528/0dd1cf86-d667-4dab-a008-77c8a3e3c1e4">
**Create New Vehicle**
<img width="1135" alt="image" src="https://github.com/SnehaS1/JCB-FS/assets/18303528/e07d4fae-74db-4cdd-a4e7-3dcafce0757f">
**Track IOT data from vehicles**
<img width="1135" alt="image" src="https://github.com/SnehaS1/JCB-FS/assets/18303528/7675fa72-8f6e-4844-802a-74355fad1d37">
**Create Edit Maintenance for vehicle**
<img width="1135" alt="image" src="https://github.com/SnehaS1/JCB-FS/assets/18303528/29bf8e12-df62-45b9-9c31-cad81ad366ab">
