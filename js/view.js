import {cartaz} from './controler.js'

    // setap para o local storage 
    let todosCartazes= []

    if (localStorage.getItem('todosCartazes') == null){
        localStorage.setItem('todosCartazes',JSON.stringify(todosCartazes))
    }
    else{
        todosCartazes = JSON.parse(localStorage.getItem('todosCartazes'))
    }

  

   // Obtém elementos
    const modal = document.getElementById("modalOverlay");
    const btnClose = document.getElementById("modalClose");
    const btnOk = document.getElementById("btnOk");
    const header = document.getElementById("header")
    const content = document.getElementById("content")
    let quadro = document.getElementById('quadro') 


    // -------------------------------------------------------------
    // ---------------------------Cartazes----------------------------- 
    // -------------------------------------------------------------
    function crirarCartz(obj,n) {

        const colunas = quadro.querySelectorAll('.colunaPoster');
        let ultimaColuna = colunas[colunas.length - 1];

        // pega todos os posters da última coluna
        let posters = ultimaColuna.querySelectorAll('.poster');

        // Criar o poster
        const novoPoster = document.createElement("div");
        novoPoster.classList.add("poster");
        novoPoster.id = n;

        novoPoster.innerHTML = `
            <p class="impacto">Procurado Vivo ou Morto</p>
            <img class="cara" src="${obj.imagem}">
            <div class="texto">
                <p class="nome">${obj.nome}</p>
                <p class="titulo">${obj.titulo}</p>
                <p class="sistema">${obj.sistema}</p>
            </div>
        `;

        novoPoster.addEventListener('click',()=>{

            header.innerHTML=`${obj.nome}`

            content.innerHTML=`
            <p>${obj.titulo}</p>
            <p>${obj.sistema}</p>
            `
            
            btnOk.innerHTML=`Abrir ficha`

            openModal()
            window.open(obj.ficha, "_blank");
        })

        // Se a última coluna ainda tem espaço (menos de 2 posters)
        if (posters.length < 2) { 
            ultimaColuna.appendChild(novoPoster);
            return;
        }

        // Caso contrário, criar nova coluna e adicionar nela
        const novaColuna = document.createElement("div");
        novaColuna.classList.add("colunaPoster");

        novaColuna.appendChild(novoPoster);
        quadro.appendChild(novaColuna);
        
    }


    // -------------------------------------------------------------
    // ---------------------------MODAL----------------------------- 
    // -------------------------------------------------------------
    // Função para abrir modal de adicionar personagem
    function openModal() {
            modal.style.display = "flex";
      
    }

    // Função segura para fechar modal
    function closeModal() {
            modal.style.display = "none";
    }

    // Eventos da modal
   
    btnClose.addEventListener("click", closeModal);
    btnOk.addEventListener("click", closeModal);


    // btn remover cartaz
    document.getElementById('Remover').addEventListener('click',()=>{
        
        
    })

    // adicionar cartaz
    document.getElementById('Adicionar').addEventListener('click',()=>{
    header.innerHTML=`Adicionar cartaz`

    content.innerHTML=`
    <p>Nome</p>
    <input id='nome' type='text'>
    <p>Titulo</p>
    <input id='titulo' type='text'>
    <p>Sistema</p>
    <input id='sistema' type='text'>
    <p>Link para a ficha</p>
    <input id='ficha' type='text'>
    <p>Link para a imagem</p>
    <input id='imagem' type='text'>
    `
    
    btnOk.innerHTML=`Adicionar`

    // btn criar o cartaz 
    btnOk.addEventListener('click',()=>{
        let nome = document.getElementById('nome').value
        let titulo = document.getElementById('titulo').value
        let sistema = document.getElementById('sistema').value
        let ficha = document.getElementById('ficha').value
        let imagem = document.getElementById('imagem').value

        const cart = new cartaz(nome,titulo,sistema,ficha,imagem)
        todosCartazes = JSON.parse(localStorage.getItem('todosCartazes'))
        todosCartazes.push(cart)
        console.log(todosCartazes);
        localStorage.setItem('todosCartazes',JSON.stringify(todosCartazes))
        crirarCartz(cart)
        
    })

    openModal()
    })


    

   // -------------------------------------------------------------
    // ---------------------------INIT----------------------------- 
    // -------------------------------------------------------------

    for(let obj in todosCartazes) {
        quadro = document.getElementById('quadro') 
        crirarCartz(todosCartazes[obj],obj)
        
    }
