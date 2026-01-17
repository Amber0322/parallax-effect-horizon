
window.addEventListener('load', () => {

    // ======================== 1. 視差滾動邏輯 ========================
    const parallaxScroll = () => {
        let screenWidth = window.innerWidth;
        if (screenWidth <= 900) return;

        let scrollValue = window.scrollY;
        let parallax = document.querySelector('.parallax');
        let parallaxHeight = parallax.offsetHeight;
        
        // 確保只在視差區域捲動時運算
        if (scrollValue > parallaxHeight * 1.5) return;

        let scrollPercent = Math.min(scrollValue / parallaxHeight, 1);

        // 雲: 慢速
        let cloud = document.getElementById('cloud');
        if (cloud) {
            cloud.style.transform = `translate(-50%, ${scrollValue * 0.3}px) scale(${1 + scrollPercent * 0.1})`;

       // 體育場: 中速
        let stadium = document.getElementById('stadium');
        if (stadium) {
            stadium.style.transform = `translate(-50%, ${scrollValue * 0.15}px)`;
        }

        // 球員: 向上的視差感
        let player = document.getElementById('player');
        if (player) {
            player.style.transform = `translate(-50%, ${scrollValue * -0.1}px) scale(${1 + scrollPercent * 0.1})`;
        }
    };

    window.addEventListener('scroll', parallaxScroll);

            // ======================== 2. 內容顯現動畫 (Intersection Observer) ========================
    // 修正: 確保內容在進入畫面時會觸發 visible 類別
    const observerOptions = { threshold: 0.1 };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 監測文字區域與項目
    const textSection = document.querySelector('.content__text');
    if (textSection) revealObserver.observe(textSection);

    const items = document.querySelectorAll('.item');
    items.forEach((item, index) => {
        // 讓項目帶有一點延遲感的顯現
        item.style.transitionDelay = `${index * 0.2}s`;
        revealObserver.observe(item);
    });
});

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
