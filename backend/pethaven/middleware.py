from django.middleware.csrf import CsrfViewMiddleware

class CustomCSRFMiddleware(CsrfViewMiddleware):
    """
    Custom CSRF middleware that exempts specific authentication endpoints from CSRF protection.
    This allows token-based authentication to work properly with the React frontend.
    """
    
    def process_view(self, request, callback, callback_args, callback_kwargs):
        # Define paths that should be exempt from CSRF protection
        csrf_exempt_paths = [
            '/api/auth/login/',
            '/api/auth/register/',
            '/api/csrf/'
        ]
        
        # Skip CSRF checks for exempt paths - more exact matching and debugging
        for path in csrf_exempt_paths:
            if request.path.endswith(path):
                print(f"CSRF exempt for path: {request.path}")
                # Skip CSRF validation completely for this request
                request._dont_enforce_csrf_checks = True
                return None
        
        print(f"CSRF check for path: {request.path}")
        # For all other paths, apply the regular CSRF protection
        return super().process_view(request, callback, callback_args, callback_kwargs)
