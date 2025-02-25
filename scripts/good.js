


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






let chosenCard = "";
let chosenNumber = "";
let topString = "";
let menuVettore = [];
let bottomCard = "";

const rankMap = {
    "A": "", "2": "Two", "3": "Three", "4": "Four", "5": "Five",
    "6": "Six", "7": "Seven", "8": "Eight", "9": "Nine", "10": "Ten",
    "J": "Eleven", "Q": "Twelve", "K": "Thirteen"
};


const rTop = {
    "Top ": 1,
    "Top Two": 2,
    "Top Three": 3,
    "Top Four": 4,
    "Top Five": 5,
    "Top Six": 6,
    "Top Seven": 7,
    "Top Eight": 8,
    "Top Nine": 9,
    "Top Ten": 10,
    "Top Eleven": 11,
    "Top Twelve": 12,
    "Top Thirteen": 13
};

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
function showNumbers2() {
    let numberContainer = document.querySelector(".number-container");
    numberContainer.innerHTML = "";
    for (let i = 1; i <= 52; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.onclick = () => chooseNumber(i);
        numberContainer.appendChild(btn);
    }
    numberContainer.style.display = "flex";
}




function showMenuDelayed(num) {
    chosenNumber = num;

    document.getElementById('idThankYou').style.display = "none";
    // saveStats();
    //salvaSuSupabase();
    let bottomCard = getNextValue();
    let [value, suit] = [bottomCard.slice(0, -1), bottomCard.slice(-1)];
    topString = "Top " + rankMap[value];

    let menuOptions = {
        "♣": ["Combined Probability", topString, "Show Deck", "Show Choice"],
        "♥": [topString, "Combined Probability", "Show Deck", "Show Choice"],
        "♠": [topString, "Show Deck", "Combined Probability", "Show Choice"],
        "♦": [topString, "Show Deck", "Show Choice", "Combined Probability"]
    };

    menuVettore = menuOptions[suit];
    document.querySelector(".number-container").style.display = "none";
    document.getElementById("Title").textContent = "Menu";
    showMenu();
}




function chooseNumber(num) {
    chosenNumber = num;
    salvaSuSupabase();
    document.querySelector(".number-container").style.display = "none";
    document.getElementById('idThankYou').style.display = "flex";
    setTimeout(showMenuDelayed, 2000, num);

}


function chooseNumber2(num) {
    chosenNumber = num;
    setTimeout(myFunction, 2000);

    // saveStats();
    salvaSuSupabase();
    let bottomCard = getNextValue();
    let [value, suit] = [bottomCard.slice(0, -1), bottomCard.slice(-1)];
    topString = "Top " + rankMap[value];

    let menuOptions = {
        "♣": ["Combined Probability", topString, "Show Deck", "Show Choice"],
        "♥": [topString, "Combined Probability", "Show Deck", "Show Choice"],
        "♠": [topString, "Show Deck", "Combined Probability", "Show Choice"],
        "♦": [topString, "Show Deck", "Show Choice", "Combined Probability"]
    };

    menuVettore = menuOptions[suit];
    document.querySelector(".number-container").style.display = "none";
    document.getElementById("Title").textContent = "Menu";
    showMenu();
}



function convertiCartaInNumero(carta) {
    // Mappa per i valori delle carte
    const valori = {
        'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10,
        'J': 11, 'Q': 12, 'K': 13
    };

    // Mappa per i semi delle carte
    const semi = {
        '♣': 1, '♥': 2, '♠': 3, '♦': 4
    };

    // Estrai il valore e il seme dalla carta
    const val = carta.slice(0, -1); // Tutti i caratteri eccetto l'ultimo
    const suit = carta.slice(-1);  // Ultimo carattere

    // Converte il valore e il seme utilizzando le mappe
    const valNum = valori[val];
    const suitNum = semi[suit];

    // Calcola e ritorna il numero nel formato specificato
    return (valNum * 10 + suitNum) / 10000;
}
let fake_prob = null;

function changeMenu() {
    let bottomCard = getNextValue();
    let [value, suit] = [bottomCard.slice(0, -1), bottomCard.slice(-1)];
    topString = "Top " + rankMap[value];
    fake_prob = convertiCartaInNumero(bottomCard);
    let menuOptions = {
        "♣": ["Combined Probability", topString, "Show Deck", "Show Choice"],
        "♥": [topString, "Combined Probability", "Show Deck", "Show Choice"],
        "♠": [topString, "Show Deck", "Combined Probability", "Show Choice"],
        "♦": [topString, "Show Deck", "Show Choice", "Combined Probability"]
    };

    menuVettore = [...menuOptions[suit]];
    console.log(menuVettore);
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
    if (fake_prob) {
        document.getElementById('Title').textContent = "Probability (" + fake_prob + ")";
        //  document.getElementById('idCombined').textContent = "Probability (" + fake_prob + ")";
        fake_prob = null;
    } else {
        let val = (cardProb[idxCProb] * numberProb[chosenNumber - 1]).toFixed(6);
        document.getElementById('Title').textContent = "Probability (" + val + ")";
        //document.getElementById('idCombined').textContent = "Probability (" + val + ")";
    }
    document.querySelector(".menu").style.display = "none";
    //            document.querySelector(".container").style.display = "flex";

    document.getElementById('idChosen').style.display = 'block';

}


function convertCard(carta) {
    // Mappa per i valori delle carte
    const valori = { 'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13 };

    // Mappa per la conversione dei semi
    const semiConversione = { '♥': '♠', '♣': '♦', '♠': '♥', '♦': '♣' };

    // Estrai valore e seme
    let valore = carta.slice(0, -1);
    let seme = carta.slice(-1);

    // Converti valore e seme
    let nuovoValore = 14 - valori[valore];
    let nuovoSeme = semiConversione[seme];

    // Converti valore numerico in simbolo (1 -> A, 11 -> J, ecc.)
    let nuovoValoreSimbolo = Object.keys(valori).find(key => valori[key] === nuovoValore);

    return nuovoValoreSimbolo + nuovoSeme;
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
        //   showNumbers();
        leggiUltimoDati().then(result => {
            if (result) {
                result.card = decodeCard(result.card);
                if (chosenCard != result.card || chosenNumber != result.number) {
                    chosenCard = result.card;
                    chosenNumber = result.number;

                    changeMenu();
                    // alert('casa');
                    chosenCard = convertCard(result.card);
                    chosenNumber = 53 - result.number;
                }
                //chosenCard=result.card;
                //chosenNumber=result.number;

                //alert(chosenCard +' '+chosenNumber);
            }
            showChosen();
        });


    } else if (option.startsWith("Top")) {
        showTopTable();
        //   window.location.href = `https://cardstat.vercel.app?card=${chosenCard}&num=${chosenNumber}&top=1`;
    } else if (option === "Combined Probability") {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = urlParams.get('hash');

        cancellaRighe();
        if (cur_stack) {
            window.location.href = `https://cardstat.vercel.app?S=1&hash=${hash}&card=${chosenCard}&num=${chosenNumber}`;
        } else {
            window.location.href = `https://cardstat.vercel.app?hash=${hash}&card=${chosenCard}&num=${chosenNumber}`;
        }
    }
}


const carte = [
    "A♣", "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣",
    "A♦", "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦",
    "A♥", "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥",
    "A♠", "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠"
];
//mnemonica
let stack = [
    "4♣", "2♥", "7♦", "3♣", "4♥", "6♦", "A♠", "5♥", "9♠", "2♠", "Q♥", "3♦", "Q♣",
    "8♥", "6♠", "5♠", "9♥", "K♣", "2♦", "J♥", "3♠", "8♠", "6♥", "10♣", "5♦", "K♦",
    "2♣", "3♥", "8♦", "5♣", "K♠", "J♦", "8♣", "10♠", "K♥", "J♣", "7♠", "10♥", "A♦",
    "4♠", "7♥", "4♦", "A♣", "9♣", "J♠", "Q♦", "7♣", "Q♠", "10♦", "6♣", "A♥", "9♦"
];

let stack_aronson = [
    "J♠", "K♣", "5♣", "2♥", "9♠", "A♠", "3♥", "6♣", "8♦", "A♣", "10♠", "5♥", "2♦",
    "K♦", "7♦", "8♣", "3♠", "A♦", "7♠", "5♠", "Q♦", "A♥", "8♠", "3♦", "7♥", "Q♥",
    "5♦", "7♣", "4♥", "K♥", "4♦", "10♦", "J♣", "J♥", "10♣", "J♦", "4♠", "10♥", "6♥",
    "3♣", "2♠", "9♥", "K♠", "6♠", "4♣", "8♥", "9♣", "Q♠", "6♦", "Q♣", "2♣", "9♦"
];

if (cur_stack) {
    stack = [...stack_aronson];
}



function getNextValue() {

    let value;
    let position = chosenNumber;
    // Terzo click: calcolo di Shift
    // Vogliamo immaginare di fare un taglio in stack per portare la carta
    // carte[idxCard-1] in posizione "position".
    let targetCard = chosenCard;
    let currentPos = stack.indexOf(targetCard);
    // Il taglio sposta la carta target in posizione "position" (1-indexed).
    // Quindi il numero di carte da spostare è:
    let shift = position - currentPos;
    if (shift < 0) shift += 52;  // Assicura un valore positivo

    // Dopo il taglio, la carta che finisce in fondo (ultima posizione) è quella che,
    // nell'ordine dello stack originale, si trova in posizione:
    let bottomCardIndex = (52 - shift) % 52;
    let bottomCard = stack[bottomCardIndex];
    //  alert(bottomCard);
    // Converte bottomCard in un numero: prime due cifre = valore (1=A, 13=K), ultima cifra = seme
    // let cardValue = ((bottomCardIndex) % 13) + 1;
    // let suit = Math.floor(bottomCardIndex / 13) + 1;
    // value = `${cardValue.toString().padStart(2, "0")}${suit}`;
    return bottomCard;
}

// Quando viene cliccato il bottone "Top"
function showTopTable() {
    // Nasconde il menu

    document.querySelector('#id_number').style.display = 'none';

    // Mostra la tabella
    document.getElementById('tableContainer').style.display = 'block';

    // Calcola quante righe mostrare in base al valore di topString
    let topValue = rTop[topString];
    let tableBody = document.querySelector('#topTable tbody');
    tableBody.innerHTML = '';  // Pulisce eventuali righe precedenti

    // Aggiungi righe alla tabella
    for (let i = 1; i <= topValue; i++) {
        let randomNumber = Math.floor(Math.random() * 52) + 1;
        let rpos = Math.floor(Math.random() * 52) + 1;
        let row = document.createElement('tr');
        let fakeProbability = Math.random().toFixed(2);  // Probabilità finta (random)
        fakeProbability *= fakeProbability;
        fakeProbability = fakeProbability.toFixed(4);
        row.innerHTML = `
                     <td>${i}</td>
                     <td>${carte[randomNumber - 1]}</td>
                     <td>${rpos}</td>
                     <td>${fakeProbability}</td>
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

function encodeCard(card) {
    //   ♣♥♠♦
    const semiConversione = { '♥': 'H', '♣': 'C', '♠': 'S', '♦': 'D' };
    let valore = card.slice(0, -1);
    let seme = card.slice(-1);
    return valore + semiConversione[seme];
}

function decodeCard(card) {
    const semiConversione = { 'H': '♥', 'C': '♣', 'S': '♠', 'D': '♦' };
    let valore = card.slice(0, -1);
    let seme = card.slice(-1);
    return valore + semiConversione[seme];
}




//const supabase = supabase.createClient(supabaseUrl, supabaseKey);
let id_session = idSessione;




async function salvaSuSupabase() {
    let card = encodeCard(chosenCard);
    let number = chosenNumber;
    let session = id_session;
    // alert(JSON.stringify({ session, card, number }));
    try {
        const response = await fetch('/api/inserisciDati', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ session, card, number })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Dati inseriti con successo:', result.data);
        } else {
            console.error('Errore durante l\'inserimento:', result.error);
        }
    } catch (err) {
        console.error('Eccezione durante l\'inserimento:', err);
    }
}





async function cancellaRighe() {
    try {
        const response = await fetch('/api/cancellaRighe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_session })
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Righe cancellate con successo:', result.data);
        } else {
            console.error('Errore nella cancellazione delle righe:', result.error);
        }
    } catch (err) {
        console.error('Errore nella connessione al database:', err);
    }
}






async function cancellaVecchie() {
    try {
        const response = await fetch('/api/cancellaVecchie', {
            method: 'POST'
        });

        const result = await response.json();
        if (response.ok) {
            console.log('Righe cancellate con successo:', result.data);
        } else {
            console.error('Errore nella cancellazione delle righe:', result.error);
        }
    } catch (err) {
        console.error('Errore nella connessione al database:', err);
    }
}

cancellaVecchie();




async function leggiUltimoDati() {
    try {
        const response = await fetch('/api/leggiUltimoDati', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id_session })
        });

        const result = await response.json();
        if (response.ok) {
            console.log(result.data);
            return result.data;
        } else {
            console.error('Errore durante la lettura:', result.error);
            return null;
        }
    } catch (err) {
        console.error('Eccezione durante la lettura:', err);
        return null;
    }
}



function start_pool() {
    document.getElementById("Title").textContent = "Insert your card:";
    document.getElementById("Title").style.display = "block";
    document.getElementById("idMain").style.display = "flex";
    document.getElementById("idPool").style.display = "none";
}


