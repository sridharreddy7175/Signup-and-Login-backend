var productData = require("../models/product");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");
const multer = require("multer");
const shortid = require("shortid");

exports.getproduct = (req, res) => {
  productData.Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// exports.createproduct = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;

//   form.parse(req, (err, fields, file) => {
//     if (err) {
//       return res.status(400).json({
//         error: "problem with image"
//       });
//     }
//     //destructure the fields
//     const { productName, productDescription, productPrice, productBrand} = fields;

//     if (!productName || !productBrand || !productDescription || !productPrice) {
//       return res.status(400).json({
//         error: "Please include all fields"
//       });
//     }

//     let product = new  productData.Product(fields);

//     //handle file here
//     if (file.photo) {
//       if (file.photo.size > 4000000) {
//         return res.status(400).json({
//           error: "File size too big!"
//         });
//       }
//       product.photo.data = fs.readFileSync(file.photo.path);
//       product.photo.contentType = file.photo.type;
//     }
//     // console.log(product);

//     //save to the DB
//     product.save((err, product) => {
//       if (err) {
//         res.status(400).json({
//           error: "Saving tshirt in DB failed"
//         });
//       }
//       res.json(product);
//     });
//   });
// };

exports.createproduct = (req, res) => {
  // res.status(200).json({
  //   file:req.file,body:req.body
  // })
  const {
    productName,
    productBrand,
    productDescription,
    productPrice,
  } = req.body;

  let productPicture = [];

  if (req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const product = new productData.Product({
    productName: productName,
    productBrand,
    productDescription,
    productPrice,
    productPicture,
  });
  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({
        product,
      });
    }
  });
};

//Get Id
exports.getoneproduct = (req, res) => {
  var id = req.params.id;
  productData.Product.find({ _id: id })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//Update Id

exports.updateproduct = (req, res) => {
  console.log(req.body);
  console.log(req.files);

  // const {
  //   productName,
  //   productBrand,
  //   productDescription,
  //   productPrice,
  // } = req.body;

  // let productPicture = [];

  // if (req.files.length > 0) {
  //   productPicture = req.files.map((file) => {
  //     return { img: file.filename };
  //   });
  // }

  // const product = new productData.Product({
  //   productName: productName,
  //   productBrand,
  //   productDescription,
  //   productPrice,
  //   productPicture,
  // });

  var id = req.params.id;
  console.log(id);
  //console.log(product);
  productData.Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.deleteproduct = (req, res) => {
  var id = req.params.id;
  productData.Product.findByIdAndDelete({ _id: id })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
exports.getproductsort = (req, res) => {
  productData.Product.find()
    .sort({ key: 1 })
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

//Searching for a ProductName
// router.get("/search/:productName", (req, res) => {
//   var regex = new RegExp(req.params.productName, "i");
//   signupData.Product.find({ productName: regex }).then((result) => {
//     res.status(200).json(result);
//   });
// });
exports.getSearch = (req, res) => {
  var regex = new RegExp(req.params.productName, "i");
  productData.Product.find({ productName: regex })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};
