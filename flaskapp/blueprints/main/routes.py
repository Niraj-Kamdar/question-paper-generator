from flask import Blueprint, flash, redirect, render_template, url_for
from flask_login import current_user
from flaskapp.blueprints.main.forms import ContactUs
from flaskapp.blueprints.main.utils import (send_contact_us_email,
                                            send_contact_us_receipt_email)
from flaskapp.utils import profile_path

main = Blueprint("main", __name__)


@main.route("/")
def index():
    """Render Home page

    Returns:
        HTML-- If the current user is authenticated then render to home page of site.
    """
    if current_user.is_authenticated:
        return redirect(url_for("papers.home"))
    return render_template(
        "main/index.html",
        title="Index",
        css_file="css/index.css",
        js_file="js/index.js",
    )


@main.route("/about-us")
def about_us():
    """Render about us page

    Returns:
        HTML  -- It will redirect to about us page.
    """

    return render_template(
        "main/about.html",
        title="About Us",
        css_file="css/main/about.css",
        image_file=profile_path(),
    )


@main.route("/privacy-policy")
def policy_page():
    return render_template(
        "main/privacy-policy.html",
        title="Privacy Policy",
        css_file="css/main/privacy_policy.css",
        image_file=profile_path(),
    )


@main.route("/terms-of-service")
def terms_of_service_page():
    return render_template(
        "main/terms-of-service.html",
        title="Terms Of Service",
        css_file="css/main/terms_of_service.css",
        image_file=profile_path(),
    )


@main.route("/help")
def help_page():
    """Render help page

    Returns:
        HTML - It will redirect to help page.
    """
    return render_template(
        "main/help.html",
        title="Help",
        css_file="css/main/help.css",
        image_file=profile_path(),
    )


@main.route("/contact-us")
def contact_us():
    """Render Contact us page

    Returns:
        HTML-- To collect Info from user for suggestion or bug or any comment about web-app.
    """
    form = ContactUs()
    if form.validate_on_submit():
        data = dict(
            name=form.name.data,
            email=form.email.data,
            mobile=form.mobile.data,
            subject=form.subject.data,
            message=form.message.data,
        )
        send_contact_us_email(**data)
        send_contact_us_receipt_email(**data)
        flash(
            "Your Message has recorded successfully! We will reach out soon.", "success"
        )
        return redirect(url_for("main.contact_us"))
    return render_template(
        "main/contact-us/contact_us_form.html",
        title="Contact Us",
        form=form,
        css_file="css/contact_us/main.css",
        css_file2="css/contact_us/util.css",
        image_file=profile_path(),
    )
