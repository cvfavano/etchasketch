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
    targets.forEach(target => target.addEventListener('mouseover', (event) => 
       event.target.style.backgroundColor = '#fff'));
}   

function eraseAll() {
    let targets = document.querySelectorAll('.square');
    targets.forEach(target =>  target.style.backgroundColor = '#fff');
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
    setColor(randomRGB);
}

function calculateColor(color){
    let r, g, b;
    let regex = /\d+/g;
    var rgb = color.match(regex);

     r = Math.floor(rgb[0] - (rgb[0] * (.10)));
     g = Math.floor(rgb[1] - (rgb[1] * (.10)));
     b = Math.floor(rgb[2] -(rgb[2] * (.10)));
    if (r < 0 ) {r = 0;}
    if (g < 0 ) {g = 0;}
    if (b < 0 ) {b = 0;}
    console.log(`${r} ${g} ${b}`);
    return  `RGB(${r},${g},${b})`;
}


function setColor(color) {
     let targets = document.querySelectorAll('.square');
        targets.forEach(target => target.addEventListener('mousemove', 
            function backgroundChange(e) {
                e.target.style.backgroundColor =  color;     
                let newColor = calculateColor(color);
                color = newColor;
            }));
    }


createBoard(80,  changeColor);  

document.querySelector('.random').addEventListener('click', randomizeColor);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize);
document.querySelector('.erase').addEventListener('click', changeEraser);
document.querySelector('.clearAll').addEventListener('click',eraseAll);
document.querySelector('#favColor').addEventListener('click', changeColor);