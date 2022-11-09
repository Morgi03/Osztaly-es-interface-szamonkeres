"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Statue_1 = require("./Statue");
let artworks = [];
function ertekSzamolas() {
    let darab = document.getElementById('MuvekDB');
    let osszAr = document.getElementById('MuvekOsszAR');
    darab.textContent = artworks.length.toString();
    osszAr.textContent = artworks.map(e => e.price).reduce((a, b) => a + b, 0).toString();
}
function szoborEllenorzo(title, year, price, height) {
    let title_error = document.getElementById('title_error');
    let year_error = document.getElementById('year_error');
    let price_error = document.getElementById('price_error');
    let height_error = document.getElementById('height_error');
    title_error.textContent = "";
    year_error.textContent = "";
    price_error.textContent = "";
    height_error.textContent = "";
    let currentYear = new Date().getFullYear();
    let isOk = true;
    let regexEXPR = /^[A-Za-z ,]{1,}$/;
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
function setZeroifEmpty(val) {
    if (val == "") {
        val = "0";
    }
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', () => {
        let title = document.getElementById('title');
        let year = document.getElementById('year');
        let price = document.getElementById('price');
        let height = document.getElementById('height');
        let success = false;
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
            let szobor = new Statue_1.Statue(title.value, parseInt(year.value), parseInt(price.value), parseInt(height.value));
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
