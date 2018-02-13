var server = require('./server')
	router = require('./router')
	handle = require('./requestHandler')

var handler = {}

handler['/index'] = handle.index

for(let i in handle){
	handler[`/${i}`] = handle[i]
}

server.start(router.router, handler)