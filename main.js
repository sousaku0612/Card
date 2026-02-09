import { cardList } from './data/cards.js';

const handEl = document.getElementById('hand');
const modal = document.getElementById('modal');
const myBattle = document.getElementById('my-battle');
const myBenchSlots = [
    document.getElementById('bench-0'),
    document.getElementById('bench-1'),
    document.getElementById('bench-2')
];

let selectedIndex = null;

function init() {
    renderHand();
}

function renderHand() {
    handEl.innerHTML = '';
    cardList.forEach((card, index) => {
        const btn = document.createElement('div');
        btn.className = 'mini-card';
        btn.innerHTML = `
            <div style="font-weight:bold; height:30px; overflow:hidden;">${card.name}</div>
            <div style="font-size:24px; text-align:center;">${card.typeIcon}</div>
            <div style="text-align:right; font-weight:bold;">HP:${card.hp}</div>
        `;
        btn.onclick = () => showDetail(index);
        handEl.appendChild(btn);
    });
}

function showDetail(index) {
    selectedIndex = index;
    const data = cardList[index];
    
    const frame = document.getElementById('detail-frame');
    frame.className = 'card-detail frame-' + data.type;

    document.getElementById('det-name').innerText = data.name;
    document.getElementById('det-hp').innerText = data.hp;
    document.getElementById('det-weakness').innerText = (data.weakness || "-") + "×2";
    document.getElementById('det-retreat').innerText = data.retreat === "" ? "0" : data.retreat;

    const abBox = document.getElementById('det-ability-box');
    if(data.hasAbility) {
        abBox.style.display = "block";
        document.getElementById('det-ab-name').innerText = data.abName;
        document.getElementById('det-ab-text').innerText = data.abText;
        document.getElementById('det-ab-loc').innerText = data.abLoc === "battle" ? "●バトル場" : "●ベンチ可";
    } else { abBox.style.display = "none"; }

    const atkContainer = document.getElementById('det-attacks-container');
    atkContainer.innerHTML = '';
    data.attacks.forEach(atk => {
        const div = document.createElement('div');
        div.className = 'det-atk-row';
        div.innerHTML = `
            <div class="atk-main">
                <span class="det-energy">${atk.cost || "なし"}</span>
                <span class="det-atk-name">${atk.name}</span>
                <span>${atk.dmg !== "0" ? atk.dmg : "-"}</span>
            </div>
            <div class="det-atk-text">${atk.text}</div>
        `;
        atkContainer.appendChild(div);
    });

    modal.classList.add('modal-show');
}

// バトル場へ
document.getElementById('btn-play-battle').onclick = () => {
    const card = cardList[selectedIndex];
    myBattle.innerHTML = `<div class="mini-card" style="flex:1; height:100%; margin:0;"><b>${card.name}</b><br>${card.typeIcon}</div>`;
    modal.classList.remove('modal-show');
};

// ベンチへ
document.getElementById('btn-play-bench').onclick = () => {
    const card = cardList[selectedIndex];
    for (let slot of myBenchSlots) {
        if (slot.innerHTML === "") {
            slot.innerHTML = `<div class="mini-card" style="flex:1; height:100%; margin:0;"><b>${card.name}</b><br>${card.typeIcon}</div>`;
            break;
        }
    }
    modal.classList.remove('modal-show');
};

document.getElementById('close-btn').onclick = () => modal.classList.remove('modal-show');

init();
