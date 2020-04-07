const Role = require('../models/role');
function RoleController(){

}

//Create permission
RoleController.prototype.create = (req, res, next) => {
    if (!req.body) {
        return res.status(400).send({ message: "Details could not be empty" });
    } else {
        const {...data} = req.body;
        const {role, resource, action, attributes} = data;       
        Role.update(
        { role : role, resource : resource, action : action, attributes : attributes },   // Query parameter
        {     // Replacement document
            role : role,
            resource : resource,
            action : action,
            attributes : attributes,
        },
        { upsert: true },
        ((err, data)  => {
            if (data) res.status(200).send({message : "permission created successfully!"});
            else next(err);
        }));
    }          
};

//Retrive  All permissions
RoleController.prototype.findAll = (req, res) => {
    Role.find().select('role resource action attributes')
    .then(roles => {
      if (roles.length!=0) res.status(200).send(roles);
      else res.status(400).send({message : "Permission not found, create new permission!"});
    }).catch(err => {
        console.error("Details are Not retrived", err.message);
        res.status(500).send({
            message : err.message || "Details are not retrived"
        });   
    });
};

//find all permission of a type user
RoleController.prototype.find = (req, res) => {
    const { type } = req.body;
    Role.find({ role : type })
    .then(roles => {
        if( roles.length == 0 )
            res.status(500).send({ message : "Permission not found!" });
        else res.status(200).send(roles);
    }).catch(err => {
        console.error("permission details not found", err.message);
        res.status(500).send({
            message : `Error:${err.message}`
        });
    });
};

//Update permission
RoleController.prototype.update = (req, res) => {
    const {_id} = req.params;
    const {role, resource, action, attributes} = req.body;
    Role.findOneAndUpdate({_id},{role : role, resource : resource, action : action, attributes : attributes}, {new : true})
    .then(emp => {
        if( emp.length == 0 )
            res.status(500).send({ message :"permission not found, Invalid operation!" });
        else res.status(201).send(emp);
    }).catch(err => {
        console.error("permission details not matched", err.message);
        res.status(500).send({ message : `Error:${err.message}`});
    });    
};

//Delete permission
RoleController.prototype.delete = (req, res) => {    
    const {_id} = req.params;
    Role.findOneAndRemove({_id})
    .then(emp => {
        if (emp.length==0) {
            res.status(500).send({
                message :"permission not found, Invalid operation!"
            });
        } else res.status(200).send({message : "permission successfully removed"});
    }).catch( err => {
        console.error("permissionData not matched", err.message);
        res.status(500).send({ message : `Error:${err.message}`});
    });
};


var roleController = new RoleController();
module.exports = roleController;
