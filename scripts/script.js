const conteudo = document.querySelector(".conteudo");
const conteudoAnotacoes = document.querySelector(".conteudo-anotacoes");
const alertaAdicao = "alerta-adicao";
const alertaVazio = "alerta-vazio";
const alerta = document.querySelector(".alerta");

function exibeAlerta(nomeAlerta, texto){

    if(!document.querySelector(`#${nomeAlerta}`)){

        const novoAlerta = document.createElement("div");
        const textoAlerta = document.createElement("p");
        const fechamentoAlerta = document.createElement("button");

        novoAlerta.id = nomeAlerta;
        textoAlerta.id = "texto-alerta";
        fechamentoAlerta.id = "fechar-alerta";

        alerta.appendChild(novoAlerta);
        novoAlerta.appendChild(textoAlerta);
        novoAlerta.appendChild(fechamentoAlerta);

        const cor = nomeAlerta == "alerta-adicao" ? "var(--cor-alerta-adicao)" : "var(--cor-alerta-vazio)";
        novoAlerta.style.backgroundColor = cor;

        textoAlerta.textContent = texto;

        fechamentoAlerta.textContent = "X";

        fechamentoAlerta.addEventListener("click", function(){
            novoAlerta.remove();
        }); 
    }  
}

let itens = [];

function adicionaAnotacao(){
    const anotacao = document.getElementById("anotacao");

    if (anotacao.value != ""){
        const anotacaoInserida = anotacao.value.trim().toUpperCase();

        
        if(itens.indexOf(anotacaoInserida) == -1){
            itens.push(anotacaoInserida);

            const conteudoAnotacao = document.createElement("div");
            const anotacaoNome = document.createElement("p");
            const anotacaoExcluir = document.createElement("button");

            anotacaoNome.id = "nome-da-anotacao";
            anotacaoExcluir.id = "excluir-anotacao";
            conteudoAnotacao.className = "conteudo-anotacao";

            conteudoAnotacoes.appendChild(conteudoAnotacao);
            conteudoAnotacao.appendChild(anotacaoNome);
            conteudoAnotacao.appendChild(anotacaoExcluir);

            anotacaoNome.textContent = anotacaoInserida;
            anotacaoExcluir.textContent = "X";
        
            anotacaoExcluir.addEventListener("click", function(){
                anotacaoNome.remove();
                anotacaoExcluir.remove();
                itens.splice(itens.indexOf(anotacaoInserida), 1);
            });

            let concluido = false;

            anotacaoNome.addEventListener("click", function(){
                if(!concluido){
                    anotacaoNome.style.backgroundColor = "var(--cor-concluido)";
                    anotacaoNome.style.textDecoration = "line-through";
                }
                else{
                    anotacaoNome.style.backgroundColor = "";
                    anotacaoNome.style.textDecoration = "";
                }
                concluido = !concluido;
            });
        }
        else{
            exibeAlerta(alertaAdicao, `O item inserido já foi adicionado à agenda!`);
        }
    }
    else{
        exibeAlerta(alertaVazio, "Por favor, insira uma anotação antes de tentar adicionar com o botão.");
    }

    anotacao.value="";
}

const input = document.getElementById("anotacao");

input.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        adicionaAnotacao();
    }
});