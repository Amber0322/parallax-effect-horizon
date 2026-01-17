window.addEventListener('load', () => {

    //==============================================Parallax====================================================

    window.addEventListener('scroll', () => {
        let screenWidth = window.outerWidth;
        if (screenWidth <= 900) return;

        let scrollValue = window.scrollY;
        let parallaxHeight = document.querySelector('.parallax').offsetHeight;
        let parallaxScrollPercent = scrollValue / parallaxHeight * 100;

        if (scrollValue > parallaxHeight) return;

        let stadium = document.querySelector('.stadium');
        let stadiumWidth = screenWidth;
        stadium.style.width = `${stadiumWidth + (screenWidth * 0.5 * parallaxScrollPercent / 100)}px`;
        stadium.style.transform = `translate(-${ 50 * parallaxScrollPercent / 100 }%, 0%)`;
        stadium.style.left = `${50 * parallaxScrollPercent / 100}%`

        let village = document.querySelector('.village');
        let villageWidth = screenWidth * 2;
        village.style.width = `${villageWidth - (screenWidth * 0.73 * parallaxScrollPercent / 100)}px`;
        village.style.transform = `translate(-${ 53 - (3 * parallaxScrollPercent / 100) }%, ${ 17 - (7 * parallaxScrollPercent / 100) }%)`;

        let player = document.querySelector('.player');
        let playerWidth = screenWidth * 1.7;
        player.style.width = `${playerWidth - (screenWidth * 0.55 * parallaxScrollPercent / 100)}px`;
        player.style.transform = `translate(-${ 45 + (5 * parallaxScrollPercent / 100) }%, 10%)`;
    })

    //=============================================================================================

    let stickyObserver = new IntersectionObserver(function(entries) {

        entries.forEach(entry => {
            let main = document.querySelector('.main');
            let parallax = document.querySelector('.parallax');
            let parallaxEelements = document.querySelectorAll('.parallax__element');

            if(!entry.isIntersecting && entry.boundingClientRect.y <= 0) {
                parallax.style.position = 'absolute';
                parallax.style.top = '100vh';
                parallaxEelements.forEach(element => {
                    element.style.position = 'absolute';
                })
                main.style.position = 'absolute';
                main.style.top = '100vh';
            }
            else {
                parallax.style.position = 'none';
                parallax.style.top = 'none';
                parallaxEelements.forEach(element => {
                    element.style.position = 'fixed';
                })
                main.style.position = 'relative';
                main.style.top = 'none';
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
