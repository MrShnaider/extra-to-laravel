<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>@yield('title')</title>
	<link rel="stylesheet" href="{{ mix('styles/CollectorName.css') }}">
	<script defer src="{{ mix('scripts/CollectorName.js') }}"></script>
	@yield('head')
</head>
<body class="site">
	@yield('content')
</body>
</html>
