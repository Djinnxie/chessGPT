var board = null;
var game = new Chess();
var $status = $('#status');
var $fen = $('#fen');
var $pgn = $('#pgn');
var playerColor="w";
var firstMove=1;
var startingPosition=0;
var prompt = "I'd like you to pretend to be BOB. BOB is a chess grand master. BOB will be presented with a series of positions in PGN form and his job is to provide the best next move for black and a one sentance analysis of the move and position. He responds with his move in algebraic notation inside square brackets. for example, he would write the move [e7 - e6] as [e6]. You are BOB and the first position for you to analyze is [FIRSTMOVE]";
var nextPrompt = "Thanks, BOB. The next position for you to analyze is: [PGN]. First, tell me your move in algebraic notation surrounded by square brackets and then give a one sentance analysis of the boardstate and your move.";
var errorPrompt = "Thats not a legal move. The current boardstate is [PGN] and you are playing [AIcolor]. it is your move. Please interpret the boardstate and make the best move. tell me your move in algebraic notation surrounded by square brackets.";
var scoldType = 0;
var freeMove = 0; // TODO  

// settings
// TODO write a function for this
if (typeof settings !== 'undefined'){
    if (typeof settings.freeMove !== 'undefined') freeMove = settings.freeMove;
    if (typeof settings.prompt !== 'undefined') prompt = settings.prompt;
    if (typeof settings.scoldType !== 'undefined') scoldType = settings.scoldType;
    if (typeof settings.errorPrompt !== 'undefined') errorPrompt = settings.errorPrompt;
    if (typeof settings.playerColor !== 'undefined') playerColor = settings.playerColor;
    if (typeof settings.startingPosition !== 'undefined') startingPosition = settings.startingPosition;
}

// word terms 
var playerColorHuman=(playerColor=="w"?"White":"Black");
var AIColorHuman=(playerColor!="w"?"White":"Black");
var playerFirstPronoun=(playerColor=="w"?"I":"You");
$("#playerColor").html(playerColorHuman);
prompt = prompt.replace("[STARTING]",playerFirstPronoun);

// if the AI goes first
if(firstMove==1 && playerColor!=game.turn()&&!freeMove){
    prompt = prompt.replace("[BOARDSTATE]","");
    prompt = prompt.replace("[FIRSTMOVE]","You go first.");
    PlayerMove(prompt);
    firstMove=0;
}

// TODO finish implementing this
function autoReplace(input){
    input = input.replace("[PGN]",game.pgn());
    input = input.replace("[FEN]",game.fen());
    input = input.replace("[AIcolor]",AIColorHuman);
    return input;
}

function onDragStart (source, piece, position, orientation) {
    if(freeMove) return true;
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    if (game.turn() !== playerColor) return false;

    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onDrop (source, target, piece) {
    if(!freeMove){
        if(game.turn() != playerColor){
            return 'snapback'
        }
        // see if the move is legal
        var move = game.move({
            from: source,
            to: target,
            promotion: 'q' // NOTE: always promote to a queen for example simplicity
        })

        // illegal move
        if (move === null) return 'snapback'

        // say the prompt if its the first move of the game 
        if(firstMove){
            firstMove=0;
            //prompt = prompt.replace("[FIRSTMOVE]","["+game.history()[game.history().length-1]+"]");
            prompt = prompt.replace("[FIRSTMOVE]","["+game.pgn()+"]");
            PlayerMove(prompt);
        }else{
            PlayerMove(nextPrompt.replace("[PGN]","["+game.pgn()+"]"));
        }
        updateStatus()
    }
}
function PlayerMove(movestring,dontSend){
    console.log(movestring);
    $('textarea').val(movestring);
    if (typeof dontSend === 'undefined') $("button.absolute").click();
}

var badMoveCount = 0;
function AImove(movestring){
    var move = game.move(movestring);
    // if move is invalid
    if(move === null){
        console.log("Bad move "+movestring);
        badMoveCount++;
        // TODO autoreplace function
        ePrompt = errorPrompt.replace("[AIcolor]",AIColorHuman);
        ePrompt = ePrompt.replace("[PGN]",game.pgn());
        ePrompt = ePrompt.replace("[FEN]",game.fen());
        if(scoldType<=0||badMoveCount>scoldType-1){
            console.log("Too many bad moves. User input required")
            PlayerMove(ePrompt,1);
            badMoveCount=scoldType-1; // you're on thin ice
            return false;
        }
        console.log(badMoveCount+" bad ai moves in a row");
        PlayerMove(ePrompt);
        return false;
    }else{
        badMoveCount=0;
        board.move(move.from+"-"+move.to);
    }
    updateStatus()
    board.position(game.fen())
    return move.san;
}

// update the board position after the piece snap
// for castling, en passant, pawn promotion
function onSnapEnd () {
    board.position(game.fen())
}

// TODO write helper messages when the AI makes an illegal move
function updateStatus () {
    var status = ''

    // TODO tidy this up
    var moveColor = 'White'
    if (game.turn() === 'b') {
        moveColor = 'Black'
    }

    // checkmate?
    if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.'
    }

    // draw?
    else if (game.in_draw()) {
        status = 'Game over, drawn position'
    }

    // game still on
    else {
        status = moveColor + ' to move'

        // check?
        if (game.in_check()) {
            status += ', ' + moveColor + ' is in check'
        }
    }

    $status.html(status)
    $fen.html(game.fen())
    $pgn.html(game.pgn())
}

// function to continue from a move
function setPosition(position){
    //    first=(typeof first === 'undefined'?0:first);
    game.load(position);
    board.position(game.fen());
    if(firstMove){
        PlayerMove(prompt.replace("[FIRSTMOVE]","["+game.pgn()+"]"));
    }else{
        PlayerMove(nextPrompt.replace("[PGN]","["+game.pgn()+"]"));
    }
}

function resumeGame(){
    freeMove=0;
    setPosition(board.position());
}

// TODO allow config values to be overwridden by settings
var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/alpha/{piece}.png',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
if(startingPosition===0){
    prompt = prompt.replace("[BOARDSTATE]","");
}else{
    // TODO theres a bug in this that resets the pieces after the AI's first move. Something to do with the PGN not being generated right
    if(startingPosition.stateType=="FEN"){
        config.position=startingPosition.boardState;
        game.load(startingPosition.boardState);
    }else if(startingPosition.stateType=="PGN"){
        game.loadPGN(startingPosition.boardState);
        config.position=game.fen();
    }
    prompt = prompt.replace("[BOARDSTATE]","Lets start from the position "+game.fen());
}
board = Chessboard('myBoard', config)
updateStatus()


// Always have the human player at the bottom of the board
if(playerColor!="w"){
    board.flip();
}

var waiting;
var latest;
// loop to check if the AI is done typing 
function dowait(){
    if(jQuery(".border-0>.gap-2").text()=="Regenerate response"){
        var AIresponse =jQuery(".bg-gray-50:last").find("p").text();
        var matches = AIresponse.match(/\[(.*?)\]/); // get the first move inside square brackets
        // TODO convert [e3 - e4] style moves 
        // convert [5...dxe4] format
        if(matches){
            AIturn=matches[1];
            AIturn = AIturn.substr( AIturn.lastIndexOf('.') + 1 ); // remove the turn number if present
            console.log("AI attempts move "+AIturn);
            AImove(AIturn);
        }else{
            // TODO handle when the ai doesnt make a move
            console.log("INVALID MOVE "+AIresponse);
        }
        window.clearInterval(waiting);
    }else{
        console.log("waiting...")
    }
}

//TODO check if scripts are loaded
jQuery('body').on('DOMNodeInserted', '.bg-gray-50', function () {
    latest=jQuery("this");
    // wait for "stop generating" to turn into "regenerate response"
    window.clearInterval(waiting);
    waiting=setInterval(dowait, 1000);
});
