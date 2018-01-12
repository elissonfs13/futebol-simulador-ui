appSimulador.controller ("cadastroSelecaoController", function  ($scope, $routeParams, $http){
	
	$scope.selecao = {};
	$scope.confederacoes = ['AFC', 'CAF', 'CONCACAF', 'CONMEBOL', 'OFC', 'UEFA'];
	$scope.niveis = [2, 3, 4, 5, 6];
	$scope.bandeiras = [];
	
	$scope.salvarSelecao = function(){
		$http({method:'POST', url:'/selecao',data:$scope.selecao})
		.then(function (response){
			 if ($routeParams.selecaoId == null){
				 $scope.selecao = {};
			 }
			sucesso("Salvo com sucesso!"); 
		} , function (response){
			erro("Error: " + status);
		});
	};

	$scope.preCadastro = function(){
		$http.get("selecao/pre").then(function (response){
			sucesso("Seleções cadastradas com sucesso!"); 
		}, function (response){
			erro("Error: " + status);
		});
	};
	
	$scope.getSelecao = function(selecaoId){
		$http.get("selecao/"+selecaoId).then(function (response){
			$scope.selecao = response.data;
			$scope.selecao.nivel = response.data.nivel.toString();
		}, function (response){
			erro("Error: " + status);
		});
	};
	
	$scope.getBandeiras = function(){
		$http({method:'GET', url:'/bandeiras'})
		.then(function (response){
			$scope.bandeiras = response.data;	
		} , function (response){
			erro("Error: " + status);
		});
	};
	
	$scope.visualizarImagem = function(bandeira){
		$scope.selecao.bandeira = bandeira;
	};
	
	if ($routeParams.selecaoId != null){
		$scope.getSelecao($routeParams.selecaoId);
	}
	
	$scope.getBandeiras();
	
});

