// 隨機產生 min~max 個 a-z 小寫字母
function randomChars(min, max) {
    const length = Math.floor(Math.random() * (max - min + 1)) + min;
    let result = '';
    for (let i = 0; i < length; i++) {
        result += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // a-z
    }
    return result;
}

// 頁面載入時初始化（符合講義 point 2）
window.onload = function () {
    const container = document.getElementById('container');
    
    // 初始產生 0~2 個隨機字母
    container.textContent = randomChars(0, 2);
    
    // 讓容器自動獲得焦點，可以直接打字
    container.focus();
};

// 每次按鍵處理（符合講義 point 3、4）
window.addEventListener('keyup', function (e) {
    const container = document.getElementById('container');
    let current = container.textContent;

    if (e.key === 'Escape') {
        container.textContent = '';
    } 
    else if (e.key === 'Backspace') {
        container.textContent = current.slice(0, -1);
    } 
    else if (e.key.length === 1) {           // 只處理單一字元（字母）
        const typed = e.key.toLowerCase();   // 支援大小寫都可打
        
        // 如果打的字等於第一個字 → 消除第一個字
        if (current.length > 0 && typed === current[0]) {
            container.textContent = current.slice(1);
        }
        
        // 不管有沒有打對，都在後面新增 1~3 個新字母（講義 point 4）
        container.textContent += randomChars(1, 3);
    }
    
    // 每次按鍵後都讓容器保持焦點
    container.focus();
});