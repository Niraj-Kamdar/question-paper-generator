from flask import Blueprint, render_template

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(404)
def error_404(error):
    """Display error
    
    Arguments:
        error {object} -- Detects error
    
    Returns:
        render template -- Display an error of 404
    """
    return render_template('errors/404.html'), 404


@errors.app_errorhandler(403)
def error_403(error):
    """Display error
    
    Arguments:
        error {object} -- Detects error
    
    Returns:
        render template -- Display an error of 403
    """
    return render_template('errors/403.html'), 403


@errors.app_errorhandler(500)
def error_500(error):
    """Display error
    
    Arguments:
        error {object} -- Detects error
    
    Returns:
        render template -- Display an error of 500
    """
    return render_template('errors/500.html'), 500
