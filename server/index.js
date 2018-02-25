var server = require('./server')
	router = require('./router')
	apphandle = require('./handler')
	webhandle = require('./webHandler')

var handler = {}

for(let i in apphandle){
	handler[`/app/${i}`] = apphandle[i]
}

for(let i in webhandle){
	handler[`/web/${i}`] = webhandle[i]
}

server.start(router.router, handler)