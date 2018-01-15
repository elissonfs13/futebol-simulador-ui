appSimulador.controller ("listaCampeonatoController", function  ($scope, $http, $window){

	$scope.campeonatos = [];
	$scope.itensPorPagina = [5,10,15,20,25,50,100];
	
	$scope.listarCampeonatos = function(){
		$http({method:'GET', url:'/campeonato'})
		.then(function (response){
			$scope.campeonatos = response.data;
		} , function (response){
			erro("Error: " + status);
		});
	};
	
	$scope.verCampeonato = function(campeonato){
		$window.location.href = '/campeonato/'+campeonato.id;
	};
	
});