'use strict'
import { logo, title } from "./fetchApi.js"
import slides from "./slides.js"

let k, wrapper, words, numbers, audio

const lastSlide = () => {
    setTimeout(() => wrapper.innerHTML = `${title}` + `${logo}`, 500);
}
const nextSlide = () => {
    if ((k < slides.length)) {
        setPage();
        ++k;
        setTimeout(nextSlide, 5000);
    } else {
        lastSlide();
        setTimeout(() => wrapper.appendChild(resetButton()), 13000);
        k = 0
    };
};
const getOneLine = (i) => {
    const oneLine = document.createElement('h1');
    oneLine.style.fontSize = (k > 2 && i > 3 ? "2.5em" : "3.5em");
    return oneLine
}
const getOneChar = (char, index) => {
    const oneChar = document.createElement('span');
    oneChar.style.color = index % 2 == 0 ? "#f00" : null;
    oneChar.classList.add('hidden');
    oneChar.innerHTML = char;
    return oneChar
}
const lettersAnim = (oneChar, index, max) => {
    setTimeout(() => {
        oneChar.classList.remove('hidden');
        setTimeout(() => {
            oneChar.classList.add('hidden');
        }, max);
    }, index * 160);
}
const getMax = (numbers) => {
    return Math.max(...numbers) * 300 + 500;
}
const setPage = () => {
    const slide = slides[k]
    wrapper.innerHTML = `<h1 id="header">${slide.header}</h1>`
    words = [];
    numbers = [];
    slide.text.forEach((word, i) => {
        words.push([...word]);
        numbers.push([word.length])
        const oneLine = getOneLine(i);
        wrapper.appendChild(oneLine);
        words[i].map((char, index) => {
            const oneChar = getOneChar(char, index)
            oneLine.appendChild(oneChar);
            lettersAnim(oneChar, index, getMax(numbers))
        });
    })
}
const resetButton = () => {
    const elem = document.createElement("h1");
    elem.innerText = "S T A R T"
    elem.id = "button"
    elem.onclick = () => {
        audio.play();
        setTimeout(nextSlide, 600)
    }
    return elem
}
const initSound = () => {
    let url = '/assets/audio/loop_ziu5he.wav';
    audio = document.querySelector('audio');
    audio.src = url;
    audio.style.oneLine = "none";
    audio.loop = true;
    audio.controls = false;
    audio.oncanplay = () => {
        k = 0;
        wrapper = document.getElementById('root');
        wrapper.appendChild(resetButton());
    };
}
const init = () => {
    initSound();
}
init()
