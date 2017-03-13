// Inicia o jQuery




jQuery(function($){
  

$(document).ready(function(){
    var count = 1;
	$("#menusetting a").click(function(){
		$("#menusetting a").removeClass('active-tab-menu');
		$("#submenu").toggle();
		if (count == 1)
		{
			$("#appviewbase").show();
		}
		if (count == 2)
		{
			$("#demodiv").show();
		}
		if (count == 3)
		{
			$("#operator").show();
		}
		if (count == 4)
		{
			$("#job").show();
		}
		
			
	});
	
	$("#menuappview a").click(function(){
        count = 1;
		$("#submenu").hide();
    });
	$("#menureport a").click(function(){
        count = 2;
		$("#submenu").hide();
    });
	$("#menuoperator a").click(function(){
		count = 3;
        $("#submenu").hide();
    });
	$("#menujob a").click(function(){
        count = 4;
		$("#submenu").hide();
    });
		
	
});



  // Captura o clique no link do menu das abas
  $('.tabs-menu ul li a').click(function(){
    
    /** Variáveis **/
    
    // Configura o link clicado
    var a = $(this);
    
    // A classe da aba ativa
    var active_tab_class = 'active-tab-menu';
    
    // Captura o atributo data-tab e gera uma classe
    var the_tab = '.' + a.attr('data-tab');
    
    // Remove a classe de aba ativa de todas as abas
    $('.tabs-menu ul li a').removeClass(active_tab_class);
    
    // Adiciona a classe de aba ativa apenas no link clicado
    a.addClass(active_tab_class);
    
    // Adiciona um CSS para ocultar todas as abas
    $('.tabs-content .tabs').css({
      'display' : 'none'
    });
    
    // Mostra apenas a aba que queremos
    $(the_tab).show();
	
	
    // Não deixa o navegador atualizar a página
    return false;
  });
});