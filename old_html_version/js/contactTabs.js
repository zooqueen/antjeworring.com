export function initTabs() {
    document.addEventListener("DOMContentLoaded", function () {
        const contactTab = document.querySelector('.contactTab');
        const socialTab = document.querySelector('.socialTab');
        const contactTabWrapper = document.querySelector('.contactTabWrapper');
        const socialTabWrapper = document.querySelector('.socialTabWrapper');

        // Check if elements exist before proceeding
        if (contactTab && socialTab && contactTabWrapper && socialTabWrapper) {
            // Set initial states
            gsap.set(socialTabWrapper, { display: 'none', autoAlpha: 0 });
            gsap.set(contactTabWrapper, { display: 'block', autoAlpha: 1 });
            contactTab.classList.add('active-tab');

            // Function to switch tabs
            function switchTab(activeTab, inactiveTab) {
                gsap.to(inactiveTab, {
                    autoAlpha: 0,
                    duration: 0.3,
                    onComplete: () => {
                        gsap.set(inactiveTab, { display: 'none' });
                        gsap.set(activeTab, { display: 'block' });
                        gsap.to(activeTab, { autoAlpha: 1, duration: 0.3 });
                    }
                });
            }

            // Event listeners for tabs
            contactTab.addEventListener('click', function () {
                if (!contactTab.classList.contains('active-tab')) {
                    switchTab(contactTabWrapper, socialTabWrapper);
                    contactTab.classList.add('active-tab');
                    socialTab.classList.remove('active-tab');
                }
            });

            socialTab.addEventListener('click', function () {
                if (!socialTab.classList.contains('active-tab')) {
                    switchTab(socialTabWrapper, contactTabWrapper);
                    socialTab.classList.add('active-tab');
                    contactTab.classList.remove('active-tab');
                }
            });
        }
    });
}
