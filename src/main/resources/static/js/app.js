//Criacao do modulo principal da aplicacao
var appSimulador = angular.module("appSimulador", [ 'ngRoute', 'angularUtils.directives.dirPagination' ]);

appSimulador.config(function($routeProvider, $locationProvider) {

	$routeProvider
	.when("/selecoes/lista", {
		templateUrl : 'view/selecao/listaselecao.html',
		controller : 'listaSelecaoController'
	}).when("/selecoes/cadastro", {
		templateUrl : 'view/selecao/cadastroselecao.html',
		controller : 'cadastroSelecaoController'
	}).when("/selecoes/:selecaoId", {
		templateUrl : 'view/selecao/cadastroselecao.html',
		controller : 'cadastroSelecaoController'
	}).when("/campeonato/seleciona", {
		templateUrl : 'view/campeonato/selecionaselecao.html',
		controller : 'campeonatoController'
	}).when("/campeonato/gera", {
		templateUrl : 'view/campeonato/campeonato.html',
		controller : 'campeonatoController'
	}).otherwise({
		rediretTo : '/'
	});
	
	$locationProvider.html5Mode(true);
	
});

//mostra msg de sucesso
function sucesso(msg) {
    	$.notify({
        	message: msg

        },{
            type: 'success',
            timer: 500
        });
}

// mostra msg de erro
function erro(msg) {
	$.notify({
    	message: msg

    },{
        type: 'danger',
        timer: 500
    });
}