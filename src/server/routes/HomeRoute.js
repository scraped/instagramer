const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const express = require('express');

function index(app, controller) {
    app.get('/', function (req, res) {
        return fs.readFile(
            path.resolve(__dirname, './../../resources/home.handlebars'),
            (err, data) => {
                let template = handlebars.compile(data.toString());
                let homePage = template({
                    bundle: 'bundle.js',
                    isProductionMode: (process.env.NODE_ENV === 'production')
                });
                res.header('Content-Type', 'text/html');
                res.end(homePage);
            });
    });
    app.get('/login', function (req, res) {
        return fs.readFile(
            path.resolve(__dirname, './../../resources/home.handlebars'),
            (err, data) => {
                let template = handlebars.compile(data.toString());
                let homePage = template({
                    bundle: 'bundle.js',
                    isProductionMode: (process.env.NODE_ENV === 'production')
                });
                res.header('Content-Type', 'text/html');
                res.end(homePage);
            });
    });
    app.use('/admin*', function (req, res) {
        return fs.readFile(
            path.resolve(__dirname, './../../resources/home.handlebars'),
            (err, data) => {
                let template = handlebars.compile(data.toString());
                let homePage = template({
                    bundle: 'bundle.js',
                    isProductionMode: (process.env.NODE_ENV === 'production')
                });
                res.header('Content-Type', 'text/html');
                res.end(homePage);
            });
    });
    app.use('/manager*', function (req, res) {
        return fs.readFile(
            path.resolve(__dirname, './../../resources/home.handlebars'),
            (err, data) => {
                let template = handlebars.compile(data.toString());
                let homePage = template({
                    bundle: 'bundle.js',
                    isProductionMode: (process.env.NODE_ENV === 'production')
                });
                res.header('Content-Type', 'text/html');
                res.end(homePage);
            });
    });
}

module.exports.index = index;