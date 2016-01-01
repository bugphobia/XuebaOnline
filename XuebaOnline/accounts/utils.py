from functools import wraps
import json
from django.http import JsonResponse
from django.utils.decorators import available_attrs

def login_required(func):
    """
    Decorator for views that checks that the user user is logged in,
    returning error message if nessary
    """

    def decorator(view_func):
        @wraps(view_func, assigned=available_attrs(view_func))
        def _wrapped_view(request, *args, **kwargs):
            if request.user.is_authenticated():
                return view_func(request, *args, **kwargs)
            return JsonResponse({'state':'failed',
                                 'errors':['Login Required']})
        return _wrapped_view
    return decorator(func)
