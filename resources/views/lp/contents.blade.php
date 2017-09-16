<section class="jumbotron" id="page-top">
    <h1 class="">
        @lang("Say hello to :app",
            ['app' => config('app.name')]
        )
    </h1>
    <p class="lead">
        @lang("A simple task list for people who want to be organized without making things more complicated.")
    </p>
    <p>
        <a class="btn btn-lg btn-outline"
            role="button"
            href="{{ env('APP_SCHEME').'listo.'.env('APP_URLBASE') }}"
        >
            @lang("Try it out")
        </a>
    </p>
</section>

<div class="container">
    <section class="row about" id="about">
        <div class="col-12">
            <p>
                @lang(":app is focussed on the following features:",
                    ['app' => config('app.name')]
                )
            </p>
        </div>
        @foreach (__('lp.featureCards') as $card)
            <div class="col-md-4">
                <h4>{{ $card['title'] }}</h4>
                <p>{{ $card['body'] }}</p>
                <p><img class="img-fluid img-thumbnail"
                    src="{{ $card['img'] }}"
                    alt="example image"
                ></p>
            </div>
        @endforeach
    </section>
    <section class="row marketting">
        <div class="col-12">
            <p>
                <a class="btn btn-lg btn-success"
                    role="button"
                    href="{{ env('APP_SCHEME').'listo.'.env('APP_URLBASE') }}"
                >
                    @lang("Try it out now")
                </a>
            </p>
        </div>
    </section>
    <section class="row about" id="author">
        <div class="col-12">
            <h4>@lang("About the Author")</h4>
            <p>
                @lang("Hello community. My name is Luca Ban. I always wanted to build the perfect task list app that fits my needs. I have used about all task list apps out there. But there was always something missing. So that's why I decided to create :app.",
                    ['app' => config('app.name')]
                )
            </p>
            <p>
                @lang("This app has been my introduction to programming and I fell in love. There are still great plans for new features so stay tuned! (I was greatly inspired by <a href='https://checkvist.com/'>Checkvist</a>.)")
            </p>
        </div>
    </section>
</div>