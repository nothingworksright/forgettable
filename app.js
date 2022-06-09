#!/usr/bin/env node

'use strict'

/**
 * Forgettable - Another chat.
 * @author {@link https://github.com/jmg1138 jmg1138}
 */

const errors = require(`./lib/errors`)
const frontends = require(`./lib/frontends`)
const funs = require(`./lib/funs`)
const sockets = require(`./lib/sockets`)

async function main () {
  try {
    await frontends.environmentals()
    let express = await frontends.expressInstance()
    await frontends.expressConfigure(express)
    await frontends.expressRoutes(express)
    await frontends.expressErrors(express)
    let server = await frontends.serverInstance(express)
    await frontends.serverListen(server)
    await sockets.everything(server)
    console.log(await funs.graffiti())
  } catch (err) {
    errors.handleFatal(err)
  }
}

/* istanbul ignore next */
if (require.main === module) main()

module.exports = {
  main: main
}
