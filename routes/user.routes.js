const router = require("express").Router();
const authRoutes = require("./auth.routes");
const mongoose = require('mongoose');
const {isAuthenticated} = require('../middleware/jwt.middleware');
const User = require('../models/User.model');


router.get('/user', isAuthenticated, (req, res, next) => {
    const user = req.payload
    console.log(user);
    User.findById(req.payload._id)
    .populate('ptRequest')
      .then((response) => {console.log(response)
    res.json(response)
    })
      
      .catch((err) => res.json(err));
  });


router.put('/user', isAuthenticated, (req, res, next) => {
    const {name, age, gender, height, weight, objective, lifestyle} = req.body;
    
    console.log(req.payload);
    const {_id} = req.payload;

    
    User.findByIdAndUpdate(_id, {name, age, gender, height, weight, objective, lifestyle}, {new:true}) 
    .then(updatedUser => {
        console.log (TotalCaloricWaste(updatedUser));
        TotalCaloricWaste(updatedUser);
        //const result = TotalCaloricWaste(updatedUser)
        
    }) 
    .then((response) => res.json(response))
    .catch((err) => res.json(err)); 
});



function TotalCaloricWaste(profile) {
    console.log(profile);
    const sum = 10*(profile.weight)+6.25*(profile.height)-5*(profile.age);
    if (profile.gender === 'male' && profile.lifestyle === 'Sedentary (Very little or no exercise, and desk job)') {
        return (sum + 5)*1.2
    } else if (profile.gender === 'male' && profile.lifestyle === 'Lightly Active (Light exercise 1 to 3 days per week)') {
        return (sum + 5)*1.375
    } else if (profile.gender === 'male' && profile.lifestyle === 'Moderately Active (Moderate exercise 3 to 5 days per week)') {
        return (sum + 5)*1.55
    } else if (profile.gender === 'male' && profile.lifestyle === 'Very Active (Heavy exercise 6 to 7 days per week)') {
        return (sum + 5)*1.725
    } else if (profile.gender === 'male' && profile.lifestyle === 'Extremely Active (Very intense exercise, and physical job,exercise multiple times per day)') {
        return (sum + 5)*1.9
    } else if (profile.gender === 'female' && profile.lifestyle === 'Sedentary (Very little or no exercise, and desk job)') {
        return (sum - 161)*1.2
    } else if (profile.gender === 'female' && profile.lifestyle === 'Lightly Active (Light exercise 1 to 3 days per week)') {
        return (sum - 161)*1.375
    } else if (profile.gender === 'female' && profile.lifestyle === 'Moderately Active (Moderate exercise 3 to 5 days per week)') {  
        return (sum - 161)*1.55
    } else if (profile.gender === 'female' && profile.lifestyle === 'Very Active (Heavy exercise 6 to 7 days per week)') {
        return (sum - 161)*1.725
    } else if (profile.gender === 'female' && profile.lifestyle === 'Extremely Active (Very intense exercise, and physical job, exercise multiple times per day)') {
        return (sum - 161)*1.9
 
    }
}



module.exports = router;