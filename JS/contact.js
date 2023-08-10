(function () {
    var map = new BMap.Map("map");          // 创建地图实例  
    var point = new BMap.Point(126.618714, 45.721202);  // 创建点坐标  
    map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别  
    map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    var scaleCtrl = new BMap.ScaleControl();  // 添加比例尺控件
    map.addControl(scaleCtrl);
    var marker = new BMap.Marker(point);
    map.addOverlay(marker);
}
)();
// 留言
(function () {
    let nameInput = document.getElementById('nickname')
    let emailInput = document.getElementById('email')
    let themeInput = document.getElementById('theme')
    let contentInput = document.getElementById('message-content')
    let btnPost = document.getElementById('btn-post')
    btnPost.addEventListener('click', function () {
        if ((nameInput.value != '') && (emailInput.value != '') && (contentInput.value != '') && (themeInput.value != '')) {
            alert("评论成功")
            nameInput.value = ''
            emailInput.value = ''
            themeInput.value=''
            contentInput.value=''
            
        } else {
            alert('请完善信息')
        }
    })
})();