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
    checkListener();
    let targets = document.querySelectorAll('.square');
    //get color, default is black
    targets.forEach(target => target.addEventListener('mouseover', (event) => 
       event.target.style.backgroundColor = document.getElementById('favColor').value ));
}   

function changeEraser(){
    checkListener();
    let targets = document.querySelectorAll('.square');
    targets.forEach(target => 
        target.addEventListener('mouseover', (event) => event.target.style.backgroundColor = '#fff'));
   
}   

function eraseAll() {
    checkListener();
    let targets = document.querySelectorAll('.square');
    
    targets.forEach(target => 
        target.style.backgroundColor = '#fff', 
    );
}

function clearBoard() {
    checkListener();
    document.querySelector('.canvas').innerHTML = '';
}

function changePixelSize() {
    checkListener();
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
   
function getRGBValues(color, isBrighten){
    let regex = /\d+/g;
    let colors = color.match(regex);
   
    if(isBrighten){
        for(let i = 0; i < colors.length; i++){
            colors[i] = Math.floor(parseInt(colors[i]) + (parseInt(colors[i]) * .10));
            if (parseInt(colors[i]) > 255) {
                colors[i]= 255;
            }
        colors.splice(i, i, colors[i]);
        }
    }
    else{
        for(let i = 0; i < colors.length; i++){
            colors[i] = Math.floor(colors[i] - (parseInt(colors[i]) * .10));
            if (parseInt(colors[i]) < 0) {
                colors[i] = 0;
            }
            colors.splice(i, i, colors[i]);
        }
    } 
    console.log(`RGB('${colors[0]}','${colors[1]}','${colors[2]}')`);
        return `RGB('${colors[0]}','${colors[1]}','${colors[2]}')`;

}





function darkenFilter() {
    let color= randomizeColor();
    let targets = document.querySelectorAll('.square');
    targets.forEach(target => target.addEventListener('mouseover', (event) => {
     
                color = getRGBValues(color, 0);
                
                event.target.style.backgroundColor = '"' + color +'"' ;
                console.log(color);
                console.log(event.target.style.backgroundColor = '"' + color +'"' );
            }
            ));
    };
            




function randomColor() {
    let color= randomizeColor();
    let targets = document.querySelectorAll('.square');

    targets.forEach(target => target.addEventListener('mouseover', (event) => 
    //check if rgb is not 0


        event.target.style.backgroundColor = color));

}

function checkListener(){
    const targets = document.querySelectorAll('.square');
 
    if(document.querySelector('.square').hasAttribute('filterlistener')){
        targets.forEach(target => target.removeEventListener('mouseover',  darkenFilter));
        targets.forEach(target =>target.removeAttribute('filterlistener'));  
    }
}

createBoard(30,  changeColor);  

document.querySelector('.random').addEventListener('click', randomColor);
//document.querySelector('.darken').addEventListener('click', darkenFilter);
//document.querySelector('.lighten').addEventListener('click', lightenFilter);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize);
document.querySelector('.erase').addEventListener('click', changeEraser);
document.querySelector('.clearAll').addEventListener('click',eraseAll);
 document.querySelector('#favColor').addEventListener('click', changeColor);