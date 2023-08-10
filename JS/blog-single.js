// header
(function () {
    let navDatas = document.querySelectorAll('#top-header a')
    for (i = 0; i < navDatas.length; i++) {
        let page = navDatas[i].innerHTML
        if (page == '博客') {
            navDatas[i].parentNode.classList.add('active')
        }
    }
})();

//   文章数据
(function () {
    let article = document.querySelector('.article')
    let words = document.querySelector('.article-content')

    let params = new URLSearchParams(location.search)
    let id = parseInt(params.get("id"))
    let btnGet = document.querySelector('.more')

    console.log(id);
    // 请求数据 
    let url = `https://www.fastmock.site/mock/b91b2f569b4fb0945b9a540feb1416da/blogs/getBlogList?id=${id}`;
    axios.get(url).then(function (res) {
        let blogList = res.data.data.list;
        let blog = blogList.find(function(item) {
            return item.id === id;
          });
        console.log(blog);
        // 标题
        if(blog){
        article.insertAdjacentHTML('afterbegin', `
        <div class="article-head flex wrap">
                    <h1 class="article-title">${blog.title}</h1>
                    <p class="article-date">发表时间: ${blog.date}</p>
                </div>
                <div class="article-content">
                    ${blog.desc}
                </div>
        `);
        }else{
            article.textContent='文章不存在';
        }

        /* 留言 */
        let commentWords = blog.comments;
        let num = 3
        let renderComments = function () {
            for (i = 0; i < num; i++) {
                insertElement(commentWords[i])
            }
        }
        renderComments()
        // /* 更多 */
        btnGet.addEventListener('click', function () {

            let insertNumber = num + 3
            for (let i = num; i < insertNumber; i++) {
                insertElement(commentWords[i])
            }
            num = insertNumber;
        })



        function insertElement(arr) {
            words.insertAdjacentHTML('beforeend', `
         <div class="comment">
             <h4>
               <span>${arr.nickname}</span>
               <span class="date">${arr.commentTime}</span>
             </h4>
             <p>${arr.content}</p>
           </div>
       `
            )
        };




        /* ----------------评论部分------------------ */
        let btnPost = document.querySelector('#btn-post')
        btnPost.addEventListener('click', function () {
            let nicknameInput = document.querySelector('#nickname')
            let emailInput = document.querySelector('#email')
            let contentInput = document.querySelector('#message-content')
            let now = new Date()
            if ((nicknameInput.value != '') && (emailInput.value != '') && (contentInput.value != '')) {
                let newComment = {
                    nickname: nicknameInput.value,
                    content: contentInput.value,
                    articleId: id,
                    commentTime: now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate(),
                }

                axios.post('http://81.70.162.221:3000/postComment', newComment).then(function (res) {
                    if (res.data == 'success') {
                        alert("评论成功")
                        commentWords.unshift(newComment)
                        words.innerHTML = ''
                        // removeElement()
                        num++
                        renderComments()
                        nicknameInput.value = ''
                        emailInput.value = ''
                        clearInterval.value = '';
                    }
                });
            }
            else {
                alert('请完善信息')
            }

        })
    })
})();