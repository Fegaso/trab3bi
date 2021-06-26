function greetAction() {
    let name = prompt(`What's your name?`);

    alert(`Hi ${name}, glad to see you!`);
}

document.querySelector("#greet").addEventListener('click', greetAction);