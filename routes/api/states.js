const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const registerController = require('../../controllers/registerController');

router.route('/')
    .get(statesController.getAllStates)
    

router.route('/:code')
    .get(statesController.getState)

router.route('/:code/capital')
    .get(statesController.getCapital);

router.route('/:code/nickname')
    .get(statesController.getNickName);

router.route('/:code/population')
    .get(statesController.getPopulation);
    
router.route('/:code/admission')
    .get(statesController.getAdmission);

router.route('/:state/funfact')
    .patch(statesController.updateState)
    .post(registerController.createNewState)
    .delete(statesController.deleteState);
     
module.exports = router;