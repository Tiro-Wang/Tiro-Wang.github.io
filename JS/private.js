// window.onload = function () {
(function () {
    const data = [
        {
            cover: './pictures/portfolios/1.png',
            title: 'APP',
            link: 'https://baidu.com',
            height: 660
        }, {
            cover: './pictures/portfolios/2.png',
            title: 'APP',
            link: 'https://baidu.com',
            height: 330
        },
        {
            cover: './pictures/portfolios/3.png',
            title: 'CARD',
            link: 'https://baidu.com',
            height: 745
        },
        {
            cover: './pictures/portfolios/5.png',
            title: 'CARD',
            link: 'https://baidu.com',
            height: 745
        },
        {
            cover: './pictures/portfolios/4.png',
            title: 'WEB',
            link: 'https://baidu.com',
            height: 330
        },
        {
            cover: './pictures/portfolios/6.png',
            title: 'WEB',
            link: 'https://baidu.com',
            height: 330
        },
        {
            cover: './pictures/portfolios/7.png',
            title: 'CARD',
            link: 'https://baidu.com',
            height: 660
        },
        {
            cover: './pictures/portfolios/8.png',
            title: 'APP',
            link: 'https://baidu.com',
            height: 330
        },
        {
            cover: './pictures/portfolios/9.png',
            title: 'CARD',
            link: 'https://baidu.com',
            height: 745
        },
        {
            cover: './pictures/portfolios/10.png',
            title: 'APP',
            link: 'https://baidu.com',
            height: 330
        },
        {
            cover: './pictures/portfolios/11.png',
            title: 'WEB',
            link: 'https://baidu.com',
            height: 745
        },
        {
            cover: './pictures/portfolios/12.png',
            title: 'WEB',
            link: 'https://baidu.com',
            height: 330
        },
    ];

    const cols = document.querySelectorAll('.fall-wrap ul')
    //每一列的高度都初始化为0，以便后续在布局时能够正确地计算每一个内容块放置的位置。
    for (let i = 0; i < cols.length; i++) {
        cols[i].height = 0
    }
    function render(e, clearList = false) {
        if (clearList) {
            for (let i = 0; i < cols.length; i++) {
                cols[i].height = 0
            }
            cols.forEach(col => col.innerHTML = '');
        }
        cols.innerHTML = ''
        e.forEach((item, i) => {
            const minCol = getMinCol()
            minCol.insertAdjacentHTML('beforeend', `
        <li class='img ${item.title}'>
            <img src="${item.cover}" alt="" />
            <div class="imgs-info">
                    <h4 class="${item.title}">${item.title}</h4>                    
                   <a href="#"><i class="iconfont icon-link"></i></a>
                </div>
        </li>
      `)
            minCol.height = (minCol.height || 0) + item.height + 43
        })
        function getMinCol() {
            let minCol = cols[0]
            for (let i = 1; i < cols.length; i++) {
                // console.log(i, cols[i].offsetHeight, minCol.offsetHeight);
                if (cols[i].height < minCol.height) minCol = cols[i]
            }
            return minCol
        }
    }
    render(data)
    // 筛选
    const tags = document.querySelectorAll('.type-tags li');
    const items = document.querySelectorAll('.fall-wrap .img');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // 移除所有标签的 active 类名
            tags.forEach(tag => tag.classList.remove('active'));
            // 给当前点击的标签添加 active 类名
            tag.classList.add('active');
            // 获取当前点击的标签的筛选关键字
            const filter = tag.getAttribute('data-filter');
            let filteredData = [];
            // 遍历所有内容，根据筛选关键字显示或隐藏
            items.forEach(item => {
                if (filter === 'ALL') {
                    item.style.display = 'block';
                    filteredData.push({
                        title: item.querySelector('h4').textContent,
                        height: item.querySelector('img').height,
                        cover: item.querySelector('img').src
                    });
                } else if (item.classList.contains(filter)) {
                    item.style.display = 'block';
                    filteredData.push({
                        title: item.querySelector('h4').textContent,
                        height: item.querySelector('img').height,
                        cover: item.querySelector('img').src
                    });
                } else {
                    item.style.display = 'none';
                }
            });
            render(filteredData, true)

        });
    });
    /*检索  */

    let searchInput = document.getElementById('search-input')
    searchInput.addEventListener('input', function () {
        let newArr = [];
        let searchValueReg = new RegExp(this.value, 'i');
        console.log(searchValueReg);
        if (searchInput.value.match(/\w+/ig)) {
            for (let i = 0; i < data.length; i++) {
                let contact = data[i]
                if (contact.title.search(searchValueReg) != -1) {
                    newArr.push(contact);
                }
            }
            render(newArr, true);
        }else{
            render(data,true)
        }
    })
})();
