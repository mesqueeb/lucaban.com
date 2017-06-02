<!DOCTYPE html>
<html lang="en">
    <head>
        @include('config.analytics')
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="google" value="notranslate">
        
        <title>Luca Ban</title>
        <!-- Fonts -->

        <!-- Styles -->
        <link rel="stylesheet" href="/css/lp.css">
    </head>
<body>
<div class="lp-wrapper">
@include('components.menu')
<div class="line"></div>
@include('lp.contents')
@include('components.footer')

</div>{{-- /.lp-wrapper  --}}
<script>
    window.defaultLanguage = "{!! App::getLocale() !!}";
</script>
{{-- <script src="js/lp.js"></script> --}}
</body>
</html>
