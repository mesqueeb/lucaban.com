<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapWWWRoutes();
        $this->mapWebRoutes();
        $this->mapApiRoutesJWTAuth();
        $this->mapApiRoutesAuth();
        $this->mapCustomRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::domain(substr(env('SESSION_DOMAIN'),1))
            ->middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }
    protected function mapWWWRoutes()
    {
        Route::domain('www'.env('SESSION_DOMAIN'))
            ->middleware('web')
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }
    protected function mapCustomRoutes()
    {
            Route::namespace($this->namespace)
            ->group(base_path('routes/customroutes.php'));
    }
    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutesJWTAuth()
    {
            Route::domain('api'.env('SESSION_DOMAIN'))
            ->namespace($this->namespace)
            ->middleware(['api', 'jwt.auth', 'cors'])
            ->group(base_path('routes/api.php'));
    }
    protected function mapApiRoutesAuth()
    {
            Route::prefix('api')
            ->namespace($this->namespace)
            ->middleware(['web', 'auth'])
            ->group(base_path('routes/api.php'));
    }
}