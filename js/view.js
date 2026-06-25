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
    let btnOk = document.getElementById("btnOk");
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

            modal.style.display = "flex";
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
    // ---------------------------Remover----------------------------- 
    // -------------------------------------------------------------

    function removerCartaz(id) {
    // 1. Remover do localStorage
    let lista = JSON.parse(localStorage.getItem('todosCartazes'));
    lista.splice(id, 1);
    localStorage.setItem('todosCartazes', JSON.stringify(lista));

    // 2. Remover do DOM
    const poster = document.getElementById(id);
    if (poster) {
        poster.remove();
    }

    // 3. Reorganizar IDs dos posters restantes
    const todosPosters = quadro.querySelectorAll('.poster');
    todosPosters.forEach((p, index) => {
        p.id = index;
    });

    // 4. Reorganizar colunas (remover colunas vazias)
    const colunas = quadro.querySelectorAll('.colunaPoster');
    colunas.forEach(col => {
        if (col.querySelectorAll('.poster').length === 0) {
            col.remove();
        }
    });
    }

    document.getElementById('Remover').addEventListener('click', () => {
    header.innerHTML = `Remover cartaz`;

    content.innerHTML = `
        <p>ID do cartaz a remover</p>
        <input id='idRemover' type='number' min='0'>
    `;

    btnOk.innerHTML = `Remover`;

    // limpar listeners antigos
    btnOk.replaceWith(btnOk.cloneNode(true));
    btnOk = document.getElementById("btnOk");

    btnOk.addEventListener('click', () => {
        const id = parseInt(document.getElementById('idRemover').value);

        removerCartaz(id);
        closeModal();
    });

    modal.style.display = "flex";
    });

    // -------------------------------------------------------------
    // ---------------------------MODAL----------------------------- 
    // -------------------------------------------------------------
    // Função para abrir modal de adicionar personagem
    function openModalCriar() {

        header.innerHTML = `Adicionar cartaz`;

        content.innerHTML = `
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
        `;

        btnOk.innerHTML = `Adicionar`;

        // Remove qualquer listener antigo
        btnOk.replaceWith(btnOk.cloneNode(true));
        btnOk = document.getElementById("btnOk");

        // Adiciona o novo listener
        btnOk.addEventListener('click', () => {

            let nome = document.getElementById('nome').value;
            let titulo = document.getElementById('titulo').value;
            let sistema = document.getElementById('sistema').value;
            let ficha = document.getElementById('ficha').value;
            let imagem = document.getElementById('imagem').value;

            const cart = new cartaz(nome, titulo, sistema, ficha, imagem);

            todosCartazes = JSON.parse(localStorage.getItem('todosCartazes'));
            todosCartazes.push(cart);
            localStorage.setItem('todosCartazes', JSON.stringify(todosCartazes));

            crirarCartz(cart, todosCartazes.length - 1);

            closeModal();
        });

        modal.style.display = "flex";
    }

    // adicionar cartaz
    document.getElementById('Adicionar').addEventListener('click', openModalCriar);

    // serve para fechar a modal
    function closeModal(){
        modal.style.display = "none";
    }
    
    // adiciona a opção de fechar a modal ao clicar no x
    btnClose.addEventListener('click',closeModal)

    
    // -------------------------------------------------------------
    // ---------------------------INIT----------------------------- 
    // -------------------------------------------------------------

    // cria todos os cards iniciais
    for(let obj in todosCartazes) {
        quadro = document.getElementById('quadro') 
        crirarCartz(todosCartazes[obj],obj)
        
    }

    // permite o scrol horizontal
    quadro.addEventListener("wheel", (e) => {
    e.preventDefault();
    quadro.scrollLeft += e.deltaY;
    });
