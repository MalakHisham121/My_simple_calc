
let firstnum = ''
let secondnum = ''
let oper = null
let reset= false
const number = document.querySelectorAll('[data-number]');
const operation =document.querySelectorAll('[data-opertor]') ;
const m = document.getElementById('message')
const clea = document.getElementById('cl');
const delet = document.getElementById('del');
const eq = document.getElementById('equal');
const point = document.getElementById('point');
const whole = document.getElementById('wholescreen');
const current = document.getElementById('currentscreen');
window.addEventListener('keydown',handleKeyboardInput)
eq.addEventListener('click',evaluate)
clea.addEventListener('click',clearr)
delet.addEventListener('click',deleteNumber)
point.addEventListener('click',appendPoint)


m.innerHTML= '';
number.forEach((button)=>
    button.addEventListener('click',()=>appendNumber(button.textContent))
)

operation.forEach((button)=>
    button.addEventListener('click',()=>setOperation(button.textContent))
)

function appendNumber(num){
    if(current.textContent==='0'||reset)
        resetScreen()
    current.textContent+= num;
}


function resetScreen(){
    current.textContent=''
    reset=false
}

function clearr(){
    current.textContent='0'
    whole.textContent=''
    firstnum=''
    secondnum=''
    oper=null

}

function appendPoint(){
    if(reset)resetScreen()
    if(current.textContent==='')
        current.textContent='0'
    if(current.textContent.includes('.'))return
    current.textContent+='.'
}

function deleteNumber(){
    current.textContent= current.textContent.toString().slice(0,-1)
}
function setOperation(op){
    if(oper!=null)evaluate()
    firstnum=current.textContent
    oper= op
    whole.textContent= `${oper}${firstnum}`
    reset=true
}
function evaluate(){
if(oper==null||reset)return;
if(oper==='÷'&&current.textContent==='0'){
    m.innerHTML = "You can't divide by zero!"

    return;
}
m.innerHTML='';
secondnum = current.textContent
    current.textContent= roundResult(
        operate(oper,firstnum,secondnum)
    )
    whole.textContent= `${firstnum} ${oper} ${secondnum} =`
    oper= null

}

function roundResult(num){
    return Math.round(num*1000)/1000
}

function handleKeyboardInput(e){
    if(e.key>=0&&e.key<=9)appendNumber(e.key)
    if(e.key==='.')appendPoint()
    if(e.key==='='||e.key==='Enter')evaluate()
    if(e.key==='Backspace')deleteNumber()
    if(e.key==='Escape')clearr()
    if(e.key==='+'||e.key==='-'||e.key==='*'||e.key==='/')
        setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOpertor){
    if(keyboardOpertor==='/')return'÷'
    if(keyboardOpertor==='*')return '×'
    if(keyboardOpertor==='-')return '-'
    if(keyboardOpertor==='+')return '+'
}

function add(a,b)
{
    return a+b;
}
function substract(a,b){
    return a-b;
}
function multiply(a,b){
    return a*b;
}
function divide(a,b){
    return a/b
}

function operate(op,a,b){
    a = Number(a)
    b = Number(b)
    switch(op){
        case '+':
            return add(a,b)
        case '-':
            return substract(a,b)
        case '×':
            return multiply(a,b)
        case '÷':
            if(b===0)return null
            else
                return divide(a,b)
        default:
            return null
    }
}







