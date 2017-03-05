<!DOCTYPE html>
<html lang="en">
    <head>

        <script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

          ga('create', 'UA-92965499-1', 'auto');
          ga('send', 'pageview');

        </script>

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

<nav class="fixed-top">
    <ul class="nav justify-content-end">
        <li class="nav-item">
            <a class="nav-link active" href="#page-top">{{ config('app.name', 'Laravel') }}</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#author">Author</a>
        </li>
        @if (Route::has('login'))
            @if (Auth::check())
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/items') }}">My list</a>
                </li>
            @else
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/login') }}">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/register') }}">Register</a>
                </li>
            @endif
        @endif
    </ul>
</nav>
<div class="line"></div>
<section class="jumbotron" id="page-top">
    <h1 class="">Say hello to {{ config('app.name', 'Laravel') }}</h1>
    <p class="lead">
        {{ config('app.name', 'Laravel') }} is a simple task list for people who want to be organized without making things more complicated.
    </p>
    <p><a class="btn btn-lg btn-outline" href="{{ url('/items') }}" role="button">Try it out</a></p>
</section>

<div class="container">
    <section class="row about" id="about">
        <div class="col-12">
            <p>{{ config('app.name', 'Laravel') }} is focussed on the following features:</p>
        </div>
        {{-- <div class="card">
            <img class="card-img-top"
                src="img/all.png"
                alt="example image"
            >
            <div class="card-block">
                <h4 class="card-title">Simplicity</h4>
                <p class="card-text">It needs to "just work". I believe an app shouldn't require a manual to know how to work it. Intuition is the prime pillar.</p>
            </div>
        </div> --}}
        <div class="col-md-4">
            <h4>Simplicity</h4>
            <p>It needs to "just work". I believe an app shouldn't require a manual to know how to work it. Intuition is the prime pillar.</p>
            <p><img class="img-fluid img-thumbnail"
                src="img/all.png"
                alt="example image"
            ></p>
        </div>
        <div class="col-md-4">
            <h4>Time management</h4>
            <p>Add 'planned time' for a perspective of your taskload. You can use timers for increased productivity. You can easily log how much time you have spent on a task.</p>
            <p><img class="img-fluid img-thumbnail"
                src="img/timer.png"
                alt="example image"
            ></p>
        </div>
        <div class="col-md-4">
            <h4>A journal of done tasks</h4>
            <p>The most important feature to know what you've done.</p>
            <p><img class="img-fluid img-thumbnail"
                src="img/journal.png"
                alt="example image"
            ></p>
        </div>
        <div class="col-md-4">
            <h4>Tags</h4>
            <p>Tags for filtering and organization.</p>
            <p><img class="img-fluid img-thumbnail"
                src="img/filter.png"
                alt="example image"
            ></p>
        </div>
        <div class="col-md-4">
            <h4>Keyboard controls</h4>
            <p>Keep it fast and easy to work with. And powerfull for power users.</p>
            <p><img class="img-fluid img-thumbnail"
                src="img/keyboard.jpg"
                alt="example image"
            ></p>
        </div>
    </section>
    <section class="row marketting">
        <div class="col-12">
            <p><a class="btn btn-lg btn-success" href="{{ url('/items') }}" role="button">Try it out now</a></p>
        </div>
    </section>
    <section class="row about" id="author">
        <div class="col-12">
            <h4>About the Author</h4>
            <p>Hello community. My name is Luca Ban. I always wanted to build the perfect task list app that fits my needs. I have used about all task list apps out there. But there was always something missing. So that's why I decided to create {{ config('app.name', 'Laravel') }}.
            <br><br>
            <span v-html="aboutMe"></span></p>
        </div>
    </section>
</div>
<footer class="footer">
    <p>&copy; Luca Ban - Mesqueeb productions. All Rights Reserved.</p>
</footer>

</div>{{-- /.lp-wrapper  --}}
<script src="js/lp.js"></script>
</body>
</html>
