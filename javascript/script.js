class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();
        
        if(this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.editId, produto);                
            }
                        
        }        
        this.listaTabela(); // lista tabela
        this.cancelar(); // limpa campos input text
    }

    lerDados() {
        let produto = {};
        
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('iproduto').value;
        produto.precoProduto = document.getElementById('ipreco').value;

        return produto;
    }

    validaCampos(produto){
        let msg = '';

        if(produto.nomeProduto == '') {
            msg += '- Informe o Nome do Produto \n';
        }
        if(produto.precoProduto == '') {
            msg += '- Informe o Preço do Produto \n';
        }

        if(msg != '') {
            alert(msg);
            return false;
        }

        return true;
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ''

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow(); //a função insertRow() cria uma nova linha na tabela

            let td_id = tr.insertCell(); // a funcção insertCell() cria uma nova coluna e atribui a varível td_id
            let td_produto = tr.insertCell();
            let td_preco = tr.insertCell();
            let td_acao = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_preco.innerText = this.arrayProdutos[i].precoProduto;

            td_id.classList.add('center');
            td_preco.classList.add('right');
            td_acao.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute("onclick","produto.preparaEditacao("+ JSON.stringify(this.arrayProdutos[i]) +")");// JSON substitui o xml
            
            let imgExcluir = document.createElement('img');
            imgExcluir.src = 'img/excluir.png';
            imgExcluir.setAttribute("onclick","produto.deletar("+ this.arrayProdutos[i].id +")"); 

            td_acao.appendChild(imgEdit);
            //td_acao.appendChild("&nbsp;");
            td_acao.appendChild(imgExcluir);
            
        }
    }

    adicionar(produto) {
        produto.precoProduto = parseFloat(produto.precoProduto);
        this.arrayProdutos.push(produto);
        this.id++;

    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].precoProduto = produto.precoProduto;
            }
        }
    }

    preparaEditacao(dados) {
        this.editId = dados.id;

        document.getElementById('iproduto').value = dados.nomeProduto;
        document.getElementById('ipreco').value = dados.precoProduto;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    deletar(id) {
        if(confirm('Deseja realmente deletr o produto do ID ' + id)){
            let tbody = document.getElementById('tbody');

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);

                tbody.deleteRow(i);
            }
        }
        }        
    }

    /* Função para limpar input text */
    cancelar() {
        document.getElementById('iproduto').value = '';
        document.getElementById('ipreco').value = '';
        document.getElementById('btn1').innerText = 'Salvar';
        this.editId = null;
    }
}

var produto = new Produto();