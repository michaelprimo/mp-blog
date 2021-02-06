// STATE.JS = every function about the state of the game (game over, levelling up or other mechanics) will be here. 
// generate the points to get for go to the next 

let randToken = [];
let boolIllegal = false;
let toggleSelect = 0;

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
   maxPoints = 2;
}

// function to call when a player make a good combination.
function levelUp()
{
    toggleSelect = 0;
    //get one more level
    levels++;
    maxPoints++;
    checkMaxPoints();
    for(var i = 0; i < toggle.length; i++)
    {
        if(toggle[i] == true)
        {
            toggleSelect++;
        }
    }
     //every button pressed for a combination receive an extra point of value. 
     for(var i = 0; i < values.length; i++)
     {
         //get a point of value for every button pressed.
         if(toggle[i] == true)
         {
             values[i] += toggleSelect-1;
             
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
    document.getElementById("gameOverText").innerHTML = "Game Over! You reached level: " + levels + " And your max is: " + localStorage.getItem("maxLevels") + "!";
    gameOver = true;
    seconds = 0.01;
    checkMaxPoints();
    for(var i = 0; i < buttonClick.length; i++)
    {
        values[i] = 0;
        toggle[i] = false;
    }
}
