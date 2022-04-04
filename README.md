*Global Online Democracy - Delib App*

Delib is a PWA for deliberative and democratic decision making, which was created with the help of [Deliberative Democracy Institute](http://delib.org), for [Global Online Democracy Movement](https://www.globalonlinedemocracy.org/).

The current version is 4. The previous version code can be found here ([Delib-3](https://github.com/talyaron/delib).).

----

**Install**

Fork the repository and clone branch "dev" to your local machine

In ```/server``` run ```npm i```

In ```/server``` add ```.env``` file.

Use the following configuration:
```
GOOGLE_CLIENT_ID=<>
GOOGLE_CLIENT_SECRET=<>
PASSPORT_SECRET=<>
JWT_SECRET=<>
CLOUDINARY_PAAS=<>
```

In ```/client``` run  ```npm i```

In ```/client``` add ```env.ts``` and write the cloudanry key you got from cloudinary.com:
```
export const CLOUDINARY_API='cloudanry_key';
```

Install [Docker](https://docs.docker.com/compose/install/)

**Run**

In root directory run ```docker-compose up```

In ```/client``` run ```npm start```

**Intro**

[Intro video for developers on Youtube](https://youtu.be/6PHgnHJ5smQ)

**Update your forked repository**

If you are using github desktop, use [this procedure](https://stackoverflow.com/questions/46110615/how-to-sync-your-forked-repo-with-original-repo-in-github-desktop#:~:text=2%20Answers&text=To%20sync%20the%20master%20of,the%20'fetch%20origin'%20button.).

----

**Contributors**


***UX/UI***

Danielle Richter & Rotem Bonder - design the first simple onboarding and suggestions
