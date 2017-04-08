# webtorrentify-server
A microservice for generating .torrent files from URLs

## What is this?

This is the software running on https://webtorrentify.now.sh, a free
service to auto-generate .torrent files from "normal" URLs of the http:// and https:// variety.
The torrent files generated are specifically designed to be compatible with
[WebTorrent](https://npmjs.org/package/webtorrent) in the browser, but they
should work with any Bittorrent client.

## I 💖 WebTorrent but how do I make a .torrent?

It's easy now! webtorrentify.now.sh has a single API endpoint with a single
query parameter, `href`, the URL of the file you want to convert to a torrent.

    wget https://webtorrentify.now.sh/?href=https://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz

And now you have `node-v6.10.2-linux-x64.tar.gz.torrent`.

## That is nice, but I want to run my own server

Sure you do!

```
git clone https://github.com/wmhilton/webtorrentify-server
cd webtorrentify-server
npm install
npm start
```

## License

Copyright 2017 William Hilton.
Licensed under [The Unlicense](http://unlicense.org/).
