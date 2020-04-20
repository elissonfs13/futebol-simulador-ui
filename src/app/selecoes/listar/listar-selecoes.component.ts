import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NotifierService } from "angular-notifier";

import { SelecaoService, Selecao } from '../../shared';

@Component({
  selector: 'app-listar-selecoes',
  templateUrl: './listar-selecoes.component.html',
  styleUrls: ['./listar-selecoes.component.css']
})
export class ListarSelecoesComponent implements OnInit {

	  selecoes: Selecao[];
    itensPorPagina = [5,10,15,20,25,50,100];
    p: number = 1;
    qtdSelecoes: number = 10;
    procurar: string;
    sortKey: string;
    reverse: boolean;
    private readonly notifier: NotifierService;

  	constructor(private selecaoService: SelecaoService, 
                private router: Router,
                private notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

  	ngOnInit(): void {
  		  this.listarSelecoes();
        this.reverse = true;
  	}

  	listarSelecoes(): void {
	  	  this.selecaoService.listarSelecoes()
  			    .subscribe(
  				      data => {
                  this.selecoes = data as Selecao[]; 
                },
  				      err => { 
                  this.alertErro("Erro ao obter seleções. "); 
                }
  			    );
	  }

	  deletarSelecao(selecao: Selecao): void {
	      this.selecaoService.deletarSelecao(selecao.id)
  			    .subscribe(
  				      success => { 
                  this.alertSuccesso("Seleção deletada com sucesso.");  
                  this.listarSelecoes();
                },
  				      err => { 
                  this.alertErro("Erro ao deletar seleção."); 
                }
			      );
	  }

    ordenar(keyname: string): void{
        this.sortKey = keyname;
        this.reverse = !this.reverse;
    };

    editarSelecao(idSelecao: number): void {
      this.router.navigate(["/selecoes/" + idSelecao]);
    }

    alertSuccesso(msg: string): void {
      this.notifier.notify("success", msg);
    }

    alertErro(msg: string): void {
      this.notifier.notify("error", msg);
    }

}
