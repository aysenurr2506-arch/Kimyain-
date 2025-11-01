const elements = [
    { name: "Sodyum", symbol: "Na" },
    { name: "Kalsiyum", symbol: "Ca" },
    { name: "Berilyum", symbol: "Be" },
    { name: "Karbon", symbol: "C" },
    { name: "Kükürt", symbol: "S" }
];

let selectedName = null;
let selectedSymbol = null;

function loadStage2() {
    const namesColumn = document.getElementById('names-column');
    const symbolsColumn = document.getElementById('symbols-column');
    namesColumn.innerHTML = '';
    symbolsColumn.innerHTML = '';

    // İsimler ve sembolleri karıştırıp ayrı dizilere alalım
    const shuffledNames = [...elements].sort(() => Math.random() - 0.5);
    const shuffledSymbols = [...elements].sort(() => Math.random() - 0.5);

    shuffledNames.forEach(el => {
        const item = document.createElement('div');
        item.textContent = el.name;
        item.classList.add('match-item', 'name-item');
        item.dataset.symbol = el.symbol; // Doğru eşleşmeyi tutuyoruz
        item.onclick = () => selectItem(item, 'name');
        namesColumn.appendChild(item);
    });

    shuffledSymbols.forEach(el => {
        const item = document.createElement('div');
        item.textContent = el.symbol;
        item.classList.add('match-item', 'symbol-item');
        item.dataset.name = el.name; // Doğru eşleşmeyi tutuyoruz
        item.onclick = () => selectItem(item, 'symbol');
        symbolsColumn.appendChild(item);
    });
}

function selectItem(item, type) {
    // Önceki seçimi sıfırla
    if (type === 'name') {
        if (selectedName) selectedName.classList.remove('selected');
        selectedName = item;
    } else {
        if (selectedSymbol) selectedSymbol.classList.remove('selected');
        selectedSymbol = item;
    }
    item.classList.add('selected');

    // Eşleşme kontrolü (iki seçim de yapıldıysa)
    if (selectedName && selectedSymbol) {
        if (selectedName.dataset.symbol === selectedSymbol.textContent) {
            // Doğru Eşleşme
            selectedName.classList.remove('selected');
            selectedSymbol.classList.remove('selected');
            selectedName.classList.add('matched', 'correct');
            selectedSymbol.classList.add('matched', 'correct');
            document.getElementById('matching-feedback').textContent = "Doğru eşleşme!";
            document.getElementById('matching-feedback').style.color = 'green';
        } else {
            // Yanlış Eşleşme
            document.getElementById('matching-feedback').textContent = "Yanlış eşleşme, tekrar deneyin.";
            document.getElementById('matching-feedback').style.color = 'red';
        }

        // Seçimleri sıfırla
        selectedName = null;
        selectedSymbol = null;
        setTimeout(() => document.getElementById('matching-feedback').textContent = "", 1500);
    }
}

// loadStage2(); // Aşama 2'yi başlatmak için bu fonksiyon çağrılmalı
let currentElement3 = null;

function loadStage3() {
    const feedback = document.getElementById('guess-feedback-3');
    const input = document.getElementById('symbol-input-3');
    
    // Rastgele bir element seç
    const randomIndex = Math.floor(Math.random() * elements.length);
    currentElement3 = elements[randomIndex];
    
    document.getElementById('element-name-3').textContent = currentElement3.name;
    
    // Formu temizle
    input.value = '';
    input.style.borderColor = '';
    feedback.textContent = '';
}

function checkSymbolGuess() {
    const userInput = document.getElementById('symbol-input-3').value.trim();
    const feedback = document.getElementById('guess-feedback-3');
    const input = document.getElementById('symbol-input-3');

    if (!userInput || !currentElement3) {
        feedback.textContent = "Lütfen bir sembol girin.";
        feedback.style.color = 'orange';
        return;
    }

    if (userInput.toLowerCase() === currentElement3.symbol.toLowerCase()) {
        feedback.textContent = "Tebrikler! Doğru bildiniz: " + currentElement3.symbol;
        feedback.style.color = 'green';
        input.style.borderColor = 'green';
        // 3 saniye sonra yeni element yükle
        setTimeout(loadStage3, 3000); 
    } else {
        feedback.textContent = `Yanlış. Doğru cevap: ${currentElement3.symbol} (Tekrar deneyin)`;
        feedback.style.color = 'red';
        input.style.borderColor = 'red';
    }
}

// loadStage3(); // Aşama 3'ü başlatmak için bu fonksiyon çağrılmalı
let currentElement4 = null;

function loadStage4() {
    const feedback = document.getElementById('guess-feedback-4');
    const input = document.getElementById('name-input-4');
    
    // Rastgele bir element seç
    const randomIndex = Math.floor(Math.random() * elements.length);
    currentElement4 = elements[randomIndex];
    
    document.getElementById('element-symbol-4').textContent = currentElement4.symbol;
    
    // Formu temizle
    input.value = '';
    input.style.borderColor = '';
    feedback.textContent = '';
}

function checkNameGuess() {
    // Kullanıcının Türkçe ismi tam ve doğru yazması beklenir (büyük/küçük harf fark etmez)
    const userInput = document.getElementById('name-input-4').value.trim();
    const feedback = document.getElementById('guess-feedback-4');
    const input = document.getElementById('name-input-4');

    if (!userInput || !currentElement4) {
        feedback.textContent = "Lütfen bir element adı girin.";
        feedback.style.color = 'orange';
        return;
    }
    
    if (userInput.toLowerCase() === currentElement4.name.toLowerCase()) {
        feedback.textContent = "Tebrikler! Doğru bildiniz: " + currentElement4.name;
        feedback.style.color = 'green';
        input.style.borderColor = 'green';
        // 3 saniye sonra yeni element yükle
        setTimeout(loadStage4, 3000); 
    } else {
        feedback.textContent = `Yanlış. Doğru cevap: ${currentElement4.name} (Tekrar deneyin)`;
        feedback.style.color = 'red';
        input.style.borderColor = 'red';
    }
}

// loadStage4(); // Aşama 4'ü başlatmak için bu fonksiyon çağrılmalı
