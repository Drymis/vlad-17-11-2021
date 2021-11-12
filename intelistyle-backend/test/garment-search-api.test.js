const GarmentModel = {garment} = require("../models/garment");

module.exports = function (app, request, data) {
    
    mongoToJSTypes = {
        'ObjectID': 'string',
        'String': 'string',
        'Number': 'number',
        'Array': 'object',
        'Object': 'object'
    };
    baseBody = null;
    keyword = null;
    keywords = null;
    invertedKeywords = null;
    partialKeywords = null;

    describe(`----- GarmentsSearch -----`, () => {
        
        // Validates that response corresponds to Garment model
        it('Schema is valid', (done) => {
            request(app)
                .get(`${data.baseRoute}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((response) => {
                    baseBody = response.body;
                    if (!Array.isArray(baseBody)) {
                        throw new Error(`Expected body containing an array of Garment`);
                    }
                    baseBody.forEach(garmentElement => {
                        Object.keys(garmentElement).forEach(garmentKey => {
                            const expectedType = GarmentModel.schema.paths[garmentKey].instance;
                            const actualType = typeof(garmentElement[garmentKey]);
                            const mappedExpectedType = mongoToJSTypes[expectedType];
                            if (!mappedExpectedType) {
                                throw new Error(`Unmapped type ${expectedType} in test's mongoToJSTypes`);
                            }
                            if (mappedExpectedType !== actualType) {
                                throw new Error(`Invalid type for property ${garmentKey} in ${garmentElement}\nExpected type ${mappedExpectedType}\nActual type ${actualType}`);
                            }
                        });
                    });
                })
                .end((err) => {
                    if (err) throw (err);
                    done();

                    // assigning keywords for subsequential tests
                    baseBody.find((el) => {
                        const splitProductTitle = el.product_title.split(' ');
                        const searchKeywords = [];
                        splitProductTitle.forEach(productTitleWord => {
                            if (productTitleWord.length > 3) {
                                searchKeywords.push(productTitleWord);
                            }
                        });
                        if (searchKeywords.length > 1) {
                            keywords = `${searchKeywords[0]} ${searchKeywords[1]}`;
                            invertedKeywords = `${searchKeywords[1]} ${searchKeywords[0]}`;
                            keyword = `${searchKeywords[0]}`;
                            partialKeywords = `${searchKeywords[0].substring(0, searchKeywords[0].length - 1)} ${searchKeywords[1]}`;
                            return true;
                        } else {
                            return false;
                        }
                    });
                });
        });

        // Validates that API only returns Garments having product_title containing the word in search
        it('Full word search (single)', (done) => {
            request(app)
                .get(`${data.baseRoute}?search=${keyword}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((response) => {
                    const body = response.body;
                    body.forEach(garmentElement => {
                        if (!garmentElement.product_title.toLowerCase().includes(keyword.toLowerCase())) {
                            throw new Error(`Not all returned results contain the searched keyword`);
                        }
                    });
                })
                .end((err) => {
                    if (err) throw (err);
                    done();
                });
        });

        // Validates that API only returns Garments having product_title containing all words in search
        it('Full word search (multiple)', (done) => {
            request(app)
                .get(`${data.baseRoute}?search=${keywords}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((response) => {
                    const body = response.body;
                    body.forEach(garmentElement => {
                        const splitKeywords = keywords.split(' ');
                        splitKeywords.forEach(splitKeyword => {
                            if (!garmentElement.product_title.toLowerCase().includes(splitKeyword.toLowerCase())) {
                                throw new Error(`Not all returned results contain the searched keywords`);
                            }
                        });
                    });
                })
                .end((err) => {
                    if (err) throw (err);
                    done();
                });
        });

        // Validates that API only returns Garments having product_title containing all words in search (inverted words orders)
        it('Full word search (inverted words order)', (done) => {
            request(app)
                .get(`${data.baseRoute}?search=${invertedKeywords}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((response) => {
                    const body = response.body;
                    body.forEach(garmentElement => {
                        const splitKeywords = keywords.split(' ');
                        splitKeywords.forEach(splitKeyword => {
                            if (!garmentElement.product_title.toLowerCase().includes(splitKeyword.toLowerCase())) {
                                throw new Error(`Not all returned results contain the searched keywords`);
                            }
                        });
                    });
                })
                .end((err) => {
                    if (err) throw (err);
                    done();
                });
        });

        // Validates that API returns at least one Garment having product_title containing all words while partially searching
        it('Partial word search (multiple)', (done) => {
            request(app)
                .get(`${data.baseRoute}?search=${partialKeywords}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((response) => {
                    const body = response.body;
                    body.forEach(garmentElement => {
                        const splitKeywords = keywords.split(' ');
                        splitKeywords.forEach(splitKeyword => {
                            if (!garmentElement.product_title.toLowerCase().includes(splitKeyword.toLowerCase())) {
                                throw new Error(`Not all returned results contain the searched keywords`);
                            }
                        });
                    });
                })
                .end((err) => {
                    if (err) throw (err);
                    done();
                });
        });

        // Validates that API returns Garments by doing a case insensitive search
        it('Case insensitive search', (done) => {
            request(app)
                .get(`${data.baseRoute}?search=${keywords.toUpperCase()}`)
                .set('Accept', 'application/json')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect((response) => {
                    const body = response.body;
                    body.forEach(garmentElement => {
                        const splitKeywords = keywords.split(' ');
                        splitKeywords.forEach(splitKeyword => {
                            if (!garmentElement.product_title.toLowerCase().includes(splitKeyword.toLowerCase())) {
                                throw new Error(`Not all returned results contain the searched keywords`);
                            }
                        });
                    });
                })
                .end((err) => {
                    if (err) throw (err);
                    done();
                });
        });

    });

};