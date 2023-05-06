const State = require('../model/State');
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}


const getAllStates = (req, res) => {
        if (req.query.contig === 'true') {
          data.states = data.states.filter(state => state.state !== 'Alaska' && state.state !== 'Hawaii');
        } else if (req.query.contig === 'false') {
          data.states = data.states.filter(state => state.state === 'Alaska' || state.state === 'Hawaii');
        }
        res.json(data.states);
      };


const updateState = async (req, res) => {
    if (!req.body.index){
        return res.status(400).json({ message: `State fun fact index value required` });
      }
      if (!req.body.funfact) {
        return res.status(400).json({ message: `State fun fact value required` });
      }

    const stateExists = await State.findOne({
        stateCode: req.params.state
       }).exec();

    let index = req.body.index + 1;
    
    if(!stateExists){
        data.states.filter(state => state.code === req.params.state);
    
    return res.status(400).json({message: `No fun facts here`});
    }
    
    index = index - 1;
    if (index < 0 || req.body.index > stateExists.funfacts.length) {
        data.states.filter(state => state.code === req.params.state);
    
        return res.status(400).json({
            message: `No Fun Fact found at that index for ${stateExists[0].state}`,
          });
        }

    stateExists.funfacts[index] = req.body.funfact;
    const result = await stateExists.save();
    return res.json(result);
};


const deleteState = async (req, res) => {
    let index = req?.body?.index + 1;
    if (!index) {
        return res.status(400).json({ message: `Index is needed` });
      }
      index = index - 1;
      const stateExists = await State.findOne({
        stateCode: req.params.state
      }).exec();
      if (! stateExists || stateExists == null) {
        jsonStates.filter(state => state.code === req.params.state);
        
        return res.status(400).json({ message: `No Fun Facts found` });
      }
    
      if (index < 0 || req.body.index > stateExists.funfacts.length) {
        jsonStates.filter(state => state.code === req.params.state);
        return res.status(400).json({
            message: `No Fun Facts found}`});
      }
      console.log(stateExists.funfacts[index]);
      stateExists.funfacts.splice(index, 1);
      
      const result = await stateExists.save();
      res.json(result);
    }

const getState = (req, res) => {
    const state_1 = data.states.find(state => state.state === (req.params.code));
    if (!state_1) {
        return res.status(400).json({ "message": `Employee ID ${req.params.state} not found` });
    }
    res.json(state_1);
}

const getCapital = (req, res) => {
    const state_1 = data.states.find(state => state.state === (req.params.code));
    const name = state_1.state;
    const capital = state_1.capital_city;
    const conclusion ={
        "state": name,
        "capital" : capital
    }
    res.json(conclusion);
}

const getNickName = (req, res) => {
    const state_1 = data.states.find(state => state.state === (req.params.code));
    const name = state_1.state;
    const nick_name = state_1.nickname;
    const conclusion ={
        "state": name,
        "nickname" : nick_name
    }
    res.json(conclusion);
}

const getPopulation = (req, res) => {
    const state_1 = data.states.find(state => state.state === (req.params.code));
    const name = state_1.state;
    const pop = state_1.population;
    const conclusion ={
        "state": name,
        "population" : pop
    }
    res.json(conclusion);
}

const getAdmission = (req, res) => {
    const state_1 = data.states.find(state => state.state === (req.params.code));
    const name = state_1.state;
    const admiss = state_1.admission_date;
    const conclusion ={
        "state": name,
        "admitted" : admiss
    }
    res.json(conclusion);
}

module.exports = {
    getAllStates,
    updateState,
    deleteState,
    getState,
    getCapital,
    getNickName,
    getPopulation,
    getAdmission
}