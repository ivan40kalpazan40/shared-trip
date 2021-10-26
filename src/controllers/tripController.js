const router = require('express').Router();

const displayTrips = (req,res)=>{
    res.render('trip/shared')
}


router.get('/all', displayTrips);

module.exports = router;
