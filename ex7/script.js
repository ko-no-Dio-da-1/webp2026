var container = document.getElementById('container');

// 產生亂數字串（b = true → 隨機 1~x 個；b = false → 固定 x 個）
function add_new_chars(x, b = true) {
    var n = b ? Math.floor(Math.random() * x) + 1 : x;
    var str = '';
    for (let i = 0; i < n; i++) {
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a~z
    }
    return str;
}

// 連續打錯計數器
var counter = 0;

// 頁面載入後先產生 3 個亂數字母
window.onload = function() {
    container.textContent = add_new_chars(3);
};

// 監聽鍵盤輸入
window.addEventListener("keyup", function(e) {
    // 取得目前第一個字母
    var firstone = container.textContent.substring(0, 1);

    if (e.key === firstone) {
        // ✅ 打對 → 消除第一個字母
        container.textContent = container.textContent.substring(1);
        counter = 0;                    // ← 重要！打對就重置連續錯誤計數
    } 
    else {
        // ❌ 打錯 → 先加上打錯的字母
        container.textContent += e.key;

        // 連續打錯第 3 次（counter 從 0 開始，++ 後 >= 2 就是第 3 次）
        if (counter++ >= 2) {
            container.textContent += add_new_chars(3, false); // 額外增加 3 個亂數字母
            counter = 0;
        }
    }

    // 每次輸入結束後，都再增加原本的亂數字串（1~3 個）
    container.textContent += add_new_chars(3);
});