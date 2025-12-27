const ADMIN_PASSWORD = "Coretiax@2010";

document.getElementById("login-form").onsubmit = function(e){
    e.preventDefault();
    const pw = document.getElementById("password").value;
    if(pw === ADMIN_PASSWORD){
        document.getElementById("login-form").style.display = "none";
        document.getElementById("admin-panel").style.display = "block";
        loadProjects();
    } else {
        alert("Mot de passe incorrect");
    }
};

document.getElementById("add-project-btn").onclick = function(){
    const section = document.getElementById("add-project-section");
    section.style.display = section.style.display === "none" ? "block" : "none";
};

document.getElementById("create-project-btn").onclick = async function(){
    const email = document.getElementById("new-email").value;
    const first = document.getElementById("new-firstname").value;
    const last = document.getElementById("new-lastname").value;
    const offer = document.getElementById("new-offer").value;
    const details = document.getElementById("new-details").value;

    // Ajouter client si pas existant
    await supabase.from('customers').upsert({
        email: email,
        first_name: first,
        last_name: last,
        offer: offer
    });

    await supabase.from('projects').insert([{
        customer_email: email,
        status: 'Non commencé',
        details: details
    }]);

    alert("Projet créé");
    loadProjects();
};

async function loadProjects(){
    const { data: projects } = await supabase.from('projects').select('*');
    const tbody = document.querySelector("#projects-table tbody");
    tbody.innerHTML = "";
    projects.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${p.customer_email}</td>
                         <td>—</td>
                         <td>—</td>
                         <td>—</td>
                         <td>
                            <select data-id="${p.id}">
                                <option value="Non commencé">Non commencé</option>
                                <option value="Projet en cours de réalisation">En cours</option>
                                <option value="Projet terminé">Terminé</option>
                                <option value="Projet livré">Livré</option>
                            </select>
                            <button onclick="updateStatus('${p.id}')">Enregistrer</button>
                         </td>
                         <td>Actions futur</td>`;
        tbody.appendChild(row);
    });
}

async function updateStatus(id){
    const select = document.querySelector(`select[data-id='${id}']`);
    await supabase.from('projects').update({status: select.value}).eq('id', id);
    alert("Statut mis à jour");
}
