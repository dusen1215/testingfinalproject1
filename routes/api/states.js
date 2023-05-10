const express = require('express');
const router = express.Router();
const statesController = require('../../controllers/statesController');
const registerController = require('../../controllers/registerController');

router.route('/')
    .get(statesController.getAllStates);
    

router.route('/:state')
    .get(statesController.getState);

router.route('/:state/capital')
    .get(statesController.getCapital);

router.route('/:state/nickname')
    .get(statesController.getNickName);

router.route('/:state/population')
    .get(statesController.getPopulation);
    
router.route('/:state/admission')
    .get(statesController.getAdmission);

router.route('/:state/funfact')
    .get(statesController.getFact)
    .patch(statesController.updateState)
    .post(registerController.createNewState)
    .delete(statesController.deleteState);
     
module.exports = router;