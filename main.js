var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
var playerColor="w"
var firstMove=1;
var prompt = "Lets play a game of chess. Reply with your moves in algebraic notation inside square brackets and i will do the same. [FIRSTMOVE]"
var errorPrompt = "Thats not a legal move. The current boardstate is [PGN] and you are playing [AIcolor]. it is your move. Please interpret the boardstate and make the best move. tell me your move in algebraic notation surrounded by square brackets.";
var scoldType = 3;

// settings
if (typeof settings.prompt !== 'undefined') prompt = settings.prompt;
if (typeof settings.scoldType !== 'undefined') scoldType = scoldType;
if (typeof settings.errorPrompt !== 'undefined') errorPrompt = settings.errorPrompt;
if (typeof settings.playerColor !== 'undefined') playerColor = settings.playerColor;

var playerColorHuman=(playerColor=="w"?"White":"Black");
var AIColorHuman=(playerColor!="w"?"White":"Black");
var playerFirstPronoun=(playerColor=="w"?"I":"You");
$("#playerColor").html(playerColorHuman);
prompt = prompt.replace("[STARTING]",playerFirstPronoun);

if(playerColor!="w"){
    prompt = prompt.replace("[FIRSTMOVE]","You go first.");
    PlayerMove(prompt);
    firstMove=0;
}

function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false

    if (game.turn() !== playerColor){
        return false;
    }
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }
}

function onDrop (source, target, piece) {
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
    if(firstMove){
        firstMove=0;
        prompt = prompt.replace("[FIRSTMOVE]","I will go first. My first move is ");
        PlayerMove(prompt+"["+game.history()[game.history().length-1]+"]");
    }else{
        PlayerMove("["+game.history()[game.history().length-1]+"]");
    }
    updateStatus()
}
function PlayerMove(movestring,dontSend){
    console.log("PLAYER MOVED "+movestring);
    $('textarea').val(movestring);
    if (typeof dontSend === 'undefined') $("button.absolute").click();
}

var badMoveCount = 0;
function AImove(movestring){
    var move = game.move(movestring);
    if(move === null){
        badMoveCount++;
        errorPrompt = errorPrompt.replace("[AIcolor]",AIColorHuman);
        errorPrompt = errorPrompt.replace("[PGN]",game.pgn());
        if(scoldType<=0||badMoveCount>scoldType-1){
            console.log("Too many bad moves. User input required")
            PlayerMove(errorPrompt,1);
            badMoveCount=scoldType-1;
            return false;
        }
        console.log(badMoveCount+" bad ai moves in a row");
        PlayerMove(errorPrompt);
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

function updateStatus () {
    var status = ''

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

var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    pieceTheme: 'https://chessboardjs.com/img/chesspieces/alpha/{piece}.png',
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = Chessboard('myBoard', config)
updateStatus()


if(playerColor!="w"){
    board.flip();
}

var waiting;
var latest;
function dowait(){
    if(jQuery(".border-0>.gap-2").text()=="Regenerate response"){
        var AIresponse =jQuery(".bg-gray-50:last").find("p").text();
        var matches = AIresponse.match(/\[(.*?)\]/); // get the first move inside square brackets
        if(matches){
            AIturn=matches[1];
            AIturn = AIturn.substr( AIturn.indexOf('.') + 1 ); // remove the turn number if present
            AImove(AIturn);
            console.log("AI moved "+AIturn);
        }else{
            console.log("INVALID MOVE")
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
