import Mock from "mockjs"

//模拟get请求
Mock.mock("/api/get", "get", {
    status: 200,
    "message|3": [{
        id: "@increment(1)",//自增的Id值
        img: "@dataImage(20x20)", //指定宽高图片
        price: "@natural(2,10)", //自然数
        count: "@natural(100,999)",
        name: "@cword(3,5)" //随机生成3-5个中文字符串
    }]
})


//模拟post请求
Mock.mock("/api/post", "post", function (obj) {
    console.log(obj);
    //外面那层负责拦截请求，里面负责return出去假数据
    return Mock.mock({
        status: 200,
        message: "数据返回成功！"
    })
})


//模拟根据不同id发送的请求，例如（"/api/getgoods/1"）这样是写死的请求路径，如果前端发送回来不同的id会报404，这时候就要把
//路径写活写成正则吧后面id去掉也不要写成字符串（/\/api\/getgoods/）这个意思是只要请求路径包含这个正则就匹配到url，就可以获取到前端
//的id值了
Mock.mock(/\/api\/getgoods/, "get", function (obj) {
    console.log(obj);
    let arr = /\/api\/getgoods\/(\d+)/.exec(obj.url)
    console.log(arr)
    return Mock.mock({
        status: 200,
        message: "根据商品不同Id展示不同详情页",
        "data|5": [
            {
                id: parseInt(arr[1]),
                name: "@cword(3,5)",
                img: "@dataImage(20x20)",
                price: "@natural(3,9)",
                count: "@natural(100,300)"
            }
        ]
    })
})