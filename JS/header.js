// *动态插header
(function () {
    const navName = [
        {
            title: "首页",
            url: "index.html",
        },
        {
            title: "博客",
            url: "blogs.html",
        },
        {
            title: "关于我",
            url: "about.html",
        },
        // {
        //     title: "想法",
        //     url: "think.html",
        // },
        {
            title: "联系我",
            url: "contact.html",
        },
        {
            title: "个人",
            url: "private.html",
        },
    ]
    const header = document.getElementById('top-header');
    const insertNav = function () {
        let res = ''
        navName.forEach(nav => {
            res += `<li class="${getPageName() == nav.url ? "active" : ""}"><a href="${nav.url}">${nav.title}</a></li>`
        })
        return res;
    }
    header.insertAdjacentHTML('afterbegin',`
    <div class="container flex wrap">
    <a href="./index.html" class="icon">
        <i class="iconfont icon-zhuye"></i>
    </a>
    <nav class="navbar">
        <ul class="flex">
           ${insertNav()}
        </ul>
    </nav>
</div>
    `)
    function getPageName() {
        const pathArr = location.pathname.split('/')
        return pathArr[pathArr.length - 1]
    }
})();