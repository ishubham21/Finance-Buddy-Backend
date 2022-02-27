const router = require("express").Router();
const { getParentData } = require('./../../controllers/parentValidators')

//req.parent is coming from jwtverfication.js
router.get("/", async (req, res) => {
    res.json({
        error: null,
        data: {
            content: await getParentData(req.user.email),
            parent: req.user
        },
    });
});

module.exports = router;