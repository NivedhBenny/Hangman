document.addEventListener("keydown",function(event){
    var character = event.key;
    checkChar(character);
    showChosen(character);
});
var lives=6;
var choice=0;

var wordcol=["red","fruit","marvel","logic","shark","snake","sword","eras","june","zebra","cat","swift","castle","forest","globe","piano","rocket","candle","guitar","planet","kite"];
var word="";
// const clue = {
//     "red": "The color of ripe strawberries.",
//     "fruit": "Apples, oranges, and bananas are examples of this.",
//     "marvel": "A comic book company known for Spider-Man and the Avengers.",
//     "logic": "Reasoning and critical thinking.",
//     "shark": "A fearsome predator of the ocean.",
//     "snake": "A long, legless reptile often found in the grass.",
//     "sword": "A weapon with a long blade used in combat.",
//     "eras": "Different time periods in history.",
//     "june": "The sixth month of the year.",
//     "zebra": "A black-and-white striped animal native to Africa.",
//     "cat": "A furry pet that can be both independent and affectionate.",
//     "swift": "Moving or happening quickly.",
//     "globe": "A spherical representation of the Earth.",
//     "castle": "A fortified building often associated with medieval times.",
//     "forest": "A dense area of trees, plants, and wildlife.",
//     "piano": "A musical instrument with keys that produce sounds when struck by hammers.",
//     "rocket": "A vehicle that can propel itself into the atmosphere or outer space.",
//     "candle": "A source of light made of wax with a wick in the center.",
//     "guitar": "A musical instrument with strings that are plucked or strummed.",
//     "planet": "A celestial body that orbits a star, such as Earth or Mars.",
//     "kite": "An object flown in the sky, often with a tail."
// };
const clue = {
    "red": "A color often associated with love and passion.",
    "fruit": "Edible objects that can be sweet or sour.",
    "marvel": "A renowned comic book company.",
    "logic": "The art of reasoning and rational thought, often used to solve complex problems.",
    "shark": "An apex predator of the ocean with multiple rows of sharp teeth.",
    "snake": "A legless animal, some are venomous, and others are constrictors.",
    "sword": "A weapon often wielded by knights and warriors in combat.",
    "eras": "Distinct time periods in history marked by significant events and cultural changes.",
    "june": "The month known for the summer solstice, warm weather, and longer daylight hours.",
    "zebra": "A wild African animal resembling a horse.",
    "cat": "A furry and independent pet known for its agility and sometimes aloof nature.",
    "swift": "Quick and agile in movement, a word often used to describe a bird in flight.",
    "globe": "A three-dimensional representation of the Earth",
    "castle": "A fortified structure, often with turrets and moats, used for protection in medieval times.",
    "forest": "A densely wooded area with a variety of trees, plants, and wildlife.",
    "piano": "A musical instrument with keys that produce sounds when struck by hammers.",
    "rocket": "A vehicle which propels itself by expelling gas at high speeds.",
    "candle": "A source of illumination, often used for decoration and relaxation.",
    "guitar": "A stringed musical instrument that can be plucked or strummed, used in various music genres.",
    "planet": "A celestial body that orbits a star.",
    "kite": "An object flown in the sky, often with a tail, using the wind's force for elevation."
};

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

var score=0;

function clearChosenList() {
    var list = document.getElementById("chosen");
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function init(){
    initializeAlphas();
    word=wordcol[Math.floor(Math.random()*wordcol.length)];
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
    document.querySelector(".clue").innerHTML="CLUE <br>-"+Math.floor(wordLen/2)+" points";

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
        document.querySelector(".message").innerHTML="<h2 style='color: #D36B00;'>CHARACTER ALREADY CHOSEN<h2>";
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
            //showPopupWithText('You Lost!', 'You ran out of lives. The word was ' + word.toUpperCase(), '#B31312');
            openPopup('You Lost!', 'You ran out of lives. The word was ' + word.toUpperCase()+'.\nYour score is '+score, '#B31312');
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
    // if(score==0){
    //         openPopup('You Lost!', 'Your score is 0.', '#B31312');
    //     }
    if(choice==wordLen){
        //showPopupWithText('You Won!', 'Congratulations! You guessed the word correctly.', '#186F65');
        if(clueFlag==1){
            score-=Math.floor(wordLen/2);
        }
        score+=wordLen;
        clueFlag=0;
        openPopup('You Won!', 'Congratulations! You guessed the word correctly.\nYour score is '+score, '#186F65');
    }
}
// if(score==0){
//     openPopup('You Lost!', 'Your score is 0.', '#B31312');
// }
// function showPopupWithText(text,bodyText,colour) {
//     document.querySelector('.modal-title').innerText = text 
//     document.querySelector('.modal-body').innerText = bodyText;
//     document.querySelector('.modal-content').style.backgroundColor = colour;
//     $('#myModal').modal('show');
// }


// function playAgain() {
//     init();
// }

// document.getElementById('playAgainBtn').addEventListener('click', playAgain);

function showChosen(char){
    document.getElementById("tries").innerHTML=lives;
    var list = document.getElementById("chosen");
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(char.toUpperCase()));
    list.appendChild(entry);
}




function openPopup(text,bodyText,colour) {
    document.querySelector('.popup-title').innerText = text ;
    document.querySelector('.popup-body').innerText = bodyText;
    document.querySelector('.popup').style.backgroundColor = colour;
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    overlay.style.display = "block";
    popup.style.display = "block";

}

// Function to close the popup
function closePopup() {
    init();
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    overlay.style.display = "none";
    popup.style.display = "none";
}

var clueFlag=0;
function displayClue(){
    clueFlag=1;
    document.querySelector(".clue").innerHTML="<h2 style='color: #EE9322;'>"+clue[word]+"</h2>";
}