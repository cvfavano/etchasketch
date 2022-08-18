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
    trackListeners("changeColor");
  //  checkListeners();
    let targets = document.querySelectorAll('.square');
    //get color, default is black
    targets.forEach(target => target.addEventListener('mouseover', (event) => 
       event.target.style.backgroundColor = document.getElementById('favColor').value ));
}   

function erase(){
    let targets = document.querySelectorAll('.square');
    targets.forEach(target => 
        target.addEventListener('mouseover', (event) => {
        event.target.style.backgroundColor = '#fff';
        event.target.className = 'square'; 
}));
   
}   

function eraseAll() {
    let targets = document.querySelectorAll('.square');
    
    targets.forEach(target => {
        target.style.backgroundColor = '#fff';
        target.className = 'square';
    })
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
   
function getRGBValues(color, isBrighten, number){
    let regex = /\d+/g;
    let colors = color.match(regex);
   
    if(isBrighten){
        for(let i = 0; i < colors.length; i++){
            colors[i] = Math.floor(parseInt(colors[i]) + (parseInt(colors[i]) * (number * .10)));
            if (parseInt(colors[i]) > 255) {
                colors[i]= 255;
            }
        colors.splice(i, 1, colors[i]);
        }
    }
    else{
        for(let i = 0; i < colors.length; i++){
            colors[i] = Math.floor(parseInt(colors[i]) - (parseInt(colors[i]) * (number * .10)));
            if (parseInt(colors[i]) < 0) {
                colors[i] = 0;
            }
            colors.splice(i, 1, colors[i]);
        }
    } 
        return `RGB(${colors[0]},${colors[1]},${colors[2]})`;

}
function filters(event){
    let color = document.querySelector('.darken').getAttribute('value');
    console.log(color);
        if(event.target.className == 'square'){
            event.target.style.backgroundColor =  color;
            event.target.className = 'square filter-0';
           
        }
        else{
        
            let regex = /\d+/g;
            let number = parseInt(event.target.className.match(regex));
         //   originalColor;
          //  console.log(number);
            if (number < 10 ){
                
                event.target.className = "'square filter-" + ++number + "'";
            //    console.log(number);
    
            event.target.style.backgroundColor  = getRGBValues(color, 0, number);
            }

        }
}

function darkenFilter() {
    trackListeners("darkenFilter");
    // checkListeners();
    let color = randomizeColor();
    let targets = document.querySelectorAll('.square');
    document.querySelector('.darken').setAttribute('value', color);
    targets.forEach(target => target.addEventListener('mouseover', filters)
    )
}   
    
function randomColor() {
    trackListeners("randomColor");
    // checkListeners();
    let color= randomizeColor();
    let targets = document.querySelectorAll('.square');

    targets.forEach(target => target.addEventListener('mouseover', (event) => 
        event.target.style.backgroundColor = color));

}

// function checkListeners(){
//     const targets = document.querySelectorAll('.square');
//     const target = document.querySelector('.square');
//     const attrValues = target.getAttributeNames();
//    // arr1.filter(item => !arr2.includes(item));
//     const listeners = ['changecolor', 'darkenfilter','randomcolor', ];
//     let values = attrValues.filter(item => listeners.includes(item));
//         console.log(values);

//     for(let i = 0; i < values.length; i++) {
//         targets.forEach(el => el.removeEventListener('mouseover', values[i]));
//     }
// }

function trackListeners(listener) {
    const square = document.querySelector('.square');
    square.setAttribute(listener, "true"); 

}

createBoard(30,  darkenFilter); 


document.querySelector('.random').addEventListener('click', randomColor);
document.querySelector('.darken').addEventListener('click', darkenFilter);
//document.querySelector('.lighten').addEventListener('click', lightenFilter);
document.querySelector('.changeGrid').addEventListener('click', changePixelSize);
document.querySelector('.erase').addEventListener('click', erase);
document.querySelector('.clearAll').addEventListener('click',eraseAll);
 document.querySelector('#favColor').addEventListener('click', changeColor);