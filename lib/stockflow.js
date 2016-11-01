var sf = {};

//a flow is simply a dynamic variable over time
sf.flow = function(v){
	var state = v;
	var callbacks = [];

	function connect(c){
		callbacks.push(c);
		c(state);
	}

	function set(s){
		state = s;
		callbacks.map(function(c){
			c(state);
		});
	}

	function get(){
		return state;
	}

	return {
		connect: connect,
		get: get,
		set: set
	};
};


//a map takes one or more flows and outputs a new flow
sf.map = function(inputflows, transform){
	var state;
	var inputs = [];
	var callbacks = [];

	inputflows.map(function(input){
		var val = input.get();
		inputs.push(val);
		var count = inputs.length-1;

		input.connect(function(updated){
			inputs[count] = updated;
			state = transform.apply(this, inputs);
			callbacks.map(function(c){
				c(state);
			});
		});
	});

	state = transform.apply(this, inputs);

	function connect(c){
		callbacks.push(c);
		c(state);
	}

	function get(){
		return state;
	}

	return {
		connect: connect,
		get: get
	};
};

//a flow is simply a dynamic variable over time
sf.array = function(v){
	var state = v;
	var callbacks = [];

	function connect(c){
		callbacks.push(c);
		c(state.map(function(element){
			return element.get();
		}));
	}

	function set(s){
		state = s;
		callbacks.map(function(c){
			c(state);
		});
	}

	function get(){
		return state;
	}

	return {
		connect: connect,
		get: get,
		set: set
	};
};

//an array can unfold into a flow of flows
sf.unfold = function(array, callback){
	var state;
	var callbacks = [];

	state = array.get().map(function(element){
		var mapping = callback(element);
		mapping.connect(update);
		return mapping;
	});

	function connect(c){
		callbacks.push(c);
		c(state.map(function(element){
			return element.get();
		}));
	}

	function get(){
		return state.map(function(element){
			return element.get();
		});
	}

	function update(){
		callbacks.map(function(c){
			c(state.map(function(element){
				return element.get();
			}));
		});
	}

	return {
		connect: connect,
		get: get
	};
};

//a stock takes an intial state, one or more flows and recursively maps to a new flow
sf.stock = function(init, inputflows, transform){
	var state = init;
	var inputs = [state];
	var callbacks = [];


	inputflows.map(function(input){
		var val = input.get();
		inputs.push(val);
		var count = inputs.length-1;

		input.connect(function(updated){
			inputs[count] = updated;
			inputs[0] = state;
			state = transform.apply(this, inputs);
			callbacks.map(function(c){
				c(state);
			});
		});
	});

	state = transform.apply(this, inputs);

	function connect(c){
		callbacks.push(c);
		c(state);
	}

	function get(){
		return state;
	}

	return {
		connect: connect,
		get: get
	};
};

sf.when = function(testcase, thencase, elsecase) {
	return sf.map([testcase], function(test){
		if(test){
			return thencase.get();
		} else {
			return elsecase.get();
		}
	});
};

//module.exports = sf;
