<section class="jumbotron" id="page-top">
    <h1 class="">@{{contents.lp.jumbotron.title}} {{ config('app.name', 'Laravel') }} @{{contents.lp.jumbotron.title2}}</h1>
    <p class="lead" v-html="contents.lp.jumbotron.body">
    </p>
    <p>
        <a class="btn btn-lg btn-outline"
            role="button"
            v-if="language == 'ja'"
            href="{{ url('/items?l=ja') }}"
            v-html="contents.lp.jumbotron.btn"
        ></a>
        <a class="btn btn-lg btn-outline"
            role="button"
            v-if="language == 'en'"
            href="{{ url('/items') }}"
            v-html="contents.lp.jumbotron.btn"
        ></a>
    </p>
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
            <p>
                <a class="btn btn-lg btn-success"
                    role="button"
                    v-if="language == 'ja'"
                    href="{{ url('/items?l=ja') }}"
                    v-html="contents.lp.author.btn"
                ></a>
                <a class="btn btn-lg btn-success"
                    role="button"
                    v-if="language == 'en'"
                    href="{{ url('/items') }}"
                    v-html="contents.lp.author.btn"
                ></a>
            </p>
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