'use strict'
const path = require('path')
const {send} = require('micro')
const url = require('url')
const mem = require('mem')
const webtorrentify = mem(require('webtorrentify-link'))
const cors = require('micro-cors')()

async function service (req, res) {
  let href = url.parse(req.url, true).query.href
  if (!href) {
    res.setHeader('Content-Type', 'text/html')
    let html = `<!DOCTYPE html>
    <html>
      <title>400 Error</title>
      <h1>Missing 'href' parameter.</h1>
      <h2>See docs: <a href="https://npmjs.org/package/webtorrentify-server">https://npmjs.org/package/webtorrentify-server</a></h2>
    </html>
    `
    return send(res, 400, html)
  }
  let name = path.basename(href)
  let buffer = await webtorrentify(href)
  // Set headers LAST so they don't block micro's awesome error handling
  // 500 Internal Server Error fallback replies
  res.setHeader('Content-Type', 'application/x-bittorrent')
  res.setHeader('Content-Disposition', `inline; filename="${name}.torrent"`)
  res.setHeader('Cache-Control', 'public, max-age=2592000') // 30 days
  return buffer
}

module.exports = cors(service)