// Data array representing project information
const projects = [
    {
        link: "../workSingle.html",
        numbering: "01",
        title: "3d Cartoon",
        subtitle: "Branding",
        year: "2024",
        imageUrl: "./assets/project1.jpg"
    },
    {
        link: "../workSingle.html",
        numbering: "02",
        title: "LoftLoom",
        subtitle: "Web Development",
        year: "2024",
        imageUrl: "./assets/project2.png"
    },
    {
        link: "../workSingle.html",
        numbering: "03",
        title: "Crypto Trading",
        subtitle: "App Development",
        year: "2023",
        imageUrl: "./assets/project3.png"
    },
    {
        link: "../workSingle.html",
        numbering: "04",
        title: "Capturing the Wild",
        subtitle: "Illustration",
        year: "2023",
        imageUrl: "./assets/project4.png"
    },
    {
        link: "../workSingle.html",
        numbering: "05",
        title: "Poms",
        subtitle: "Branding, UIUX",
        year: "2023",
        imageUrl: "./assets/project5.png"
    },
    {
        link: "../workSingle.html",
        numbering: "06",
        title: "Embark",
        subtitle: "UIUX, Development",
        year: "2023",
        imageUrl: "./assets/project6.png"
    },
    {
        link: "../workSingle.html",
        numbering: "07",
        title: "Forward",
        subtitle: "3D, Web Design",
        year: "2022",
        imageUrl: "./assets/project7.png"
    },
    {
        link: "../workSingle.html",
        numbering: "08",
        title: "SharkyNFT",
        subtitle: "Brand Identity",
        year: "2022",
        imageUrl: "./assets/project8.jpg"
    },
    {
        link: "../workSingle.html",
        numbering: "09",
        title: "Credly",
        subtitle: "UIUX, Development",
        year: "2021",
        imageUrl: "./assets/project9.png"
    },
    {
        link: "../workSingle.html",
        numbering: "10",
        title: "WANDR",
        subtitle: "UIUX, App",
        year: "2020",
        imageUrl: "./assets/project10.png"
    },
];

// Function to initialize project data on web pages
export function projectInitialize() {
    // Home Wrapper for the project section of the homepage
    const homeWrapper = document.querySelector('.projectwrapper_HOME');
    // Work Wrapper for the project section of the Work page
    const workWrapper = document.querySelector('.projectwrapper_Work');

    // Function to render projects within a specific DOM wrapper
    function renderProjects(wrapper, projectsToRender) {
        const projectHTML = projectsToRender.map(project => `
            <a href="${project.link}" data-image-src="${project.imageUrl}">
                <p>${project.numbering}</p>
                <h3>${project.title}</h3>
                <h5>${project.subtitle}</h5>
                <p>${project.year}</p>
            </a>
        `).join('');
        wrapper.innerHTML = projectHTML;
        projectHover(wrapper);
    }

    // Conditional rendering based on the existence of DOM elements
    // On home page, render only 5 projects
    if (homeWrapper) {
        renderProjects(homeWrapper, projects.slice(0, 5));
    }
    // On work page, render all projects
    if (workWrapper) {
        renderProjects(workWrapper, projects);
    }

    // Function to handle hover effects on project links
    function projectHover(wrapper) {
        const links = wrapper.querySelectorAll('a');
        const imageReveal = document.getElementById('image-reveal');
        if (!imageReveal) return;

        links.forEach(link => {
            link.addEventListener('mouseenter', () => updateImageStyle(link.getAttribute('data-image-src')));
            link.addEventListener('mouseenter', animateIn);
            link.addEventListener('mousemove', moveWithMouse);
            link.addEventListener('mouseleave', animateOut);
        });

        function updateImageStyle(imgSrc) {
            imageReveal.style.backgroundImage = `url(${imgSrc})`;
            imageReveal.style.display = 'block';
            imageReveal.style.backgroundSize = 'cover';
        }

        function animateIn() {
            gsap.killTweensOf(imageReveal);
            gsap.set(imageReveal, {
                clipPath: 'inset(0 100% 0 0)',
                opacity: 1,
                scale: 1,
                transformOrigin: "left center",
            });
            gsap.to(imageReveal, {
                duration: 0.5,
                ease: 'power3.out',
                clipPath: 'inset(0 0% 0 0)',
                rotateY: 0,
            });
        }

        function moveWithMouse(e) {
            const xOffset = e.clientX - (imageReveal.offsetWidth / 2);
            const yOffset = e.clientY - (imageReveal.offsetHeight / 2);
            gsap.to(imageReveal, {
                duration: 0.2,
                x: xOffset,
                y: yOffset,
                ease: 'power1.out',
                skewX: e.movementX * 0.1,
                skewY: e.movementY * 0.1
            });
        }

        function animateOut() {
            gsap.killTweensOf(imageReveal);
            gsap.to(imageReveal, {
                duration: 0.3,
                ease: 'power2.in',
                opacity: 0,
                scale: 0.9,
                clipPath: 'inset(0 100% 0 0)'
            });
        }
    }
}
