export function addFooter(targetId) {
    const footerHTML = `
        <footer>
            <div class="footer_links">
                <a href="index.html" class="hoverLinks">Home</a>
                <a href="work.html" class="hoverLinks">Work</a>
                <a href="about.html" class="hoverLinks">About</a>
                <a href="contact.html" class="hoverLinks">Contact</a>
            </div>
            <h1>Flow Mint</h1>
        </footer>
    `;

    // Get the target element by ID
    const target = document.getElementById(targetId);
    if (target) {
        target.innerHTML += footerHTML;  // Append the footer to the target
    } else {
        console.error("Target element not found");
    }
}

