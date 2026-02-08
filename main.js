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
        const btn = document.createElement('button');
        btn.className = 'mini-card';
        btn.innerHTML = `<b>${card.name}</b><br>${card.typeIcon} HP:${card.hp}`;
        btn.onclick = () => showDetail(index);
        handEl.appendChild(btn);
    });
}

function showDetail(index) {
    selectedIndex = index;
    const data = cardList[index];
    
    // 枠線の色変更
    const frame = document.getElementById('detail-frame');
    frame.className = 'card-detail frame-' + data.type;

    document.getElementById('det-name').innerText = data.name;
    document.getElementById('det-hp').innerText = data.hp;
    document.getElementById('det-weakness').innerText = data.weakness + "×2";
    document.getElementById('det-retreat').innerText = data.retreat || "0";

    const abBox = document.getElementById('det-ability-box');
    if(data.hasAbility) {
        abBox.style.display = "block";
        document.getElementById('det-ab-name').innerText = data.abName;
        document.getElementById('det-ab-text').innerText = data.abText;
    } else { abBox.style.display = "none"; }

    const atkContainer = document.getElementById('det-attacks-container');
    atkContainer.innerHTML = '';
    data.attacks.forEach(atk => {
        const div = document.createElement('div');
        div.className = 'det-atk-row';
        div.innerHTML = `<div class="atk-main"><span class="det-energy">${atk.cost || "なし"}</span><span class="det-atk-name">${atk.name}</span><span>${atk.dmg}</span></div><div class="det-atk-text">${atk.text}</div>`;
        atkContainer.appendChild(div);
    });

    modal.classList.add('modal-show');
}

// バトル場に出す
document.getElementById('btn-play-battle').onclick = () => {
    const card = cardList[selectedIndex];
    myBattle.innerHTML = `<div class="mini-card"><b>${card.name}</b><br>HP:${card.hp}</div>`;
    modal.classList.remove('modal-show');
};

// ベンチに出す
document.getElementById('btn-play-bench').onclick = () => {
    const card = cardList[selectedIndex];
    for (let slot of myBenchSlots) {
        if (slot.innerHTML === "") {
            slot.innerHTML = `<div class="mini-card"><b>${card.name}</b><br>HP:${card.hp}</div>`;
            break;
        }
    }
    modal.classList.remove('modal-show');
};

document.getElementById('close-btn').onclick = () => modal.classList.remove('modal-show');

init();
    const atkContainer = document.getElementById('det-attacks-container');
    atkContainer.innerHTML = '';
    data.attacks.forEach(atk => {
        const costDisplay = atk.cost === "" ? "<small style='color:#999'>なし</small>" : atk.cost;
        const atkRow = document.createElement('div');
        atkRow.className = 'det-atk-row';
        atkRow.innerHTML = `
            <div class="atk-main">
                <span class="det-energy">${costDisplay}</span>
                <span class="det-atk-name">${atk.name}</span>
                <span class="det-dmg">${atk.dmg === "0" ? "-" : atk.dmg}</span>
            </div>
            <div class="det-atk-text">${atk.text}</div>
        `;
        atkContainer.appendChild(atkRow);
    });

    modal.classList.add('modal-show');
}

document.getElementById('close-btn').onclick = () => {
    modal.classList.remove('modal-show');
};

init();
