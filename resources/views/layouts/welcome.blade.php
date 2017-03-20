<!DOCTYPE html>
<html lang="en">
    <head>

        @include('config.analytics')

        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Luca Ban</title>

        <!-- Fonts -->

        <!-- Styles -->
        <link rel="stylesheet" href="/css/lp.css">
    </head>
<body>
<div class="lp-wrapper">
    @yield('navbar')
<nav class="fixed-top">
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <a class="nav-link active" href="#page-top">{{ config('app.name', 'Laravel') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#"
                @click="setLanguage = 'ja'"
                v-if="language == 'en'"
            >日本語</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#"
                @click="setLanguage = 'en'"
                v-if="language == 'ja'"
            >English</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#about">@{{ contents.menu.about }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#author">@{{ contents.menu.author }}</a>
        </li>
        @if (Route::has('login'))
            @if (Auth::check())
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/items') }}">@{{ contents.menu.myList }}</a>
                </li>
            @else
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/login') }}">@{{ contents.menu.login }}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/register') }}">@{{ contents.menu.register }}</a>
                </li>
            @endif
        @endif
    </ul>
</nav>
<div class="line"></div>
<section class="jumbotron" id="page-top">
    <h1 class="">@{{contents.lp.jumbotron.title}} {{ config('app.name', 'Laravel') }} @{{contents.lp.jumbotron.title2}}</h1>
    <p class="lead" v-html="contents.lp.jumbotron.body">
    </p>
    <p><a class="btn btn-lg btn-outline" href="{{ url('/items') }}" role="button" v-html="contents.lp.jumbotron.btn"></a></p>
</section>

<div class="container">
    <section class="row about" id="about">
        <div class="col-12">
            <p>{{ config('app.name', 'Laravel') }} @{{contents.lp.features.intro}}</p>
        </div>
        <div class="col-md-4" v-for="card in contents.lp.features.cards">
            <h4 v-html="card.title"></h4>
            <p v-html="card.body"></p>
            <p><img class="img-fluid img-thumbnail"
                :src="card.img"
                alt="example image"
            ></p>
        </div>
    </section>
    <section class="row marketting">
        <div class="col-12">
            <p><a class="btn btn-lg btn-success" href="{{ url('/items') }}" role="button" v-html="contents.lp.author.btn"></a></p>
        </div>
    </section>
    <section class="row about" id="author">
        <div class="col-12">
            <h4 v-html="contents.lp.author.title"></h4>
            <p v-html="">@{{contents.lp.author.body1}}{{ config('app.name', 'Laravel') }}@{{contents.lp.author.body1b}}</p>
            <p v-html="marked(contents.lp.author.body2)"></p>
        </div>
    </section>
</div>
<footer class="footer">
    <p>&copy; Luca Ban - Mesqueeb productions. All Rights Reserved.</p>
</footer>

</div>{{-- /.lp-wrapper  --}}
<script>window.defaultLanguage = {!! json_encode($defaultLanguage) !!};</script>
<script src="js/lp.js"></script>
</body>
</html>
