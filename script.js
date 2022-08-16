const canvas = document.querySelector('.canvas');

function createBoard(number, color) {
    let i = 0;
    do{
        createSquares(number);
        i++;
    }
    while(i < number);
    
    styleSquares(number);
    color();
}

function createSquares(num){
    const div = document.createElement('div');
    canvas.appendChild(div).classList.add('square');
  
    const copiedDiv = document.querySelector('.square');

    //(num-1) appended clone node is first block not counted in loop
    for (let i = 0; i < (num-1); i++){
        const clone = copiedDiv.cloneNode(false);
        canvas.appendChild(clone);
    }
}

function styleSquares(num){
    const squareWidth = 600/num;
    const copiedDiv = document.querySelectorAll('.square');
   
    copiedDiv.forEach(div  => {
        div.style.width = squareWidth + 'px';
        div.style.height = squareWidth + 'px';
     } );
}

function changeColor(){
    let targets = document.querySelectorAll('.square');
    //get color, default is black
    targets.forEach(target => target.addEventListener('mouseover', (event) => 
       event.target.style.backgroundColor = document.getElementById('favColor').value ));
}   

function changeEraser(){
    let targets = document.querySelectorAll('.square');
    targets.forEach(target => 
        target.addEventListener('mouseover', (event) => event.target.style.backgroundColor = '#fff')
    )
}   

function eraseAll() {
    let targets = document.querySelectorAll('.square');
    
    targets.forEach(target => 
        target.style.backgroundColor = '#fff', 
    );
}

function clearBoard() {
    document.querySelector('.canvas').innerHTML = '';
}

function changePixelSize() {
   let px = prompt('Enter number up 100:');

    if(px > 100 || isNaN(px) ) {
        prompt('Please enter less than or equal to 100:');
    }

    if(px === null || px === '') {
        return;
    }

   pixelNum = parseInt(px)
   clearBoard();
   createBoard(pixelNum,  changeColor); 
}
   
function randomizeColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let randomRGB = `RGB(${r},${g},${b})`;
    return randomRGB;
}

function setColor() {
   let color = randomizeColor();
    let targets = document.querySelectorAll('.square');
        targets.forEach(target => target.addEventListener('mouseover', function backgroundChange(e) {
                const colorSquare = window.getComputedStyle(e.target).filter;
                
                if(colorSquare == 'none' ) { 
                    e.target.style.backgroundColor = color; 
                    e.target.style.filter = 'brightness(1)';
                }
                else {
                    e.target.style.backgroundColor = color; 
                    let regex = /\d+/g;
                    let number = colorSquare.match(regex).join('.');
                    e.target.style.filter = 'brightness(' + (number - 0.10) +')';
                }
            },         
            ));
}
createBoard(80,  changeColor);  

document.querySelector('.random').addEventListener('click', setColor);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize). ;
document.querySelector('.erase').addEventListener('click', changeEraser);
document.querySelector('.clearAll').addEventListener('click',eraseAll);
document.querySelector('#favColor').addEventListener('click', changeColor);