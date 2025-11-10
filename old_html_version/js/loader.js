// loader.js
const createLoader = () => {
    // Create loader HTML
    const loaderHTML = `
        <div class="loader">
            <div class="loader_wrapper">
                <h3>Flow Mint</h3>
                <h1 id="loading-text">00</h1>
                <div class="bar">
                    <div class="bar_progress" id="bar-progress"></div>
                </div>
            </div>
        </div>
    `;

    // Insert loader into the body
    document.body.insertAdjacentHTML('beforeend', loaderHTML);

    // Initialize the loader animation
    initLoaderAnimation();
};

const initLoaderAnimation = () => {
    const loaderText = document.getElementById('loading-text');
    const progressBar = document.getElementById('bar-progress');

    // GSAP timeline for sequencing
    const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.out" }
    });

    // Animate the number from 0 to 100
    tl.to({}, {
        duration: 3,
        onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            loaderText.textContent = progress < 10 ? `0${progress}` : progress;
            progressBar.style.width = `${progress}%`;
        }
    });

    // Optionally, fade out and remove the loader when done
    tl.to('.loader', {
        opacity: 0,
        onComplete: () => document.querySelector('.loader').style.display = 'none'
    });

    tl.from('.hero>div h1', {
        y: 200,
        skewY: 5,
        opacity: 0,
        duration: 1,
        delay: -.7
    });
};

export { createLoader };
