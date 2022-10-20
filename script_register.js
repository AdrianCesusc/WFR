//JAVASCRIPT

//quando a pagina carregar
window.onload=function(){
	//listar();
	document.getElementById('frmCadastro').addEventListener('submit', adicionarOuAlterar);
	document.getElementById('frmCadastro').addEventListener('submit', listar);
}

//variavel global
var idAlterar = null;


function getAtualDate(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(1, '0');
	var yyyy = today.getFullYear();

	today = dd + '/' + mm + '/' + yyyy;
	return today;
}


//Evento do botao cadastrar/salvar (verificação)
function adicionarOuAlterar(e){

	var data_nasc = document.getElementById('nasc').value.split("-")
	var data_formatada = data_nasc[2] + "/" + data_nasc[1] + "/" + data_nasc[0];
	
	var p = {
		nome : document.getElementById('nome').value,
		sobrenome: document.getElementById('sobrenome').value,		
		email: document.getElementById('email').value,		
		documento : document.getElementById('document').value,
		dataCadastro : getAtualDate(),
		nasc : data_formatada,
		nacionalidade : document.getElementById('nacionalidade').value,
		senha: document.getElementById('password').value,
		confirme:document.getElementById('passconfirmation').value,
	}

	if(idAlterar == null)	
		adicionar(p);
	else if(idAlterar > 0)
		alterar(p);
	else
		alert("Ação desconhecida");	
	
	//bloqueia a ação de atualização do browser
	e.preventDefault();
}

function obterIdValido(pessoas) {	//Função Auto-executável
	//percorre verificando se tiver "buraco" entre os numeros
   for(var i = 0; i < pessoas.length; i++)
	   if(pessoas[i].id != i+1)
		   return i + 1;							
   //se nao achar, retorna o id posterior da ultima pessoa
   var newId =  pessoas[pessoas.length - 1].id + 1;
   return newId;
}


function adicionar(p){	
	var pessoas = [];	
	var idValido = 1;	
	//se já possuir o localStorage, adiciono no array	
	if(localStorage.getItem('value') !== null ){
		pessoas = JSON.parse(localStorage.getItem('value')); //captura o array de objetos(JSON);
				
		if(pessoas.length > 0)
			idValido = obterIdValido(pessoas);
	}	
	
	var pessoa = {
		id: idValido,
		nome: p.nome,
		sobrenome : p.sobrenome,
		email: p.email,
		documento : p.documento,
		dataCadastro : p.dataCadastro,
		dataNacimento: p.nasc,
		nacionalidade : p.nacionalidade,
		senha : p.senha,
		admin : p.admin

	};
	
	//Adiciona o objeto ao ultimo indice do array
	pessoas.push(pessoa);	
	//Ordeno o array pelo ID do objeto
	pessoas.sort(function(a,b) {
		return a.Id - b.Id;
	});			
	//armazena no Localstorage
	localStorage.setItem('value', JSON.stringify(pessoas));	
	//reseta os campos do formulario
	document.getElementById('frmCadastro').reset();	 
	localStorage.setItem("lastRegister", idValido);
}

function getDataProfile(id){
	var pessoas = JSON.parse(localStorage.getItem('value'));
	for(var i = 0; i < pessoas.length; i++){
		if(pessoas[i].id == id)
		return pessoas[i];
	}
}

function excluir(cod){
	var pessoas = JSON.parse(localStorage.getItem('value'));

	for(var i = 0; i < pessoas.length; i++)
		if(pessoas[i].Id == cod)
			pessoas.splice(i, 1);
				
	
	localStorage.setItem('value', JSON.stringify(pessoas));
	listar();
	
	//se nao possuir mais nenhum registro, limpar o storage
	if(pessoas.length == 0)
		window.localStorage.removeItem("value");
}

function listar(){
	//se nao possuir nenhum local storage, nao fazer nada
	if(localStorage.getItem('value') === null)
		return;
	
	//captura os objetos de volta
	var pessoas = JSON.parse(localStorage.getItem('value'));
	var tbody = document.getElementById("tbodyResultados");

	
	for(var i = 0; i < pessoas.length; i++){
		var	id = pessoas[i].Id,
		    nome = pessoas[i].Nome,
		    nasc = pessoas[i].DataNascimento,
			data = pessoas[i].DataCadastro
			       
		tbody.innerHTML += '<tr id="rowTable'+i+'">'+
								'<td>'+id+'</td>'+
								'<td>'+nome+'</td>'+
								'<td>'+sobrenome+'</td>'+
								'<td>'+email+'</td>'+
								'<td>'+DocumentoIdentidade+'</td>'+
								'<td>'+data+'</td>'+
								'<td>'+nacionalidade+'</td>'+
								'<td>'+senha+'</td>'+
								'<td>'+Comfirmesenha+'</td>'+
								'<td><button onclick="excluir(\'' + id + '\')">Excluir</button></td>'+
								'<td><button onclick="prepararAlterar(\'' + id + '\')">Alterar</button></td>'+
						   '</tr>';		
	}
}
							//'<td class="celTable'+i+'">'+id+'</td>'+
