exports.router = (handle, pathname, req, res, param = {}) => {
	typeof handle[pathname] === 'function' ? handle[pathname](req, res, param) : console.log('no request handlers')
}