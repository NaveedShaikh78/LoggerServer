<html>
<head>
    <title>Machine Logger</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="/bootstrap/css/spinner.css" rel="stylesheet">
	<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.2/jsgrid.min.css" />
<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.2/jsgrid-theme.min.css" />
<link type="text/css" rel="stylesheet" href="css/status.css" />
	<link type="text/css" rel="stylesheet" href="css/machinestate.css" />
 
  </head>
<body onload="$('#loader').fadeOut('slow')">
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">Machine Logger</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
		  <li class="dropdown">
          <a href="#" class="dropdown-toggle" id="reportcmb" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Detailed <span class="caret"></span></a>
          <ul class="dropdown-menu" >
			  <li><a href="#" id="rcmb-dt" >Detailed</a></li>
			  <li><a href="#" id="rcmb-dsc">Daily Shift Count</a></li>
			  <li><a href="#" id="rcmb-dsc">Monthly Shift Count</a></li>	
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" id="maccmb" role="button" aria-haspopup="true" aria-expanded="false">Machine1 <span class="caret"></span></a>
          <ul class="dropdown-menu" >
			  <li><a href="#" id="mcmb-26" >Machine 1</a></li>
			  <li><a href="#" id="mcmb-19">Machine 2</a></li>
			  <li><a href="#" id="mcmb-13">Machine 3</a></li>
			  <li><a href="#" id="mcmb-6">Machine 4</a></li>
			  <li><a href="#" id="mcmb-22">Machine 5</a></li>
			  <li><a href="#" id="mcmb-27">Machine 6</a></li>
			  <li><a href="#" id="mcmb-17">Machine 7</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-left">
        <div class="form-group">
		 From:  	<input type="datetime-local" class="form-control" id="dateFrom" value="<?php   echo date('Y-m-d').'T08:00'; ?>" />
    	 To:    	<input type="datetime-local" class="form-control"  id="dateTo" value="<?php echo date('Y-m-d')."T22:00";   ?>" >
        </div>
		 
<button  class="btn btn-default"  type= "button" onclick="searchdb();">Search</button>
		  <button  class="btn btn-default"  type= "button" onclick="liveMachineStatus();">Live</button>
      </form>
     
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
	
	<div class="container-fluid" id="machinecontainer"> 	
	<div class="row">
         <machineview> </machineview>
	</div>
	</div>
	<template id="machinetemplete">
	  <div class="col-xs-6 col-sm-3">
			 <div class="panel panel-info">
    			<div class="panel-heading">Machine</div>
    			<div class="panel-body">
							
					<table class="machinefont" ><tr><td rowspan=2><div class="cssload-container">
								<div class="loading6"></div>
							</div></td><td>Count :</td><td class="jobcount" >0</td></tr><tr><td >Timer :</td><td class="machinetimer" ></td></tr>
				 </div>
   			 </div>
	  </div>
	</template>
		<div id="macJobCount"></div>
	<div id="jsGrid" ></div>
	
	<div class="container">
	<div class="row">
		<div id="loader">
    		<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="lading"></div>
		</div>
	</div>
</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="bootstrap/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jsgrid/1.5.2/jsgrid.min.js"> </script>
	<script src="script/search.js"></script>
	<script src="script/status.js"></script>  
    
	</body>
</html>