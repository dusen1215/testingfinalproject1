const State = require('../model/State');
const data = {
    states: require('../model/statesData.json'),
    setStates: function (data) { this.states = data },
}

const createNewState = async (req, res) => {
    if(!req.body.funfacts){
        return res.status(400).json({ message: "State fun facts needed"});
    }

   if(!Array.isArray(req.body.funfacts)){
    return res.json({message: "Need the funfacts in an array"});
   }

   const stateExists = await State.findOne({
    stateCode: req.params.state
   }); 

       //const duplicate = await State.findOne({ state: state}).exec();
       //if(duplicate) return res.sendStatus(409);
    if(!stateExists){
       try {
        //with mongoose we can create and store the new user all at once
        
        const result =  await State.create({
            stateCode: req.params.state,
            funfacts: req.body.funfacts,
        }); //this creates a new funfact

        res.status(201).json(result);

    } catch (err) {
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

//this page was adjust from last tutorial because we added two new files (schemas in the model folder )