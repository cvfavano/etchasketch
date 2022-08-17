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
    checkRandomizeListener();
    let targets = document.querySelectorAll('.square');



    //get color, default is black
    targets.forEach(target => target.addEventListener('mouseover', (event) => 
       event.target.style.backgroundColor = document.getElementById('favColor').value ));
}   

function changeEraser(){
    checkRandomizeListener();
    let targets = document.querySelectorAll('.square');
    targets.forEach(target => 
        target.addEventListener('mouseover', (event) => event.target.style.backgroundColor = '#fff')
    )
}   

function eraseAll() {
    checkRandomizeListener();
    let targets = document.querySelectorAll('.square');
    
    targets.forEach(target => 
        target.style.backgroundColor = '#fff', 
    );
}

function clearBoard() {
    checkRandomizeListener();
    document.querySelector('.canvas').innerHTML = '';
}

function changePixelSize() {
    checkRandomizeListener();
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
function backgroundChange(e, color) {
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
}
function setColor() {
    let color= randomizeColor();
    let targets = document.querySelectorAll('.square');
    targets.forEach(target => target.addEventListener('mouseover', (event) => backgroundChange(event, color)));
    targets.forEach( target => target.setAttribute('randomizeListener',true));
}

function checkRandomizeListener(){
    const targets = document.querySelectorAll('.square');
 
    if(document.querySelector('.square').hasAttribute('randomizeListener')){
        targets.forEach(target => target.removeEventListener('mouseover',  backgroundChange));
        targets.forEach(target =>target.removeAttribute('randomizeListener'));
        targets.forEach(target =>target.style.removeProperty('filter'));   
    }
}

createBoard(30,  changeColor);  

document.querySelector('.random').addEventListener('click', setColor);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize);
document.querySelector('.erase').addEventListener('click', changeEraser);
document.querySelector('.clearAll').addEventListener('click',eraseAll);
document.querySelector('#favColor').addEventListener('click', changeColor);