<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use App\User;
use JWTAuth;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */

    use ResetsPasswords;

    /**
     * Where to redirect users after resetting their password.
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
    //     $user = User::where('email',request()->input('email'))->first();
    //     $token = JWTAuth::fromUser($user);
    //     return redirect(env('APP_SCHEME').'listo.'.env('APP_URLBASE'))
    //         ->cookie(
    //             'access_token', $token, 100, null, null, true, true
    //         );
    // }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->$redirectTo = route('login');
        // $this->middleware('guest');
    }
}
