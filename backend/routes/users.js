const router = require('express').Router();
const {
  avatarValidation,
  userIdParamsValidation,
  patchUserDataValidation,
  handleValidationErrors,
} = require('../validation/validation');

const {
  getUsers,
  getUserById,
  getUserData,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.patch(
  '/me/avatar',
  avatarValidation,
  handleValidationErrors,
  updateUserAvatar,
);

router.patch(
  '/me',
  patchUserDataValidation,
  handleValidationErrors,
  updateUserProfile,
);

router.get('/me', getUserData);

router.get(
  '/:userId',
  userIdParamsValidation,
  handleValidationErrors,
  getUserById,
);

router.get('', getUsers);
module.exports = router;
