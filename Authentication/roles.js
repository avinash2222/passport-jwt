const Role = require('../models/role');

// server/roles.js
const AccessControl = require("accesscontrol");
const roles = async () => {
  try {
    var grantList = await Role.find().select('role resource action attributes -_id').lean()
    .then(data => { return data; });
    const ac = new AccessControl(grantList);
    return ac;
  } catch (e) {
      console.error(e);
  }
};

roles();
module.exports={
  roles : roles
};






//----------------------------------------------------------------------------------
// grant list fetched from DB (to be converted to a valid grants object, internally)
  // let grantList = [
  //   { role: 'user', resource: 'profile', action: 'create:own', attributes: '*, !views' },
  //   { role: 'user', resource: 'profile', action: 'read:any', attributes: '*' },
  //   { role: 'user', resource: 'profile', action: 'update:own', attributes: '*, !views' },
  //   { role: 'user', resource: 'profile', action: 'delete:own', attributes: '*' },

  //   { role: 'pujari', resource: 'profile', action: 'create:own', attributes: '*, !rating, !views' },
  //   { role: 'pujari', resource: 'profile', action: 'read:any', attributes: '*' },
  //   { role: 'pujari', resource: 'profile', action: 'update:own', attributes: '*, !rating, !views' },
  //   { role: 'pujari', resource: 'profile', action: 'delete:own', attributes: '*' }
  // ];
  // console.log(grantList)
  // const ac = new AccessControl(grantList);
  // return ac;