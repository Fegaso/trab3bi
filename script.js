//Declarando variáveis iniciais do jogo
let fundo = document.querySelector('#fundo');

let painel = document.querySelector('#painel');

let p1 = document.querySelector('#p1');

let enmy = document.querySelector('#enmy');

let cima = document.querySelector('#acima');

let dir = document.querySelector('#direita');

let baixo = document.querySelector('#baixo');

let esq = document.querySelector('#esquerda');

let fps = 90;
//Definindo alturas, larguras e posições de objetos
if(innerHeight * (16/9) > innerWidth) {
 fundo.style.width = innerWidth + 'px';
 fundo.style.height = innerWidth * (9/16) + 'px';

} else if(innerWidth * (9/16) > innerHeight) {
 fundo.style.height = innerHeight + 'px';
 fundo.style.width = innerHeight * (16/9) + 'px';
} else {
 fundo.style.width = innerWidth  + 'px';
 fundo.style.height = innerHeight  + 'px';
}

painel.style.width = 0.3 * parseFloat(fundo.style.height) + 'px';
painel.style.height = 0.3 * parseFloat(fundo.style.height) + 'px';
painel.style.left = parseFloat(fundo.style.width) - parseFloat(painel.style.width) + 'px';
painel.style.top = parseFloat(fundo.style.height) - parseFloat(painel.style.height) + 'px';
painel.children[0].style.lineHeight = painel.children[0].style.height;
painel.children[2].style.lineHeight = painel.children[2].style.height;
painel.children[1].children[0].style.lineHeight = painel.children[1].children[0].style.height;
painel.children[1].children[2].style.lineHeight = painel.children[1].children[2].style.height;
painel.children[0].style.fontSize = parseFloat(painel.children[0].style.height) + 'px';
painel.children[2].style.fontSize = parseFloat(painel.children[2].style.height) + 'px';
painel.children[1].children[0].style.fontSize = parseFloat(painel.children[1].children[0].style.height) + 'px';
painel.children[1].children[2].style.fontSize = parseFloat(painel.children[1].children[2].style.height) + 'px';

p1.style.width = 0.1 * parseFloat(fundo.style.height) + 'px';
p1.style.height = 0.1 * parseFloat(fundo.style.height) + 'px';
p1.style.borderRadius = 0.1 * parseFloat(fundo.style.height) + 'px';
p1.style.top = parseFloat(fundo.style.height) / (3/2) - parseFloat(p1.style.height) / 2 + 'px';
p1.style.left = parseFloat(fundo.style.width) / 2 - parseFloat(p1.style.width) / 2 + 'px';

enmy.style.width = 0.11 * parseFloat(fundo.style.height) + 'px';
enmy.style.height = 0.11 * parseFloat(fundo.style.height) + 'px';
enmy.style.borderRadius = 0.11 * parseFloat(fundo.style.height) + 'px';
enmy.style.top = parseFloat(fundo.style.height) / 3 - parseFloat(enmy.style.height) / 2 + 'px';
enmy.style.left = parseFloat(fundo.style.width) / 2 - parseFloat(enmy.style.width) / 2 + 'px';

//Fazendo o site responsível à resizing
window.addEventListener('resize', () => {
 if(innerHeight * (16/9) > innerWidth) {
 fundo.style.width = innerWidth + 'px';
 fundo.style.height = innerWidth * (9/16) + 'px'; 
 } else if(innerWidth * (9/16) > innerHeight) {
 fundo.style.height = innerHeight + 'px';
 fundo.style.width = innerHeight * (16/9) + 'px';
 } else {
 fundo.style.width = innerWidth + 'px';
 fundo.style.height = innerHeight + 'px';
 }

 painel.style.width = 0.3 * parseFloat(fundo.style.height) + 'px';
 painel.style.height = 0.3 * parseFloat(fundo.style.height) + 'px';
 painel.style.left = parseFloat(fundo.style.width) - parseFloat(painel.style.width) + 'px';
 painel.style.top = parseFloat(fundo.style.height) - parseFloat(painel.style.height) + 'px';
 painel.children[0].style.lineHeight = painel.children[0].style.height;
 painel.children[2].style.lineHeight = painel.children[2].style.height;
 painel.children[1].children[0].style.lineHeight = painel.children[1].children[0].style.height;
 painel.children[1].children[2].style.lineHeight = painel.children[1].children[2].style.height;
 painel.children[0].style.fontSize = parseFloat(painel.children[0].style.height) + 'px';
 painel.children[2].style.fontSize = parseFloat(painel.children[2].style.height) + 'px';
 painel.children[1].children[0].style.fontSize = parseFloat(painel.children[1].children[0].style.height) + 'px';
 painel.children[1].children[2].style.fontSize = parseFloat(painel.children[1].children[2].style.height) + 'px';
  
 p1.style.width = 0.1 * parseFloat(fundo.style.height) + 'px';
 p1.style.height = 0.1 * parseFloat(fundo.style.height) + 'px';
 p1.style.borderRadius = 0.1 * parseFloat(fundo.style.height) + 'px';

 enmy.style.width = 0.11 * parseFloat(fundo.style.height) + 'px';
 enmy.style.height = 0.11 * parseFloat(fundo.style.height) + 'px';
 enmy.style.borderRadius = 0.11 * parseFloat(fundo.style.height) + 'px';
})

//Função de delay (BOM!!!)
function delay(ms) {
 return new Promise(resolve => setTimeout(resolve, ms));
}

async function spdyAnima(time, thing, effect) {
 thing.classList.toggle(time);
 thing.classList.toggle(effect);

 if(time == 'animar1') {
 await delay(100)
 } else if(time == 'animar5') {
 await delay(500)
 }

 thing.classList.toggle(time);
}

//Realizar a movimentação do jogadores
function stopMouse(lado) {
    return new Promise(resolve => {
        lado.addEventListener('mouseup', resolve);
        lado.addEventListener('mouseout', resolve); 
    })
}

function stopTouch(lado) {
    return new Promise(resolve => {
        lado.addEventListener('touchend', resolve);
        lado.addEventListener('touchmove', resolve); 
    })
}   
let p1Speed = parseFloat(fundo.style.height) * 0.01;

let movingUp = 0;

let movingRight = 0;

let movingDown = 0;

let movingLeft = 0;

window.addEventListener('keydown', async function() {
    if (event.key == 'w' || event.key == 'W') {

        if(!movingUp) {
            movingUp = 1;
        } else {
            return;
        }
    
        let doIt = 1;

        window.addEventListener('keyup', () => {
            if (event.key == 'w' || event.key == 'W') {
                doIt = 0;
            }
        })

        while(doIt) {
            if(parseFloat(p1.style.top) - p1Speed <= 0) {
                p1.style.top = 0;
            } else {
                p1.style.top = (parseFloat(p1.style.top) - p1Speed) + 'px';
            }
        
            await delay(1000/fps)
        }

        movingUp = 0;
    } else if (event.key == 'a' || event.key == 'A') {

        if(!movingLeft) {
            movingLeft = 1;
        } else {
            return;
        }

        let doIt = 1;

        window.addEventListener('keyup', () => {
            if (event.key == 'a' || event.key == 'A') {
                doIt = 0;
            }
        })

        while(doIt) {
            if(parseFloat(p1.style.left) - p1Speed <= 0) {
                p1.style.left = '0';
            } else {
                p1.style.left = (parseFloat(p1.style.left) - p1Speed) + 'px';
            }

            await delay(1000/fps)
        }

        movingLeft = 0;
    } else if (event.key == 's' || event.key == 'S') {

        if(!movingDown) {
            movingDown = 1;
        } else {
            return;
        }
    
        let doIt = 1;

        window.addEventListener('keyup', () => {
            if (event.key == 's' || event.key == 'S') {
                doIt = 0;
            }
        })
    
        while(doIt) {
            if(parseFloat(p1.style.top) + parseFloat(p1.style.height) + p1Speed > parseFloat(fundo.style.height)) {
                p1.style.top = parseFloat(fundo.style.height) - parseFloat(p1.style.height);
            } else {
                p1.style.top = (parseFloat(p1.style.top) + p1Speed) + 'px';
            }

            await delay(1000/fps)
        }
        
        movingDown = 0;
    } else if (event.key == 'd' || event.key == 'D') {

        if(!movingRight) {
            movingRight = 1;
        } else {
            return;
        }

        let doIt = 1;

        window.addEventListener('keyup', () => {
            if (event.key == 'd' || event.key == 'D') {
                doIt = 0;
            }
        })
    
        while(doIt) {
            if(parseFloat(p1.style.left) + parseFloat(p1.style.width) + p1Speed > parseFloat(fundo.style.width)) {
                p1.style.left = parseFloat(fundo.style.width) - parseFloat(p1.style.width);
            } else {
                p1.style.left = (parseFloat(p1.style.left) + p1Speed) + 'px';
            }
        
            await delay(1000/fps);
        }

        movingRight = 0;
    }
})

let once = 0;

cima.addEventListener('mousedown', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopMouse(cima)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.top) - p1Speed <= 0) {
            p1.style.top = 0;
        } else {
            p1.style.top = (parseFloat(p1.style.top) - p1Speed) + 'px';
        }

        await delay(1000/fps)
    }

    once = 0;
})

dir.addEventListener('mousedown', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopMouse(dir)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.left) + parseFloat(p1.style.width) + p1Speed > parseFloat(fundo.style.width)) {
            p1.style.left = parseFloat(fundo.style.width) - parseFloat(p1.style.width) + 'px';
        } else {
            p1.style.left = (parseFloat(p1.style.left) + p1Speed) + 'px';
        }

        await delay(1000/fps)
    }

    once = 0;
})

baixo.addEventListener('mousedown', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopMouse(baixo)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.top) + parseFloat(p1.style.height) + p1Speed > parseFloat(fundo.style.height)) {
            p1.style.top = parseFloat(fundo.style.height) - parseFloat(p1.style.height) + 'px';
        } else {
            p1.style.top = (parseFloat(p1.style.top) + p1Speed) + 'px';
        }

        await delay(1000/fps);
    }
 
    once = 0;
})

esq.addEventListener('mousedown', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopMouse(esq)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.left) - p1Speed <= 0) {
            p1.style.left = '0';
        } else {
            p1.style.left = (parseFloat(p1.style.left) - p1Speed) + 'px';
        }

        await delay(1000/fps)
    }
 
    once = 0;
})

cima.addEventListener('touchstart', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopTouch(cima)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.top) - p1Speed <= 0) {
            p1.style.top = 0;
        } else {
            p1.style.top = (parseFloat(p1.style.top) - p1Speed) + 'px';
        }

        await delay(1000/fps)
    }

    once = 0;
})

dir.addEventListener('touchstart', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopTouch(dir)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.left) + parseFloat(p1.style.width) + p1Speed > parseFloat(fundo.style.width)) {
            p1.style.left = parseFloat(fundo.style.width) - parseFloat(p1.style.width) + 'px';
        } else {
            p1.style.left = (parseFloat(p1.style.left) + p1Speed) + 'px';
        }

        await delay(1000/fps)
    }

    once = 0;
})

baixo.addEventListener('touchstart', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopTouch(baixo)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.top) + parseFloat(p1.style.height) + p1Speed > parseFloat(fundo.style.height)) {
            p1.style.top = parseFloat(fundo.style.height) - parseFloat(p1.style.height) + 'px';
        } else {
            p1.style.top = (parseFloat(p1.style.top) + p1Speed) + 'px';
        }

        await delay(1000/fps);
    }
 
    once = 0;
})

esq.addEventListener('touchstart', async function() {
    if(!once) {
        once = 1;
    } else {
        return;
    }

    let doIt = 1;

    stopTouch(esq)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.left) - p1Speed <= 0) {
            p1.style.left = '0';
        } else {
            p1.style.left = (parseFloat(p1.style.left) - p1Speed) + 'px';
        }

        await delay(1000/fps)
    }
 
    once = 0;
})

//Movimentação do inimigo

function randoPos() {
 return [Math.floor(Math.random() * (parseFloat(fundo.style.width) - parseFloat(enmy.style.width))), Math.floor(Math.random() * (parseFloat(fundo.style.height) - parseFloat(enmy.style.height)))]
}

let enmySpd = parseFloat(fundo.style.height) * 0.012;

let projtilSpd = parseFloat(fundo.style.height) * 0.015;

async function shootThere() {
 let midXP1 = parseFloat(p1.style.left) + parseFloat(p1.style.width) / 2;
 let midYP1 = parseFloat(p1.style.top) + parseFloat(p1.style.height) / 2;

 let midXEnmy = parseFloat(enmy.style.left) + parseFloat(enmy.style.width) / 2;
 let midYEnmy = parseFloat(enmy.style.top) + parseFloat(enmy.style.height) / 2;

 let distX = midXP1 - midXEnmy;
 let distY = midYP1 - midYEnmy;

 let i = Math.sqrt(distX**2 + distY**2);

 let projtil = document.createElement('div');

 projtil.classList.add('projtil');

 projtil.style.width = 0.5 * parseFloat(enmy.style.height) + 'px';
 projtil.style.height = 0.5 * parseFloat(enmy.style.height) + 'px';
 projtil.style.borderRadius = 0.5 * parseFloat(enmy.style.height) + 'px';

 projtil.style.left = midXEnmy - parseFloat(projtil.style.width) / 2 + 'px';
 projtil.style.top = midYEnmy - parseFloat(projtil.style.height) / 2 + 'px';

 fundo.appendChild(projtil);

 while(parseFloat(projtil.style.left) + (distX / i) * projtilSpd > 0 && parseFloat(projtil.style.left) + (distX / i) * projtilSpd < (parseFloat(fundo.style.width) - parseFloat(projtil.style.width)) && parseFloat(projtil.style.top) + (distY / i) * projtilSpd > 0 && parseFloat(projtil.style.top) + (distY / i) * projtilSpd < (parseFloat(fundo.style.height) - parseFloat(projtil.style.height))) {
 projtil.style.left = parseFloat(projtil.style.left) + (distX / i) * projtilSpd + 'px';
 projtil.style.top = parseFloat(projtil.style.top) + (distY / i) * projtilSpd + 'px';
 collision(projtil)

 await delay(1000/fps);
 }

 if(parseFloat(projtil.style.left) + (distX / i) * projtilSpd < 0) {
 projtil.style.top = parseFloat(projtil.style.top) + (distY / distX) * parseFloat(projtil.style.left) * -1 + 'px';
 projtil.style.left = '0';
 } else if(parseFloat(projtil.style.left) + (distX / i) * projtilSpd > (parseFloat(fundo.style.width) - parseFloat(projtil.style.width))) {
 projtil.style.top = parseFloat(projtil.style.top) + (distY / distX) * ((parseFloat(fundo.style.width) - parseFloat(projtil.style.width)) - parseFloat(projtil.style.left)) + 'px';
 projtil.style.left = parseFloat(fundo.style.width) - parseFloat(projtil.style.width) + 'px';
 } else if(parseFloat(projtil.style.top) + (distY / i) * projtilSpd < 0) {
 projtil.style.left = parseFloat(projtil.style.left) + (distX / distY) * parseFloat(projtil.style.top) * -1 + 'px';
 projtil.style.top = '0';
 } else if(parseFloat(projtil.style.top) + (distY / i) * projtilSpd > (parseFloat(fundo.style.height) - parseFloat(projtil.style.height))) {
 projtil.style.left = parseFloat(projtil.style.left) + (distX / distY) * ((parseFloat(fundo.style.height) - parseFloat(projtil.style.height)) - parseFloat(projtil.style.top)) + 'px';
 projtil.style.top = parseFloat(fundo.style.height) - parseFloat(projtil.style.height) + 'px';
 }

 await delay(1000/fps);

 await spdyAnima('animar1', projtil, 'desaparece');

 fundo.removeChild(projtil);
}

async function moveThere(coord = randoPos()) {
 let distX = coord[0] - parseFloat(enmy.style.left);

 let distY = coord[1] - parseFloat(enmy.style.top);

 let i = Math.sqrt(distX**2 + distY**2);

 for(let count = 0; count != Math.floor(i/enmySpd); count++) {
 if(count % 20 == 0) {
 shootThere();
 }

 enmy.style.left = parseFloat(enmy.style.left) + (distX / i) * enmySpd + 'px';
 enmy.style.top = parseFloat(enmy.style.top) + (distY / i) * enmySpd + 'px';
 collision(enmy);

 await delay(1000/fps);
 }

 enmy.style.left = coord[0] + 'px';
 enmy.style.top = coord[1] + 'px';
}


async function tpThere() {
 let coord = randoPos();

 await spdyAnima('animar1', enmy, 'desaparece');

 enmy.style.left = coord[0] + 'px';

 enmy.style.top = coord[1] + 'px';

 await spdyAnima('animar1', enmy, 'desaparece');
}

function cloneDis(cloned, clonee) {
 let elClone = document.createElement('div');
 elClone.classList.add(clonee);

 elClone.style.width = cloned.style.width;
 elClone.style.height = cloned.style.height;
 elClone.style.left = cloned.style.left;
 elClone.style.top = cloned.style.top;

 return elClone;
}

async function stndrtMove(thing, xi, xf, yi, yf, spd, coll) {
 let x, y, z;

 x = xf - xi;

 y = yf - yi;

 z = Math.sqrt(x**2 + y**2);

 for(let count = 0; count != Math.floor(z/spd); count++) {
 thing.style.left = parseFloat(thing.style.left) + (x / z) * spd + 'px';
 thing.style.top = parseFloat(thing.style.top) + (y / z) * spd + 'px';

 if(coll) {
 collision(thing);
 }

 await delay(1000/fps);
 }

 thing.style.left = xf + 'px';
 thing.style.top = yf + 'px';
}

async function fckngJutsu (where) {
 let clone, x0, x1, y0, y1, cloneSpd, rect, lineX, lineY, lineC, scale, rotate, rectSpd;

 //SEPARA
 clone = cloneDis(enmy, 'clone');
 clone.style.borderRadius = enmy.style.borderRadius;

 fundo.appendChild(clone);

 if(!(where % 2)) {
 x0 = Math.floor(parseFloat(fundo.style.width) * (4/100) + Math.random() * (parseFloat(fundo.style.width) * (93/100) - parseFloat(clone.style.width)));
 x1 = Math.floor(parseFloat(fundo.style.width) * (4/100) + Math.random() * (parseFloat(fundo.style.width) * (93/100) - parseFloat(clone.style.width)));
 } else {
 y0 = Math.floor(parseFloat(fundo.style.height) * (4/100) + Math.random() * (parseFloat(fundo.style.height) * (93/100) - parseFloat(clone.style.height)));
 y1 = Math.floor(parseFloat(fundo.style.height) * (4/100) + Math.random() * (parseFloat(fundo.style.height) * (93/100) - parseFloat(clone.style.height)));
 }

 switch (where) {
 case 0:
 y0 = -parseFloat(clone.style.height);
 y1 = parseFloat(fundo.style.height);
 break;
 
 case 1:
 x0 = parseFloat(fundo.style.width);
 x1 = -parseFloat(clone.style.width);
 break;
 
 case 2:
 y0 = parseFloat(fundo.style.height);
 y1 = -parseFloat(clone.style.height);
 break;
 
 case 3:
 x0 = -parseFloat(clone.style.width);
 x1 = parseFloat(fundo.style.width);
 break;
 
 default:
 break;
 }

 cloneSpd = enmySpd*4;

 await delay(100);

 await stndrtMove(clone, parseFloat(clone.style.left), x0, parseFloat(clone.style.top), y0, cloneSpd);

 //SEPARA
 rect = cloneDis(clone, 'rect');

 lineX = x1 - x0;
 lineY = y1 - y0;
 lineC = Math.sqrt(lineX**2 + lineY**2);
 scale = 1;

 fundo.appendChild(rect);

 switch (where) {
 case 0:
 rotate = -arcsine(lineX/lineC);
 break;

 case 1:
 rotate = 90-arcsine(lineY/lineC);
 break;

 case 2:
 rotate = 180+arcsine(lineX/lineC);
 break;

 case 3:
 rotate = 270+arcsine(lineY/lineC);
 break; 
 
 default:
 break;
 }

 rectSpd = cloneSpd*2;

 await delay(100);

 for(let count = 0; count != Math.floor(lineC/rectSpd); count++) {
 rect.style.left = parseFloat(rect.style.left) + (lineX / 2 / lineC) * rectSpd + 'px';
 rect.style.top = parseFloat(rect.style.top) + (lineY / 2 / lineC) * rectSpd + 'px';
 scale += lineC / parseFloat(rect.style.height) / Math.floor(lineC/rectSpd);
 rect.style.transform = `rotate(${rotate}deg) scale(1, ${scale})`;

 await delay(1000/fps);
 }

 rect.style.left = x0 + lineX/2 + 'px';
 rect.style.top = y0 + lineY/2 + 'px';
 scale = lineC / parseFloat(rect.style.height);
 rect.style.transform = `rotate(${rotate}deg) scale(1, ${scale})`;

 //SEPARAR
 await delay(1500);

 stndrtMove(clone, x0, x1, y0, y1, cloneSpd*4, true);
 for(let count = 0; count != Math.floor(lineC/(cloneSpd * 4)); count++) {
 rect.style.left = parseFloat(rect.style.left) + (lineX / 2 / lineC) * (cloneSpd * 3) + 'px';
 rect.style.top = parseFloat(rect.style.top) + (lineY / 2 / lineC) * (cloneSpd * 3) + 'px';
 scale -= lineC / parseFloat(rect.style.height) / Math.floor(lineC/(cloneSpd * 3));
 rect.style.transform = `rotate(${rotate}deg) scale(1, ${scale})`;

 await delay(1000/fps);
 }

 fundo.removeChild(rect);

 await delay(1000);

 await stndrtMove(clone, x1, parseFloat(enmy.style.left), y1, parseFloat(enmy.style.top), cloneSpd)

 jutsuKey++;

 while(jutsuKey != 4) {
 await delay(1000/120);
 }

 fundo.removeChild(clone);
}

let jutsuKey = 0;

function arcsine(value) {
 return Math.asin(value)*(180/Math.PI);
}

async function jutsuAttack() {
 await moveThere([parseFloat(fundo.style.width) / 2 - parseFloat(enmy.style.width) / 2, parseFloat(fundo.style.height) / 2 - parseFloat(enmy.style.height) / 2]);

 jutsuKey = 0;

 fckngJutsu(0);
 fckngJutsu(1);
 fckngJutsu(2);
 fckngJutsu(3);

 await delay(100);

 enmy.classList.toggle('desaparece');

 while(jutsuKey != 4) {
 await delay(1000/120);
 }

 enmy.classList.toggle('desaparece');
}

async function deployBomb() {
 let bomb = document.createElement('div');
 bomb.classList.add('bomb');
 bomb.classList.toggle('pulsing');
 bomb.style.height = parseFloat(enmy.style.height) / 2 + 'px';
 bomb.style.width = parseFloat(enmy.style.width) / 2 + 'px';
 bomb.style.borderRadius = parseFloat(enmy.style.borderRadius) / 2 + 'px';
 bomb.style.left = parseFloat(enmy.style.left) + (parseFloat(enmy.style.width) - parseFloat(bomb.style.width)) / 2 + 'px';
 bomb.style.top = parseFloat(enmy.style.top) + (parseFloat(enmy.style.height) - parseFloat(bomb.style.height)) / 2 + 'px';
 fundo.appendChild(bomb);

 tpThere();

 let diam = parseFloat(bomb.style.width);

 await delay(1500);
 bomb.classList.toggle('pulsing');
 bomb.classList.toggle('boom');

 for (let count = 0; count < 30; count++) {
 collision(bomb, 1 + count*0.2);
 await delay(10);
 }
 fundo.removeChild(bomb);
}

function cosine(value) {
 return Math.cos(value*(Math.PI/180));
}

function sine(value) {
 return Math.sin(value*(Math.PI/180));
}

/* Vencido uma vez... Para depois!
async function formWeapon() {
 let weapon = document.createElement('div');
 weapon.classList.add('weapon');
 weapon.style.height = parseFloat(enmy.style.height) / 2 + 'px';
 weapon.style.width = parseFloat(enmy.style.width) / 2 + 'px';
 weapon.style.borderRadius = parseFloat(weapon.style.height) / 4 + 'px';

 weapon.style.top = parseFloat(enmy.style.top) + parseFloat(enmy.style.height) * 0.25 + 'px';
 weapon.style.left = parseFloat(enmy.style.left) + parseFloat(enmy.style.width) * (1/2) + 'px';

 let scale = 0;
 let rotate = 0;
 weapon.style.transform = `scale(${scale}, 1)`;

 console.log(((parseFloat(weapon.style.left) - parseFloat(enmy.style.left)) + parseFloat(weapon.style.width)/2))
 console.log(((parseFloat(weapon.style.left) - parseFloat(enmy.style.left)) + parseFloat(weapon.style.width)/2) + parseFloat(weapon.style.width) *4.5-((parseFloat(weapon.style.width) * 4.5) * cosine(30)))

 fundo.appendChild(weapon);

 for (let count = 0; count < 30; count++) {
 scale += 0.15;
 rotate += 1;
 weapon.style.transform = `rotate(${-rotate}deg) scale(${scale}, 1)`;
 weapon.style.left = parseFloat(weapon.style.left) + parseFloat(weapon.style.width) * 0.075 + 'px';
 await delay(1000/fps);
 }

 console.log(parseFloat(weapon.style.width) * 4.5)
 console.log(parseFloat(weapon.style.width) *4.5-((parseFloat(weapon.style.width) * 4.5) * cosine(30)))

 await delay(100);

 let rad = parseFloat(weapon.style.left) + parseFloat(weapon.style.width) / 2 - parseFloat(enmy.style.left) - parseFloat(enmy.style.width) / 2;

 await delay(200);

 async function moveing() {
 let x, y, z;

 x = parseFloat(p1.style.left) + (parseFloat(p1.style.width)/2 - parseFloat(enmy.style.width)/2) - parseFloat(enmy.style.left);
 
 y = parseFloat(p1.style.top) + (parseFloat(p1.style.height)/2 - parseFloat(enmy.style.height)/2) - parseFloat(enmy.style.top);
 
 z = Math.sqrt(x**2 + y**2);
 
 while(parseFloat(enmy.style.left) + (x / z) * enmySpd > 0 && parseFloat(enmy.style.left) + (x / z) * enmySpd < (parseFloat(fundo.style.width) - parseFloat(enmy.style.width)) && parseFloat(enmy.style.top) + (y / z) * enmySpd > 0 && parseFloat(enmy.style.top) + (y / z) * enmySpd < (parseFloat(fundo.style.height) - parseFloat(enmy.style.height))) {
 enmy.style.left = parseFloat(enmy.style.left) + (x / z) * enmySpd + 'px';
 enmy.style.top = parseFloat(enmy.style.top) + (y / z) * enmySpd + 'px';
 collision(enmy);
 rotate -= 10;
 weapon.style.left = rad * cosine(-rotate+30) + parseFloat(enmy.style.left) + parseFloat(enmy.style.width) / 2 - parseFloat(weapon.style.width) / 2 + 'px';
 weapon.style.top = rad * sine(-rotate+30) + parseFloat(enmy.style.top) + parseFloat(enmy.style.height) / 2 - parseFloat(weapon.style.height) / 2 + 'px';
 weapon.style.transform = `rotate(${-rotate}deg) scale(${scale}, 1)`;
 
 await delay(1000/fps);
 }
 }

 await moveing();
 await moveing();
 await moveing();
 await moveing();

 await delay(200);

 await spdyAnima('animar1', weapon, 'desaparece');

 fundo.removeChild(weapon);
}
*/

async function collision(attacker, scales = 0) {
 let x, y, z, rp1, rAtk;
 
 rp1 = parseFloat(p1.style.width) / 2;

 rAtk = parseFloat(attacker.style.width) / 2;

 x = (parseFloat(p1.style.left) + rp1) - (parseFloat(attacker.style.left) + rAtk);
 y = (parseFloat(p1.style.top) + rp1) - (parseFloat(attacker.style.top) + rAtk);
 z = Math.sqrt(x**2 + y**2);

 if(scales) {
 if (z < rp1+rAtk*scales) {
 p1.classList.add('defeated');
 } 
 } else {
 if (z < rp1+rAtk) {
 p1.classList.add('defeated');
 } 
 }

 if(p1.classList.contains('defeated')) {
 await delay(300);
 }
}

async function bigText(texto, time = 0) {
    let text = document.createElement('div');
    text.classList.add('bigText')
    text.innerHTML = texto;
    text.style.width = parseFloat(fundo.style.width) + 'px';
    text.style.height = parseFloat(fundo.style.height) + 'px';
    text.style.left = parseFloat(fundo.style.width)/2 - parseFloat(text.style.width)/2 + 'px';
    text.style.top = parseFloat(fundo.style.height)/2 - parseFloat(text.style.height)/2 + 'px';
    text.style.lineHeight = text.style.height;
    text.style.fontSize = parseFloat(text.style.height)/2 + 'px';
    fundo.appendChild(text);

    if (time) {
        await delay(time);
        fundo.removeChild(text);
    }
}

async function startGame() {
    await bigText('3', 1000);
    await bigText('2', 1000);
    await bigText('1', 1000);
}


function cloneDis(cloned, clonee) {
    let elClone = document.createElement('div');
    elClone.classList.add(clonee);
   
    elClone.style.width = cloned.style.width;
    elClone.style.height = cloned.style.height;
    elClone.style.left = cloned.style.left;
    elClone.style.top = cloned.style.top;
   
    return elClone;
   }
let orbCount = 0;
async function createOrbs() {
    let coords = randoPos();
    console.log(coords[0])
    console.log(coords[1])
    let orb = document.createElement('div');
    orb.classList.add('orb');
    orb.style.left = coords[0] + 'px';
    orb.style.top = coords[1] + 'px';
    orb.style.width = parseFloat(enmy.style.width)/4 + 'px';
    orb.style.height = parseFloat(enmy.style.height)/4 + 'px';
    orb.style.borderRadius = parseFloat(enmy.style.borderRadius)/4 + 'px';

    fundo.appendChild(orb);
    orbCount++;

    while (!orb.classList.contains('defeated')) {
        let x, y, z, rp1, rOrb;
 
        rp1 = parseFloat(p1.style.width) / 2;
       
        rOrb = parseFloat(orb.style.width) / 2;
       
        x = (parseFloat(p1.style.left) + rp1) - (parseFloat(orb.style.left) + rOrb);
        y = (parseFloat(p1.style.top) + rp1) - (parseFloat(orb.style.top) + rOrb);
        z = Math.sqrt(x**2 + y**2);
       
        if (z < rp1+rOrb) {
            orb.classList.add('defeated');
            orbCount--;
            await delay(300);
            fundo.removeChild(orb);
        }

        await delay(1000/fps);
    }
}

startGame();

async function doGame() {
    createOrbs();
    await delay(500);
    createOrbs();
    await delay(500);
    createOrbs();
    await delay(500);
    createOrbs();
    await delay(500);
    createOrbs();
    await delay(500);
    createOrbs();
    await delay(1500);
    while (!p1.classList.contains('defeated') && !p1.classList.contains('won')) {
        switch (Math.floor(Math.random() * 3)) {
            case 0:
                await moveThere();
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;
    
            case 1:
                deployBomb();
                await delay(200);
                deployBomb();
                await delay(200);
                deployBomb();
                await delay(200);
                deployBomb();
                await delay(200);
                deployBomb();
                await delay(200);
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;
            
            case 2:
                await jutsuAttack();
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;
    
            default:
                break;
        }

        await delay(1000);
    }

    if(p1.classList.contains('defeated')) {
        bigText('Lost');
        fundo.removeChild(p1);
    } else if(p1.classList.contains('won')) {
        enmy.classList.add('defeated');
        await delay(300);
        fundo.removeChild(enmy);
        bigText('Won!');
    }
}

doGame();