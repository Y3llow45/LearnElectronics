# LearnElectronics
![Express badge](https://img.shields.io/badge/Express-4.18.2-green)
![Bcrypt badge](https://img.shields.io/badge/bcrypt-5.1.1-blue)
![JWT badge](https://img.shields.io/badge/jsonwebtoken-9.0.2-purple)
![Mongoose badge](https://img.shields.io/badge/mongoose-7.4.5-lightgreen)
![Static Badge](https://img.shields.io/badge/sanitizehtml-2.12.1-brown)
![Static Badge](https://img.shields.io/badge/draftjs-0.11.7-orange)
![Static Badge](https://img.shields.io/badge/React-18.2.0-blue)

Explore the world of electricity with LearnElectronics. Learn about electrical components and how circuits work. <br> You can learn or teach others by making lessons. 

## Start the project
1. Open mongodb Atlas and create account. <br>
2. Create cluster and inside of it database named 'test'. <br>
3. Create two collections 'users' and 'lessons'. You cann see the structure inside database.md (docs folder). <br>
4. Go to CMD Line Tools -> Connect Instructions -> Drivers - Select Node.js 2.2.12 and copy connection string from step 3 <br>
5. Modify .env on the server side with your ATLASURI(connection string) and SSKEY. <br>
6. Run ```npm i``` then ```npm start``` to start the front-end and the server. 

## Roles
Guest - can only view lessons and register <br>
User - create, edit, remove and like lessons <br>
Admin and Mod - delete everything

## Description
1. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/docs/front-end-structure.md">Front-end structure</a>
2. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/docs/page-images.md">Page images</a>
3. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/docs/components.md">Components</a>
4. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/docs/back-end-structure.md">Back-end structure</a>
5. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/docs/server.md">Server</a>
6. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/docs/database.md">Database</a>
7. <a href="https://github.com/Y3llow45/LearnElectronics/blob/master/License">License</a>

## Upcoming Updates
1. Portal for admin and mods - can search and delete lessons, ban, mod, demod users.
2. Electronics forum - users can ask questions about circuits.
3. Add comments under lessons - users can suggest updates.
4. Add calculators and formulas - users can calculate stuff.
5. Add meme page - users can upload memes
6. Create paid courses - users can earn certificates
7. Create user score - users can earn points that motivate them to learn
