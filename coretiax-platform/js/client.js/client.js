document.getElementById("email-form").onsubmit = async function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;

    // Requête à Supabase
    let { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('customer_email', email);

    if(projects.length === 0){
        alert("Aucun projet trouvé pour cet email");
        return;
    }

    const project = projects[0];
    document.getElementById("project-section").style.display = "block";
    document.getElementById("project-status").innerText = project.status;

    // Affichage fichiers (mockup)
    const filesDiv = document.getElementById("project-files");
    filesDiv.innerHTML = "";
    // ici tu chargerais tes images / pdf avec preview sécurisée
};

document.getElementById("revise-btn").onclick = async function(){
    if(confirm("La révision coûte 25 $. Confirmer la demande ?")){
        // Ici tu ajoutes +1 à revision_requests ou crée une table demandes
        alert("Demande de révision envoyée à l'Admin");
    }
};
