const withAuth = (req, res, next) => {
	if (!req.session.logged_in) {
		res.redirect("/login");
	} else {
		next();
	}
};

export default withAuth;
