const express = require('express');
const router = express.Router();
const multer = require('multer');

const userController = require('../controllers/user');
const {fileStorage, fileFilter} = require('../middleware/multerconfig');

const upload = multer({storage: fileStorage, fileFilter: fileFilter});

// /**
//  * @swagger
//  *
//  * definitions:
//  *   NewUser:
//  *     type: object
//  *     required:
//  *       - nameAr
//  *       - nameEn
//  *       - email
//  *       - phone
//  *       - password
//  *       - profileImage
//  *       - location
//  *     properties:
//  *       nameAr:
//  *         type: string
//  *       nameEn:
//  *         type: string
//  *       email:
//  *         type: string
//  *       phone:
//  *         type: string
//  *       password:
//  *         type: string
//  *       profileImage:
//  *         type: string
//  *       location:
//  *         type: [string]
//  *   User:
//  *     allOf:
//  *       - $ref: '#/definitions/NewUser'
//  *       - required:
//  *         - id
//  *       - properties:
//  *         id:
//  *           type: integer
//  *           format: int64
//  */
//
//  /**
//   * @swagger
//   *
//   * /api/register:
//   *   post:
//   *     description: Creates a user
//   *     produces:
//   *       - form-data
//   *     parameters:
//   *       - name: user
//   *         description: User object
//   *         in:  body
//   *         required: true
//   *         type: string
//   *         schema:
//   *           ref: '#/definitions/NewUser'
//   *     responses:
//   *       200:
//   *         description: users
//   *         schema:
//   *           ref: '#/definitions/User'
//   */

router.post('/register', upload.single('image'),userController.registering);
router.post('/login', userController.login);

module.exports = router;
