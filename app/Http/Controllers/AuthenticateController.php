<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Validator;
use App\User;
use App;
use Lang;

class AuthenticateController extends Controller
{
	public function __construct()
	{
		// 
	}
    public function login(Request $request)
    {
        App::setLocale($request->locale);
        // grab credentials from the request
        $credentials = $request->only('email', 'password');
        try
        { // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials))
            {
                $err = Lang::get('auth.failed');
                return response()->json(['error' => $err], 401);
            }
        }
        catch (JWTException $e)
        { // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        } // all good so return the token
        return response()->json(compact('token'));
    }
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6|confirmed',
        ]);
    }
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
    /**
     * Get the guard to be used during registration.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    public function register(Request $request)
    {
        App::setLocale($request->locale);
        // grab credentials from the request
        $credentials = $request->only('email', 'password', 'password_confirmation', 'name');
        $this->validator($credentials)->validate();

        event(new Registered($user = $this->create($credentials)));

        try
        { // create token for the the registered user
	        $token = JWTAuth::fromUser($user);
        }
        catch (JWTException $e)
        { // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        } // all good so return the token
        return $token;
    }
    public function logout(Request $request)
    {
        JWTAuth::invalidate($request->only('token')['token']);
    }
    public function refreshToken(Request $request)
    {
        $newToken = JWTAuth::refresh($request->only('token')['token']);
        $minutes = $path = $domain = null;
        $domain = 'http://localhost:8080';
        $secure = $httpOnly = true;
        // return $newToken;
        return response($newToken)
		        // ->cookie('token', $newToken, $minutes, $path, $domain, $secure, $httpOnly)
		        ->header('Set-Cookie', 'token='.$newToken.'; Secure; HttpOnly;');
    }
    public function getAuthenticatedUser(Request $request)
	{
	    try
	    {
	        if (! $user = JWTAuth::parseToken()->authenticate())
	        {
	            return response()->json(['user_not_found'], 404);
	        }
	    }
	    catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e)
	    {
	        return response()->json(['token_expired'], $e->getStatusCode());
	    }
	    catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e)
	    {
	        return response()->json(['token_invalid'], $e->getStatusCode());
	    }
	    catch (Tymon\JWTAuth\Exceptions\JWTException $e)
	    {
	        return response()->json(['token_absent'], $e->getStatusCode());
	    } // the token is valid and we have found the user via the sub claim
	    return response()->json(compact('user'));
	}
}