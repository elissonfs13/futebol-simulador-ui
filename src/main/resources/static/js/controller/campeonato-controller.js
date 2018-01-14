appSimulador.controller ("campeonatoController", function  ($scope, $http, $window){

	$scope.selecoes = [];
	$scope.selecoesSelecionadas = [];
	$scope.campeonato = undefined;
	$scope.grupoA = undefined;
	$scope.grupoB = undefined;
	$scope.grupoC = undefined;
	$scope.grupoD = undefined;
	$scope.grupoE = undefined;
	$scope.grupoF = undefined;
	$scope.grupoG = undefined;
	$scope.grupoH = undefined;
	$scope.oitavas = undefined;
	$scope.quartas = undefined;
	$scope.semis = undefined;
	$scope.finalCampeonato = undefined;
	$scope.terceiroQuarto = undefined;
	$scope.campeonatoGerado = false;
	
	$scope.listarSelecoes = function(){
		$http({method:'GET', url:'/selecao'})
		.then(function (response){
			$scope.selecoes = response.data;
		} , function (response){
			erro("Error: " + status);
		});
	};

	$scope.gerarCampeonato = function(){
		$http({method:'POST', url:'/campeonato',data:$scope.selecoesSelecionadas})
		.then(function (response){
			 $scope.campeonato = response.data;
			 $scope.grupoA = $scope.campeonato.grupos[0];
			 $scope.grupoB = $scope.campeonato.grupos[1];
			 $scope.grupoC = $scope.campeonato.grupos[2];
			 $scope.grupoD = $scope.campeonato.grupos[3];
			 $scope.grupoE = $scope.campeonato.grupos[4];
			 $scope.grupoF = $scope.campeonato.grupos[5];
			 $scope.grupoG = $scope.campeonato.grupos[6];
			 $scope.grupoH = $scope.campeonato.grupos[7];
			 $scope.oitavas = $scope.campeonato.oitavasFinal;
			 $scope.quartas = $scope.campeonato.quartasFinal;
			 $scope.semis = $scope.campeonato.semiFinal;
			 $scope.finalCampeonato = $scope.campeonato.finalCampeonato;
			 $scope.terceiroQuarto = $scope.campeonato.terceiroQuarto;
			 $scope.campeonatoGerado = true;
			// $window.location.href = '/#/campeonato/gera';
		} , function (response){
			erro("Error: " + status);
		});
	};

	$scope.seleciona = function(selecaoEscolhida){
		$scope.selecoesSelecionadas.push(selecaoEscolhida);
		var index = $scope.selecoes.indexOf(selecaoEscolhida);
		if (index > -1) {
		    $scope.selecoes.splice(index, 1);
		}
	};

	$scope.deseleciona = function(selecaoEscolhida){
		$scope.selecoes.push(selecaoEscolhida);
		var index = $scope.selecoesSelecionadas.indexOf(selecaoEscolhida);
		if (index > -1) {
		    $scope.selecoesSelecionadas.splice(index, 1);
		}
	};

	$scope.campeonatoCompleto = function(){
		if ($scope.selecoesSelecionadas.length == 32){
			return true;
		} 
		return false;
	};


});