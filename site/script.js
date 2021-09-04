function greetAction() {
    let name = prompt(`What's your name?`);

    alert(`Hey ${name}, thanks for accessing this site!`);
}

document.querySelector("#greet").addEventListener('click', greetAction);

let counter = 0;

function addCounter() {
    counter++;
    document.querySelector("#counter").innerHTML = counter;
}

document.querySelector("#adder").addEventListener('click', addCounter);