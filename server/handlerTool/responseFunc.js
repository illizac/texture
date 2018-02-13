module.exports = (res, code, mess, header = {}) => {
	res.writeHead(200, header)
    res.write(JSON.stringify({
    	code: code,
    	data: JSON.stringify(mess)
    }))
	res.end()
}