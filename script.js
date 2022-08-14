const container = document.querySelector('.container');

function createBoard(number,  callback) {
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
    const div = document.createElement('div');
    container.appendChild(div).classList.add('square');
  
    const copiedDiv = document.querySelector('.square');

    //(num-1) appended clone node is first block not in loop
    for (let i = 0; i < (num-1); i++){
        const clone = copiedDiv.cloneNode(false);
        container.appendChild(clone);
        clone.innerHTML = i;
        console.log(i);
    }
    copiedDiv.style.fontSize = "8px";
}

function styleSquares(num){
    const squareWidthWithBorder = 500/(num+2);
    const squareWidth = 500/num;
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

   if(px > 100 || isNaN(px)) {
    prompt('Please enter less than or equal to 100:');
   }

   pixelNum = parseInt(px)
   clearBoard();
   createBoard(pixelNum,  changeColor); 

}
   
createBoard(16,  changeColor);  
  