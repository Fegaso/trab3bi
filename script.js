let fps = 90;

//Colocando os objetos no jogo
let fundo = document.querySelector('#fundo');

fundo.w;

fundo.h;

fundo.setSize = function(w_ = this.w, h_ = this.h) {
    this.w = w_;
    this.h = h_;

    this.style.width = this.w + 'px';
    this.style.height = this.h + 'px';
}

if(innerHeight * (16/9) > innerWidth) {
    fundo.setSize(innerWidth, innerWidth*(9/16))
} else if(innerWidth * (9/16) > innerHeight) {
    fundo.setSize(innerHeight * (16/9), innerHeight)
} else {
    fundo.setSize(innerWidth, innerHeight)
}

function build(elem, type, diam, x, y, spd) {
    elem.classList.add(type);

    elem.diam = diam;

    elem.rad = this.diam / 2;

    elem.x = x;

    elem.y = y;

    elem.spd = spd;

    elem.setCoord = function(x_ = this.x, y_ = this.y) {
        this.x = x_;
        this.y = y_;

        this.style.left = this.x - this.diam / 2 + 'px';
        this.style.top = this.y - this.diam / 2 + 'px';
    }

    elem.setCoord();

    elem.changeCoord = function(addX = 0, addY = 0) {
        this.x += addX * this.spd;
        this.y += addY * this.spd;

        this.style.left = this.x - this.diam / 2 + 'px';
        this.style.top = this.y - this.diam / 2 + 'px';
    }

    elem.setSize = function(diam_ = this.diam) {
        this.diam = diam_;
        this.rad = this.diam / 2;

        this.style.width = this.diam + 'px';
        this.style.height = this.diam + 'px';
        this.style.borderRadius = this.diam + 'px';
        this.changeCoord();
    }

    elem.setSize();

    elem.changeSize = function(add = 0) {
        this.diam += add;
        this.rad += add / 2;

        this.style.width = this.diam + 'px';
        this.style.height = this.diam + 'px';
        this.style.borderRadius = this.diam + 'px';
        this.changeCoord();
    }

    elem.upWall = function(movement) {
        return this.y - this.rad + movement * this.spd <= 0;
    }

    elem.leftWall = function(movement) {
        return this.x - this.rad + movement * this.spd <= 0;
    }

    elem.downWall = function(movement) {
        return this.y + this.rad + movement * this.spd >= fundo.h;
    }

    elem.rightWall = function(movement) {
        return this.x + this.rad + movement * this.spd >= fundo.w;
    }

    elem.randoPos = function(dist = this.rad) {
        return [Math.floor(Math.random() * (fundo.w - dist*2)) + dist, Math.floor(Math.random() * (fundo.h - dist*2)) + dist];
    }

    elem.desaparecer = async function (time = 100) {
        this.style.transition = `${time/1000}s linear`
        if (this.style.opacity === '0') {
            this.style.opacity = '1';
        } else {
            this.style.opacity = '0';
        }
        await delay(time);
    
        this.style.transition = '';
    }    
}

let p1 = document.createElement('div');
build(p1, 'p1', fundo.h * 0.1, fundo.w * 0.25, fundo.h * (3/4), fundo.h * 0.01);

let enmy = document.createElement('div');
build(enmy, 'enmy', fundo.h * 0.11, fundo.w * 0.75, fundo.h * (3/4), fundo.h * 0.009);

//Fazendo o site responsível à resizing
window.addEventListener('resize', () => {
    if(innerHeight * (16/9) > innerWidth) {
        fundo.setSize(innerWidth, innerWidth * (9/16));
    } else if(innerWidth * (9/16) > innerHeight) {
        fundo.setSize(innerHeight * (16/9), innerHeight);
    } else {
        fundo.setSize(innerWidth, innerHeight);
    }
            
    p1.setSize(0.1 * fundo.h);

    enmy.setSize(0.11 * fundo.h);
})

//Função de delay (BOM!!!)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Funções úteis
async function collision(other) {
    let a, b, c;
 
    a = p1.x - other.x;
    b = p1.y - other.y;
    c = Math.sqrt(a**2 + b**2);

    if (c < p1.rad+other.rad) {
        p1.classList.add('defeated');
        thud.play();
    }
}

function sine(value) {
        return Math.sin(value*(Math.PI/180));
}

function cosine(value) {
    return Math.cos(value*(Math.PI/180));
}

function arcsine(value) {
    return Math.asin(value)*(180/Math.PI);
}

function arccos(value) {
    return Math.asin(value)*(180/Math.PI);
}

function getAng(a, b) {
    let z = Math.sqrt(a**2 + b**2);

    if(b < 0) {
        return arccos(a/z);
    } else if(b >= 0) {
        return -arccos(a/z);
    }
}

function modulo(valor) {
    return Math.sqrt((valor)**2);
}

//Realizar a movimentação do jogador

p1.moving = {
    up: 0,

    right: 0,

    down: 0,

    left: 0,

    track: 0
}

window.addEventListener('keydown', async e => {

    if (e.key == 'w' || e.key == 'W') {

        if(!p1.moving.up && !p1.moving.track) {
            p1.moving.up = 1;
        } else {
            return;
        }
    
        let ir = 1;

        function stopIt(ev) {
            if (ev.key == 'w' || ev.key == 'W') {
                ir = 0;
            }
        }

        window.addEventListener('keyup', stopIt);

        while(ir) {
            if(p1.upWall(-1)) {
                p1.setCoord(undefined, p1.rad);
            } else if (p1.moving.right || p1.moving.down || p1.moving.left) {
                p1.changeCoord(0, -Math.sqrt(2) / 2);
            } else {
                p1.changeCoord(0, -1);
            }
        
            await delay(1000/fps)
        }

        window.removeEventListener('keyup', stopIt);

        p1.moving.up = 0;
    }
})

window.addEventListener('keydown', async e => {

    if (e.key == 'a' || e.key == 'A') {

        if(!p1.moving.left && !p1.moving.track) {
            p1.moving.left = 1;
        } else {
            return;
        }

        let ir = 1;

        function stopIt(ev) {
            if (ev.key == 'a' || ev.key == 'A') {
                ir = 0;
            }
        }

        window.addEventListener('keyup', stopIt);

        while(ir) {
            if(p1.leftWall(-1)) {
                p1.setCoord(p1.rad, undefined);
            } else if (p1.moving.up || p1.moving.right || p1.moving.down) {
                p1.changeCoord(-Math.sqrt(2) / 2, 0);
            } else {
                p1.changeCoord(-1, 0);
            }

            await delay(1000/fps)
        }

        window.removeEventListener('keyup', stopIt);

        p1.moving.left = 0;
    }
})

window.addEventListener('keydown', async e => {

    if (e.key == 's' || e.key == 'S') {

        if(!p1.moving.down && !p1.moving.track) {
            p1.moving.down = 1;
        } else {
            return;
        }
    
        let ir = 1;

        function stopIt(ev) {
            if (ev.key == 's' || ev.key == 'S') {
                ir = 0;
            }
        }

        window.addEventListener('keyup', stopIt);
    
        while(ir) {
            if(p1.downWall(1)) {
                p1.setCoord(undefined, fundo.h - p1.rad);
            } else if (p1.moving.left || p1.moving.up || p1.moving.right) {
                p1.changeCoord(0, Math.sqrt(2) / 2);
            } else {
                p1.changeCoord(0, 1);
            }

            await delay(1000/fps)
        }
        
        window.removeEventListener('keyup', stopIt);

        p1.moving.down = 0;
    }
})

window.addEventListener('keydown', async e => {

    if (e.key == 'd' || e.key == 'D') {

        if(!p1.moving.right && !p1.moving.track) {
            p1.moving.right = 1;
        } else {
            return;
        }

        let ir = 1;

        function stopIt(ev) {
            if (ev.key == 'd' || ev.key == 'D') {
                ir = 0;
            }
        }

        window.addEventListener('keyup', stopIt);
    
        while(ir) {
            if(p1.rightWall(1)) {
                p1.setCoord(fundo.w - p1.rad, undefined);
            } else if (p1.moving.down || p1.moving.left || p1.moving.up) {
                p1.changeCoord(Math.sqrt(2) / 2, 0) ;
            } else {
                p1.changeCoord(1, 0);
            }
        
            await delay(1000/fps);
        }

        window.removeEventListener('keyup', stopIt);

        p1.moving.right = 0;
    }
})

fundo.addEventListener('mousedown', async e => {

    if(!p1.moving.track && !p1.moving.up && !p1.moving.right && !p1.moving.down && !p1.moving.left) {
        p1.moving.track = 1;
    } else {
        return;
    }

    let parar = false;

    async function parou() {
        parar = true;
    }

    window.addEventListener('mouseup', parou);

    let xf, yf, a, b, c, count;

    function setDirections(event) {
        xf = event.clientX - fundo.getBoundingClientRect().x;

        yf = event.clientY - fundo.getBoundingClientRect().y;
    
        if(xf < p1.rad) {
            xf = p1.rad;
        } else if (xf + p1.rad > fundo.w) {
            xf = fundo.w - p1.rad;
        }
    
        if(yf < p1.rad) {
            yf = p1.rad;
        } else if (yf + p1.rad > fundo.h) {
            yf = fundo.h - p1.rad;
        }
    
        a = xf - p1.x;
    
        b = yf - p1.y;
    
        c = Math.sqrt(a**2 + b**2);

        count = 0;
    }

    setDirections(e);

    window.addEventListener('mousemove', setDirections);

    while(!parar) {
        if(count == Math.floor(c/p1.spd)) {
            p1.setCoord(xf, yf);
            await delay(1000/fps);
            continue;
        }

        p1.changeCoord((a/c), (b/c));
        count++;
    
        await delay(1000/fps);
    }

    window.removeEventListener('mousemove', setDirections);
    window.removeEventListener('mouseup', parou);

    p1.moving.track = 0;
})

fundo.addEventListener('touchstart', async e => {
    console.log('lol')
    if(!p1.moving.track && !p1.moving.up && !p1.moving.right && !p1.moving.down && !p1.moving.left) {
        p1.moving.track = 1;
    } else {
        return;
    }

    let parar = false;

    async function parou() {
        parar = true;
    }

    window.addEventListener('touchend', parou);

    let xf, yf, a, b, c, count;

    function setDirections(event) {
        xf = event.touches[0].clientX - fundo.getBoundingClientRect().x;

        yf = event.touches[0].clientY - fundo.getBoundingClientRect().y;
    
        if(xf < p1.rad) {
            xf = p1.rad;
        } else if (xf + p1.rad > fundo.w) {
            xf = fundo.w - p1.rad;
        }
    
        if(yf < p1.rad) {
            yf = p1.rad;
        } else if (yf + p1.rad > fundo.h) {
            yf = fundo.h - p1.rad;
        }
    
        a = xf - p1.x;
    
        b = yf - p1.y;
    
        c = Math.sqrt(a**2 + b**2);

        count = 0;
    }

    setDirections(e);

    window.addEventListener('touchmove', setDirections);

    while(!parar) {
        if(count == Math.floor(c/p1.spd)) {
            p1.setCoord(xf, yf);
            await delay(1000/fps);
            continue;
        }

        p1.changeCoord((a/c), (b/c));
        count++;
    
        await delay(1000/fps);
    }

    window.removeEventListener('touchmove', setDirections);
    window.removeEventListener('touchend', parou);

    p1.moving.track = 0;
})

//Ataques do inimigo

function buildProj(elem, type, diam, origin, spd) {
    build(elem, type, diam, origin.x, origin.y, spd);

    elem.launch = async function(xf = p1.x, yf = p1.y) {
        let a, b, c;

        a = xf - this.x;

        b = yf - this.y;

        c = Math.sqrt(a**2 + b**2);

        while(!this.leftWall(a/c) && !this.rightWall(a/c) && !this.upWall(b/c) && !this.downWall(b/c)) {
            this.changeCoord((a/c), (b/c));
    
            collision(this);
    
            await delay(1000/fps);
        }
    
        if(this.leftWall(a/c)) {
            this.changeCoord(0, (b/a) * -(this.x-this.rad) / this.spd)
            this.setCoord(this.rad, undefined);

        } else if(this.rightWall(a/c)) {
            this.changeCoord(0, (b/a) * (fundo.w-this.rad-this.x) / this.spd)
            this.setCoord(fundo.w-this.rad, undefined);

        } else if(this.upWall(b/c)) {
            this.changeCoord((a/b) * -(this.y-this.rad) / this.spd, 0)
            this.setCoord(undefined, this.rad);

        } else if(this.downWall(b/c)) {
            this.changeCoord((a/b) * (fundo.h-this.rad-this.y) / this.spd, 0)
            this.setCoord(undefined, fundo.h-this.rad);
            
        }

        await delay(1000/fps);

        await this.desaparecer(150);
    
        fundo.removeChild(this);    
    }

    elem.spread = async function(xf = this.randoPos(this.rad*2.5)[0], yf = this.randoPos(this.rad*2.5)[1]) {
        let a, b, c;

        a = xf - this.x;

        b = yf - this.y;

        c = Math.sqrt(a**2 + b**2);

        for (let count = 0; count != Math.floor(c / this.spd); count++) {
            this.changeCoord((a/c), (b/c));
    
            collision(this);
    
            await delay(1000/fps);
        }

        this.setCoord(xf, yf);

        let proj = [];

        for (let i = 0; i < 4; i++) {
            proj[i] = document.createElement('div');
            buildProj(proj[i], 'shot', this.diam/1.5, this, fundo.h *01125);
            fundo.appendChild(proj[i]);
        }

        fundo.removeChild(this);

        proj[0].launch(this.x, this.y-1);
        proj[1].launch(this.x+1, this.y);
        proj[2].launch(this.x, this.y+1);
        proj[3].launch(this.x-1, this.y);
    }
}

enmy.shoot = function() {
    let shot = document.createElement('div');
    
    buildProj(shot, 'shot', this.diam/2, this, fundo.h *0.01125);

    fundo.appendChild(shot);

    shot.launch();
}

enmy.shootSpread = function() {
    let spreadShot = document.createElement('div');
    
    buildProj(spreadShot, 'spreadShot', this.diam/1.75, this, fundo.h *0.0105);

    fundo.appendChild(spreadShot);

    spreadShot.spread();
}

enmy.move = async function(xf = this.randoPos()[0], yf = this.randoPos()[1]) {
    let a = xf - this.x;

    let b = yf - this.y;

    let c = Math.sqrt(a**2 + b**2);

    for (let count = 0; count != Math.floor(c / this.spd); count++) {
        if (count % 20 == 0) {
            this.shoot();
        }
        this.changeCoord((a/c), (b/c));

        collision(this);

        await delay(1000 / fps);
    }

    this.setCoord(xf, yf);
}

function buildExpl(elem, type, diam, origin, spd) {
    build(elem, type, diam, origin.x, origin.y, spd);

    elem.style.opacity = '1';

    elem.activate = async function() {
        this.classList.add('pulsing');
    
        fundo.appendChild(this);    
    }

    elem.boom = async function() {
        this.classList.toggle('pulsing');

        let ogDiam = this.diam;

        this.style.backgroundColor = 'rgb(255, 166, 0)';
    
        let duration = 0.25*fps;
    
        for (let count = 0; count < duration; count++) {
            this.changeSize(6*ogDiam/duration);
            this.style.opacity = parseFloat(this.style.opacity) - 0.8/duration + '';
    
            collision(this);

            await delay(1000/fps);
        }
    
        fundo.removeChild(this);
    }
}

enmy.tp = async function(xf = this.randoPos()[0], yf = this.randoPos()[1]) {
    await this.desaparecer(75);

    this.setCoord(xf, yf);

    this.desaparecer(75);
}

enmy.deployBomb = async function() {
    let bomb = document.createElement('div');
    
    buildExpl(bomb, 'bomb', this.diam/2, this, fundo.h * 0.015);

    bomb.activate();

    this.tp();

    await delay(1500);

    bomb.boom();
}

function buildShadow(elem, type, origin, spd) {
    build(elem, type, origin.diam, origin.x, origin.y, spd);

    elem.move = async function(xf, yf, coll = false) {
        let a = xf - this.x;
    
        let b = yf - this.y;
    
        let c = Math.sqrt(a**2 + b**2);

        if(!coll) {
            this.style.opacity = '0.25';
            this.spd = enmy.spd * 4;
        } else {
            this.style.opacity = '0.75';
            this.spd = enmy.spd * 12;
        }
    
        for (let count = 0; count != Math.floor(c / this.spd); count++) {
            this.changeCoord((a/c), (b/c))
    
            if(coll) {
                collision(this);
            }
    
            await delay(1000/fps);
        }

        this.setCoord(xf, yf);
    }

    elem.trackMove = async function() {
        this.style.opacity = '0.25';
        this.spd = enmy.spd * 4;

        let a, b, c, count, ir = true;

        function setDirections() {        
            a = origin.x - elem.x;
        
            b = origin.y - elem.y;
        
            c = Math.sqrt(a**2 + b**2);
    
            count = 0;
        }

        setDirections();
        
        while(ir) {
            this.changeCoord((a/c), (b/c));
            count++;
        
            setDirections();

            if(count == Math.floor(c/this.spd)) {
                this.setCoord(origin.x, origin.y);
                await delay(1000/fps);
                ir = false;
            }

            await delay(1000/fps);
        }
    }

    elem.lunge = async function(where = 0) {
        let x0, y0, x1, y1;
        
        if(!(where % 2)) {
            x0 = Math.floor(fundo.w * (4/100) + Math.random() * (fundo.w * (93/100) - this.rad));
            await delay(50);
            x1 = Math.floor(fundo.w * (4/100) + Math.random() * (fundo.w * (93/100) - this.rad));
        } else {
            y0 = Math.floor(fundo.h * (4/100) + Math.random() * (fundo.h * (93/100) - this.rad));
            await delay(50);
            y1 = Math.floor(fundo.h * (4/100) + Math.random() * (fundo.h * (93/100) - this.rad));
        }
    
        switch (where) {
            case 0:
                y0 = -this.rad;
                y1 = fundo.h + this.rad;
                break;
        
            case 1:
                x0 = fundo.w + this.rad;
                x1 = -this.rad;
                break;
            
            case 2:
                y0 = fundo.h + this.rad;
                y1 = -this.rad;
                break;
            
            case 3:
                x0 = -this.rad;
                x1 = fundo.w + this.rad;
                break;
            
            default:
                break;
        }
    
        await delay(50);

        await this.move(x0, y0);

        let alerta = document.createElement('div');
    
        buildAlerta(alerta, 'alerta', this, 0, this.spd * 2);

        await delay(100);
    
        await alerta.activate(x1, y1);

        await delay(1000);
    
        await this.move(x1, y1, true);

        await alerta.deactivate();

        await delay(500);
    
        await this.trackMove(1/3);    
    }
}

function buildRect(elem, type, size, ang, x, y, spd) {
    elem.classList.add(type);

    elem.w = size;

    elem.h = size;

    elem.ang = ang;

    elem.x = x;

    elem.y = y;

    elem.spd = spd;

    elem.setCoord = function(x_ = this.x, y_ = this.y) {
        this.x = x_;
        this.y = y_;

        this.style.left = this.x - this.w / 2 + 'px';
        this.style.top = this.y - this.h / 2 + 'px';
    }

    elem.setCoord();

    elem.changeCoord = function(addX = 0, addY = 0) {
        this.x += addX * this.spd;
        this.y += addY * this.spd;

        this.style.left = this.x - this.w / 2 + 'px';
        this.style.top = this.y - this.h / 2 + 'px';
    }

    elem.setSize = function(w_ = this.w, h_ = this.h) {
        this.w = w_;
        this.h = h_;

        this.style.width = this.w + 'px';
        this.style.height = this.h + 'px';
        this.style.borderRadius = this.w + 'px';
        this.changeCoord();
    }

    elem.setSize();

    elem.changeSize = function(addW = 0, addH = 0) {
        this.w += addW;
        this.h += addH;

        this.style.width = this.w + 'px';
        this.style.height = this.h + 'px';
        this.changeCoord();
    }

    elem.desaparecer = async function (time = 100) {
        this.style.transition = `${time/1000}s linear`
        if (this.style.opacity === '0') {
            this.style.opacity = '1';
        } else {
            this.style.opacity = '0';
        }
        await delay(time);
    
        this.style.transition = '';
    }
}

function buildAlerta(elem, type, origin, ang, spd) {
    buildRect(elem, type, origin.diam, ang, origin.x, origin.y, spd);

    elem.style.opacity = '0.15';

    elem.activate = async function(x1, y1) {
        this.classList.toggle('flash');

        let a = x1 - this.x;
        let b = y1 - this.y;
        let c = Math.sqrt(a**2 + b**2);

        this.ang = getAng(a, b);
        this.style.transform = `rotate(${this.ang}deg)`;

        fundo.appendChild(this);

        for(let count = 0; count != Math.floor(c/this.spd); count++) {
            this.changeCoord((a/2/c), (b/2/c));
            this.changeSize(0, c / Math.floor(c/this.spd))
    
            await delay(1000/fps);
        }

        this.setCoord(x1-a/2, y1-b/2);
    }

    elem.deactivate = async function() {
        this.classList.toggle('flash');
        await delay(10);
        await this.desaparecer(150);
        fundo.removeChild(this);    
    }
}

enmy.jutsuAttack = async function() {
    await this.move(fundo.w/2, fundo.h/2);

    let shadow = [];

    for (let i = 0; i < 6; i++) {
        shadow[i] = document.createElement('div');
        buildShadow(shadow[i], 'shadow', this, this.spd*4);
        fundo.appendChild(shadow[i]);
    }

    for (let i = 0; i < 6; i++) {
        shadow[i].lunge(i%4);
    }

    this.desaparecer(50);

    await delay(200);

    while(shadow[0].x !== this.x || shadow[1].x !== this.x || shadow[2].x !== this.x || shadow[3].x !== this.x || shadow[4].x !== this.x || shadow[5].x !== this.x) {
        await delay(1000/120);
    }

    for (let i = 0; i < 6; i++) {
        fundo.removeChild(shadow[i]);
    }

    this.desaparecer(1);
}

enmy.shade = async function() {
    let shadow = document.createElement('div');
    buildShadow(shadow, 'shadow', this, this.spd*4);
    fundo.appendChild(shadow);

    await shadow.lunge(Math.floor(Math.random() * 4));

    fundo.removeChild(shadow);
}

/*
async function formWeapon() {
    let weapon, scale, rotate;
    weapon = document.createElement('div');
    weapon.classList.add('weapon');
    weapon.style.height = parseFloat(enmy.style.height) / 2 + 'px';
    weapon.style.width = parseFloat(enmy.style.width)/4 + 'px';
    weapon.style.borderRadius = parseFloat(weapon.style.height) / 4 + 'px';
    weapon.style.top = parseFloat(enmy.style.top) + parseFloat(enmy.style.height) / 4 + 'px';
    weapon.style.left = parseFloat(enmy.style.left) + parseFloat(enmy.style.width) / 2 + 'px';

    scale = 0;
    rotate = 0;
    weapon.style.transform = `scale(${scale}, 1)`;

    fundo.appendChild(weapon);

    for (let count = 0; count < 30; count++) {
        scale += 4.5/15;
        rotate += 1;
        weapon.style.transform = `rotate(${-rotate}deg) scale(${scale}, 1)`;
        weapon.style.left = parseFloat(weapon.style.left) + parseFloat(weapon.style.width) * 0.075 + 'px';
        await delay(1000/fps);
    }

    await delay(100);

    let rad = parseFloat(weapon.style.left) + parseFloat(weapon.style.width) / 2 - parseFloat(enmy.style.left) - parseFloat(enmy.style.width) / 2;

    await delay(200);

    async function weaponAttack() {
        let x, y, z;

        let ex = parseFloat(weapon.style.left) + parseFloat(weapon.style.width) / 2;
        let wy = parseFloat(weapon.style.top) + parseFloat(weapon.style.height) / 2;

        x = parseFloat(p1.style.left) + (parseFloat(p1.style.width)/2 - parseFloat(enmy.style.width)/2) - parseFloat(enmy.style.left);
        
        y = parseFloat(p1.style.top) + (parseFloat(p1.style.height)/2 - parseFloat(enmy.style.height)/2) - parseFloat(enmy.style.top);
        
        z = Math.sqrt(x**2 + y**2);
        
        while(parseFloat(enmy.style.left) + (x / z) * enmy.spd > 0 && parseFloat(enmy.style.left) + (x / z) * enmy.spd < (fundo.w - parseFloat(enmy.style.width)) && parseFloat(enmy.style.top) + (y / z) * enmy.spd > 0 && parseFloat(enmy.style.top) + (y / z) * enmy.spd < (fundo.h - parseFloat(enmy.style.height))) {
            enmy.style.left = parseFloat(enmy.style.left) + (x / z) * enmy.spd + 'px';
            enmy.style.top = parseFloat(enmy.style.top) + (y / z) * enmy.spd + 'px';
            collision(enmy);

            rotate -= 10;
            weapon.style.left = rad * cosine(-rotate+30) + parseFloat(enmy.style.left) + parseFloat(enmy.style.width) / 2 - parseFloat(weapon.style.width) / 2 + 'px';
            weapon.style.top = rad * sine(-rotate+30) + parseFloat(enmy.style.top) + parseFloat(enmy.style.height) / 2 - parseFloat(weapon.style.height) / 2 + 'px';

            weapon.style.transform = `rotate(${-rotate}deg) scale(${scale}, 1)`;
            
            await delay(1000/fps);
        }
    }

    console.log(scale)
    console.log(rotate)
    42.6319*4.5

    191.84355

    784.91-191.84355/2+42.6319/2
    710.304175

    parseFloat(enmy.style.left) + parseFloat(enmy.style.width) / 2
    688.9999

    688.9999-191.84355/2
    593.078125

    await weaponAttack();
    await weaponAttack();
    await weaponAttack();
    await weaponAttack();

    await delay(200);

    fundo.removeChild(weapon);
}
*/
let thud = new Audio('thud.mp3');
let orbCount = 0;
if(!window.localStorage.getItem('vitorias')) {
    window.localStorage.setItem('vitorias', 0);
}
if(!window.localStorage.getItem('derrotas')) {
    window.localStorage.setItem('derrotas', 0);
}

let won = window.localStorage.getItem('vitorias'), defeat = window.localStorage.getItem('derrotas');

async function createOrbs() {
    let coords = p1.randoPos();
    let orb = document.createElement('div');
    orb.classList.add('orb');
    orb.style.left = coords[0] + 'px';
    orb.style.top = coords[1] + 'px';
    orb.style.width = parseFloat(enmy.style.width)/4 + 'px';
    orb.style.height = parseFloat(enmy.style.height)/4 + 'px';
    orb.style.borderRadius = parseFloat(enmy.style.borderRadius)/4 + 'px';

    fundo.appendChild(orb);
    orbCount++;

    while (!p1.classList.contains('defeated') && !p1.classList.contains('won')) {
        let x, y, z, rp1, rOrb;
 
        rp1 = parseFloat(p1.style.width) / 2;
       
        rOrb = parseFloat(orb.style.width) / 2;
       
        x = (parseFloat(p1.style.left) + rp1) - (parseFloat(orb.style.left) + rOrb);
        y = (parseFloat(p1.style.top) + rp1) - (parseFloat(orb.style.top) + rOrb);
        z = Math.sqrt(x**2 + y**2);
       
        if (z < rp1+rOrb) {
            break;
        }

        await delay(1000/fps);
    }

    orb.classList.add('defeated');
    orbCount--;
    await delay(300);
    fundo.removeChild(orb);
}

async function bigText(text, texto) {
    text.classList.add('bigText');
    text.innerHTML = texto;
    text.style.width = fundo.w + 'px';
    text.style.height = fundo.h/2 + 'px';
    text.style.left = '0';
    text.style.top = '0';
    text.style.lineHeight = text.style.height;
    text.style.fontSize = text.style.height;
    fundo.appendChild(text);
}

async function bigText2(texto, time = 0) {
    let text = document.createElement('div');
    text.classList.add('bigText2');
    text.innerHTML = texto;
    text.style.width = fundo.w + 'px';
    text.style.height = fundo.h + 'px';
    text.style.left = '0';
    text.style.top = '0';
    text.style.lineHeight = text.style.height;
    text.style.fontSize = parseFloat(text.style.height)/1.5 + 'px';
    fundo.appendChild(text);

    if (time) {
        await delay(time);
        fundo.removeChild(text);
    }
}

async function stats(text) {
    text.classList.add('stats');
    text.innerHTML = `Vitórias: ${window.localStorage.getItem('vitorias')}<br>Derrotas: ${window.localStorage.getItem('derrotas')}`;
    text.style.width = fundo.w/4 + 'px';
    text.style.height = fundo.h/4 + 'px';
    text.style.left = fundo.h/40 + 'px';
    text.style.top = fundo.h/40 + 'px';
    text.style.lineHeight = parseFloat(text.style.height)/4.5 + 'px';
    text.style.fontSize = parseFloat(text.style.height)/4.5 + 'px';
    fundo.appendChild(text);
}

function criarBotao(botao, texto) {
    botao.classList.add('botaoJogo');
    botao.innerHTML = texto;
    botao.style.width = fundo.w/4 + 'px';
    botao.style.height = fundo.h/3 + 'px';
    botao.style.left = fundo.w/2 - parseFloat(botao.style.width)/2 + 'px';
    botao.style.top = fundo.h * (3/4) - parseFloat(botao.style.height)/2 + 'px';
    botao.style.lineHeight = botao.style.height;
    botao.style.fontSize = parseFloat(botao.style.height)/2.5 + 'px';
    botao.style.borderRadius = parseFloat(botao.style.height)/4 + 'px';

    fundo.appendChild(botao);
}

async function iniciar() {
    if(p1.classList.contains('defeated')) {
        p1.classList.remove('defeated');
    }

    if(enmy.classList.contains('defeated1')) {
        enmy.classList.remove('defeated1');
    }

    if(p1.classList.contains('won')) {
        p1.classList.remove('won');
    }

    let a, b, c, a1, b1, c1;

    a = fundo.w * 0.5 - enmy.x;
    b = fundo.h / 3 - enmy.y;
    c = Math.sqrt(a**2 + b**2);

    a1 = fundo.w * 0.5 - p1.x;
    b1 = fundo.h / 1.5 - p1.y;
    c1 = Math.sqrt(a1**2 + b1**2);

    for (let count = 0; count != Math.floor(c / enmy.spd); count++) {
        enmy.changeCoord((a/c), (b/c));

        await delay(1000 / fps);
    }

    for (let count = 0; count != Math.floor(c1 / p1.spd); count++) {
        p1.changeCoord((a1/c1), (b1/c1));

        await delay(1000 / fps);
    }

    await delay(1000);

    await bigText2('1', 1000);
    createOrbs();
    createOrbs();
    await bigText2('2', 1000);
    createOrbs();
    createOrbs();
    await bigText2('3', 1000);
    createOrbs();
    createOrbs();

    p1.moving.up = 0;
    p1.moving.right = 0;
    p1.moving.down = 0;
    p1.moving.left = 0;
    p1.moving.track = 0;

    await delay(1000);

    while (!p1.classList.contains('defeated') && !p1.classList.contains('won')) {
        switch (Math.floor(Math.random() * 5)) {
            case 0:
                await enmy.shootSpread();
                await enmy.move();
                await enmy.shootSpread();
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;
    
            case 1:
                enmy.deployBomb();
                await delay(250);
                enmy.deployBomb();
                await delay(250);
                enmy.deployBomb();
                await delay(250);
                enmy.deployBomb();
                await delay(250);
                enmy.deployBomb();
                await delay(250);
                enmy.deployBomb();
                await delay(250);
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;
            
            case 2:
                await enmy.jutsuAttack();
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;

            case 3:
                enmy.shade();
                await enmy.move();
                await delay(200);
                await enmy.move();
                if (orbCount == 0) {
                    p1.classList.add('won');
                    break;
                }
                createOrbs();
                break;    
    
            case 4:
                await enmy.shootSpread();
                await delay(250);
                await enmy.shootSpread();
                await delay(250);
                await enmy.shootSpread();
                await delay(250);
                await enmy.shootSpread();
                await delay(250);
                await enmy.shootSpread();
                await delay(250);
                await enmy.shootSpread();
                await delay(250);
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
        enmy.classList.add('defeated1');
        defeat++;
        window.localStorage.setItem('derrotas', defeat);
        await delay(500);
        telaInicial('Lost', '🔁');
    } else if(p1.classList.contains('won')) {
        enmy.classList.add('defeated1');
        p1.classList.add('defeated');
        won++;
        window.localStorage.setItem('vitorias', won);
        await delay(500);
        telaInicial('Won', '🔁');
    }
}

function telaInicial(texto, textoBotao) {
    let textoInicial = document.createElement('div');
    let botaoInicial = document.createElement('button');
    let status = document.createElement('div');

    bigText(textoInicial, texto);
    criarBotao(botaoInicial, textoBotao);
    stats(status);

    botaoInicial.addEventListener('click', () => {
        fundo.removeChild(textoInicial);
        fundo.removeChild(botaoInicial);
        fundo.removeChild(status);
    });

    botaoInicial.addEventListener('click', iniciar);

    p1.moving.up = 1;
    p1.moving.right = 1;
    p1.moving.down = 1;
    p1.moving.left = 1;
    p1.moving.track = 1;
}

window.onload = function() {
    fundo.appendChild(p1);
    fundo.appendChild(enmy);
    telaInicial('Jogo', 'Start');
}