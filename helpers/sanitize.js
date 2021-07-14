const sanitizeHtml = require("sanitize-html");

const cleaner = (input) =>
	sanitizeHtml(input, {
		allowedTags: [],
		allowedAttributes: {},
		allowedIframeHostnames: [],
	});

module.exports = (req, full = false) => {
	if (full) {
		const title = cleaner(req.body.title);
		const status = cleaner(req.body.status);
		const body = cleaner(req.body.body);
		const user = cleaner(req.body.user);

		req.body.title = title;
		req.body.status = status;
		req.body.body = body;
		req.body.user = user;
	} else {
		req.params.id = cleaner(req.params.id);
	}
};
