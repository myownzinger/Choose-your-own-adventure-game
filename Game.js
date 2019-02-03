import objList from './object-choices';

const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    CHOOSE_GAME: Symbol("chooseGame"),
    LETTER_ONE: Symbol("letterOne"),
    MAILMAN: Symbol("mailman"),
    WRITE_BACK: Symbol("writeBack"),
    CRAZY_UNCLE: Symbol("crazyUncle"),
    STAY_OR_GO: Symbol("stayOrGo"),
    PLAY_AGAIN: Symbol("playAgain"),
    QUESTIONS: Symbol("questions"),
    END: Symbol("end"),
    ROCK_CAKES: Symbol("rockCakes"),
    GRINGOTTS: Symbol("gringotts"),
    WHERE_TO_FIRST: Symbol("whereToFirst"),
    REAL_END: Symbol("realEnd")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.numQuestions = 21
        this.object = objList[Math.floor(Math.random()*objList.length)];
        this.gameNum=0;
    }
    // boolean function returns true when users guess is in chosen object's property list
    guessCorrect(sInput){
        var result = false;
        this.object.forEach(checkValue)
        
        function checkValue(item){
            result = result || (sInput.toLowerCase().match(item)!=null);
        };
        return result;
    }
    // string function, takes user input and responds with next step in the game. 
    makeAMove(sInput)
    {
        let sReply = "Welcome! Would you like to play HPAdventure,  or 20Questions?"
        switch(this.stateCur){
            case GameState.WELCOMING:
                this.stateCur = GameState.CHOOSE_GAME;
                break;
            case GameState.CHOOSE_GAME:
                if(sInput.toLowerCase().match("hp")||sInput.toLowerCase().match("adventure")){
                    sReply = "You're eating breakfast with your Aunt, Uncle and Cousin, who all treat you horribly. You hear the mail come in a go to fetch it. To your surprise, on the top of the pile is a letter for you. Do you put the letter in your cupboard under the stairs, or bring it with you to the table?";
                    this.stateCur = GameState.LETTER_ONE;
                }
                else {
                    sReply = "I'm thinking of an animal. You have 20 questions to get the correct answer. Ask a question!";
                    this.stateCur = GameState.QUESTIONS;
                }
                break;
            case GameState.LETTER_ONE:
                if(sInput.toLowerCase().match("table")||sInput.toLowerCase().match("kitchen")||sInput.toLowerCase().match("bring")){
                    sReply = "Your Uncle seizes the letter from you after your cousin rats you out. Do you accept that you'll never get a letter again, or sneak down in the morning to intercept the mailman?";
                    this.stateCur = GameState.MAILMAN;
                }else{
                    sReply ="After breakfast you head to your cupboard to read your letter. It says you've been accepted to Hogwarts school of Witchcraft and Wizardry, but you don't know what this means. Do you ask your Uncle, or send a letter to the school asking more questions?";
                    this.stateCur = GameState.WRITE_BACK;
                }
                break;
            case GameState.MAILMAN:
                if(sInput.toLowerCase().match("mailman")||sInput.toLowerCase().match("morning")||sInput.toLowerCase().match("sneak")){
                    sReply = "You're surprised to find your Uncle sleeping on the floor in front of the front door by stepping on his face. He's so outraged he locks you in your cupboard for the rest of the day. Type y to continue.";
                    this.stateCur = GameState.CRAZY_UNCLE
                }
                else {
                    sReply = "Your life is surprisingly peaceful, for a day. Type y to continue.";
                    this.stateCur = GameState.CRAZY_UNCLE
                }
                break;
            case GameState.WRITE_BACK:
                if(sInput.toLowerCase().match("uncle")) {
                    sReply = "You're sorry you ever asked, your uncle yells so much his face turns a deep shade of purple for lack of breath. He then proceeds to lock you in your cupboard for a week. Type y to continue";
                    this.stateCur = GameState.CRAZY_UNCLE
                }
                else {
                    sReply = "You carefully craft a letter asking for more information, but on your way to mail it you run into your Aunt, who tells your Uncle immediately. You've never seen him turn this shade of purple before, and can practically see down his throat as he yells at you. Type y to continue.";
                    this.stateCur = GameState.CRAZY_UNCLE
                }
                break;
            case GameState.CRAZY_UNCLE:
                 if(sInput.toLowerCase().match("y")){
                    sReply = "Letters continue to arrive through the following week, more frequently than ever, and in more bizarre ways than you thought possible (some even arrived balled up inside your Aunt's freshly bought eggs. Finally your uncle seems to snap. With his vein popping from his forehead he declares that the whole family is 'Going away' and that you have five minutes to pack. A day later, you're in a remote cabin. It's almost your birthday. As the clock strikes midnight, a large Man breaks into the cottage and tells you you're a wizard and should come with him. Do you go with him or stay with your Aunt and Uncle?";
                    this.stateCur = GameState.STAY_OR_GO
                }
                else {
                    sReply = "Letters continue to arrive through the following week, more frequently than ever, and in more bizarre ways than you thought possible (some even arrived balled up inside your Aunt's freshly bought eggs. Finally your uncle seems to snap. With his vein popping from his forehead he declares that the whole family is 'Going away' and that you have five minutes to pack A day later, you're in a remote cabin. It's almost your birthday. As the clock strikes midnight, a large Man breaks into the cottage and tells you you're a wizard and should come with him. Do you go with him or stay with your Aunt and Uncle?";
                    this.stateCur = GameState.STAY_OR_GO
                }
                break;
            case GameState.STAY_OR_GO:
                if(sInput.toLowerCase().match("go")){
                    sReply="The large man tells you all about your parents and the Wizarding world on your boat ride away from the island, and as you speed forward in the boat, you can't help but feel like your story is just beginning. Do you want to continue, play again, or stop?";
                    this.stateCur = GameState.PLAY_AGAIN;
                }
                else {
                    sReply = "The large man looks sad and says he doesn't want to leave without you, and your Uncle starts insulting you and your (dead) parents. Do you stay or do you go?";
                    this.stateCur = GameState.STAY_OR_GO;
                }
                break;
            case GameState.PLAY_AGAIN:
                if(sInput.toLowerCase().match("play")||sInput.toLowerCase().match("again")||sInput.toLowerCase().match("start")||sInput.toLowerCase().match("yes")){
                    sReply = "Would you like to play HPAdventure or 20Questions?";
                    this.stateCur = GameState.CHOOSE_GAME;
                }
                else if(sInput.toLowerCase().match("continue")){
                    sReply = "When you get to shore, the giant asks if you'd like to stop and eat some of the rock cakes he brought before you go to buy your things. Do you say yes or no?";
                    this.stateCur = GameState.ROCK_CAKES;
                }
                else {
                    sReply = "Okay, have a nice day. Type anything to play again."
                    this.stateCur = GameState.END;
                }
                break;
            case GameState.QUESTIONS:
                if(this.numQuestions==1){
                    sReply ="Sorry, you lose! Do you want to play again?";
                    this.numQuestions=21;
                    this.gameNum+=1;
                    this.object = objList[Math.floor(Math.random(this.gameNum)*objList.length)];
                    this.stateCur = GameState.PLAY_AGAIN;
                }
                else if(sInput.toLowerCase().match(this.object.name)!=null){
                    sReply="Congratulations, you won! Do you want to play again?";
                    this.numQuestions=21;
                    this.gameNum+=1;
                    this.object = objList[Math.floor(Math.random(this.gameNum)*objList.length)];
                    this.stateCur =GameState.PLAY_AGAIN;
                }
                else if(this.guessCorrect(sInput)){
                    this.numQuestions-=1;
                    sReply="Yes! "+this.numQuestions+" questions left.";
                    this.stateCur = GameState.QUESTIONS;
                } 
                else {
                    this.numQuestions-=1;
                    sReply = "No :( "+this.numQuestions+" questions left.";
                    this.stateCur = GameState.QUESTIONS;
                }
                break; 
            case GameState.END:
                if(sInput){
                    sReply = "Welcome back! Would you like to play HPAdventure or 20Questions?"
                    this.stateCur = GameState.CHOOSE_GAME;
                }
                break;
            case GameState.ROCK_CAKES:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "You take the small package Hagrid (you've learned his name now) gives you. You unwrap it and take a bite, immediately regretting your decision having chipped a tooth. You smile at Hagrid but throw the rest in a bush when he's not looking. Hagrid asks if you're ready to buy your things now. Do you say yes or no?";
                    this.stateCur = GameState.DIAGONALLY;                
                }
                else {
                    sReply = "The giant Hagrid says he'd still like to stop for a bite, so he takes you to a pub called the leaky cauldron that the muggles outside don't seem to notice. As you finish your soup he asks if you're ready to move on. Are you?";
                    this.stateCur = GameState.DIAGONALLY;
                }
                break;
            case GameState.DIAGONALLY:
                if(sInput.toLowerCase().match("yes")){
                    sReply = "Hagrid takes you to the back of the leaky cauldron, where  he taps a brick on the back wall three times. Before your eyes an arch way appears leading into a small winding cobbled street full of shops! Do you sprint ahead or ask Hagrid where to go?";
                    this.stateCur = GameState.GRINGOTTS;
                }else {
                    sReply = "Hagrid twiddles his thumbs and begins to look impatient. He leans forward and asks if you're ready to go now. Are you?"
                }
                break;
            case GameState.GRINGOTTS:
                if(sInput.toLowerCase().match("sprint")||sInput.toLowerCase().match("ahead")||sInput.toLowerCase().match("run")){
                    sReply = "You sprint into the street but barely get anywhere before a large hand grabs you by the shoulder, stopping you in your tracks. 'Where do you think you're going?! We have to go get yer money first! You go to the bank and take out more gold than you've ever seen in your life (but it's just a fraction of what you have). Hagrid asks if you'd like to first get your robes, your books, or your wand."
                    this.stateCur = GameState.WHERE_TO_FIRST;
                }
                else {
                    sReply = "You ask Hagrid where to go first, but he's already bounding down the street so you run to catch up. He takes you to the bank and helps you take out more money than you even knew existed! With your new sack of gold in hand, he asks you what you'd like to get first, your robes, your books or your wand.";
                    this.stateCur = GameState.WHERE_TO_FIRST;
                }
                break;
            case GameState.WHERE_TO_FIRST:
                if(sInput.toLowerCase().match("robe")){
                    sReply = "Hagrid offers to grab your books while you try on your robes. You meet a straw haired kid while you're in there, but he doesn't seem very nice. Hagrid comes back with your books and asks if you're ready to go get your wand. Do you say yes?";
                    this.stateCur = GameState.REAL_END;
                }
                else if(sInput.toLowerCase().match("books")){
                    sReply = "Hagrid says it might be best if he grabs your books for you while you get your robes fitted. You meet a pinch-faced straw haired boy who rubs you the wrong way. Hagrid comes back and asks if you're ready to get your wand. Do you say yes?";
                    this.stateCur = GameState.REAL_END;
                }
                else {
                    sReply = "You go into the wand shop while Hagrid goes to run an errand. An old man named Ollivander comes out and keeps putting wands in your hand until one finally sends sparks into the air. When Hagrid comes back, he's holding a cage containing a large snowy owl. He says its for your birthday, and asks if you're ready to get your robes. Do you say yes?";
                    this.stateCur = GameState.REAL_END;
                }
                break;
            case GameState.REAL_END:
                if(sInput.toLowerCase().match("yes")||sInput.toLowerCase().match("ye")){
                    sReply = "You finish getting your things (with Hagrid's help) and leave Diagon Ally with a chest full of your supplies for school and your new owl Hedwig. Hagrid drops you at King's Cross Station, and you say farewell, sure that you'll meet again soon. Would you like to play again?";
                    this.stateCur = GameState.PLAY_AGAIN;
                }
                else {
                    sReply = "Hagrid looks impatient now. He asks you one more time if you're ready to get the rest of your things."
                }
                break;
        }
        return([sReply]);
    }
}