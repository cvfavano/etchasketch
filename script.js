const container = document.querySelector('.container');


function createBoard(number,  callback) {
    
    const div = document.createElement('div');
    container.appendChild(div).classList.add('square');

    let i = 0;
    do{
        createSquares(number);
        i++;
    }
    while(i < number);
    
    callback();
}

function calculateWidth(number) {
    return squareWidth = 700 / (number+2);
}

function createSquares(num){
    const copiedDiv = document.querySelector('.square');
    let squareWidth = calculateWidth(num);
    for (let i = 0; i < num; i++){
        const clone = copiedDiv.cloneNode(false);
        container.appendChild(clone);
        clone.style.width = squareWidth + 'px';
        clone.style.height = squareWidth + 'px';
    }
}

function changeColor(){
    const targets = document.querySelectorAll('.square');
    
    targets.forEach(target => target.addEventListener("mouseover", (event) => 
       event.target.style.backgroundColor = '#000'));
}   
   
createBoard(16,  changeColor);    