
class Despesa {
    //classe que recebe os valores contidos na função cadastrar despesa
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia 
        this.tipo = tipo  
        this.descricao = descricao
        this.valor = valor
    }

	validarDados() {
		//i retorna os indices de um array ou um atributo do determinado objeto não retorna o valor
		//percorreremos cada elemento de this um por um acessando o seu indice e nao seu valor
			for(let i in this){
				if(this[i] == undefined || this[i] == '' || this[i] == null ){//lógica para validar dados não ser indefinido, vazio  ou nulo
						return false
				} 
			}
			return true
		}
}

class Ganho{
   //classe que recebe os valores contidos na função cadastrar ganho
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia 
        this.tipo = tipo  
        this.descricao = descricao
        this.valor = valor

    }

    validarDados() {
        //i retorna os indices de um array ou um atributo do determinado objeto não retorna o valor
        //percorreremos cada elemento de this um por um acessando o seu indice e nao seu valor
            for(let i in this){
                if(this[i] == undefined || this[i] == '' || this[i] == null ){//lógica para validar dados não ser indefinido, vazio  ou nulo
                        return false
                } 
            }
            return true
        }
    //aqui criamos um método para validar os dados obrigatórios
}
//aqui criamos uma classe que vai armazenar os dados no localStorage
class Bd{

    constructor() {//lógica para ver se no localStorage foi passado id caso não e ser igual a null
        let id = localStorage.getItem('id')//passasse um id para que possamos adc itens sem sobrepor o anterior
        if(id === null){
            localStorage.setItem('id', 0)//cria o id 0
        }
    }
    
    getProximoId() {//getItem recupera valores contidos no localStorage
        let proximoId = localStorage.getItem('id') //pega o valor de id e armazena na variável
        return parseInt(proximoId) + 1 //quando chamar o método o retorno é o valor de id  e atribuido + 1
    }                                      //toda vez que chamar ele


    gravar(d) {
        let id = this.getProximoId()
         //transforma os dados para notação JSON onde é armazenado no localStorage
         //foi passado no método gravar uma chave e um valor onde a chave e a  variavel id e o valor é o d
        localStorage.setItem(id, JSON.stringify(d))
        //atualiza o localStorage usando o id atual que ele for passado a cada nova gravação 
        localStorage.setItem('id', id)
    }   

    recuperarTodosRegistros(){
        //array de despesas 
        let despesas = Array()

        let ganhos = Array()
        //recuperar o id do localStorage para podermos iterar sobre ele

        let id = localStorage.getItem('id')//capturamos o item id do localStorage e atribuimos uma variavel a ele

        //recuperar todas despesas cadastradas em localStorage
        //id começa em 1 e checa se a variavel que estamos iterando esta no ultimo se não ele acrescenta e vai para o próximo id
        for(let i = 1; i <= id; i++){
            //recupera a despesa iterada e transforma de JSON para objeto literal para podermos usar usando um atributo da biblioteca JSON
            let despesa = JSON.parse(localStorage.getItem(i))
            let ganho = JSON.parse(localStorage.getItem(i))
            //aqui verificamos se o valor que estamos iterando é diferente de null ou undefined

            //existe a possibilidade de haver indices pulados/removidos
            //se existir iremos pular esse indice antes que o push seja realizado 
            if(despesa || ganho === null){
                continue
            }
            despesa.id = i
            ganho.id = i

            despesas.push(despesa)//poem os elementos cadastrados dentro do array despesa
            ganhos.push(ganho)//poem os elementos cadastrados dentro do array ganho
        }
        return despesas, ganhos//retorna o array com os elementos cadastrados
    }

    pesquisar(despesa){
//crio um array que recebe toda a lógica de recuperar todos os registros para podermos acessar eles
        let despesasFiltradas = Array()
// despesas filtradas recebe o array recuperarTododRegistros que sao os cadastros
//o local storage nao nos fornece esses dados por isso precisamos pegar eles para atuar sobre eles filtrando 
        despesasFiltradas = this.recuperarTodosRegistros()

        if (despesa.ano != '' ){ //fazemos o filtro sobre array original por isso atribuimos o filtro sobre despesasFiltradas
        despesasFiltradas = despesasFiltradas.filter( d => d.ano == despesa.ano)
}
        if (despesa.mes != ''){ 
        despesasFiltradas = despesasFiltradas.filter( d => d.mes == despesa.mes)
}
        if (despesa.dia != ''){ 
            despesasFiltradas = despesasFiltradas.filter( d => d.dia == despesa.dia)
}
        if (despesa.tipo != ''){ 
            despesasFiltradas = despesasFiltradas.filter( d => d.tipo == despesa.tipo)
}
        if (despesa.descricao != ''){ 
            despesasFiltradas = despesasFiltradas.filter( d => d.descricao == despesa.descricao)
}
        if (despesa.valor != ''){ 
            despesasFiltradas = despesasFiltradas.filter( d => d.valor == despesa.valor)
}
        return despesasFiltradas
    }

    pesquisarGanho(ganho){
//crio um array que recebe toda a lógica de recuperar todos os registros para podermos acessar eles
        let ganhosFiltrados = Array()
// despesas filtradas recebe o array recuperarTododRegistros que sao os cadastros
//o local storage nao nos fornece esses dados por isso precisamos pegar eles para atuar sobre eles filtrando 
        ganhosFiltrados = this.recuperarTodosRegistros()

        if (ganho.ano != '' ){ //fazemos o filtro sobre array original por isso atribuimos o filtro sobre despesasFiltradas
        ganhosFiltrados = ganhosFiltrados.filter( d => d.ano == ganho.ano)
}
        if (ganho.mes != ''){
        ganhosFiltrados = ganhosFiltrados.filter( d => d.mes == ganho.mes)
}
        if (ganho.dia != ''){
            ganhosFiltrados = ganhosFiltrados.filter( d => d.dia == ganho.dia)
}
        if (ganho.tipo != ''){
            ganhosFiltrados = ganhosFiltrados.filter( d => d.tipo == ganho.tipo)
}
        if (ganho.descricao != ''){
            ganhosFiltrados = ganhosFiltrados.filter( d => d.descricao == ganho.descricao)
}
        if (ganho.valor != ''){
            ganhosFiltrados = ganhosFiltrados.filter( d => d.valor == ganho.valor)
}
        return ganhosFiltrados
    }
    //metodo para remover um item do local storage
    remover(id) {
        localStorage.removeItem(id)
    }
} 

let bd = new Bd()

function cadastrarDespesa() {
    //variaveis que recebem o valor quando clicado no botao que tem a funçao cadatrar despesa
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia =  document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao =  document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //objeto instanciado que armazena esses valores
    let despesa = new Despesa (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


	if(despesa.validarDados()){
        //chamamos  o objeto  e executamos o método gravar recebe o objeto despesa como parametro
        bd.gravar(despesa)
        document.getElementById('exampleModalLabel').textContent = "Registro inserido com sucesso"
        document.getElementById('exampleModalLabel').style.color = "green"
        document.getElementById('modal_conteudo').textContent = "Despesa foi cadastrada com sucesso"
        document.getElementById('btn').textContent = 'Voltar'
        document.getElementById('btn').style.background = 'green'
        document.getElementById('btn').style.border = "2px  solid black"
        //dialod de sucesso
        $('#modalRegistraDespesa').modal('show')//usando jquery caso esteja os dados válidos abre o modal de sucesso (Show)
	
        ano.value = ""
        mes.value = ""
        dia.value = ""
        tipo.value = ""
        descricao.value =""
        valor.value = ""
    
    
    
    }else{

        document.getElementById('exampleModalLabel').textContent = "Erro na gravação"
        document.getElementById('exampleModalLabel').style.color = "red"
        document.getElementById('modal_conteudo').textContent = "Existem campos obrigatórios que não foram preenchidos"
        document.getElementById('btn').textContent = 'Voltar e corrigir'   
        document.getElementById('btn').style.background = 'red'
        document.getElementById('btn').style.border = "2px  solid black"

        //dialog de erro
        $('#modalRegistraDespesa').modal('show')//usando jquery caso nao esteja os dados válidos abre o modal de erro (Show)
	}
}

function cadastrarGanho() {
    //variaveis que recebem o valor quando clicado no botao que tem a funçao cadatrar despesa
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia =  document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao =  document.getElementById('descricao')
    let valor = document.getElementById('valor')

    //objeto instanciado que armazena esses valores
    let ganho = new Ganho (
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )


	if(ganho.validarDados()){
        //chamamos  o objeto  e executamos o método gravar recebe o objeto despesa como parametro
        bd.gravar(ganho)
        document.getElementById('exampleModalLabel').textContent = "Registro inserido com sucesso"
        document.getElementById('exampleModalLabel').style.color = "green"
        document.getElementById('modal_conteudo').textContent = "Despesa foi cadastrada com sucesso"
        document.getElementById('btn').textContent = 'Voltar'
        document.getElementById('btn').style.background = 'green'
        document.getElementById('btn').style.border = "2px  solid black"
        //dialod de sucesso
        $('#modalRegistraGanho').modal('show')//usando jquery caso esteja os dados válidos abre o modal de sucesso (Show)
	
        ano.value = ""
        mes.value = ""
        dia.value = ""
        tipo.value = ""
        descricao.value =""
        valor.value = ""
    
    
    
    }else{

        document.getElementById('exampleModalLabel').textContent = "Erro na gravação"
        document.getElementById('exampleModalLabel').style.color = "red"
        document.getElementById('modal_conteudo').textContent = "Existem campos obrigatórios que não foram preenchidos"
        document.getElementById('btn').textContent = 'Voltar e corrigir'   
        document.getElementById('btn').style.background = 'red'
        document.getElementById('btn').style.border = "2px  solid black"

        //dialog de erro
        $('#modalRegistraGanho').modal('show')//usando jquery caso nao esteja os dados válidos abre o modal de erro (Show)
	}
}


function carregaListaDespesas(despesas = Array(), filtro = false){

        if(despesas.length == 0 && filtro == false){// se despesas = 0 entao chama a função criada dentro da classe bd
            despesas = bd.recuperarTodosRegistros()}
            
        //selecionando o elemento tbody da tabela
        let listaDespesas = document.getElementById('listaDespesas')

        listaDespesas.innerHTML = ''

         //percorrer o array despesas, listando cada despesa de forma dinâmica
        despesas.forEach(function(d) {

        //criando a linha (tr)
        let linha = listaDespesas.insertRow();

        //criar as colunas (td)
        //para cada linha temos 4 ccolunas 
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        
        		//Ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação'
				break
			case '2': d.tipo = 'Educação'
				break
			case '3': d.tipo = 'Lazer'
				break
			case '4': d.tipo = 'Saúde'
				break
			case '5': d.tipo = 'Transporte'
				break
			
		}
		linha.insertCell(1).innerHTML = d.tipo

		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

        //criar botão de exclusão e encapsulando dentro de uma variável
        let btn = document.createElement("button")
        //criamos um botao e atribuimos uma classe 
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class="fas fa-times"></i>'
        //aqui atribuimos um valor de id a cada botao de exclusão
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function() {
            //remover a despesa
            //aqui eu substituo o conteudo do id que é  id_despesa_ por vazio '' .
            let id = this.id.replace('id_despesa_', '')
            //chamo a função remover
            bd.remover(id)
            //apos removido a janela atualiza e nao precisar atualizar clicando
            window.location.reload()

        }
        
        linha.insertCell(4).append(btn)//será criado um botão na 4 coluna de cada linha criada
		console.log(d)
    })
}

function carregaListaGanhos(ganhos = Array(), filtro = false){
    
            if(ganhos.length == 0 && filtro == false){// se despesas = 0 entao chama a função criada dentro da classe bd
                ganhos = bd.recuperarTodosRegistros()}
                
            //selecionando o elemento tbody da tabela
            let listaGanhos = document.getElementById('listaGanhos')
    
            listaGanhos.innerHTML = ''
    
            //percorrer o array despesas, listando cada despesa de forma dinâmica
            ganhos.forEach(function(g) {
    
            //criando a linha (tr)
            let linha = listaGanhos.insertRow();
    
            //criar as colunas (td)
            //para cada linha temos 4 ccolunas 
            linha.insertCell(0).innerHTML = `${g.dia}/${g.mes}/${g.ano}`
            
            		//Ajustar o tipo
            switch(g.tipo){
                case '1': g.tipo = 'Alimentação'
                    break
                case '2': g.tipo = 'Educação'
                    break
                case '3': g.tipo = 'Lazer'
                    break
                case '4': g.tipo = 'Saúde'
                    break
                case '5': g.tipo = 'Transporte'
                    break
                
            }
            linha.insertCell(1).innerHTML = g.tipo
    
            linha.insertCell(2).innerHTML = g.descricao
            linha.insertCell(3).innerHTML = g.valor
    
            //criar botão de exclusão e encapsulando dentro de uma variável
            let btn = document.createElement("button")
            //criamos um botao e atribuimos uma classe 
            btn.className = 'btn btn-danger'
            btn.innerHTML = '<i class="fas fa-times"></i>'
            //aqui atribuimos um valor de id a cada botao de exclusão
            btn.id = `id_ganho_${g.id}`
            btn.onclick = function() {
                //remover a despesa
                //aqui eu substituo o conteudo do id que é  id_despesa_ por vazio '' .
                let id = this.id.replace('id_ganho_', '')
                //chamo a função remover
                bd.remover(id)
                //apos removido a janela atualiza e nao precisar atualizar clicando
                window.location.reload()
    
            }
            
            linha.insertCell(4).append(btn)//será criado um botão na 4 coluna de cada linha criada
            console.log(g)
})
}



function pesquisarGanho(){
        let ano = document.getElementById("ano").value
        let mes = document.getElementById("mes").value 
        let dia = document.getElementById("dia").value
        let tipo = document.getElementById("tipo").value
        let descricao = document.getElementById("descricao").value
        let valor = document.getElementById("valor").value
        //recebemos os valores contidos nos campos e criamos um novo objeto
        let ganho = new Ganho(ano, mes, dia, tipo, descricao, valor)
        
        //aqui a variavel recebe o resultado da pesquisa
        let ganhos = bd.pesquisarGanho(ganho)
        
        carregaListaGanhos(ganhos , true)
    }


function pesquisarDespesa(){
        let ano = document.getElementById("ano").value
        let mes = document.getElementById("mes").value 
        let dia = document.getElementById("dia").value
        let tipo = document.getElementById("tipo").value
        let descricao = document.getElementById("descricao").value
        let valor = document.getElementById("valor").value
        //recebemos os valores contidos nos campos e criamos um novo objeto
        let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
        
        //aqui a variavel recebe o resultado da pesquisa
        let despesas = bd.pesquisar(despesa)
        
        carregaListaDespesas(despesas , true)
    }
