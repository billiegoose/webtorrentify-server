'use strict'
const path = require('path')
const {send} = require('micro')
const url = require('url')
const mem = require('mem')
const webtorrentify = mem(require('webtorrentify-link'))
const cors = require('micro-cors')()

async function service (req, res) {
  let href = url.parse(req.url, true).query.href
  if (!href) return send(res, 400, "Missing 'href' parameter.")
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