//Declarando variáveis iniciais do jogo
let fundo = document.querySelector('#fundo');

let painel = document.querySelector('#painel');

let p1 = document.querySelector('#p1');

let enmy = document.querySelector('#enmy');

let cima = document.querySelector('#acima');

let dir = document.querySelector('#direita');

let baixo = document.querySelector('#baixo');

let esq = document.querySelector('#esquerda');

//Definindo altiras, larguras e posições de objetos
if(innerHeight * (16/9) > innerWidth) {
    fundo.style.width = innerWidth;
    fundo.style.height = innerWidth * (9/16);

} else if(innerWidth * (9/16) > innerHeight) {
    fundo.style.height = innerHeight;
    fundo.style.width = innerHeight * (16/9);
} else {
    fundo.style.width = innerWidth;
    fundo.style.height = innerHeight;
}

painel.style.width = 0.25 * parseFloat(fundo.style.height);
painel.style.height = 0.25 * parseFloat(fundo.style.height);

p1.style.width = 0.1 * parseFloat(fundo.style.height);
p1.style.height = 0.1 * parseFloat(fundo.style.height);
p1.style.borderRadius = 0.1 * parseFloat(fundo.style.height) + 'px';
p1.style.top = parseFloat(fundo.style.height) / (3/2) - parseFloat(p1.style.height) / 2;
p1.style.left = parseFloat(fundo.style.width) / 2 - parseFloat(p1.style.width) / 2;

enmy.style.width = 0.11 * parseFloat(fundo.style.height);
enmy.style.height = 0.11 * parseFloat(fundo.style.height);
enmy.style.borderRadius = 0.11 * parseFloat(fundo.style.height) + 'px';
enmy.style.top = parseFloat(fundo.style.height) / 3 - parseFloat(enmy.style.height) / 2;
enmy.style.left = parseFloat(fundo.style.width) / 2 - parseFloat(enmy.style.width) / 2;

//Fazendo o site responsível à resizing
window.addEventListener('resize', () => {
    if(innerHeight * (16/9) > innerWidth) {
        fundo.style.width = innerWidth;
        fundo.style.height = innerWidth * (9/16);    
    } else if(innerWidth * (9/16) > innerHeight) {
        fundo.style.height = innerHeight;
        fundo.style.width = innerHeight * (16/9);
    } else {
        fundo.style.width = innerWidth;
        fundo.style.height = innerHeight;
    }

    painel.style.width = 0.25 * parseFloat(fundo.style.height);
    painel.style.height = 0.25 * parseFloat(fundo.style.height);

    p1.style.width = 0.1 * parseFloat(fundo.style.height);
    p1.style.height = 0.1 * parseFloat(fundo.style.height);
    p1.style.borderRadius = 0.1 * parseFloat(fundo.style.height) + 'px';

    enmy.style.width = 0.11 * parseFloat(fundo.style.height);
    enmy.style.height = 0.11 * parseFloat(fundo.style.height);
    enmy.style.borderRadius = 0.11 * parseFloat(fundo.style.height) + 'px';
})

//Função de delay (BOM!!!)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function round(num, decimal) {
    return Math.round(num * 10**decimal) / 10**decimal;
}

async function spdyAnima(thing, effect) {
    thing.classList.toggle('animar');
    thing.classList.toggle(effect);

    await delay(100)

    thing.classList.toggle('animar');
}

//Realizar a movimentação do jogadores
function stop(lado) {
    return new Promise(resolve => {
        lado.addEventListener('mouseup', resolve);
        lado.addEventListener('mouseout', resolve);            
    })
}

let p1Speed = parseFloat(fundo.style.height) * 0.01

cima.addEventListener('mousedown', async function() {
    let doIt = 1

    stop(cima)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.top) - p1Speed <= 0) {
            p1.style.top = 0;
        } else {
            p1.style.top = (parseFloat(p1.style.top) - p1Speed) + 'px';
        }
        await delay(1000/120)
    }
})

dir.addEventListener('mousedown', async function() {
    let doIt = 1

    stop(dir)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.left) + parseFloat(p1.style.width) + p1Speed > parseFloat(fundo.style.width)) {
            p1.style.left = parseFloat(fundo.style.width) - parseFloat(p1.style.width);
        } else {
            p1.style.left = (parseFloat(p1.style.left) + p1Speed) + 'px';
        }
        await delay(1000/120)
    }
})

baixo.addEventListener('mousedown', async function() {
    let doIt = 1

    stop(baixo)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.top) + parseFloat(p1.style.height) + p1Speed > parseFloat(fundo.style.height)) {
            p1.style.top = parseFloat(fundo.style.height) - parseFloat(p1.style.height);
        } else {
            p1.style.top = (parseFloat(p1.style.top) + p1Speed) + 'px';
        }
        await delay(1000/120)
    }
})

esq.addEventListener('mousedown', async function() {
    let doIt = 1

    stop(esq)
        .then(() => doIt = 0)

    while(doIt) {
        if(parseFloat(p1.style.left) - p1Speed <= 0) {
            p1.style.left = '0';
        } else {
            p1.style.left = (parseFloat(p1.style.left) - p1Speed) + 'px';
        }
        await delay(1000/120)
    }
})

//Movimentação do inimigo

function randoPos() {
    return [Math.floor(Math.random() * (parseFloat(fundo.style.width) - parseFloat(enmy.style.width))), Math.floor(Math.random() * (parseFloat(fundo.style.height) - parseFloat(enmy.style.height)))]
}

let enmySpd = parseFloat(fundo.style.height) * 0.012;

let projtilSpd = parseFloat(fundo.style.height) * 0.015;

async function shootThere() {
    let midXP1 = parseFloat(p1.style.left) +  parseFloat(p1.style.width) / 2;
    let midYP1 = parseFloat(p1.style.top) +  parseFloat(p1.style.height) / 2;

    let midXEnmy = parseFloat(enmy.style.left) +  parseFloat(enmy.style.width) / 2;
    let midYEnmy = parseFloat(enmy.style.top) +  parseFloat(enmy.style.height) / 2;

    let distX = midXP1 - midXEnmy;
    let distY = midYP1 - midYEnmy;

    let i = Math.sqrt(distX**2 + distY**2);

    let projtil = document.createElement('div');

    projtil.classList.add('projtil');

    projtil.style.width = 0.5 * parseFloat(enmy.style.height);
    projtil.style.height = 0.5 * parseFloat(enmy.style.height);
    projtil.style.borderRadius = 0.5 * parseFloat(enmy.style.height) + 'px';

    projtil.style.left = midXEnmy - parseFloat(projtil.style.width) / 2;
    projtil.style.top = midYEnmy - parseFloat(projtil.style.height) / 2;

    fundo.appendChild(projtil);

    while(parseFloat(projtil.style.left) + (distX / i) * projtilSpd > 0 && parseFloat(projtil.style.left) + (distX / i) * projtilSpd < (parseFloat(fundo.style.width) - parseFloat(projtil.style.width)) && parseFloat(projtil.style.top) + (distY / i) * projtilSpd > 0 && parseFloat(projtil.style.top) + (distY / i) * projtilSpd < (parseFloat(fundo.style.height) - parseFloat(projtil.style.height))) {
        projtil.style.left = parseFloat(projtil.style.left) + (distX / i) * projtilSpd;
        projtil.style.top = parseFloat(projtil.style.top) + (distY / i) * projtilSpd;

        await delay(1000/120);
    }

    if(parseFloat(projtil.style.left) + (distX / i) * projtilSpd < 0) {
        projtil.style.top = parseFloat(projtil.style.top) + (distY / distX) * parseFloat(projtil.style.left) * -1;
        projtil.style.left = '0';
    } else if(parseFloat(projtil.style.left) + (distX / i) * projtilSpd > (parseFloat(fundo.style.width) - parseFloat(projtil.style.width))) {
        projtil.style.top = parseFloat(projtil.style.top) + (distY / distX) * ((parseFloat(fundo.style.width) - parseFloat(projtil.style.width)) - parseFloat(projtil.style.left));
        projtil.style.left = parseFloat(fundo.style.width) - parseFloat(projtil.style.width);
    } else if(parseFloat(projtil.style.top) + (distY / i) * projtilSpd < 0) {
        projtil.style.left = parseFloat(projtil.style.left) + (distX / distY) * parseFloat(projtil.style.top) * -1;
        projtil.style.top = '0';
    } else if(parseFloat(projtil.style.top) + (distY / i) * projtilSpd >     (parseFloat(fundo.style.height) - parseFloat(projtil.style.height))) {
        projtil.style.left = parseFloat(projtil.style.left) + (distX / distY) * ((parseFloat(fundo.style.height) - parseFloat(projtil.style.height)) - parseFloat(projtil.style.top));
        projtil.style.top = parseFloat(fundo.style.height) - parseFloat(projtil.style.height);
    }

    await delay(1000/120);

    await spdyAnima(projtil, 'desaparece');

    fundo.removeChild(projtil);
}

async function moveThere() {
    let coord = randoPos();

    let distX = coord[0] - parseFloat(enmy.style.left);

    let distY = coord[1] - parseFloat(enmy.style.top);

    let i = Math.sqrt(distX**2 + distY**2);

    let count = 0;

    while(count != Math.floor(i/enmySpd)) {
        if(count % 20 == 0) {
            shootThere();
        }

        enmy.style.left = parseFloat(enmy.style.left) + (distX / i) * enmySpd;
        enmy.style.top = parseFloat(enmy.style.top) + (distY / i) * enmySpd;

        count++;

        await delay(1000/120);
    }

    enmy.style.left = coord[0];
    enmy.style.top = coord[1];
}


async function tpThere() {
    let coord = randoPos();

    await spdyAnima(enmy, 'desaparece');

    enmy.style.left = coord[0] + 'px';

    enmy.style.top = coord[1] + 'px';

    await spdyAnima(enmy, 'desaparece');
}
/*
 function deployBomb() {
    let alrt = document.createElement('div');
    alrt.classList.add('alerta');
    alrt.style.height = '50px';
    alrt.style.width = '50px';
    alrt.style.borderRadius = '50px';
    alrt.style.top = '50px';
    alrt.style.left = '50px';

    fundo.appendChild(alrt);
}
*/

async function fckngJutsu (where) {
    let clone = document.createElement('div');

    clone.classList.add('clone');

    clone.style.width = enmy.style.width;
    clone.style.height = enmy.style.height;
    clone.style.left = enmy.style.left;
    clone.style.top = enmy.style.top;
    clone.style.borderRadius = enmy.style.borderRadius;

    fundo.appendChild(clone);

    let x0, x1, y0, y1;

    switch (where) {
        case 1:
            x0 = Math.floor(parseFloat(fundo.style.width) * (4/100) + Math.random() * (parseFloat(fundo.style.width) * (93/100) - parseFloat(clone.style.width)));
            x1 = Math.floor(parseFloat(fundo.style.width) * (4/100) + Math.random() * (parseFloat(fundo.style.width) * (93/100) - parseFloat(clone.style.width)));
            y0 = -parseFloat(clone.style.height);
            y1 = parseFloat(fundo.style.height);
            break;
    
        case 2:
            y0 = Math.floor(parseFloat(fundo.style.height) * (4/100) + Math.random() * (parseFloat(fundo.style.height) * (93/100) - parseFloat(clone.style.height)));
            y1 = Math.floor(parseFloat(fundo.style.height) * (4/100) + Math.random() * (parseFloat(fundo.style.height) * (93/100) - parseFloat(clone.style.height)));
            x0 = parseFloat(fundo.style.width);
            x1 = -parseFloat(clone.style.width);
            break;
        
        case 3:
            x0 = Math.floor(parseFloat(fundo.style.width) * (4/100) + Math.random() * (parseFloat(fundo.style.width) * (93/100) - parseFloat(clone.style.width)));
            x1 = Math.floor(parseFloat(fundo.style.width) * (4/100) + Math.random() * (parseFloat(fundo.style.width) * (93/100) - parseFloat(clone.style.width)));
            y0 = parseFloat(fundo.style.height);
            y1 = -parseFloat(clone.style.height);
            break;
            
        case 4:
            y0 = Math.floor(parseFloat(fundo.style.height) * (4/100) + Math.random() * (parseFloat(fundo.style.height) * (93/100) - parseFloat(clone.style.height)));
            y1 = Math.floor(parseFloat(fundo.style.height) * (4/100) + Math.random() * (parseFloat(fundo.style.height) * (93/100) - parseFloat(clone.style.height)));
            x0 = -parseFloat(clone.style.width);
            x1 = parseFloat(fundo.style.width);
            break;
                
        default:
            break;
    }

    clone.classList.toggle('animarClone');

    await delay(1000/120);

    clone.style.left = x0 + 'px';
    clone.style.top = y0 + 'px';
}