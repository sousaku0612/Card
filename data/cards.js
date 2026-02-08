export const cardList = [
    {
        id: "test1",
        name: "特性・ワザ1つのテスト",
        hp: 140,
        type: "water",
        typeIcon: "💧",
        hasAbility: true,
        abName: "ひょうけつのまい",
        abText: "特性の表示テスト。バトル場のみで発動。",
        abLoc: "battle",
        attacks: [
            { cost: "💧💧", name: "ふぶき", dmg: "80", text: "ワザ1つ目の表示テスト。" }
        ],
        weakness: "⚡",
        retreat: "⚪⚪"
    },
    {
        id: "test2",
        name: "ワザ2つ・エネなしのテスト",
        hp: 60,
        type: "lightning",
        typeIcon: "⚡",
        hasAbility: false,
        attacks: [
            { cost: "", name: "じゅうでん", dmg: "0", text: "エネルギーなしワザの表示テスト。" },
            { cost: "⚡", name: "でんきショック", dmg: "20", text: "ワザ2つ目の表示テスト。" }
        ],
        weakness: "✊",
        retreat: "⚪"
    },
    {
        id: "test3",
        name: "にげる0・超タイプのテスト",
        hp: 50,
        type: "psychic",
        typeIcon: "👁️",
        hasAbility: false,
        attacks: [
            { cost: "👁️", name: "ねんりき", dmg: "20", text: "にげるコストが「0」になるかチェック。" }
        ],
        weakness: "🌙",
        retreat: "" // にげる0のテスト
    }
];
