// Temel Element Verileri (Ad: Sembol)
const elements = {
    "Hidrojen": "H", "Helyum": "He", "Lityum": "Li", "Berilyum": "Be", "Bor": "B",
    "Karbon": "C", "Azot": "N", "Oksijen": "O", "Flor": "F", "Neon": "Ne",
    "Sodyum": "Na", "Magnezyum": "Mg", "Alüminyum": "Al", "Silisyum": "Si",
    "Fosfor": "P", "Kükürt": "S", "Klor": "Cl", "Argon": "Ar", "Potasyum": "K",
    "Kalsiyum": "Ca"
};

const elementNames = Object.keys(elements);
const elementSymbols = Object.values(elements);

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

let selectedName = null;
let selectedSymbol = null;
let nameSymbolMap = new Map(); 

document.addEventListener('DOMContentLoaded', () => {
    // HTML aşamalarını ana içeriğe ekle
    document.getElementById('content').innerHTML = `
        <div id="stage-2" class="stage">
            <h2>2. Aşama: Elementleri Eşleştirme</h2>
            <p>Element adları ve sembolleri arasındaki doğru eşleştirmeyi bulun.</p>
            <div class="matching-container">
                <div id="names-column" class="column"></div>
                <div id="symbols-column" class="column"></div>
            </div>
            <button onclick="checkMatching()">Eşleştirmeyi Kontrol Et</button>
            <p id="matching-feedback"></p>
        </div>
        <hr>
        <div id="stage-3" class="stage">
            <h2>3. Aşama: Ben bir element isem sembolüm kim?</h2>
            <p>Aşağıdaki elementin sembolünü giriniz:</p>
            <strong id="element-name-3"></strong>
            <input type="text" id="symbol-input-3" placeholder="Element Sembolü">
            <button onclick="checkSymbolGuess()">Kontrol Et</button>
            <p id="guess-feedback-3"></p>
            <button onclick="loadStage3()">Yeni Element</button>
        </div>
        <hr>
        <div id="stage-4" class="stage">
            <h2>4. Aşama: Ben bir sembol isem elementim kim?</h2>
            <p>Aşağıdaki sembolün ait olduğu elementi giriniz:</p>
            <strong id="element-symbol-4"></strong>
            <input type="text" id="name-input-4" placeholder="Element Adı">
            <button onclick="checkNameGuess()">Kontrol Et</button>
            <p id="guess-feedback-4"></p>
            <button onclick="loadStage4()">Yeni Sembol</button>
        </div>
    `;
    loadStage2();
    loadStage3();
    loadStage4();
});

// --- 2. Aşama: Eşleştirme Fonksiyonları ---
function loadStage2() {
    nameSymbolMap.clear();
    const namesColumn = document.getElementById('names-column');
    const symbolsColumn = document.getElementById('symbols-column');
    namesColumn.innerHTML = '';
    symbolsColumn.innerHTML = '';

    let allNames = shuffle([...elementNames]);
    const selectedNames = allNames.slice(0, 5);
    const selectedSymbols = selectedNames.map(name => elements[name]);

    let shuffledSymbols = shuffle([...selectedSymbols]);

    selectedNames.forEach(name => {
        const item = document.createElement('div');
        item.className = 'matching-item name-item';
        item.innerText = name;
        item.dataset.name = name;
        item.onclick = () => selectItem(item, 'name');
        namesColumn.appendChild(item);
    });

    shuffledSymbols.forEach(symbol => {
        const item = document.createElement('div');
        item.className = 'matching-item symbol-item';
        item.innerText = symbol;
        item.dataset.symbol = symbol;
        item.onclick = () => selectItem(item, 'symbol');
        symbolsColumn.appendChild(item);
    });

    document.getElementById('matching-feedback').innerText = 'Eşleştirme bekliyor...';
    selectedName = null;
    selectedSymbol = null;
}

function selectItem(item, type) {
    document.querySelectorAll('.matching-item.selected').forEach(el => el.classList.remove('selected'));

    item.classList.add('selected');

    if (type === 'name') {
        selectedName = item;
        selectedSymbol = null;
    } else {
        selectedSymbol = item;
        selectedName = null;
    }

    if (selectedName && selectedSymbol) {
        attemptMatch(selectedName, selectedSymbol);
    }
}

function attemptMatch(nameItem, symbolItem) {
    const name = nameItem.dataset.name;
    const symbol = symbolItem.dataset.symbol;
    const feedback = document.getElementById('matching-feedback');

    if (elements[name] === symbol) {
        nameSymbolMap.set(name, symbol);
        nameItem.classList.add('matched');
        symbolItem.classList.add('matched');
        nameItem.onclick = null;
        symbolItem.onclick = null;
        feedback.innerText = `${name} (${symbol}): Doğru eşleşme! 🎉`;

    } else {
        nameItem.classList.add('incorrect');
        symbolItem.classList.add('incorrect');
        feedback.innerText = `${name} ve ${symbol}: Yanlış eşleşme. Tekrar deneyin. 😞`;
        setTimeout(() => {
            nameItem.classList.remove('incorrect');
            symbolItem.classList.remove('incorrect');
            feedback.innerText = 'Eşleştirme bekliyor...';
        }, 1000);
    }

    selectedName.classList.remove('selected');
    selectedSymbol.classList.remove('selected');
    selectedName = null;
    selectedSymbol = null;
}

function checkMatching() {
    const totalItems = document.querySelectorAll('#names-column .matching-item').length;
    const matchedCount = nameSymbolMap.size;
    const feedback = document.getElementById('matching-feedback');

    if (matchedCount === totalItems) {
        feedback.innerText = `Tebrikler! Tüm ${totalItems} elementin eşleştirmesini doğru yaptınız! 🥳`;
    } else {
        feedback.innerText = `Henüz ${totalItems} elementten ${matchedCount} tanesini eşleştirdiniz. Eksik olanları bulun! 🤔`;
    }
}

// --- 3. Aşama: Element Adı -> Sembol Fonksiyonları ---
let currentElementName3 = '';

function loadStage3() {
    currentElementName3 = shuffle([...elementNames])[0];
    document.getElementById('element-name-3').innerText = currentElementName3;
    document.getElementById('symbol-input-3').value = '';
    document.getElementById('guess-feedback-3').innerText = '';
}

function checkSymbolGuess() {
    const input = document.getElementById('symbol-input-3');
    const guess = input.value.trim();
    const correctSymbol = elements[currentElementName3];
    const feedback = document.getElementById('guess-feedback-3');

    if (guess.toUpperCase() === correctSymbol.toUpperCase() && guess.length === correctSymbol.length) {
        feedback.innerHTML = `**Doğru!** ${currentElementName3}'ün sembolü **${correctSymbol}**'dur. 🎉`;
    } else {
        feedback.innerHTML = `**Yanlış.** Tahminin: "${guess}". Tekrar deneyin. 😞`;
    }
}

// --- 4. Aşama: Sembol -> Element Adı Fonksiyonları ---
let currentElementSymbol4 = '';

function loadStage4() {
    currentElementSymbol4 = shuffle([...elementSymbols])[0];
    document.getElementById('element-symbol-4').innerText = currentElementSymbol4;
    document.getElementById('name-input-4').value = '';
    document.getElementById('guess-feedback-4').innerText = '';
}

function checkNameGuess() {
    const input = document.getElementById('name-input-4');
    const guess = input.value.trim();
    
    const correctName = Object.keys(elements).find(key => elements[key] === currentElementSymbol4);
    
    const feedback = document.getElementById('guess-feedback-4');

    if (guess.toLowerCase() === correctName.toLowerCase()) {
        feedback.innerHTML = `**Doğru!** **${currentElementSymbol4}** sembolü **${correctName}** elementine aittir. 🥳`;
    } else {
        feedback.innerHTML = `**Yanlış.** Tahminin: "${guess}". Tekrar deneyin. 😟`;
    }
}
