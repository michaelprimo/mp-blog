// STATE.JS = every function about the state of the game (game over, levelling up or other mechanics) will be here. 
// generate the points to get for go to the next 

let randToken = [];
let boolIllegal = false;

storeToken();

function storeToken()
{
    for(var i = 0; i < buttonClick.length; i++)
    {
        randToken[i] = 0;
    }
}


function setMaxPoints()
{
    storeToken();
    boolIllegal = false;
    //Find a combination of the numbers of the buttons for generate the score to achieve. More numbers to combine, more difficult the game.
    generateCombination();
    
    //This is a check for avoiding an impossible combinations based on choosing more than one time a button.
    for(var i = 0; i < maxNumberCombination; i++)
    {
        //A "token" will be put on a array with the same length of all the buttons. 
        randToken[randGenerator[i]]++;
    }

    //this is the "second part" of the check, we will analyze the array "randToken" and see if the combination was illegal or not. 
    for(var i = 0; i < randToken.length; i++)
    {
        //If the array contains two or more tokens in the same space that means the combination generated was illegal.
        if(randToken[i] >= 2)
        {
            // We will call the function later because calling it here will crash the game.
            boolIllegal = true;
            break;
        }
    }

    //recall the function and generate a better combination.
    if(boolIllegal == true)
    {
        setMaxPoints();
    }

    //reset the variable
    maxPoints = 0;
   
    // sum the results and generate the combination.
    for(var i = 0; i < randGenerator.length; i++)
    {
        maxPoints += values[randGenerator[i]];
        
    }
    //This loop doesn't allow one number combinations.
    for(var i = 0; i < values.length; i++)
    {
        //if maxPoints is equal to a value of one number...
        if(maxPoints == values[i])
        {
            //...restart the loop and generate another number
            setMaxPoints();
        }
    }
    // Store the actual maxPoints value, so it will stored and it will not be repeated between levels.
    storeOldNumber = maxPoints;
}

// function to call when a player make a good combination.
function levelUp()
{

    //get one more level
    levels++;
    seconds += 1 + (playerLevel / 100);
    if(levels / 5 == 0)
    {
        seconds += 1 + (playerLevel / 100);
    }
    gameExp += maxPoints;
    checkMaxPoints();

     //every button pressed for a combination receive an extra point of value. 
     for(var i = 0; i < values.length; i++)
     {
         //get a point of value for every button pressed.
         if(toggle[i] == true)
         {
             values[i]++;
             if(values[i] >= 10)
             {
                levels++;
                seconds += 1 + (playerLevel/100+0.001);
                values[i] = 1;
                 
             }
         }
     }
}





function gameOverState()
{
    document.getElementById("mainGame").classList.add("fadeOut");
    document.getElementById("mainGame").classList.remove("fadeIn");
    document.getElementById('mainGame').classList.add("hide");
    document.getElementById('mainGame').classList.remove("show");
    document.getElementById("boxSize").classList.remove("fadeOut");
    document.getElementById("boxSize").classList.add("fadeIn");
    document.getElementById('boxSize').classList.add("show");
    document.getElementById('boxSize').classList.remove("hide");
    gameExp = Number(Math.round(gameExp + (gameExp / 100 * levels) + levels));
    playerLevelUp(Number(gameExp));
    document.getElementById("gameOverText").innerHTML = "Game Over! You reached level: " + levels + " And your max is: " + localStorage.getItem("maxLevels") + "! Exp obtained: " + gameExp + "!";
    gameOver = true;
    seconds = 0.01;
    checkMaxPoints();
    for(var i = 0; i < buttonClick.length; i++)
    {
        values[i] = 0;
        toggle[i] = false;
    }
}

function playerLevelUp(gameExp)
{
    curExp = parseInt(curExp) + parseInt(gameExp);
    while(curExp >= maxExp)
    {
        //curExp -= playerLevel * 1000;
        playerLevel++;
        localStorage.setItem("playerLevel", playerLevel);
        maxExp = parseInt(maxExp);
        maxExp += parseInt(1000 + parseInt(playerLevel * 10));
    }
    document.getElementById("playerSettings").innerHTML = "Player Level: " + playerLevel;
    document.getElementById("expSettings").innerHTML = " Exp: " + parseInt(Math.round(curExp)) + "/" + parseInt(maxExp);
    localStorage.setItem("curExp", curExp);
    localStorage.setItem("maxExp", maxExp);
}
