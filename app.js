

(function () {
    this.humanObj = {};
    this.dinosaurArr = [];
    this.formIDs = ['name', 'feet', 'inches', 'weight', 'diet'];

    fetch('http://localhost:3000').then(response => {
        return response.json().then(json => {
            this.makeDinosaurObj(json);
        })
    })

    document.getElementById('btn').addEventListener('click', () => {
        
        this.createHumanObj();
        
        if (this.isFormValid()) {
            this.removeForm();
        }

        this.populateFacts();
        this.makeTiles()
    })


    this.makeTiles = function() {
        const tileArr = this.dinosaurArr.slice();
        const stegoSaurus = tileArr[4];
        tileArr.push(stegoSaurus);
        tileArr[4] = this.humanObj;
        const gridContainer = document.getElementById('grid');

        tileArr.map(tileObj => {
            const TileDiv = document.createElement('div');
            const tileName = document.createElement('h3');
            const tileImg = document.createElement('img');
            const tileFact = document.createElement('p');

            if (tileObj.name || tileObj.species) {
                tileName.innerText = tileObj.name ? tileObj.name : tileObj.species;
            }

            if (tileObj.name) {
                tileImg.src = 'images/human.png';
            }
            
            if (tileObj.species) {
                const speciesName = tileObj.species.toLowerCase();
                tileImg.src = `images/${speciesName}.png`;

            if (tileObj.species !== 'Pigeon') {
                const getRandomInt = Math.floor(Math.random() * 4);
                const randomFact = tileObj.facts[getRandomInt];
                tileObj.fact = randomFact;
                tileFact.innerText = tileObj.fact;
            } else {
                tileFact.innerText = tileObj.fact;  
            
                }
            }
            TileDiv.className = 'grid-item';
            TileDiv.append(tileName, tileImg, tileFact);
            gridContainer.appendChild(TileDiv);
            return TileDiv;

        })


    }


    this.populateFacts = function(){
        this.dinosaurArr.forEach((dino) => {
            if (dino.species == 'Pigeon') {
                return;
            }
            const heightFact = this.compareHeight(this.humanObj, dino);
            const weightFact = this.compareWeight(this.humanObj, dino);
            const foodFact = this.compareDiet(this.humanObj, dino);
            dino.facts.push(heightFact, weightFact, foodFact, dino.fact);
        })
    }
 
    this.compareHeight = function(human, dino) {
        const humanHeightFootInches = Number(human.feet) * 12;
        const humanHeight = humanHeightFootInches + Number(human.inches);
        let fact;
        let difference;
        if (humanHeight > dino.height) {
            difference = humanHeight - dino.height;
            fact = `You are ${difference} inches taller than a ${dino.species}`;
        } else {
            difference = dino.height - humanHeight;
            fact = `A ${dino.species} is ${difference} inches taller than you.`
        }
        return fact;
        
    }

    this.compareWeight = function(human, dino) {
        let difference;
        let weightFact;
        if (human.weight > dino.weight) {
            difference = human.weight - dino.weight;
            weightFact = `You are ${difference} pounds heavier than a ${dino.species}`;
        } else {
            difference = dino.weight - human.weight;
            weightFact = `A ${dino.species} is ${difference} pounds heavier than you.`;
        }
        return weightFact;
    }

    this.compareDiet = function(human, dino) {
        let fact;

        if (human.diet === dino.diet) {
            fact = `You both share the same diet. A ${dino.species} also has a ${dino.diet} diet.`;
        } else {
            fact = `You have different diets. A ${dino.species} eats a ${dino.diet} diet`;
        }

        return fact;

    }

    this.isFormValid = function() {

        for (let i = 0; i < this.formIDs.length; i++) { 
            const formVal = document.getElementById(this.formIDs[i]).value;
            if (!formVal) {
                return false;
            }
        }
        return true;

    }

    this.removeForm = function() {
        document.getElementById('dino-compare').remove();
    }

    this.makeDinosaurObj = function(json) {
        const jsonArr = JSON.parse(json);
        //loop through json and make dino objs
        jsonArr.Dinos.forEach((dino) => {
            const dinosaur = new Dinosaur(dino);
            this.dinosaurArr.push(dinosaur);
        })

    }

    this.createHumanObj = function() {
            for(let i = 0; i < this.formIDs.length; i++) {
                const formValue = document.getElementById(this.formIDs[i]).value;
                this.humanObj[this.formIDs[i]] = formValue;
            }
    }



    
    function Dinosaur(dino) {
        this.species = dino.species;
        this.weight = dino.weight;
        this.height = dino.height;
        this.diet = dino.diet;
        this.continent = dino.where;
        this.when = dino.when;
        this.fact = dino.fact;
        this.facts = [];
    }
})()
        
    

    