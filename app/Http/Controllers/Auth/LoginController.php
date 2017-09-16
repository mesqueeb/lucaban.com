<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use JWTAuth;
use App\User;


class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected function authenticated(Request $request, User $user){
        $token = JWTAuth::fromUser($user);
        $domain = env('APP_SCHEME').'listo.'.env('APP_URLBASE');
        return redirect($domain.'?token='.$token)
            // Cookie not recognized on the subdomain...
            ->cookie(
                'access_token', $token, 100, null, $domain, true, true
            );
    }
    // protected function redirectTo()
    // {
    // }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->redirectTo = route('listo');
        $this->middleware('guest', ['except' => 'logout']);
    }
}
