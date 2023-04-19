<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

//use App\Transformers\User\UserResource;


class UserController extends Controller
{

    private $user;
    public $token = true;

    public function __construct(User $user){
        $this->user = $user;
        return $this;
    }


    /**
     * Store a newly created resource in storage.
     */
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',  
            'repassword' => 'required|same:password', 
        ]);

        $user = new User();
        $user->create($validated);
        
        if ($this->token) {
            return $this->login($request);
        }
        
        // try {
        //     $token = JWTAuth::attempt($validated);
        //     $message = "Token created.";
        // } catch (JWTException $e) {
        //     $token = false;
        //     $message = "Could not create token.";
        // }
        
        // return new UserResource(['user' => $user, 'token' => $token]);
        return response()->json([
            'success' => true,
            'user' => $user
        ], Response::HTTP_OK);        
    }

    /**
     * Login the user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        try {
            $token = $this->user->login($credentials);

        } catch (\Throwable | \Exception $e) {
            return response()->json(
                [
                'success' => false,
                'message' => $e->getMessage(),
                ], 
                Response::HTTP_UNAUTHORIZED
            );
        }
        return response()->json(
            [
                'success' => true,
                'token' => $token,
            ], 
            Response::HTTP_OK
        );
    }


    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
  
        try {
            JWTAuth::invalidate($request->token);
  
            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }    

    public function getUser(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);
  
        $user = JWTAuth::authenticate($request->token);
  
        //return response()->json(['user' => $user]);
        return new UserResource($user,array('type' => 'user','route' => 'users.user'));
    }
 
}
