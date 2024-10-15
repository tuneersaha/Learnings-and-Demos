const express = require('express');
const app = express();
const port = 3000;
app.use(express.json()) 

var users = [{
    name: "john",
    kidneys: [{ 
        healthy: false
    }]
}]

app.get('/', (req, res) => {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++ ) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys += 1;
        }
    }
    const numberofUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json ({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberofUnhealthyKidneys    
    })
});


app.post('/', (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({      
        msg: "Done"
    })                  
})

app.put('/', (req, res) => {
    for (let i = 0; i < users[0].kidneys.length; i++) {
            users[0].kidneys[i].healthy = true;kk
    }
    res.json({});
})

app.delete('/', (req, res) => {
    if(isThereAtLeastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy == true) {
                newKidneys.push ({
                    healthy: true
                })
            }
        }                               
        users[0].kidneys = newKidneys;
        res.json({
            msg: "all bad kidneys gone"
        });
    } else {
            res.status(411).json({
            msg: "You have no Bad kidneys"
        })
    }
})



function isThereAtLeastOneUnhealthyKidney() {
    let AtleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            AtleastOneUnhealthyKidney = true;
        }
    }
    return AtleastOneUnhealthyKidney;
}

app.listen(port);