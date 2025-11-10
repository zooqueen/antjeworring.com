export function mouseTrial() {
    const images = document.querySelectorAll('.hero img');
    const delay = 0.1; // delay between each image in the trail

    document.addEventListener('mousemove', function (e) {
        let x = e.clientX;
        let y = e.clientY;

        // Apply a delayed animation to each image
        images.forEach((img, index) => {
            gsap.to(img, {
                x: x - (img.width / 2) + index * 4, // Offset each image slightly for visual effect
                y: y - (img.height / 2) + index * 4,
                delay: index * delay, // Each image's delay increases
                duration: 0.3,
                ease: 'Power1.easeOut'
            });
        });
    });

    // Add mouseleave event listeners to each image
    images.forEach((img) => {
        img.addEventListener('mouseleave', function () {
            gsap.to(img, {
                scale: 0, // Scale the image to zero
                duration: 0.5, // Duration of the scale down animation
                ease: 'Power1.easeOut',
                opacity: 0
            });
        });
    });
}
