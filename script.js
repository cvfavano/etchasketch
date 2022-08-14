const container = document.querySelector('.container');
function createBoard(number, callback) {
    
    const div = document.createElement('div');
    container.appendChild(div).classList.add('square');
    const copiedDiv = document.querySelector('.square');

    createRow(number);
    callback();
    
    
}


function calculateSquareWidth(num){
    let squareWidth = Math.floor(960 / num);
    container.style.width = squareWidth + 'px';
}

//create 
function createRow(num){

    for(let i = 0; i < number; i++) {
        const clone = copiedDiv.cloneNode(false);
        container.appendChild(clone);
    }
 
}

function changeColor(){
    const targets = document.querySelectorAll('.square');
    
    targets.forEach(target => target.addEventListener("mouseover", (event) => 
       event.target.style.backgroundColor = '#000'));
}   
   
createBoard(16, changeColor);