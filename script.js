const canvas = document.querySelector('.canvas');

let color = 'RGB(0,0,0)';
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
    
        if (number < 25 ){    
            e.target.className = "square filter-" + ++number ;
        
            let regex = /\d+/g;
            let colors = color.match(regex);
            for(let i = 0; i < colors.length; i++){
                colors[i] = Math.floor(parseInt(colors[i]) - (parseInt(colors[i]) * (number * .0005)));
                if (parseInt(colors[i]) < 0) {
                    colors[i] = 0;
                }
                colors.splice(i, 1, colors[i]);
            }
            color = `RGB(${colors[0]},${colors[1]},${colors[2]})`;
        }    
      
    }
}

function lightenFilter(e)  {
    if(e.target.className == 'square'){ 
        e.target.className = 'square filter-25';
        color = document.querySelector('.lighten').value;
    }

    else{
        let regex = /\d+/g;
        let number = parseInt(e.target.className.match(regex));
    let colors = color.match(regex);
        if (number > 0 ){    
            e.target.className = "square filter-" + --number ;
        
            let regex = /\d+/g;
            
            for(let i = 0; i < colors.length; i++){
                colors[i] = Math.floor(parseInt(colors[i]) + (parseInt(colors[i]) * (number * .0005)));
                if (parseInt(colors[i]) > 255) {
                    colors[i] = 255;
                }
                colors.splice(i, 1, colors[i]);
            }
        
            color = `RGB(${colors[0]},${colors[1]},${colors[2]})`;
        }   

        
    }
}


function changeColor(e){
    let targets = document.querySelectorAll('.canvas div');
    targets.forEach(item  =>   item.className ='square');

    if(stat=='darken') {
        darkenFilter(e);
    }

    if(stat=='lighten') {
        lightenFilter(e);
    }

    e.target.style.backgroundColor = color;
}

function colorPicker(){
    stat = null;
    color = document.getElementById('favColor').value;
}   
function returnRandomColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    return `RGB(${r},${g},${b})`;
}

function darkenClick(){
    let randomRGB = returnRandomColor();
    document.querySelector('.darken').setAttribute('value', randomRGB);
    stat ='darken';
}
function lightenClick(){
    let randomRGB = returnRandomColor();
    document.querySelector('.lighten').setAttribute('value', randomRGB);
    stat = 'lighten';
}

function eraser(){
    targets.forEach(item  =>   item.className ='square');
    stat = null;
    color = 'RGB(255,255,255)';
}   

function eraseAll(){
    let targets = document.querySelectorAll('.canvas div');
    targets.forEach(item  => {item.style.backgroundColor= 'RGB(255,255,255)';
    item.className ='square';});
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
   eraseAll();
   createBoard(pixelNum); 
}
   
function randomizeColor(){
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let randomRGB = `RGB(${r},${g},${b})`;
    stat = null;
    color = randomRGB;
}
function erase() {
    color = '#fff';
}   


    



createBoard(100); 


document.querySelector('.random').addEventListener('click', randomizeColor);
document.querySelector('.darken').addEventListener('click', darkenClick);
document.querySelector('.lighten').addEventListener('click', lightenClick);
document.querySelector('.erase').addEventListener('click', eraser);

document.querySelector('#favColor').addEventListener('input', colorPicker);
document.querySelector('.clearAll').addEventListener('click', eraseAll);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize);