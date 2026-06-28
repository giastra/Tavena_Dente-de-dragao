import { CartazFuncoes } from "./cartazes/CartazView.js";
const personagens = document.getElementById('personagens')
const musica = document.getElementById('musica')

// cria o ambiente dos personagens
personagens.addEventListener('click',()=>{
    document.getElementById('corpo').innerHTML=`
    <header>
        <button id="Adicionar">Adicionar</button>
        <button id="Remover">Remover</button>
    </header>

    <main>

        <button id='voltar'>Voltar</button>

        <section id="quadro">
            
             <div class="colunaPoster">
                

            </div>
        
        </section>

        <!-- Estrutura da Modal -->
        <section id="modalOverlay" class="modal-overlay">

            <div class="modal-box">

                <span id="modalClose" class="modal-close">&times;</span>

                <div class="modal-header" id="header">Título da Modal</div>

                <div class="modal-content" id="content">
                    Conteúdo da sua modal vai aqui.
                </div>

                <div class="modal-footer">

                    <button id="btnOk">OK</button>

                </div>

            </div>

        </section>

    </main>

    <footer>

    </footer>
    `
    CartazFuncoes()

    personagens.style.display = 'none'
    musica.style.display = 'none'
    
    document.getElementById('voltar').addEventListener('click',()=>{
        document.getElementById('corpo').innerHTML=``
        personagens.style.display = 'block'
        musica.style.display = 'block'
    })
    
})

// cria o ambiente do bardo
musica.addEventListener('click',()=>{
    let id ='https://www.youtube.com/watch?v=TzxNIoKTW9I'
    id=id.split('v=')[1]

    onYouTubeIframeAPIReady(id)
})

const tag = document.createElement("script");
tag.src = "https://www.youtube.com/iframe_api";
document.body.appendChild(tag);

let player;

function onYouTubeIframeAPIReady(id) {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: id,
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1
    }
  });
}
