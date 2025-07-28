<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        $user = $request->user();

        if (in_array($user->role, $role)) {
            return $next($request);
        }

        switch ($user->role) {
            case 'admin':
                return to_route('dashboard');

            case 'outsourcing':
            case 'penerima_layanan':
            case 'atasan':
                return to_route('evaluator.card');

            default:
                return redirect('/');
                break;
        }
    }
}
