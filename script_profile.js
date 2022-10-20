//JAVASCRIPT

//quando a pagina carregar
window.onload=function(){
	var p = getLastRegister();
	populateProfile(p);
}

//variavel global
var idAlterar = null;

function obterIdValido(pessoas) {	//Função Auto-executável
	//percorre verificando se tiver "buraco" entre os numeros
   for(var i = 0; i < pessoas.length; i++)
	   if(pessoas[i].id != i+1)
		   return i + 1;							
   //se nao achar, retorna o id posterior da ultima pessoa
   var newId =  pessoas[pessoas.length - 1].id + 1;
   return newId;
}

function getLastRegister(){
	var id = JSON.parse(localStorage.getItem('lastRegister'));
	var pessoa = getDataProfile(id)
	return pessoa;
}

function getDataProfile(id){
	var pessoas = JSON.parse(localStorage.getItem('value'));
	for(var i = 0; i < pessoas.length; i++){
		if(pessoas[i].id == id)
		return pessoas[i];
	}
}

function populateProfile(pessoa){

	document.getElementById('nome').value = pessoa.nome;
	document.getElementById('sobrenome').value = pessoa.sobrenome;
	document.getElementById('email').value = pessoa.email;
	document.getElementById('document').value = pessoa.documento;
	document.getElementById('nasc').value = pessoa.dataNacimento;
	document.getElementById('nacionalidade').value = pessoa.nacionalidade;
	document.getElementById('password').value = pessoa.password;
	document.getElementById('id').value = pessoa.id;
	document.getElementById('registerDate').value = pessoa.dataCadastro;
	document.getElementById('email-profile').innerHTML = pessoa.email;
	document.getElementById('name-profile').innerHTML = pessoa.nome;
}
