// Pobieranie wyników egzaminów
const egzaminPolski = document.getElementById('wynik-e8-polski') as HTMLInputElement;
const egzaminMatma = document.getElementById('wynik-e8-matma') as HTMLInputElement;
const egzaminAngol = document.getElementById('wynik-e8-angol') as HTMLInputElement;
const nieZnamWynikow = document.getElementById('nie-znam-wynikow') as HTMLInputElement;
// Pobieranie punktów za oceny
const ocenaPolski = document.getElementById('ocena-polski') as HTMLSelectElement;
const ocenaMatma = document.getElementById('ocena-matma') as HTMLSelectElement;
const ocenaP1 = document.getElementById('ocena-p1') as HTMLSelectElement;
const ocenaP2 = document.getElementById('ocena-p2') as HTMLSelectElement;
// Pobieranie wyników osiągnięć dodatkowych
const checkWolontariat = document.getElementById('wolontariat') as HTMLInputElement;
const checkPasek = document.getElementById('pasek') as HTMLInputElement;
const checkFinalista = document.getElementById('finalista') as HTMLInputElement;
const checkLaureat = document.getElementById('laureat') as HTMLInputElement;
const dodPunkty = document.getElementById('dod') as HTMLInputElement;
// Pobieranie formularza oraz pola wynikowego
const formularz = document.querySelector('form');
const wynikPrint = document.getElementById('wynik_print') as HTMLElement;
const analizaPrint = document.getElementById('analiza_print') as HTMLElement;

// Funkcja obsługi niewiedzy wyników egzaminacyjnych
function brakWynikow() {
    const czyZablokowane = nieZnamWynikow.checked;
    egzaminPolski.disabled = czyZablokowane;
    egzaminMatma.disabled = czyZablokowane;
    egzaminAngol.disabled = czyZablokowane;
    if (czyZablokowane) {
        egzaminPolski.value = "";
        egzaminMatma.value = "";
        egzaminAngol.value = "";
    }
}

// Funkcja obliczania wyników z egzaminów
function obliczEgzaminy(): number {
    if (nieZnamWynikow.checked) {
        return 0;
    }
    else {
        const p = Number(egzaminPolski.value)*0.35;
        const m = Number(egzaminMatma.value)*0.35;
        const a = Number(egzaminAngol.value)*0.3;
        return p+m+a;
    };
};
// Funkcja liczenia punktów za oceny
function obliczOceny(): number {
    const pol = Number(ocenaPolski.value);
    const mat = Number(ocenaMatma.value);
    const prz1 = Number(ocenaP1.value);
    const prz2 = Number(ocenaP2.value);
    return pol+mat+prz1+prz2;
};
function obliczDodatkowe(): number {
    let suma = 0;
    if (checkWolontariat.checked) suma += 3;
    if (checkPasek.checked) suma += 7;
    if (checkFinalista.checked) suma += 10;
    const i = Number(dodPunkty.value);
    suma += i;
    if (suma > 28) {
        return 28;
    }
    else {
        return suma;
    };
};
// Funkcja dodatkowa - ocena liczby punktów
function sprawdzSzanse(punkty: number): string {
    if (punkty >= 160) return "Masz szanse na najlepsze licea w województwie (tzw. 'Topki').";
    if (punkty >= 130) return "Masz solidny wynik, większość dobrych liceów stoi otworem.";
    if (punkty >= 100) return "Masz bezpieczny wynik do większości techników i średnich liceów.";
    return "Celuj w mniej oblegane kierunki lub szkoły branżowe.";
}
//Funkcja podsumowująca
function podsumujWszystko() {
    if (checkLaureat.checked) {
        wynikPrint.innerText = "Gratulacje zdobycia tytułu laureata! Dzięki temu wchodzisz poza kolejnością tam gdzie chcesz!";
        wynikPrint.style.color = 'gold';
        return;
    };
    const sumaOstateczna = obliczEgzaminy() + obliczOceny() + obliczDodatkowe()
    if (nieZnamWynikow.checked) {
        wynikPrint.innerText = `Powodzenia na ezgaminach! Obecnie twój wynik to ${sumaOstateczna.toFixed(2)} punktów!`;
        wynikPrint.style.color = ''
        analizaPrint.innerText = ''
    }
    else {
        wynikPrint.innerText = `Twój wynik: ${sumaOstateczna.toFixed(2)} punktów!`
        wynikPrint.style.color = '';
        const prog = sprawdzSzanse(sumaOstateczna)
        analizaPrint.innerText = prog
        if (sumaOstateczna >= 130) analizaPrint.style.color = 'green'
        else if (sumaOstateczna >=100) analizaPrint.style.color = 'orange'
        else analizaPrint.style.color = 'red'
    };
};

// Mechanizm całości
formularz?.addEventListener('submit', (e) => {
    e.preventDefault();
    podsumujWszystko();
});
// Obsługa cieniowania pól egzaminacyjnych w przypadku niewiedzy o wynikach
nieZnamWynikow.addEventListener('change', brakWynikow);