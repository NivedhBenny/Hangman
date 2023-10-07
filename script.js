document.addEventListener("keydown",function(event){
    var character = event.key;
    checkChar(character);
    showChosen(character);
});
var lives=6;
var choice=0;

var wordcol=["red","fruit","marvel","logic","shark","snake","sword","eras","june","zebra","cat","swift","castle","forest","globe","piano","rocket","candle","guitar","planet","kite"];
var word="";

const clues = {
    "red": "I am a color often associated with love and passion.",
    "fruit": "I am an edible object that can be sweet or sour.",
    "marvel": "I am a renowned comic book company.",
    "logic": "I am the art of reasoning and rational thought, often used to solve complex problems.",
    "shark": "I am an apex predator of the ocean with multiple rows of sharp teeth.",
    "snake": "I am a legless animal, some of my kind are venomous, and others are constrictors.",
    "sword": "I am a weapon often wielded by knights and warriors in combat.",
    "eras": "I am distinct time periods in history marked by significant events and cultural changes.",
    "june": "I am the month known for the summer solstice, warm weather, and longer daylight hours.",
    "zebra": "I am a wild African animal resembling a horse.",
    "cat": "I am a furry and independent pet known for my agility and sometimes aloof nature.",
    "swift": "I am quick and agile in movement, often used to describe a bird in flight.",
    "globe": "I am a three-dimensional representation of the Earth.",
    "castle": "I am a fortified structure, often with turrets and moats, used for protection in medieval times.",
    "forest": "I am a densely wooded area with a variety of trees, plants, and wildlife.",
    "piano": "I am a musical instrument with keys that produce sounds when struck by hammers.",
    "rocket": "I am a vehicle which propels itself by expelling gas at high speeds.",
    "candle": "I am a source of illumination, often used for decoration and relaxation.",
    "guitar": "I am a stringed musical instrument that can be plucked or strummed, used in various music genres.",
    "planet": "I am a celestial body that orbits a star.",
    "kite": "I am an object flown in the sky, often with a tail, using the wind's force for elevation."
};

var alphabets ={}
initializeAlphas();
function initializeAlphas(){
    alphabets ={}
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
        if(char==word[i] && alphabets[char]==0){
            document.getElementById("box"+(i+1)).value=char.toUpperCase();
                alphabets[char]=1;
                choice++;
                correct=true;
        }

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
            openPopup('You Lost!', 'You ran out of lives. The word was ' + word.toUpperCase()+'.\nYour score is '+score, '#B31312','Try Again');
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
        if(clueFlag==1){
            score-=Math.floor(wordLen/2);
        }
        score+=wordLen;
        clueFlag=0;
        openPopup('You Won!', 'Congratulations! You guessed the word correctly.\nYour score is '+score, '#186F65','Next Word');
    }
}


function showChosen(char){
    document.getElementById("tries").innerHTML=lives;
    var list = document.getElementById("chosen");
    var entry = document.createElement('li');
    entry.appendChild(document.createTextNode(char.toUpperCase()));
    list.appendChild(entry);
}

function openPopup(text,bodyText,colour,buttonText) {
    document.querySelector('.popup-title').innerText = text ;
    document.querySelector('.popup-body').innerText = bodyText;
    document.querySelector('.popup').style.backgroundColor = colour;
    document.querySelector('.popup-button').innerText = buttonText;
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    overlay.style.display = "block";
    popup.style.display = "block";

}

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
    document.querySelector(".clue").innerHTML="<h2 style='color: #FFB000;'>"+clues[word]+"</h2>";
}