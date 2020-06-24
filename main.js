let rows;
let columns;
const root = document.querySelector('#root');
const roomba = document.createElement('div');
root.appendChild(roomba);
const directionEnum = {
    down: `DOWN`,
    left: `LEFT`,
    right: `RIGHT`,
    up: `UP`
}

function setRoombaStartStyle(roomba) {
    roomba.style.position = "absolute";
    roomba.style.top = "5px";
    roomba.style.left = "5px";
    roomba.style.backgroundColor = "#eba87f";
    roomba.style.height = "50px";
    roomba.style.width = "50px";
    roomba.style.borderRadius = "40px";
}

function setRoombaJobCompletedStyle(roomba, roombaPos) {
    roomba.style.top = "5px";
    roomba.style.left = "5px";
    roomba.style.backgroundColor = "green";
    roombaPos.column = 0;
    roombaPos.row = 0;
}

function removePreviousTiles() {
    const tiles = root.getElementsByClassName('tile');
    
    while(tiles[0]) {    
        tiles[0].remove();
    }    
}

function setupTiles(totalRows, totalColumns) {
    let top = 60;
    let left = 0;
    for (let i = 0; i < totalRows; i++) {
        for (let j = 0; j < totalColumns; j++) {
            createTile({
                top,
                left
            });
            left += 80;
        }
        top += 100;
        left = 0;
    }
}

function createTile(pos) {
    const tile = document.createElement('div');
    const randomDirt = Math.round(Math.random() * 100 + 1);
    tile.setAttribute('class', 'tile');
    tile.style.position = "absolute";
    tile.style.margin = "2.5px";
    tile.style.width = "50px";
    tile.style.height = "30px";
    tile.style.top = pos.top + "px";
    tile.style.left = pos.left + "px";
    tile.style.border = "1px solid black";
    tile.style.backgroundColor = randomDirt < 31 ? "#a19994" : "#fff";
    root.appendChild(tile);
}

function startRoomba() {
    setRoombaStartStyle(roomba);
    rows = parseInt(document.querySelector('#rows').value) || 2;
    columns = parseInt(document.querySelector('#columns').value) || 2;
    removePreviousTiles();
    setupTiles(rows, columns);
    const roombaPos = {
        column: 0,
        row: 0
    };
    let lastMovement= "";
    const tiles = document.querySelectorAll('.tile');
    const roombaOnId = setInterval(() => {
        cleanIfTileIsDirt(tiles, roombaPos, columns);      
        if (isJobCompleted(tiles)) {
            setRoombaJobCompletedStyle(roomba, roombaPos);
            clearInterval(roombaOnId);
        } else {
            const possibleMovements = setPossibleMovements(roombaPos, columns, rows, lastMovement);
            const movementToDo = randomizeMovement(possibleMovements);
            lastMovement = movementToDo;
            executeMovement(movementToDo, roombaPos);
        } 
    }, 500);
}

function isJobCompleted(tiles) {
    for (let index = 0; index < tiles.length; index++) {        
        if (tiles[index].style.backgroundColor == "rgb(161, 153, 148)") {
            return false;
        }
    }
    return true;
}

function isNotTopRow(roombaPos) {
    if(roombaPos.row == 0) {
        return false;
    }
    return true;
}

function isNotBottomRow(roombaPos, totalRows) {
    if(roombaPos.row == totalRows - 1) {
        return false;
    }
    return true;
}

function isNotLeftColumn(roombaPos) {
    if (roombaPos.column == 0) {
        return false;
    }
    return true;
}

function isNotRightColumn(roombaPos, totalColumns) {
    if (roombaPos.column == totalColumns - 1) {
        return false;
    }
    return true;
}

function setPossibleMovements(roombaPos, totalColumns, totalRows, lastMovement) {
    let possibleMovements = [];
    if(isNotBottomRow(roombaPos, totalRows) && lastMovement != directionEnum.up) {
        possibleMovements.push(directionEnum.down);
    }
    if (isNotTopRow(roombaPos) && lastMovement != directionEnum.down) {
        possibleMovements.push(directionEnum.up);
    }
    if (isNotRightColumn(roombaPos, totalColumns) && lastMovement != directionEnum.left) {
        possibleMovements.push(directionEnum.right);
    }
    if (isNotLeftColumn(roombaPos) && lastMovement != directionEnum.right) {
        possibleMovements.push(directionEnum.left);
    }
    return possibleMovements;
}

function randomizeMovement(possibleMovements) {
    const indexOfMmovementToPick = Math.floor(Math.random() * possibleMovements.length);
    return possibleMovements[indexOfMmovementToPick];
}

function executeMovement(direction, roombaPos) {
    if(direction == directionEnum.left) {
        roombaPos.column--;
        roomba.style.left = 81 * roombaPos.column + "px";
    } else if (direction == directionEnum.right) {
        roombaPos.column++;
        roomba.style.left = 81 * roombaPos.column + "px";
    } else if (direction == directionEnum.down) {
        roombaPos.row++;
        roomba.style.top = 100 * roombaPos.row + "px";
    } else if (direction == directionEnum.up) {
        roombaPos.row--;
        roomba.style.top = 100 * roombaPos.row + "px";
    }
}

function cleanIfTileIsDirt(tiles, roombaPos, totalColumns) {
    const roombaTile = totalColumns * roombaPos.row + roombaPos.column;
    if (tiles[roombaTile].style.backgroundColor == "rgb(161, 153, 148)") {
            tiles[roombaTile].style.backgroundColor = "#fff";
    }
}
