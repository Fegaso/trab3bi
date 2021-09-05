function greetAction() {
    let name = prompt(`What's your name?`);

    alert(`Hey ${name}, thanks for using this site!`);
}

document.querySelector("#greet").addEventListener('click', greetAction);

let counter = 0;

function addCounter() {
    counter++;
    document.querySelector("#counter").innerHTML = counter;
}

document.querySelector("#adder").addEventListener('click', addCounter);

let imageCounter = 0;

function changeImage() {
    let img = document.querySelector('#randomImage');
    switch(imageCounter % 5) {
        case 0:
            img.src = "images/brick.jpg";
            imageCounter++;
            break;
        case 1:
            img.src = "images/minecraftYoutubers.jpg";
            imageCounter++;
            break;
        case 2:
            img.src = "images/omegalul.jpg";
            imageCounter++;
            break;
        case 3:
            img.src = "images/stfu.jpg";
            imageCounter++;
            break;
        case 4:
            img.src = "images/superMonkey.jpg";
            imageCounter++;
            break;
    }
}

document.querySelector('#randomImage').addEventListener('click', changeImage);