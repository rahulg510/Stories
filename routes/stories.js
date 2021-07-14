const router = require("express").Router();
const { ensureAuth } = require("../middleware/auth.js");
const Story = require("../models/Story");
const sanitizer = require("../helpers/sanitize.js"); 


// add page
// get request to get stories
router.get("/add", ensureAuth, (req, res) => {
	res.render("stories/add");
});

router.get("/", ensureAuth, async (req, res) => {
	try {
		let stories = await Story.find({ status: "public" })
			.populate("user")
			.sort({ createdAt: "desc" })
			.lean();
		res.render("stories/index", {
			stories,
		});
	} catch (error) {
		console.error(error);
		res.render("error/505");
	}
});

router.post("/", ensureAuth, async (req, res) => {
	try {
        req.body.user = req.user.id;
        sanitizer(req, true);
		await Story.create(req.body);
		res.redirect("/dashboard");
	} catch (error) {
		console.error(error);
		res.render("error/500");
	}
});

//show edit page /stories/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
	try {
        sanitizer(req);
		const story = await Story.findOne({ _id: req.params.id }).lean();
		if (!story) {
			return res.render("error/404");
		}

		if (story.user._id.toString() !== req.user._id.toString()) {
			return res.redirect("/stories/");
		} else {
			res.render("stories/edit", { story });
		}
	} catch (err) {
		console.error(err);
		res.redirect("/dashboard");
	}
});

router.get("/:id", ensureAuth, async (req, res) => {
	try {
        sanitizer(req);
		const story = await Story.findOne({ _id: req.params.id })
			.populate("user")
			.lean();
		if (!story) {
			return res.render("error/404");
		}
		if (
			story.status === "private" &&
			story.user._id.toString() !== req.user._id.toString()
		) {
			return res.redirect("/stories");
		}
		res.render("stories/show", { story });
	} catch (error) {
		console.error(error);
		return res.redirect("error/404");
	}
});

//update story PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
	try {
        sanitizer(req);
        sanitizer(req, true);
		let story = await Story.findById(req.params.id).lean();
		if (!story) {
			return res.render("error/404");
		}
		if (story.user._id.toString() !== req.user._id.toString()) {
			return res.redirect("/stories/");
		} else {
			story = await Story.findOneAndUpdate(
				{ _id: req.params.id },
				req.body,
				{
					runValidators: true,
				}
			);

			res.redirect("/dashboard");
		}
	} catch (error) {
		console.error(error);
		return res.render("error/500");
	}
});

router.delete("/:id", ensureAuth, async (req, res) => {
	try {
        sanitizer(req);
		const story = await Story.findOne({ _id: req.params.id }).lean();
		if (!story) {
			return res.redirect("/dashboard");
		}
		if (story.user._id.toString() !== req.user._id.toString()) {
			return res.render("error/500");
		}
		await Story.deleteOne({ _id: req.params.id });
		return res.redirect("/dashboard");
	} catch (err) {
		console.error(err);
		res.render("error/500");
	}
});

router.get("/user/:id", ensureAuth, async (req, res) => {
	try {
        sanitizer(req);
		let stories = await Story.find({ user: req.params.id, status: "public" })
			.populate("user")
			.sort({ createdAt: "desc" })
            .lean();
        res.render("stories/index", {stories});
	} catch (error) {
		console.error(error);
		res.render("error/500");
	}
});

module.exports = router;
