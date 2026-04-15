// ==================== ex#8 主程式 ====================

var openUrl = "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();

xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        var dataset = JSON.parse(this.responseText);
        addNewData(dataset);
    }
};

// 把 API 回傳的資料塞進表格
function addNewData(dataset) {
    var myTable = document.getElementById("csie");
    
    dataset.forEach(function(data) {
        var row = myTable.insertRow(-1);           // 在最後新增一列
        
        row.insertCell(0).innerHTML = data['title'];                    // 名稱
        
        // 地點：取 showInfo[0] 的 location（有些資料可能沒有，防錯）
        var location = (data['showInfo'] && data['showInfo'][0] && data['showInfo'][0]['location']) 
                       ? data['showInfo'][0]['location'] : "未提供";
        row.insertCell(1).innerHTML = location;
        
        // 票價：取 showInfo[0] 的 price
        var price = (data['showInfo'] && data['showInfo'][0] && data['showInfo'][0]['price']) 
                    ? data['showInfo'][0]['price'] : "未提供";
        row.insertCell(2).innerHTML = price;
    });
}

// 刪除最後一筆（跟之前 Table 消消樂一樣）
function delOldData() {
    var myTable = document.getElementById("csie");
    var rowCount = myTable.rows.length;
    if (rowCount > 1) {                    // 保留標題列
        myTable.deleteRow(rowCount - 1);
    }
}