<?php

namespace App\Http\Middleware;

use Closure;
use Request;

class SubdomainCORSMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $ref = Request()->headers->get('origin');
        $domainBase = env('SESSION_DOMAIN'); // .lucaban.com
        $domainBase = substr($domainBase,1);
        $domainBase = preg_replace('#\.#','\.',$domainBase);
        // $domainBase;
        $matches = [];

        if(preg_match('#^(https?://(?:.+\.)?'.$domainBase.'(?::\d{1,5})?)#',$ref,$matches)){
          $response->headers->set('Access-Control-Allow-Origin',$matches[0]);
          $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
          $response->headers->set('Access-Control-Allow-Headers', 'Origin , Content-Type, X-Auth-Token, X-CSRF-TOKEN, Authorization, Accept, X-Requested-With');
        }
        else
        {
            $response->headers->set('X-DEBUG','FAILED');
        }    
                return $response;
    }
}