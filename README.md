<h1 align="center"> NXC Host </h1> 
<p align="center">
    <a href= "https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank"><img alt='Licence CC BY-NC-SA 4.0' src ="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-sa.svg" width="82">
    <a href="https://ko-fi.com/I2I35XISJ" target="_blank"><img alt='Kofi' src="https://img.shields.io/static/v1?label=Support%20Us&message=KO.FI&color=ff5e5b&logo=kofi&logoColor=white&style=for-the-badge&scale=1.4">
    </a> <br>
</p>

NXC is a simple host for URL shortener, paste bin and image uploader. It's written in NextJS with typescript and uses MongoDB as database.

If you like the repository, please consider giving it a star⭐!

# Deployment

You can either watch the [video](https://youtu.be/VhNGKyPGF2g) or follow the steps below.

First of all, you need to install [NodeJS](https://nodejs.org/en/) and [MongoDB](https://www.youtube.com/watch?v=aygw0wjW5bA) in your server.

Then, clone the repository and install the dependencies:

```cmd
git clone https://github.com/night0721/nxc-host
cd nxc-host
npm install
```

After that, you need to change the `.env.example` file to `.env` and fill the variables.

In the `.env` file, you should put NEXT_PUBLIC_HOST(eg. http://localhost:3000 or https://google.com) as your domain name and MONGO as your MongoDB connection string.

Finally, you can run the server with:

```cmd
npm run build
npm run start
```

If you have any question, please join my [Discord Server](https://discord.gg/SbQHChmGcp) and ask in the support channel.

## Routes

```md
/s -> URL Shortener
/s/:id -> Redirecting to Long URL
/p -> Paste Bin
/p/:id -> Paste by specific ID
/raw/:id -> Raw Paste by specific ID
/i -> Image Uploader
/i/:id -> Image by specific ID
/i/raw/:id -> Raw Image by specific ID
/api/:type/delete -> Delete model by type
POST /api/image -> Send new image to server
POST /api/paste -> Send new paste to server
POST /api/url -> Send new URL to server
```
