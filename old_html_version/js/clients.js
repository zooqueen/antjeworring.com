// Data for the clients
const clients = [
    {
        numbering: "01",
        name: "Quixote Studios",
        work: "Branding",
        year: "2024"
    },
    {
        numbering: "02",
        name: "AKQA",
        work: "Design, Development",
        year: "2024"
    },
    {
        numbering: "03",
        name: "Dentsu",
        work: "SEO",
        year: "2023"
    },
    {
        numbering: "04",
        name: "WPP plc",
        work: "SEO, Marketing",
        year: "2022"
    },
    {
        numbering: "05",
        name: "Pinterest",
        work: "App",
        year: "2022"
    },
];

// main function
export function clientInitialize() {
    // Display the clients into the wrapper
    function renderClients() {
        const clientWrapper = document.querySelector('.clientsWrapper');
        if (clientWrapper) {
            const clientHTML = clients.map(client => `
                <div>
                    <p>${client.numbering}</p>
                    <h3>${client.name}</h3>
                    <h5>${client.work}</h5>
                    <p>${client.year}</p>
                </div>
            `).join('');
            clientWrapper.innerHTML = clientHTML;
        }
    }

    renderClients();
}