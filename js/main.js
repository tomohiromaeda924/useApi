  // XMLHttpRequestのインスタンスを作成
let req = new XMLHttpRequest();
let response = undefined;//ぐるなびからのレスポンス代入
let sbm = document.getElementById('sbm');
let shops = document.getElementById("shops");

// 読み込み時の処理を設定
req.onreadystatechange = function() {
  // readyState=4は全てのデータを受信済み、
  // status=200は正常に処理されたことを意味します
  if( req.readyState == 4 && req.status == 200 ) {
    //レスポンスデータ代入
    response = req.response;
    
    //関数呼び出し　
    upToimg(response);
  }
}

// onload利用時
// req.onload = function() {
//      //レスポンスデータ代入
//     response = req.response;
//     //関数呼び出し　
//     upToimg(response);
// }


function upToimg(response){
  //レスポンスデータ代入
  let resp = response;
  console.log(response);
  for(let i = 0; i < resp.rest.length; i++){//resp.rest.length　検索条件に合致した情報の件数
    //レスポンスデータから画像のurl取得
    let c = resp.rest[ i ].image_url.shop_image1;
    ////レスポンスデータからお店のurl取得
    let url = resp.rest[ i ].url;
    //レスポンスデータから店の名前取得
    let name = resp.rest[i].name;
    //レスポンスデータからpr取得
    let shpr = resp.rest[i].pr.pr_short;
    //a要素生成
    let a = document.createElement('a');
    //id名追加
    a.setAttribute("id",i);
    if(c === ""){//写真がない場合
      a.style.backgroundColor = "silver";
    }else{
      //画像セット
      a.style.backgroundImage = `url(${c})`;
    }

    //urlセット
    a.href = url;
    //classNameセット
    a.className = 'sample';
    //店名とprをspanタグに入れる
    let word = `<span class="name">${name}</span><br><span class="shpr">${shpr}</span>`;
    //代入
    a.innerHTML = word;
    //aを子要素として代入
    shops.appendChild(a);
  }
}

//検索ボタンがクリック
sbm.addEventListener("click",function() {
  //前回のレスポンスを消す
  response = undefined;
  //前回のimg等a要素けす
  while (shops.firstChild){
    shops.removeChild(shops.firstChild);
  }
  //県名取得
  let str = document.getElementById("pref_name").value;
  //キーワード取得
  let free = document.getElementById("free").value;

  // 接続先のURLやメソ
  req.open( "GET", `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=de21700bbb84bd50df3e45d181cfd906&address=${str}&freeword=${free}`);
  //レスポンスタイプをjsonに指定
  req.responseType = 'json';
  // リクエストをサーバに送信
  req.send();
  });
  
// プルダウンで出力件数の変更できるように改修（30, 50, 70）
// ⇒検索ボタンを押さないで、プルダウンを選択しただけで、表示件数が変わるようにする
// ページング追加
// キッズメニューありの制御追加