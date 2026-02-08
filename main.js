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
    console.log("Card list loaded: ", cardList); // ブラウザのコンソールでデータを確認用
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
    frame.className = 'card-detail frame-' + (data.type || 'default');

    document.getElementById('det-name').innerText = data.name;
    document.getElementById('det-hp').innerText = data.hp;
    document.getElementById('det-weakness').innerText = (data.weakness || "-") + " ×2";
    
    // にげるコストの点検表示
    document.getElementById('det-retreat').innerText = data.retreat === "" ? "0" : data.retreat;

    // 特性表示
    const abBox = document.getElementById('det-ability-box');
    if(data.hasAbility) {
        abBox.style.display = "block";
        document.getElementById('det-ab-name').innerText = data.abName;
        document.getElementById('det-ab-text').innerText = data.abText;
        const locEl = document.getElementById('det-ab-loc');
        locEl.innerText = data.abLoc === "battle" ? "●バトル場のみ" : "●どこでも可";
        locEl.className = data.abLoc === "battle" ? "loc-battle" : "loc-both";
    } else {
        abBox.style.display = "none";
    }

    // ワザ表示ループの点検
    const atkContainer = document.getElementById('det-attacks-container');
    atkContainer.innerHTML = '';
    data.attacks.forEach(atk => {
        const div = document.createElement('div');
        div.className = 'det-atk-row';
        const costDisp = atk.cost === "" ? "<small style='color:#888'>なし</small>" : atk.cost;
        const dmgDisp = atk.dmg === "0" ? "-" : atk.dmg;
        
        div.innerHTML = `
            <div class="atk-main">
                <span class="det-energy">${costDisp}</span>
                <span class="det-atk-name">${atk.name}</span>
                <span class="det-dmg">${dmgDisp}</span>
            </div>
            <div class="det-atk-text">${atk.text}</div>
        `;
        atkContainer.appendChild(div);
    });

    modal.classList.add('modal-show');
}

// --- 配置ボタン（動作確認用） ---
document.getElementById('btn-play-battle').onclick = () => {
    const card = cardList[selectedIndex];
    myBattle.innerHTML = `<div class="mini-card"><b>${card.name}</b><br>${card.typeIcon} HP:${card.hp}</div>`;
    modal.classList.remove('modal-show');
};

document.getElementById('btn-play-bench').onclick = () => {
    const card = cardList[selectedIndex];
    for (let slot of myBenchSlots) {
        if (slot.innerHTML === "") {
            slot.innerHTML = `<div class="mini-card"><b>${card.name}</b><br>${card.typeIcon} HP:${card.hp}</div>`;
            break;
        }
    }
    modal.classList.remove('modal-show');
};

document.getElementById('close-btn').onclick = () => modal.classList.remove('modal-show');

init();
