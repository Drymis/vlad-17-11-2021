var app = require('../app');
var request = require('supertest');
var GarmentSearchApiTest = require('./garment-search-api.test');

new GarmentSearchApiTest(app, request, {
    modelName: "Garment",
    baseRoute: "/garment",
    jsonObjects: {
    }
});
