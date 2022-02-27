const { getChildData } = require("../../controllers/childValidators");

const router = require("express").Router();

//req.parent is coming from jwtverfication.js
router.get("/", async (req, res) => {
    res.json({
        error: null,
        data: {
            content: await getChildData(req.user.email),
            child: req.user
        },
    });
});

module.exports = router;