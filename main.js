var board = null
var game = new Chess()
var $status = $('#status')
var $fen = $('#fen')
var $pgn = $('#pgn')
var playerColor="w"
var firstMove=1;
var prompt = "Lets play a game of chess. Reply with your moves in algebraic notation inside square brackets and i will do the same. [STARTING] will go first. [FIRSTMOVE]"
var errorPrompt = "";

// settings
if (typeof settings.prompt !== 'undefined') prompt = settings.prompt;
if (typeof settings.errorPrompt !== 'undefined') errorPrompt = settings.errorPrompt;
if (typeof settings.playerColor !== 'undefined') playerColor = settings.playerColor;

var playerColorHuman=("w"?"White":"Black");
var playerFirstPronoun=("w"?"I":"You");
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
        prompt = prompt.replace("[FIRSTMOVE]","My first move is ");
        PlayerMove(prompt+"["+game.history()[game.history().length-1]+"]");
    }else{
        PlayerMove("["+game.history()[game.history().length-1]+"]");
    }
    updateStatus()
}
function PlayerMove(movestring){
    console.log("PLAYER MOVED "+movestring);
    $('textarea').val(movestring);
    $("button.absolute").click();
}

var badMoveCount = 0;
function AImove(movestring){
    var move = game.move(movestring);
    if(move === null){
        badMoveCount++;
        if(badMoveCount>2){
            alert("Loop detected. User input required")
            badMoveCount=2;
            return false;
        }
        console.log(badMoveCount+" bad ai moves in a row");
        PlayerMove("Thats not a legal move. The current boardstate is '"+game.pgn()+"' and you are playing black. it is your move. Please interpret the boardstate and make the best move. tell me your move in algebraic notation surrounded by square brackets.");
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



var waiting;
var latest;
function dowait(){
    if(jQuery(".border-0>.gap-2").text()=="Regenerate response"){
        var AIresponse =jQuery(".bg-gray-50:last").find("p").text();
        var matches = AIresponse.match(/\[(.*?)\]/);
        if(matches){
            AIturn=matches[1];
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
