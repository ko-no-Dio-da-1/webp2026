let count = 1;

function addfunction() {
    let btn = document.createElement("BUTTON");
    
    btn.innerHTML = `CLICK ME (${count})`;
    btn.setAttribute("id", `btn_${count}`);
    btn.setAttribute("class", "btn btn-outline-danger ms-2");   // 初始樣式
    
    // === 關鍵修改的地方 ===
    btn.addEventListener("click", function(e) {
        let target = e.target;
        
        target.innerHTML = `${target.id} CLICKED !`;
        
        // 直接覆蓋 class → 變成實心紅色（最穩）
        target.className = "btn btn-danger ms-2";
        
        console.log(target.id + " CLICKED !");
    });
    
    document.body.appendChild(btn);
    count++;
}

function delfunction() {
    let btn_list = document.getElementsByTagName("BUTTON");
    
    if (btn_list.length > 2) {
        document.body.removeChild(btn_list[btn_list.length - 1]);
    } else {
        console.log("已經沒有可以刪的按鈕了！");
    }
}