# HomingDevice

James Yuzawa: 
[http://www.jyuzawa.com](http://www.jyuzawa.com/)

Released under MIT License

A tiny JavaScript class which demands a certain accuracy. This is espcially useful when getCurrentPosition performs poorly.

## Options

| **key**                    | **type**             | **default value** | **description**                                                       |
|:---------------------------|:---------------------|:------------------|:---------------------------------------------------------------------|
| `accuracy`                   | int (meters)             | `500`              | The number of meters to use a threshold for accuracy |
| `timeout`                    | int (ms)    | `10000`             | The number of milliseconds to wait before giving up an using an inaccurate position or to give up after not being able to obtain a position. |
| `done`                 | function(position)             | prints to console              | A success callback, receives Geoposition object. |
| `update`                 | function(position)             | do nothing             | An incremental callback, receives Geoposition object. |
| `error`                 | function(error)             | prints to console              | A failure callback, receives error object. |

## Usage

Simplest Demo:

	// make device
	var d = new HomingDevice();
	// run the device, defaultly prints output to console
	d.run();

Longer Demo:

	// make device with settings
	var d = new HomingDevice({
		done: function(p){
			alert("You are at ("+p.coords.latitude+","+p.coords.longitude+") with accuracy "+p.coords.accuracy+" m.");
		},
		error: function(e){
			alert("There was an error!")
		},
		accuracy: 100
	});

	// run the device
	d.run();

	// cancel the device
	d.cancel();

	// change settings
	d.set('accuracy',200);
	// run again, will use new settings
	d.run();

	d.run(function(foo){
		alert("This is overrides the default callback specified in the settings");
	});

Another Simple Demo:

    
A usage demo is implemented in full in `index.html`.

## Notes

* The run() method returns false if there browser lacks geolocation capabilities.
* The accuracy has a lower bound of 25 meters.
* The timeout has a lower bound of 1000 ms.