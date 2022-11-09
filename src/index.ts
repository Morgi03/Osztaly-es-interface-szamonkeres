import { Artwork } from "./Artwork";
import { Statue } from "./Statue";

let artworks: Artwork[] = [];

function ertekSzamolas(): void {
    let darab = document.getElementById('MuvekDB') as HTMLSpanElement;
    let osszAr = document.getElementById('MuvekOsszAR') as HTMLSpanElement;
    darab.textContent = artworks.length.toString();
    osszAr.textContent = artworks.map(e => e.price).reduce((a, b) => a + b, 0).toString();
}

function szoborEllenorzo(title: string, year: number, price: number, height: number): boolean {
    let title_error = document.getElementById('title_error') as HTMLLabelElement;
    let year_error = document.getElementById('year_error') as HTMLLabelElement;
    let price_error = document.getElementById('price_error') as HTMLLabelElement;
    let height_error = document.getElementById('height_error') as HTMLLabelElement;
    title_error.textContent = "";
    year_error.textContent = "";
    price_error.textContent = "";
    height_error.textContent = "";

    let currentYear: number = new Date().getFullYear();
    let isOk: boolean = true;
    let regexEXPR: RegExp = /^[A-Za-z ,]{1,}$/

    if (!regexEXPR.test(title)) {
        isOk = false;
        title_error.textContent = "A formátumnak nem megfelelő szobornevet adott meg!";
    }
    if (year > currentYear) {
        isOk = false;
        year_error.textContent = "A formátumnak nem megfelelő évszámot adott meg!";
    }
    if (price < 1) {
        isOk = false;
        price_error.textContent = "Az árnak minimum 1 forintnak kell lennie!";
    }
    if (height < 10) {
        isOk = false;
        height_error.textContent = "A magasságnak minimum 10 centiméternek kell lennie!";
    }

    return isOk;
}


function setZeroifEmpty(val: string): void {
    if (val == "") {
        val = "0";
    }
}


document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('submit')!.addEventListener('click', () => {
        let title = document.getElementById('title') as HTMLInputElement;
        let year = document.getElementById('year') as HTMLInputElement;
        let price = document.getElementById('price') as HTMLInputElement;
        let height = document.getElementById('height') as HTMLInputElement;
        let success: boolean = false;
        if (price.value == "") {
            price.value = '0';
        }
        if (year.value == "") {
            year.value = '0';
        }
        if (height.value == "") {
            height.value = '0';
        }



        if (szoborEllenorzo(title.value, parseInt(year.value), parseInt(price.value), parseInt(height.value))) {
            let szobor: Statue = new Statue(title.value, parseInt(year.value), parseInt(price.value), parseInt(height.value));
            artworks.push(szobor);
            success = true;
        }
        if (success) {
            ertekSzamolas();
            title.value = "";
            year.value = "";
            price.value = "";
            height.value = "";
        }



        if (price.value == '0') {
            price.value = "";
        }
        if (year.value == '0') {
            year.value = "";
        }
        if (height.value == '0') {
            height.value = "";
        }
     
    });
});