/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	// Signup for a user account

	signup: function(req, res) {
		var Passwords = require('machinepack-passwords');

		// Encrypt a string using the BCrypt algorithm.
		Passwords.encryptPassword({
			password: req.param('password'),
			difficulty: 10
		}).exec({
			// An unexpected error occurred.
			error: function (err){
			 return res.negotiate(err);
			},
			// OK.
			success: function (encryptedPassword){
				var Gravatar = require('machinepack-gravatar');

				// Build the URL of a gravatar image for a particular email address.
				Gravatar.getImageUrl({
					emailAddress: req.param('email')
				}).exec({
					error: function(err){
						return res.negotiate(err);
					},
					success: function(gravatarUrl){
						// Creating the user
						User.create({
							name: req.param('name'),
							title: req.param('title'),
							email: req.param('email'),
							encryptedPassword: encryptedPassword,
							lastLoggedIn: new Date(),
							gravatarUrl: gravatarUrl
						}, function userCreated(err, newUser) {
							if (err) {

								console.log('err: ', err);
								console.log('err.invalidAttributes: ', err.invalidAttributes);

								if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {
									return res.emailAddressInUse();
								}

								// Otherwise send back something reasonable as our error response
								return res.negotiate(err);
							}

							// Send back theid of the new userCreated
							return res.json({
								id: newUser.id
							});
						});
					}
				});
			}
		});

	}

};
