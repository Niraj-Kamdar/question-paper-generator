from flask import Blueprint, render_template

errors = Blueprint('errors', __name__)


@errors.app_errorhandler(404)
def error_404(error):
    """Display error
    
    Arguments:
        error {object} -- Detects error
    
    Returns:
        HTML -- An error page for HTTP 404(not found) error code.Handles error and render custom HTML page for that error.
    """
    return render_template('errors/404.html'), 404


@errors.app_errorhandler(403)
def error_403(error):
    """Display error
    
    Arguments:
        error {object} -- Detects error
    
    Returns:
        HTML -- An error page for HTTP 403 error code.Handles error and render custom HTML page for that error.
    """
    return render_template('errors/403.html'), 403


@errors.app_errorhandler(500)
def error_500(error):
    """Display error
    
    Arguments:
        error {object} -- Detects error
    
    Returns:
        HTML -- An error page for HTTP 500 error code.Handles error and render custom HTML page for that error.
    """
    return render_template('errors/500.html'), 500
