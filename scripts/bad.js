


//Cache if no db available
const cardProb = [
    0.0234, 0.0187, 0.0173, 0.0168, 0.0195, 0.0203, 0.0211, 0.0226, 0.0239, 0.0242, 0.0258, 0.0265, 0.0273,
    0.0281, 0.0196, 0.0184, 0.0179, 0.0202, 0.0217, 0.0229, 0.0235, 0.0248, 0.0253, 0.0269, 0.0278, 0.0289,
    0.0295, 0.0208, 0.0192, 0.0185, 0.0214, 0.0223, 0.0236, 0.0249, 0.0251, 0.0267, 0.0272, 0.0286, 0.0298,
    0.0302, 0.0215, 0.0206, 0.0197, 0.0221, 0.0234, 0.0242, 0.0256, 0.0263, 0.0275, 0.0287, 0.0291, 0.0305
];


//Cache if no db available

const numberProb = [
    0.0191, 0.0167, 0.0143, 0.0134, 0.0153, 0.0162, 0.0172, 0.0181, 0.0191, 0.0201, 0.0210, 0.0219, 0.0229,
    0.0239, 0.0177, 0.0162, 0.0148, 0.0158, 0.0167, 0.0177, 0.0186, 0.0196, 0.0205, 0.0215, 0.0224, 0.0234,
    0.0243, 0.0181, 0.0167, 0.0153, 0.0162, 0.0172, 0.0181, 0.0191, 0.0201, 0.0210, 0.0219, 0.0229, 0.0239,
    0.0248, 0.0186, 0.0172, 0.0158, 0.0167, 0.0177, 0.0186, 0.0196, 0.0205, 0.0215, 0.0224, 0.0234, 0.0243
];


const urlParams = new URLSearchParams(window.location.search);

// Ottieni il valore del parametro desiderato
const valoreParametro = urlParams.get('format');

const cur_stack = urlParams.get('S');





// Aggiorna l'URL senza ricaricare la pagina
window.history.pushState({}, '', currentUrl);



let chosenCard = "";
let chosenNumber = "";



function genera(carta) {

    chosenCard = carta;
    document.querySelector(".container").style.display = "none";
    showNumbers();
}


function showNumbers() {
    document.getElementById('Title').textContent = "Insert your number:";
    let numberContainer = document.querySelector(".number-container");
    numberContainer.innerHTML = "";
    for (let i = 1; i <= 52; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.classList.add("bold-number"); // Aggiunge la classe
        btn.onclick = () => chooseNumber(i);
        numberContainer.appendChild(btn);
    }
    numberContainer.style.display = "flex";
}





function showMenuDelayed(num) {
    chosenNumber = num;
    document.getElementById('idThankYou').style.display = "none";
    menuVettore = ["Combined Probability", "Top Ten", "Show Deck", "Show Choice"];
    document.querySelector(".number-container").style.display = "none";
    document.getElementById("Title").textContent = "Menu";
    showMenu();
}




function chooseNumber(num) {
    chosenNumber = num;
    document.querySelector(".number-container").style.display = "none";
    document.getElementById('idThankYou').style.display = "flex";
    setTimeout(showMenuDelayed, 2000, num);

}









function showMenu() {
    document.getElementById('Title').textContent = "Menu";
    let menuContainer = document.querySelector(".menu");
    menuContainer.innerHTML = ``;
    menuVettore.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => handleMenuClick(option);
        menuContainer.appendChild(btn);
    });
    menuContainer.style.display = "flex";
}


function showChosen() {

    document.getElementById('idCard').textContent = chosenCard;
    document.getElementById('idNumber').textContent = chosenNumber;
    let idxCProb = carte.indexOf(chosenCard);

    document.getElementById('idCardProb').textContent = "(" + cardProb[idxCProb] + ")";
    document.getElementById('idNumberProb').textContent = "(" + numberProb[chosenNumber - 1] + ")";
   
    let val = (cardProb[idxCProb] * numberProb[chosenNumber - 1]).toFixed(6);
    document.getElementById('Title').textContent = "Probability (" + val + ")";
     
    document.querySelector(".menu").style.display = "none";
    document.getElementById('idChosen').style.display = 'block';

}




function handleMenuClick(option) {
    if (option === "Show Deck") {
        document.getElementById("Title").style.display = "none";
        document.getElementById("idMain").style.display = "none";
        document.getElementById("idPool").style.display = "flex";


        document.querySelector(".menu").style.display = "none";
        // document.querySelector(".container").style.display = "flex";
    } else if (option === "Show Choice") {
        document.querySelector(".menu").style.display = "none";
        showChosen();
      


    } else if (option.startsWith("Top")) {
        showTopTable();
      
    } else if (option === "Combined Probability") {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = urlParams.get('hash');

      
      
            window.location.href = `https://cardstat.vercel.app`;
        
    }
}


const carte = [
    "A♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣",
    "A♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦",
    "A♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥",
    "A♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠"
];





// Quando viene cliccato il bottone "Top"
function showTopTable() {
    // Nasconde il menu

    document.querySelector('#id_number').style.display = 'none';

    // Mostra la tabella
    document.getElementById('tableContainer').style.display = 'block';

    // Calcola quante righe mostrare in base al valore di topString
    let topValue = 10;
    let tableBody = document.querySelector('#topTable tbody');
    tableBody.innerHTML = '';  // Pulisce eventuali righe precedenti

    // Aggiungi righe alla tabella
    for (let i = 1; i <= topValue; i++) {
        let randomNumber = Math.floor(Math.random() * 52) + 1;
        let rpos = Math.floor(Math.random() * 52) + 1;
        let row = document.createElement('tr');
        let prob = Math.random().toFixed(2);  // Probabilità finta (random)
        prob *= prob;
        prob = prob.toFixed(4);
        row.innerHTML = `
                     <td>${i}</td>
                     <td>${carte[randomNumber - 1]}</td>
                     <td>${rpos}</td>
                     <td>${prob}</td>
                 `;
        tableBody.appendChild(row);
    }
}

// Funzione per tornare al menu
function goBackToMenu() {
    // Mostra di nuovo il menu

    document.getElementById('id_number').style.display = 'block';
    document.getElementById('idChosen').style.display = 'none';

    // Nasconde la tabella
    document.getElementById('tableContainer').style.display = 'none';
    showMenu();
}



function start_pool() {
    document.getElementById("Title").textContent = "Insert your card:";
    document.getElementById("Title").style.display = "block";
    document.getElementById("idMain").style.display = "flex";
    document.getElementById("idPool").style.display = "none";
}


