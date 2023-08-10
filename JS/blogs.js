(function () {//注释部分是设置2秒的定时延迟，timeout结束后加载网页
    setTimeout(() => {
        $(".loading-div").hide();
        $('body').css('overflow-y', 'scroll');
    }, 2000);
    //这是根据js判断，页面加载完毕就显示
    // document.onreadystatechange = function () {
    //     if (document.readyState == "complete") {
    //         $(".loading-div").hide();
    //         $('body').css('overflow', 'scroll');
    //     }
    // }
})();

// *从后台提取并插入文章
// axios产生promise:处理异步需求的语法，当我满足需求后进入.then 接收函数作为回调函数，接收一个参数：请求的结果
(function () {
    const articleWrap = document.querySelector(".article-wrap")
    const base_url = 'https://www.fastmock.site/mock/b91b2f569b4fb0945b9a540feb1416da/blogs'
    axios.get(base_url + '/getBlogList').then(res => {
        const blogs = res.data.data.list;
        console.log(blogs);
        let blogStr = ''
        blogs.forEach(blog => {
            blogStr += `
            <article>
                    <a href="blog-single.html?id=${blog.id}"><img src="${blog.cover}" alt=""></a>
                    <div class="content-wrap">
                        <a href="blog-single.html?id=${blog.id}">
                            <h3>${blog.title}</h3>
                        </a>
                        <p>${blog.desc} 
                        </p>
                        <div id="see-more" class="flex wrap">
                            <span class="date"><i class="iconfont icon-clock"></i>${blog.date}</span>
                            <a class="more" href="blog-single.html?id=${blog.id}">查看更多<i class="iconfont icon-arrowright"></i></a>
                        </div>
                    </div>
                </article> 
            `
        });
        articleWrap.insertAdjacentHTML('beforeend', blogStr)

    })
})();
