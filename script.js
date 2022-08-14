const container = document.querySelector('.container');


function createBoard(number,  callback) {
    const div = document.createElement('div');
    container.appendChild(div).classList.add('square');
    
    let i = 0;
    do{
        createSquares( number);
        i++;
    }
    while(i < number);
    
    styleSquares(number);
    callback();
}



function createSquares( num){

    const copiedDiv = document.querySelector('.square');

    
    for (let i = 0; i < num; i++){
        const clone = copiedDiv.cloneNode(false);
        container.appendChild(clone);
    }
}

function styleSquares(num){
    let squareWidth = 700/(num+2);
  
    const copiedDiv = document.querySelectorAll('.square');
   
    copiedDiv.forEach(div  => {
        div.style.width = squareWidth + 'px';
        div.style.height = squareWidth + 'px';
     } );
}

function changeColor(){
    const targets = document.querySelectorAll('.square');
    
    targets.forEach(target => target.addEventListener("mouseover", (event) => 
       event.target.style.backgroundColor = '#000'));
}   

document.querySelector('.changeGrid').addEventListener('click', changePixelSize);

function clearBoard() {
    document.querySelector('.container').innerHTML = '';
}

function changePixelSize() {
   let px = prompt('Enter number up 100:');

   if(px > 100) {
    prompt('Please enter less than or equalt o 100:');
   }
   pixelNum = parseInt(px)
   clearBoard();
   createBoard(pixelNum,  changeColor); 

}
   
createBoard(16,  changeColor);  
  