<html>
<head>
	<meta charset="UTF-8">
	<meta name="token" id="token" value="{{ csrf_token() }}">
	<title>THINGS</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<link rel="stylesheet" href="/css/app.css">
</head>
<body>
	@include('elements.menu')
	<div class="panel panel-default">
		<div class="panel-body">
			@include('common.errors')
			
			<things></things>

		</div>
	</div>

<script src="js/main-min.js"></script>
<script src="https://cdn.jsdelivr.net/vue.resource/0.9.3/vue-resource.min.js"></script>

@include('things.panel')
</body>
</html>