function HomingDevice(options){
    var settings = {
        accuracy: 500, // int
        timeout: 10000, // int
        done: function(p){ console.log("HomingDevice Location:",p.coords); }, // function
        update: function(){}, // function
        error: function(e){ console.log("HomingDevice Error:",e); }, // function
    };
    var watcher, timer, lastPosition;
    var self = this;
    self.position = {};
    for(var currentOption in options){
        settings[currentOption] = options[currentOption];
    }
    settings.timeout = Math.max(settings.timeout,1000);
    settings.accuracy = Math.max(settings.accuracy,25);
    
    this.run = function(callback){
        if(navigator.geolocation){
            timer = window.setTimeout(function(){
                navigator.geolocation.clearWatch(watcher);
                self.position = lastPosition;
                if(typeof callback == "function"){
                    callback(lastPosition);
                }else{
                    settings.done(lastPosition);
                }
            }, (settings.timeout + 1000));
            watcher = navigator.geolocation.watchPosition(
                function(currentPosition){
                    settings.update(currentPosition);
                    lastPosition = currentPosition;
                    if(currentPosition.coords.accuracy <= settings.accuracy){
                        window.clearTimeout(timer);
                        navigator.geolocation.clearWatch(watcher);
                        self.position = lastPosition;
                        if(typeof callback == "function"){
                            callback(lastPosition);
                        }else{
                            settings.done(lastPosition);
                        }
                    }
                },
                function(e){
                    window.clearTimeout(timer);
                    navigator.geolocation.clearWatch(watcher);
                    settings.error(e);
                },
                { enableHighAccuracy: true, timeout: settings.timeout });
            return true;
        }else{
            settings.error();
            return false;
        }
    };
    this.cancel = function(){
        window.clearTimeout(timer);
        navigator.geolocation.clearWatch(watcher);
    };
    this.set = function(key, value){
        settings[key] = value;
    };
}