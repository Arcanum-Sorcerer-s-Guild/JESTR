/**
 * Encapsulates an array or object in a Sharepoint-like data format.
 * @param results The array or object to encapsulate.
 * @returns {Object} A new object in Sharepoint-like format, with the encapsulated data under the 'd' key. If 'results' is an array, the encapsulated data is wrapped in a 'results' key.
 */
const encapsulateLikeSharepoint = (results) => {
  if (Array.isArray(results)) {
    return {
      d: {
        results: results,
      },
    };
  } else {
    return {
      d: results,
    };
  }
};

/**
 * Formats a user object to to a SharePoint-specific structure.
 * @param {Object} user - The user object to format.
 * @returns {Object} The formatted user object.
 */
const formatSharepointUser = (user) => {
  userData = {
    __metadata: {
      id: `https://intelshare.intelink.gov/sites/354RANS/JESTR/_api/Web/GetUserById(${user.Id})`,
      uri: `https://intelshare.intelink.gov/sites/354RANS/JESTR/_api/Web/GetUserById(${user.Id})`,
      type: 'SP.User',
    },
    Groups: {
      __deferred: {
        uri: `https://intelshare.intelink.gov/sites/354RANS/JESTR/_api/Web/GetUserById(${user.Id})/Groups`,
      },
    },
    Id: user.Id,
    IsHiddenInUI: false,
    LoginName: user.LoginName,
    Title: user.Title,
    PrincipalType: 1,
    Email: user.Email,
    IsShareByEmailGuestUser: false,
    IsSiteAdmin: user.IsSiteAdmin,
    UserId: {
      __metadata: {
        type: 'SP.UserIdInfo',
      },
      NameId: user.LoginName.split('|').at(-1),
      NameIdIssuer: 'TrustedProvider:fedvis',
    },
  };
  return userData;
};

/**
 * Check user permissions based on the given parameters.
 * @param {Object} req - The request object.
 * @param {Array} permittedGroups - Groups that are permitted to perform this action.  'User', 'Author', 'Site Admin', and/or 'Approver'
 * @param {Number} requiredUserId - If Author is permitted, this is the AuthorId of the item.
 * @returns {Number} - Return 401 if user is not logged in, 403 if user does not have permission.
 */
const checkPermissions = (
  req,
  permittedGroups = ['User'], // 'User', 'Author', 'Site Admin', and/or 'Approver'
  requiredUserId,
) => {

  const userGroups = [];

  if (!req.session.user) {
    return 401;
  } else {
    userGroups.push('User');
  }
  
  if (requiredUserId && requiredUserId == req.session.user.Id) {
    userGroups.push('Author');
  }
  if (req.session.user.IsSiteAdmin) {
    userGroups.push('Site Admin');
  }
  if (req.session.user.IsApprover) {
    userGroups.push('Approver');
  }
  
  // Site Admin is always allowed
  const allowedGroups = new Set([...permittedGroups, 'Site Admin']);
  if (userGroups.some((userGroup) => allowedGroups.has(userGroup))) {
    return;
  } else {
    return 403;
  }
};

module.exports = {
  encapsulateLikeSharepoint,
  formatSharepointUser,
  checkPermissions,
};
