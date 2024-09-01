from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token
from django.views import View


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"csrfToken": get_token(request)})
