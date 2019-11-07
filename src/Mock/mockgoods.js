import Mock from "mockjs"

//获取商品列表api接口
Mock.mock("/api/goodslist", "get", {
    status: 200,
    message: "商品列表",
    "data|5": [
        {
            id: "@increment(1)",
            time: new Date(),
            name: "@cword(2,5)"
        }
    ]
})


//获取前端返回的添加商品信息并保存api接口
Mock.mock("/api/goodsinfo", "post", function (obj) {
    console.log(obj);
    return Mock.mock({
        status: 200,
        message: "添加商品信息成功",
        data: [obj.body]
    })
})

//删除商品api接口
Mock.mock(/\/api\/removelist/, "get", function (obj) {
    var arr = /\/api\/removelist\/(\d+)/.exec(obj.url);
    return Mock.mock({
        status: 200,
        id: parseInt(arr[1]),
        message: "删除商品成功！"
    })
})