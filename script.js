document.addEventListener("keydown",function(event){
    var character = event.key;
    checkChar(character);
    showChosen(character);

});
var lives=6;
var choice=0;

var wordcol=["red","fruit","marvel","logic","shark","snake","sword","eras","june","zebra","cat","swift","physics","android","freedom"];
var word="";

var alphabets ={}
initializeAlphas();
function initializeAlphas(){
    alphabets ={}

    // for (let letter = 'a'; letter <= 'z'; letter++) {
    //     alphabets[letter] = 0;
    // }
    for (let charCode = 'a'.charCodeAt(0); charCode <= 'z'.charCodeAt(0); charCode++) {
        const letter = String.fromCharCode(charCode);
        alphabets[letter] = 0;
    }
}



function clearChosenList() {
    var list = document.getElementById("chosen");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function init(){
    initializeAlphas();
    word=wordcol[Math.floor(Math.random()*wordcol.length)];
    word="eras";
    wordLen=word.length;
    document.querySelector(".image").setAttribute("src","./images/6.png");
    document.querySelector(".boxes").innerHTML="";
    for( i=1;i<=wordLen;i++){
        document.querySelector(".boxes").innerHTML+="<input type='text' id='box"+i+"' class='box' disabled>";
    }
    for(i=0;i<wordLen;i++){
         document.getElementById("box"+(i+1)).value="";
    }
    document.querySelector(".message").innerHTML="";
    lives=6;
    document.getElementById("tries").innerHTML=lives;
    console.log(word);
    clearChosenList()
    choice=0;
    correct=false;
    flag=0;

}

init();
//word="physics"


// adding input boxes dynamically



var correct=false;
var flag=0;
function checkChar(char){
    console.log(alphabets[char]);
    if(alphabets[char]==0){
        flag=0;
        
    }else{
        flag=1;
    }
    for(i=0;i<wordLen;i++){
        
        // if(alphabets[char]==0){
        //     if(char==word[i]){
        //         document.getElementById("box"+(i+1)).value=char.toUpperCase();
        //         alphabets[char]=1;
        //         choice++;
        //         correct=true;
        //     }
        // }else if(char==word[i]){
        //         correct=true;
        //         flag=1;
        //         document.getElementById("box"+(i+1)).value=char.toUpperCase();
        // }else{
        //     flag=1;
        // }
        if(char==word[i] && alphabets[char]==0){
            document.getElementById("box"+(i+1)).value=char.toUpperCase();
                alphabets[char]=1;
                choice++;
                correct=true;
        }
            
        // }else{
        //     alphabets[char]=1;
        // }   
    
    }
    if(flag==1){
        document.querySelector(".message").innerHTML="<h2 style='color: goldenrod;'>CHARACTER ALREADY CHOSEN<h2>";
    }
    else if(correct){
        
       
            document.querySelector(".message").innerHTML="<h2 style='color: green;'>RIGHT CHOICE<h2>";
    
        
    }else{
        lives--;
        alphabets[char]=1;
        document.querySelector(".message").innerHTML="<h2 style='color: red;'>WRONG CHOICE<h2>";
    }
    correct=false;
    flag=0;
    document.getElementById("tries").innerHTML=lives;

    switch(lives){
        case 0:
            document.querySelector(".image").setAttribute("src","./images/0.png");
            showPopupWithText('You Lost!', 'You ran out of lives. The word was ' + word.toUpperCase(), '#B31312');
            break;
        case 1:
            document.querySelector(".image").setAttribute("src","./images/1.png");
            break;
        case 2:
            document.querySelector(".image").setAttribute("src","./images/2.png");
            break;
        case 3:
            document.querySelector(".image").setAttribute("src","./images/3.png");
            break;
        case 4:
            document.querySelector(".image").setAttribute("src","./images/4.png");
            break;
        case 5:
            document.querySelector(".image").setAttribute("src","./images/5.png");
            break;
        default:
            break;
    }
    if(choice==wordLen){
        showPopupWithText('You Won!', 'Congratulations! You guessed the word correctly.', '#186F65');
    }
}

function showPopupWithText(text,bodyText,colour) {
    document.querySelector('.modal-title').innerText = text 
    document.querySelector('.modal-body').innerText = bodyText;
    document.querySelector('.modal-content').style.backgroundColor = colour;
    $('#myModal').modal('show');
}


function playAgain() {
    init();
}

document.getElementById('playAgainBtn').addEventListener('click', playAgain);

function showChosen(char){
    document.getElementById("tries").innerHTML=lives;
    var list = document.getElementById("chosen");
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(char.toUpperCase()));
    list.appendChild(entry);
}




// function openPopup() {
//     var overlay = document.getElementById("overlay");
//     var popup = document.getElementById("popup");
//     overlay.style.display = "block";
//     popup.style.display = "block";
// }

// // Function to close the popup
// function closePopup() {
//     var overlay = document.getElementById("overlay");
//     var popup = document.getElementById("popup");
//     overlay.style.display = "none";
//     popup.style.display = "none";
// }


