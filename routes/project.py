#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import (
    render_template,
    request,
    flash,
    redirect,
    url_for,
    Blueprint,
)

main = Blueprint('project', __name__)


@main.route('/music')
def music_web():
    # with open('playerweb/music.html', 'rb') as f:
    #     print('Come in')
    #     r = f.read()
    #     return r
    return render_template('music.html')


@main.route('/editor')
def editor_web():
    return render_template('editor.html')


@main.route('/crawler')
def crawler():
    return render_template('crawler.html')


@main.route('/resume')
def resume():
    return render_template('resume.html')
