from django.contrib.auth import views as auth_views
from django.shortcuts import render, redirect
from .forms import RegisterForm

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save() # This saves the new user
            return redirect('login') # We will create the 'login' page next
    else:
        form = RegisterForm()

    context = {'form': form}
    return render(request, 'users/register.html', context)