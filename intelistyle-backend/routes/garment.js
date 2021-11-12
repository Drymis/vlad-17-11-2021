var express = require('express');
var router = express.Router();
const Garment = require('../models/garment');

/**
    * Get garments
    *
    * @api {get} /garment
    * 01. Get Garments
    *
    * @apiName  GarmentsSearch
    * @apiGroup Garments
    *
    * @apiSuccess Garments Garments list
    *
    * @apiSuccessExample Success-Response:
    *     HTTP/1.1 200 OK
    *     [
            {
              "_id": "6187b07a103b24f25ce939cb",
              "product_categories_mapped": [
                  "99"
              ],
              "product_id": 735718920,
              "source": "H&M",
              "url": "https://api.shopstyle.com/action/apiVisitRetailer?id=735718920&pid=uid8521-40402211-57",
              "gender": "men",
              "price": 12.99,
              "product_description": "Cap in woven fabric with an appliqué at front. Adjustable plastic fastener at back.colour:  Black",
              "image_urls": [
                  "https://img.shopstyle-cdn.com/pim/08/dc/08dc1cb105bb50f35662db5f016b62c3_best.jpg"
              ],
              "product_imgs_src": [
                  "https://img.shopstyle-cdn.com/pim/08/dc/08dc1cb105bb50f35662db5f016b62c3_best.jpg"
              ],
              "discount": 38,
              "product_categories": [
                  "mens-accessories"
              ],
              "images": [
                  {
                      "_id": "6187b884b0c85ee9f90208be",
                      "url": "https://img.shopstyle-cdn.com/pim/08/dc/08dc1cb105bb50f35662db5f016b62c3_best.jpg",
                      "path": "full/b23b28f66e03555919d44d9ba49f78c79fbf978e.jpg",
                      "checksum": "044ac57e70dc288239cde6a05adf4816"
                  }
              ],
              "position": [
                  "front"
              ],
              "product_title": "H&M - Cap with Applique - Black",
              "brand": "H&M",
              "currency_code": "USD",
              "stock": 1
            } 
          ]
    *
    * @apiErrorExample Error-Response:
    *     HTTP/1.1 400 BadRequestHttpException
    *     {
    *       "error": "No garment found"
    *     }
    */
router.get('', function (req, res, next) {
  const search = req.query.search;
  let findParams = {};
  if (search) {
    // matches any word at any place in the product_title
    let regexExpr = '';
    search.split(' ').forEach(element => {
      regexExpr += `(?=.*${element})`;
    });
    regexExpr += '.*';
    findParams = {product_title: { $regex : regexExpr, $options: 'gi' }};
  }

  Garment.find(findParams)
    .limit(100)
    .exec(function (err, docs) { 
      if (err) {
        res.status(400).json({message: err.message});
      } else {
        res.status(200).json(docs); 
      }
    });
});

module.exports = router;