appSimulador.controller ("listaSelecaoController", function  ($scope, $http, $window){
	
	$scope.selecoes = [];
	
	$scope.listarSelecoes = function(){
		$http({method:'GET', url:'/selecao'})
		.then(function (response){
			$scope.selecoes = response.data;
		} , function (response){
			erro("Error: " + status);
		});
	};
	
	$scope.deletarSelecao = function(selecao){
		$http({method:'DELETE', url:'/selecao/'+selecao.id})
		.then(function (response){
			sucesso("Removido com sucesso!"); 
			$scope.listarSelecoes();
		} , function (response){
			erro("Error: " + status);
		});	
	};
	
	$scope.editarSelecao = function(selecao){
		$window.location.href = '/selecoes/'+selecao.id;
	}
	
});