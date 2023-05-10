const State = require('../model/State');
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data }
}


const getAllStates = async (req, res) => {
  
  let the_states;
  let state_1 = data.states;
  const { contig } = req.query;

  if (contig === "true") {

    function AK_HI(state_1) {
      if (state_1.code == "AK" || state_1.code == "HI") {
        return false;
      }
      return true;
    }
    the_states = state_1.filter(AK_HI);
  } 
  
  else if (contig === "false") {
    the_states = state_1.filter(st => st.code === "AK" || st.code === "HI");
  } 
  
  else {
    the_states = data.states;
  }
  
  let list_of_states = await State.find({});
  
  the_states.forEach(state => {
    const states_match = list_of_states.find(st => st.stateCode === state.code);
    
    if (states_match) {
      state.funfacts = [...states_match.funfacts];
    }
  });
  
  res.json(the_states);
};

const getState = (req, res) => {
  
  const state_1 = data.states.find(state => state.code === (req.params.state.toUpperCase()));
    
  if (!state_1) {
    return res.status(400).json({ message: `Invalid state abbreviation parameter` });
  }
  
    res.json(state_1);
}

const getCapital = async (req, res) => {
  
  const state_1 = data.states.find(state => state.code === (req.params.state.toUpperCase()));
    
  if (!state_1) {
      return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
  
  res.json({
      state: `${state_1.state}`,
      capital: `${state_1.capital_city.toLocaleString()}`,});
    }


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
        let noFact = data.states.filter(state => state.code === req.params.state.toUpperCase());
    
        return res.status(400).json({message: `No Fun Facts found for ${noFact[0].state}`});
    }
    
  index = index - 1;
    
  if (index < 0 || req.body.index > stateExists.funfacts.length) {
        data.states.filter(state => state.code === req.params.state);
    
        return res.status(400).json({
            message: `No Fun Fact found for ${stateExists[0].state}`,
          });
        }

  stateExists.funfacts[index] = req.body.funfact;
    
  const result = await stateExists.save();
    
  return res.json(result);
};


const deleteState = async (req, res) => {
    
  let index = req?.body?.index + 1;
    
  if (!index) {
      return res.status(400).json({ message: `State fun fact index value required` });
    }
      
  index = index - 1;
  const stateExists = await State.findOne({
      stateCode: req.params.code
    }).exec();
      
  if (! stateExists || stateExists == null) {
      let noFact = data.states.filter(st => st.code === req.params.code);
        
      return res.status(400).json({ message: `No Fun Facts found for ${noFact[0].state}` });
    }
    
  if (index < 0 || req.body.index > stateExists.funfacts.length) {
      let noFact = data.states.filter(st => st.code === req.params.code);
        
      return res.status(400).json({
            message: `No Fun Fact at the index for ${noFact[0].state}`});
      }
      
      stateExists.funfacts.splice(index, 1);
      
      const result = await stateExists.save();
      
      res.json(result);
    }





const getNickName = async (req, res) => {
  console.log("here from the getStateNickname Function");
  const state_1 = data.states.find(
    (state) => state.code === req.params.state.toUpperCase()
  );

  if (!state_1) {
    return res.status(400).json({ message: `Invalid state abbreviation parameter` });
  }
  res.json({ state: `${state_1.state}`, nickname: `${state_1.nickname}` });
};

const getPopulation = async (req, res) => {
  console.log("Here from getStatePopulation Function");
  const state = data.states.find(
    (state) => state.code === req.params.state.toUpperCase()
  );
  if (!state) {
    return res.status(400).json({ message: `Invalid state abbreviation parameter` });
  } else {
    res.json({
      state: `${state.state}`,
      population: `${state.population.toLocaleString()}`,
    });
  }
};

const getFact = async (req, res) => {
    let search_fact = await State.find({});
    const state_1 = data.states.find(state => state.code === (req.params.state.toUpperCase()));
    if (!state_1) {
        return res.status(400).json({ "message": `Invalid state abbreviation parameter` });
    }
  
    const matches = search_fact.find(st => st.stateCode === st.code);  
    
    if (matches) {
      state_1.funfacts = [...matches.funfacts];
    }
    else if (!state_1.funfacts){
      return res.json({ message: `No Fun Facts found for ${state_1.state}`});
    }
    res.json({
      funfact: `${state_1.funfacts}`
    });
}

const getAdmission = async (req, res) => {
  const state_1 = data.states.find(state => state.code === req.params.state.toUpperCase());
  if (!state_1) {
    return res.status(400).json({ message: `Invalid state abbreviation parameter` });
  }
    res.json({ 
      state: `${state_1.state}`, 
      admitted: `${state_1.admission_date}` 
    });
};

module.exports = {
    getAllStates,
    updateState,
    deleteState,
    getState,
    getCapital,
    getNickName,
    getPopulation,
    getAdmission,
    getFact
}