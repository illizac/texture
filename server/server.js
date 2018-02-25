var http = require('http')
	url = require('url')
	fs = require('fs')
	path = require('path')
	fsload = require('./fsload')
	querystring = require('querystring')

var baseUrl

var server = (router, handle) => {
	var func = (req, res) => {
		var pathname = url.parse(req.url).pathname

		if( pathname == '/a' || pathname.indexOf('/a/') == 0 || pathname == '/' ){
			pathname = pathname == '/a' || pathname == '/' ? '/index.html' : pathname
			baseUrl = './appPage/dist'
		}else if( pathname == '/w' || pathname.indexOf('/w/') == 0 ){
			pathname = pathname == '/w' ? '/index.html' : pathname
			baseUrl = './webPage/dist'
		}


		//parse param
		var paramStr = url.parse(req.url).query
		var param = querystring.parse(paramStr)

		var extname = path.extname(pathname)
		var type = extname.slice(1)
		var realPath = baseUrl + pathname

		if (!pathname.indexOf('/favicon.ico')) {
	        res.writeHead(404, {"Content-type": "text/plain"});
		    res.end();
	    }

        if ( extname === '' ) {    
        	router(handle, pathname, req, res, param)        	   
        } else { 
            fsload.fsload(realPath, type, res)  
        }
	}

	http.createServer(func).listen(8098)
	console.log('--- http server at localhost:8098')
}


exports.start = server