import { cardList } from './data/cards.js';

const handEl = document.getElementById('hand');
const modal = document.getElementById('modal');

function init() {
    cardList.forEach((card, index) => {
        const div = document.createElement('button');
        div.className = 'mini-card';
        div.innerHTML = `<b>${card.name}</b><br>HP:${card.hp}`;
        div.onclick = () => showDetail(index);
        handEl.appendChild(div);
    });
}

function showDetail(index) {
    const data = cardList[index];
    document.getElementById('det-name').innerText = data.name;
    document.getElementById('det-hp').innerText = data.hp;
    document.getElementById('det-weakness').innerText = data.weakness + " ×2";
    document.getElementById('det-retreat').innerText = data.retreat === "" ? "なし" : data.retreat;

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

    // ワザ表示ループ
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
