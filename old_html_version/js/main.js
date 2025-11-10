/* Locomotive.js */
import { locomotive } from "./locomotive.js";
/* Nav */
import { animated_nav } from "./nav.js";
/* Loader */
import { createLoader } from "./loader.js";
/* Mouse Trail */
import { mouseTrial } from "./mouseTrailImg.js";
/* Project hover and data */
import { projectInitialize } from "./projectHover.js";
/* Client data */
import { clientInitialize } from "./clients.js";
/* Contact Page tabs */
import { initTabs } from "./contactTabs.js";
/* Footer */
import { addFooter } from "./footer.js";


/* Loader Animation */
document.addEventListener('DOMContentLoaded', function () {
    createLoader(); // This will setup and show the loader
});

locomotive();
animated_nav();
mouseTrial();
projectInitialize();
clientInitialize();
initTabs();
addFooter("footerContainer");


