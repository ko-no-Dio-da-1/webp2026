// 將簡報上的 API key 存成變數
const apiKey = "ca370d51a054836007519a00ff4ce59e";

function getimg() {
    // 1. 取得畫廊的 div，並在每次按按鈕時先清空原本的照片
    const gal = document.getElementById("gallery");
    gal.innerHTML = "";

    // 2. 第一支 API：取得最近的照片列表 (Page 61)
    const listUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${apiKey}&per_page=10&format=json&nojsoncallback=1`;

    fetch(listUrl)
        .then(res => res.json()) // 將回傳結果以 json mode 讀取
        .then(data => {
            const photos = data.photos.photo;

            // 3. 針對每一張照片的 ID 去打第二支 API 拿真實網址
            photos.forEach(photo => {
                // 第二支 API：透過 photo.id 取得照片尺寸列表 (Page 62)
                const sizeUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${apiKey}&photo_id=${photo.id}&format=json&nojsoncallback=1`;

                fetch(sizeUrl)
                    .then(res => res.json())
                    .then(sizeData => {
                        const sizes = sizeData.sizes.size;
                        
                        // 為了讓照片畫質還不錯但又不會載入太慢，我們拿倒數第二大的尺寸
                        const imgUrl = sizes[sizes.length >= 2 ? sizes.length - 2 : 0].source;

                        // 呼叫函式將圖片加到畫廊中
                        add_new_img(imgUrl);
                    })
                    .catch(err => console.error("無法取得照片尺寸:", err));
            });
        })
        .catch(err => console.error("無法取得照片列表:", err));
}

// 產生新的 <img> 標籤並放入畫廊的 Function
function add_new_img(imgUrl) {
    const gal = document.getElementById("gallery");
    const img = document.createElement("img");
    img.setAttribute("src", imgUrl);
    gal.appendChild(img);
}