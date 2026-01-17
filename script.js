
window.addEventListener('load', () => {

    //==============================================Parallax====================================================

    window.addEventListener('scroll', () => {
        let screenWidth = window.outerWidth;
        if (screenWidth <= 900) return;

        let scrollValue = window.scrollY;
        let parallaxHeight = document.querySelector('.parallax').offsetHeight;
        let parallaxScrollPercent = scrollValue / parallaxHeight * 100;

        // 計算滾動進度 (0 到 1)
        let scrollPercent = Math.min(scrollValue / parallaxHeight, 1);
        if (scrollValue > parallaxHeight) return;

        // --- 遠景: 雲 (移動最慢，輕微放大) ---
        let cloud = document.querySelector('.cloud');
        if (cloud) {
            // 僅輕微位移與縮放，避免蓋住畫面
            cloud.style.transform = `translate(-50%, ${scrollValue * 0.2}px) scale(${1 + scrollPercent * 0.1})`;
        }

        // --- 中景: 體育場 (速度適中) ---
        let stadium = document.querySelector('.stadium');
        if (stadium) {
            // 使用 translateY 產生高度落差感
            stadium.style.transform = `translate(-50%, ${scrollValue * 0.1}px) scale(${1 + scrollPercent * 0.05})`;
        }

        // --- 前景: 球員 (移動最快，產生衝擊感) ---
        let player = document.querySelector('.player');
        if (player) {
            // 向相反方向或更快速位移，模擬鏡頭拉近
            player.style.transform = `translate(-45%, ${scrollValue * -0.15}px) scale(${1 + scrollPercent * 0.2})`;
        }
    });
    
// ======================== 2. 定位切換邏輯 (修正屬性值) ========================
    let stickyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            let main = document.querySelector('.main');
            let parallax = document.querySelector('.parallax');
            let parallaxElements = document.querySelectorAll('.parallax__element');

            if(!entry.isIntersecting && entry.boundingClientRect.y <= 0) {
                // 當捲過頭時，將 fixed 轉為 absolute 固定在上方
                parallax.style.position = 'absolute';
                parallax.style.top = '100vh';
                parallaxElements.forEach(el => el.style.position = 'absolute');
                
                main.style.position = 'absolute';
                main.style.top = '100vh';
            } else {
                // 恢復初始狀態
                parallax.style.position = ''; // 清除 inline style
                parallax.style.top = '';
                parallaxElements.forEach(el => el.style.position = 'fixed');

                main.style.position = 'relative';
                main.style.top = '';
            }
        });
    }, { threshold: [0] });
    
    stickyObserver.observe(document.querySelector('header'));
    

    //=============================================================================================

    let contentTextObserver = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
            else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: [0] });
    
    contentTextObserver.observe(document.querySelector('.content__text'));

    //=============================================================================================

    let contentItems = document.querySelectorAll('.item')
    let contentItemsObserver = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {
            if(entry.isIntersecting) {
                let timeout = 0;
                contentItems.forEach(item => {
                    setTimeout(() => {item.classList.add('visible');}, timeout);
                    timeout += 500;
                })
            }
            else {
                contentItems.forEach(item => {
                    item.classList.remove('visible');
                })
            }
        });
    }, { threshold: [0] });
    
    contentItemsObserver.observe(document.querySelector('.content__items'));

})
