exports.convertTime = async function(duration) {
	const timeConverter = { "s": 1000, "m": 60000, "h": 3600000, "d": 86400000 };
	console.log(duration.slice(0, -1));
	console.log(duration.slice(-1, ));
	const dur = Math.floor(parseInt(duration.slice(0, -1)) * timeConverter[duration.slice(-1, )]);

	const dateNow = new Date()
	return timestamp = Math.floor((dateNow.getTime() + dur) / 1000);
};

