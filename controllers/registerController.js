const State = require('../model/State');
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data },
}

const createNewState = async (req, res) => {
    
  if(!req.body.funfacts){
     return res.status(400).json({ message: "State fun facts value required"});
    }

  if(!Array.isArray(req.body.funfacts)){
     return res.json({message: "State fun facts value must be an array"});
   }

  const stateExists = await State.findOne({
     stateCode: req.params.state
   }); 

  if(!stateExists){
     try {
        
       const result =  await State.create({
            stateCode: req.params.state,
            funfacts: req.body.funfacts,
        }); 

        res.status(201).json(result);

     } 
    
     catch (err) {
        console.error(err)
     }
    }
    
    else if (stateExists){
        
      for (let i = 0; i < data.length; i++){
            
        stateExists.funfacts.push(data[i]);
      }
        
      const addition = await stateExists.save();

      res.status(201).json({ 'success': `New funfact ${addition} created!` });
    }
    
};

module.exports = { createNewState };
