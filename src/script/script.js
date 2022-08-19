((document, window, body, undefined) => {
    const add = (el, cls) => el.classList.add(cls);
    const remove = (el, cls) => el.classList.remove(cls);
    const set = (el, cls, val) => (val ? add : remove)(el, cls);
    const select = id => document.querySelector(id);

    const mods = [
        // Mobile Navigation
        () => {
            let open = false;

            const animation = 3e2;
            const animations = [];

            const fixed = 'fixed';
            const active = 'active';
            const inactive = 'inactive';
            const hidden = 'hidden';
            
            const menuButton = select('#mobile-menu');
            const menu = select('#mobile-nav-wrapper');
            const menuInterior = select('#mobile-nav');

            const update = () => {
                set(menu, active, open);
                set(menu, inactive, !open);
                remove(menu, hidden);

                animations.push(setTimeout(() => !open && add(menu, hidden), animation));
            };

            window.addEventListener('click', e => {
                if(!open)
                    return;

                if(!menuInterior.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('blurred');
                    open = false;
                    update();
                }
            }, true);

            menuButton.addEventListener('click', () => {
                animations.forEach(clearTimeout);

                open = !open;

                set(body, fixed, open);
                set(menu, active, open);

                if(open) {
                    window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth'
                    });
                }

                update();
            });
        },
        
        /* // Disable Mobile Parallax
        () => {
            const usedLaterScript = document.createElement('script');
            usedLaterScript.src = 'https://unpkg.com/jarallax@1.10/dist/jarallax.min.js';
            document.body.appendChild(usedLaterScript);

            window.addEventListener('load', () => {
                jarallax(document.querySelectorAll('.jarallax'), {
                    disableParallax: /iPad|iPhone|iPod|Android/,
                    disableVideo: /iPad|iPhone|iPod|Android/
                });
            });
        } */
    ];

    const run = () => mods.forEach(v => {
        try { v() }
        catch(e) { console.error(e); }
    });

    run();

    // if(document.readyState == 'complete') run();
    // else window.addEventListener('load', run);

})(document, window, document.body);