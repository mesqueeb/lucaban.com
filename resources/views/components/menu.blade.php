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
        <li class="nav-item" v-if="false">
            <a class="nav-link" href="#about">@{{ contents.menu.about }}</a>
        </li>
        <li class="nav-item" v-if="false">
            <a class="nav-link" href="#author">@{{ contents.menu.author }}</a>
        </li>
        @if (Route::has('login'))
            @if (Auth::check())
                <li class="nav-item">
                    <a class="nav-link"
                        href="{{ url('/items') }}"
                        v-if="language == 'en'"
                    >@{{ contents.menu.myList }}</a>
                    <a class="nav-link"
                        href="{{ url('/items?l=ja') }}"
                        v-if="language == 'ja'"
                    >@{{ contents.menu.myList }}</a>
                </li>
            @else
                <li class="nav-item">
                <a class="nav-link" href="{{ route('login') }}">
                        @{{ contents.menu.login }}
                        {{-- @lang('menu.login') --}}
                </a>
{{--                 <a class="nav-link" href="{{ route($currentLanguage.'.login') }}">
                        @lang('menu.login')
                </a>
 --}}                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ url('/register') }}">@{{ contents.menu.register }}</a>
                </li>
            @endif
        @endif
    </ul>
</nav>