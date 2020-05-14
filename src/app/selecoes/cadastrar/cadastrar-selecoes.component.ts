import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms'; 
import { NotifierService } from "angular-notifier";

import { SelecaoService, Selecao } from '../../shared';

@Component({
  	selector: 'app-cadastrar-selecoes',
  	templateUrl: './cadastrar-selecoes.component.html',
  	styleUrls: ['./cadastrar-selecoes.component.css']
})
export class CadastrarSelecoesComponent implements OnInit {

	  selecao: Selecao;
	  niveis = [2, 3, 4, 5, 6];
	  confederacoes = ['AFC', 'CAF', 'CONCACAF', 'CONMEBOL', 'OFC', 'UEFA'];
	  bandeiras = [];
    idSelecao: number;
    isEdition: boolean;
    private readonly notifier: NotifierService;

  	@ViewChild('formSelecao', { static: true }) formSelecao: NgForm;

  	constructor(private selecaoService: SelecaoService,
                private route: ActivatedRoute,
  	            private router: Router,
                private notifierService: NotifierService) { 
      this.notifier = notifierService;
    }

  	ngOnInit() {
      if (this.route.snapshot.params['id'] == undefined) {
        this.selecao = new Selecao("", null, 0, "", null);
        this.isEdition = false;
      } else {
        this.idSelecao = +this.route.snapshot.params['id'];
        this.getSelecao(this.idSelecao);
        this.isEdition = true;
      }
  		this.getBandeiras();
  	}

  	cadastrar(): void {
	  	this.selecaoService.salvarSelecao(this.selecao).subscribe(
        data => { 
          this.alertSuccesso("Seleção cadastrada com sucesso"); 
          this.selecao = new Selecao("", null, 0, "", "");
        },
        err => { 
          this.alertErro(err.error.mensagens); 
          console.log(err);
        }
      );   	
  	}

    editar(): void {
        this.selecaoService.editarSelecao(this.selecao).subscribe(
          data => { 
            this.alertSuccesso("Seleção editada com sucesso"); 
          },
          err => { 
            this.alertErro(err.error.mensagens); 
          }
        );     
    }

  	preCadastro(): void {
  		this.selecaoService.preCadastro().subscribe(
        data => { 
          this.alertSuccesso("Pré cadastro de seleções realizado com sucesso"); 
          this.router.navigate(["/selecoes/listar"]);
        },
        err => { 
          this.alertErro(err.error.mensagens); 
        }
      );             
  	}

  	getBandeiras(): void {
  		this.selecaoService.getBandeiras().subscribe(
        data => { 
          this.bandeiras = data; 
        },
        err => { 
          this.alertErro(err.error.mensagens); 
        }
  		);	
  	}

    getSelecao(idSelecao: number): any {
      this.selecaoService.getSelecao(idSelecao).subscribe(
        data => { 
          this.selecao = data; 
        },
        err => { 
          this.alertErro(err.error.mensagens); 
        }
      );  
    }

    visualizarImagem(bandeira: string): void {
      this.selecao.bandeira = bandeira;
    }

    alertSuccesso(msg: string): void {
      this.notifier.notify("success", msg);
    }

    alertErro(mensagens: string[]): void {
      mensagens.forEach(mensagem => this.notifier.notify("error", mensagem));
    }

}
