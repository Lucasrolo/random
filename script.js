const useCases = {
    "KYC": {
      description: "Optimisation du processus KYC (Know Your Customer) via l'automatisation des vérifications documentaires.",
      inputLabel: "Documents du client à insérer",
      prompts: [
        "Voici un use case : {{input}}. Analyse-le et propose un plan d'action pour automatiser KYC.",
        "Quelles étapes du processus KYC peuvent être automatisées dans le cas suivant : {{input}} ?",
        "Génère un résumé destiné au service conformité pour : {{input}}."
      ]
    },
    "Assistance Client IA": {
      description: "Amélioration du service client via un chatbot alimenté par l'IA.",
      inputLabel: "Type de demandes clients à traiter",
      prompts: [
        "Voici un use case : {{input}}. Propose un plan pour intégrer un chatbot IA.",
        "Quelles données sont nécessaires pour entraîner le chatbot sur le cas suivant : {{input}} ?",
        "Écris un script de conversation possible basé sur ce cas : {{input}}."
      ]
    }
  };
  
  function populateUseCaseList() {
    const select = document.getElementById("useCaseSelect");
    for (const key in useCases) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.appendChild(option);
    }
  }
  
  function onUseCaseChange() {
    const selected = document.getElementById("useCaseSelect").value;
    const uc = useCases[selected];
  
    // Afficher la description
    document.getElementById("useCaseDescription").innerText = uc?.description || "";
  
    // Mettre à jour le label du champ de saisie
    const inputLabel = document.getElementById("inputLabel");
    inputLabel.textContent = uc?.inputLabel || "Texte spécifique à insérer";
  
    document.getElementById("userInput").value = "";
    document.getElementById("promptsContainer").innerHTML = "";
  }
  
  function generatePrompts() {
    const input = document.getElementById('userInput').value.trim();
    const selected = document.getElementById('useCaseSelect').value;
    const container = document.getElementById('promptsContainer');
    container.innerHTML = '';
  
    if (!input || !selected) {
      container.innerHTML = '<p>Veuillez sélectionner un Use Case et remplir le champ spécifique.</p>';
      return;
    }
  
    useCases[selected].prompts.forEach((template) => {
      const finalPrompt = template.replace(/{{input}}/g, input);
      const box = document.createElement('div');
      box.className = 'prompt-box';
      box.innerHTML = `
        <p>${finalPrompt}</p>
        <button onclick="copyToClipboard(\`${finalPrompt}\`)">Copier</button>
      `;
      container.appendChild(box);
    });
  }
  
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => alert('Prompt copié dans le presse-papier !'))
      .catch(() => alert('Erreur lors de la copie.'));
  }
  
  window.onload = populateUseCaseList;

  document.getElementById("addUseCaseForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("newUseCaseName").value.trim();
    const description = document.getElementById("newUseCaseDescription").value.trim();
    const inputLabel = document.getElementById("newInputLabel").value.trim();
    const promptsText = document.getElementById("newPrompts").value.trim();
  
    if (!name || !description || !inputLabel || !promptsText) {
      alert("Merci de remplir tous les champs.");
      return;
    }
  
    const prompts = promptsText.split("\n").filter(p => p.trim() !== "");
  
    useCases[name] = {
      description,
      inputLabel,
      prompts
    };
  
    // Ajouter l'option dans la liste déroulante
    const select = document.getElementById("useCaseSelect");
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  
    // Réinitialiser le formulaire
    document.getElementById("addUseCaseForm").reset();
    alert(`Le Use Case "${name}" a été ajouté avec succès.`);
  });
  