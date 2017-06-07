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
        $this->mapListoRoutes();
        $this->mapApiRoutes();
        $this->mapWebRoutes();
        $this->mapWWWRoutes();
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
        Route::middleware('web')
            ->domain(substr(env('SESSION_DOMAIN'),1))
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }
    protected function mapWWWRoutes()
    {
        Route::middleware('web')
            ->domain('www'.env('SESSION_DOMAIN'))
            ->namespace($this->namespace)
            ->group(base_path('routes/web.php'));
    }
    protected function mapListoRoutes()
    {   
        Route::group([
            'namespace' => $this->namespace,
            'domain' => 'listo'.env('SESSION_DOMAIN'),
            'middleware' => ['web','auth'],
        ], function(){
            require base_path('routes/listo.php');
        });
    }
    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware(['api','auth'])
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }
}