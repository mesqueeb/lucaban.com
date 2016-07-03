<html>
<head>
	<meta charset="UTF-8">
	<title>THINGS</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
</head>
<body>
	<div class="panel panel-default">
		<div class="panel-body">
			@include('common.errors')

			@if ($things[0]->body != '')
			<ul>
				@foreach ($things as $t)
					<li>{{ $t->body }}</li>
				@endforeach
			</ul>
			@endif

			<form action="/things/add" method="post">
				<div class="form-group">
					{{ csrf_field() }}
					<label for="">Thing</label>
					<input type="text" name="body" id="task-body" class="form-control">
					<button class="btn btn-primary">Add</button>
				</div>
			</form>
		</div>
	</div>
</body>
</html>