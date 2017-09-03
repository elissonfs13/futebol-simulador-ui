appSimulador.controller ("listaSelecaoController", function  ($scope, $http, $window){

	$scope.selecoes = [];
	$scope.itensPorPagina = [5,10,15,20,25,50,100];
	
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
	
	$scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
	
	$scope.editarSelecao = function(selecao){
		$window.location.href = '/selecoes/'+selecao.id;
	};
	
});