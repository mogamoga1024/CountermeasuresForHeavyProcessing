
const elMarquee = document.querySelector(".marquee");
const elMessage = document.querySelector("#message");
const elClearBtn = document.querySelector("#clear-btn");
const elBtn1 = document.querySelector("#btn1");
const elBtn2 = document.querySelector("#btn2");
const elBtn3 = document.querySelector("#btn3");
const elBtn4 = document.querySelector("#btn4");

const max = 9999999999;
elMarquee.innerText = `1から${max}までの和を求めるよ～`;

function calc(max) {
    let sum = 0;
    for (let i = 1; i <= max; i++) {
        sum += i;
    }
    elMessage.style.display = "";
    elClearBtn.style.display = "";
    elMessage.innerText = `答えは「${sum}」`;
}

const canClick = (function() {
    let _canClick = true;
    let timer = undefined;
    return function(val = undefined) {
        if (val === undefined) {
            return _canClick;
        }
        if (val) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                elBtn1.disabled = !val;
                elBtn2.disabled = !val;
                elBtn3.disabled = !val;
                elBtn4.disabled = !val;
                _canClick = val;
            }, 1000);
        }
        else {
            elBtn1.disabled = !val;
            elBtn2.disabled = !val;
            elBtn3.disabled = !val;
            elBtn4.disabled = !val;
            _canClick = val;
        }
    }
})();

// elClearBtn

elClearBtn.onclick = function() {
    elMessage.style.display = "none";
    elClearBtn.style.display = "none";
};

// elBtn1

elBtn1.onclick = function() {
    if (!canClick()) return;
    canClick(false);
    calc(max);
    canClick(true);
};

// elBtn2

const worker = new Worker("worker.js");
worker.onmessage = function(e) {
    elMessage.style.display = "";
    elClearBtn.style.display = "none";
    if (e.data.progressRate < 100) {
        elMessage.innerText = `計算中… ${e.data.progressRate}%`;
    }
    else {
        elMessage.innerText = `答えは「${e.data.sum}」`;
        elClearBtn.style.display = "";
        canClick(true);
    }
};

elBtn2.onclick = function() {
    if (!canClick()) return;
    canClick(false);
    worker.postMessage(max);
};

// elBtn3

elBtn3.onclick = function() {
    if (!canClick()) return;
    canClick(false);
    setTimeout(() => {
        calc(max);
        canClick(true);
    }, 1);
};

// elBtn4

function asyncCalc(max) {
    return new Promise(resolve => {
        calc(max);
        resolve();
        canClick(true);
    });
}

elBtn4.onclick = function() {
    if (!canClick()) return;
    canClick(false);
    asyncCalc(max);
};
