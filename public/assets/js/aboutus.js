document.addEventListener("DOMContentLoaded", () => {
    // Team members data
    const teamMembers = [
        { name: "Anas Mohammed", role: "Team Head", description: "Backend Developer" },
        { name: "Darsan", role: "Team Member", description: "FrontEnd Developer" },
        { name: "Varsha", role: "Team Member", description: "FrontEnd Developer" },
        { name: "Sinta", role: "Team Member", description: "FrontEnd Developer" },
        { name: "Cewin", role: "Team Member", description: "FrontEnd Developer" }
    ];

    const teamCardsContainer = document.querySelector('.team-cards');

    teamMembers.forEach(member => {
        const teamCard = document.createElement('div');
        teamCard.classList.add('team-card');
        teamCard.innerHTML = `
            <h3>${member.name}</h3>
            <p><strong>Role:</strong> ${member.role}</p>
            <p>${member.description}</p>
        `;
        teamCardsContainer.appendChild(teamCard);
    });
});
