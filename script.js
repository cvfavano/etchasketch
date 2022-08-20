const canvas = document.querySelector('.canvas');

let color = 'black';
let stat;

function createBoard(number) {
    let i = 0;
    do{
        createRowSquares(number);
        i++;
    }
    //number rows
    while(i < number);
    
    addSquareAttributes(number);
    
}

function createRowSquares(num){
    const div = document.createElement('div');
    canvas.appendChild(div).classList.add('square')
    const copiedDiv = document.querySelector('.square');

    //(num-1) appended clone node is first block not counted in loop
    for (let i = 0; i < (num-1); i++){
        const clone = copiedDiv.cloneNode(false);
        canvas.appendChild(clone);
        }
}

function addSquareAttributes(num){
    const squareDimension = 600/num;
    const copiedDiv = document.querySelectorAll('.square');
   
    copiedDiv.forEach(div  => {
        div.style.width = squareDimension + 'px';
        div.style.height = squareDimension + 'px';
        
        div.addEventListener('mouseover', e => changeColor(e))})
     } 

function darkenFilter(e)  {
    if(e.target.className == 'square'){ 
        e.target.className = 'square filter-0';
        color = document.querySelector('.darken').value;
    }

    else{
        let regex = /\d+/g;
        let number = parseInt(e.target.className.match(regex));
    
        if (number < 10 ){    
            e.target.className = "square filter-" + ++number ;
        
            let regex = /\d+/g;
            let colors = color.match(regex);
            for(let i = 0; i < colors.length; i++){
                colors[i] = Math.floor(parseInt(colors[i]) - (parseInt(colors[i]) * (number * .10)));
                if (parseInt(colors[i]) < 0) {
                    colors[i] = 0;
                }
                colors.splice(i, 1, colors[i]);
            }
            color = `RGB(${colors[0]},${colors[1]},${colors[2]})`;
        }    
    }
}


function changeColor(e){
     if(stat=='darken') {
        darkenFilter(e);
    }

    e.target.style.backgroundColor = color;
}

function colorPicker(){
    color = document.getElementById('favColor').value;
}   

function darkenClick(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let randomRGB = `RGB(${r},${g},${b})`;
   
    document.querySelector('.darken').setAttribute('value', randomRGB);
    stat ='darken';
}
   
function eraser(){
    stat = null;
    let targets = document.querySelectorAll('.canvas div');
    targets.forEach(item  => item.className='square');
    color = '#fff';
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
   createBoard(pixelNum); 
}
   
function randomizeColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let randomRGB = `RGB(${r},${g},${b})`;
    color = randomRGB;
}
function erase() {
    color = '#fff';
}   
// function getRGBValues(color, isBrighten, number){
//     let regex = /\d+/g;
//     let colors = color.match(regex);
  
//     if(isBrighten){
//         for(let i = 0; i < colors.length; i++){
//             colors[i] = Math.floor(parseInt(colors[i]) + (parseInt(colors[i]) * (number * .10)));
//             if (parseInt(colors[i]) > 255) {
//                 colors[i]= 255;
//             }
//         colors.splice(i, 1, colors[i]);
//         }
//     }
// }

    



createBoard(30); 


document.querySelector('.random').addEventListener('click', randomizeColor);
document.querySelector('.darken').addEventListener('click', darkenClick);
document.querySelector('.erase').addEventListener('click', eraser);

document.querySelector('#favColor').addEventListener('input', colorPicker);
document.querySelector('.clearAll').addEventListener('click', clearBoard);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize);