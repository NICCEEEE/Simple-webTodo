#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from flask import (
    Flask,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    Blueprint,
)

from routes.todo import main as todo_routes
from routes.project import main as project_routes
from datetime import timedelta

app = Flask(__name__)
# 设置 secret_key 来使用 flask 自带的 session
# 这个字符串随便你设置什么内容都可以
app.secret_key = 'random string'

"""
在 flask 中，模块化路由的功能由 蓝图（Blueprints）提供
蓝图可以拥有自己的静态资源路径、模板路径（现在还没涉及）
用法如下
"""
# 注册蓝图
# 有一个 url_prefix 可以用来给蓝图中的每个路由加一个前缀
app.register_blueprint(todo_routes, url_prefix='/todo')
app.register_blueprint(project_routes)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/favicon.ico')
def favico():
    with open('favicon.ico', 'rb') as f:
        return b''.join(f.readlines())


# 运行代码
if __name__ == '__main__':
    # debug 模式可以自动加载你对代码的变动, 所以不用重启程序
    # host 参数指定为 '0.0.0.0' 可以让别的机器访问你的代码
    config = dict(
        debug=True,
        host='0.0.0.0',
        port=80,
    )
    app.config['SEND_FILE_MAX_AGE_DEFAULT'] = timedelta(seconds=1)
    app.run(**config)
