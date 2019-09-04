let rows;
let columns;
const root = document.querySelector('#root');
const roomba = document.createElement('div');
roomba.style.position = "absolute";
roomba.style.top = "5px";
roomba.style.left = "5px";
roomba.style.backgroundColor = "#eba87f";
roomba.style.height = "50px";
roomba.style.width = "50px";
roomba.style.borderRadius = "40px";
root.appendChild(roomba);

function setupTiles() {
    let top = 60;
    let left = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
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
    rows = parseInt(document.querySelector('#rows').value) || 2;
    columns = parseInt(document.querySelector('#columns').value) || 2
    setupTiles();
    const roombaPos = {
        column: 0,
        row: 0
    };
    const tiles = document.querySelectorAll('.tile');
    let currentPos = roombaPos.row;
    const roombaOnId = setInterval(() => {
        console.log(currentPos);
        if (rows <= roombaPos.row) {
            roomba.style.top = "5px";
            roomba.style.left = "5px";
            roomba.style.backgroundColor = "green";
            clearInterval(roombaOnId);
        } else if (tiles[currentPos].style.backgroundColor == "rgb(161, 153, 148)") {
            tiles[currentPos].style.backgroundColor = "#fff";
        } else if (roombaPos.row % 2 == 0) {
            if (roombaPos.column < columns - 1) {
                roombaPos.column++;
                currentPos++;
                roomba.style.left = 81 * roombaPos.column + "px";
            }
            else {
                roombaPos.row++;
                currentPos += columns;
                roomba.style.top = 100 * roombaPos.row + "px";
            }
        } else if (roombaPos.row % 2 != 0) {
            if (roombaPos.column > 0) {
                roombaPos.column--;
                currentPos--;
                roomba.style.left = 81 * roombaPos.column + "px";
            } else {
                currentPos += columns;
                roombaPos.row++;
                roomba.style.top = 100 * roombaPos.row + "px";
            }
        }
    }, 500);
}
