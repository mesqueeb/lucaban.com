<html>
<head>
	<meta charset="UTF-8">
	<meta name="token" id="token" value="{{ csrf_token() }}">
	<title>THINGS</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<link rel="stylesheet" href="/css/app.css">
</head>
<body>
<a href="{{route('home')}}">Go home</a>
	@include('elements.menu')
	<div class="item item-default">
		<div class="panel-body">
			<Card :item="import_data"></Card>
		</div>
	</div>

<script src="js/vendor.js"></script>
<script src="js/main.js"></script>
</body>
</html>