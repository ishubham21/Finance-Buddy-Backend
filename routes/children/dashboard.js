const router = require("express").Router();

//req.parent is coming from jwtverfication.js
router.get("/", async (req, res) => {
    res.json({
        error: null,
        data: {
            parent: req.user
        },
    });
});

module.exports = router;