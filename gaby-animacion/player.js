if(typeof mm_simple_compilation == "undefined"){
    mm_simple_compilation="14-12-2021 16:52:51";
    "true"==psdgetgetpsd("tplib")&&(tplib=!0);function psdgetgetpsd(e,n){n=n||window.location.href,e=e.replace(/[\[\]]/g,"\\$&");var o=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(n);return o?o[2]?decodeURIComponent(o[2].replace(/\+/g," ")):"":null}(function(window) 
    {
        // Generacion del namespace psd.framework
        if(window.psd==undefined) { window.psd = {}; }
        if(window.psd.framework==undefined) { window.psd.framework = {}; }
        if(window.psd.framework.events==undefined) { window.psd.framework.events = {}; }
        if(window.psd.framework.parser==undefined) { window.psd.framework.parser = {}; }
        if(window.psd.framework.mediator==undefined) { window.psd.framework.mediator = {}; }
        if(window.psd.framework.mediator.jsonp==undefined) { window.psd.framework.mediator.jsonp = {}; }
        if(window.psd.framework.utils==undefined) { window.psd.framework.utils = {}; }
        
        window.psd.framework.debug = false;
        
        if(window.location.href.indexOf("mm_debug")!=-1) { window.psd.framework.debug = true; }
        
    })(window);(function()
    {
        // Generacion del namespace psd.framework (por si no esta creado)
        if(window.psd==undefined) { window.psd = {}; }
        if(window.psd.framework==undefined) { window.psd.framework = {}; }
    
        /**
         * navigator.userAgent =>
         * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
         * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
         * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
         * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
         * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
         * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
         * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
         * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
        */
    
        var ua = navigator.userAgent
            , t = true
            , ie = /msie/i.test(ua)
            , ie11 = /.NET/i.test(ua)
            , chrome = /chrome/i.test(ua)
            , safari = /safari/i.test(ua) && !chrome
            , iphone = /iphone/i.test(ua)
            , ipad = /ipad/i.test(ua)
            , android = /android/i.test(ua)
            , opera = /opera/i.test(ua)
            , firefox = /firefox/i.test(ua)
            , gecko = /gecko\//i.test(ua)
            , seamonkey = /seamonkey\//i.test(ua)
            , webkitVersion = /version\/(\d+(\.\d+)?)/i
            , o;
    
        checkWIN7orHigher = function(min){
            var ua = window.navigator.userAgent.match(/NT [0-9.]+/g);
            var version = "";
    
            if(ua==null)
                return false;
    
            ua = ua[0];
    
            for(i=0;i<ua.length;i++){
                if((!isNaN(ua[i]))||(ua[i]=="."))
                    version+=ua[i];
            }
        
            version = parseFloat(version);
        
            if(version>=min)
                return true;
            else
                return false;
        }	
            
        //Sistema operativo
        var appVersion = window.navigator.userAgent
            , win7 = checkWIN7orHigher("6.1") //Windows NT 6.1/i.test(appVersion)
            , winVista = /Windows NT 6.0/i.test(appVersion)
            , ubuntu = /Ubuntu/i.test(appVersion)
            , linux = /Linux/i.test(appVersion)
            , oSX = /Mac OS X/i.test(appVersion);
            
        // Completa la informaciÃ³n sobre el user agent
        function detect() 
        {
            if (ie11){ o = { msie: t, version: 11 }; }
            if (ie) { o = { msie: t, version: ua.match(/msie (\d+(\.\d+)?);/i)[1] }; }
           
            if (chrome) { o = { webkit: t, chrome: t, version: ua.match(/chrome\/(\d+(\.\d+)?)/i)[1]}; }
            
            if (iphone || ipad) 
            {
                o = {webkit: t, mobile: t, ios: t, iphone: iphone, ipad: ipad };
                // WTF: version is not part of user agent in web apps
                if (webkitVersion.test(ua)) { o.version = ua.match(webkitVersion)[1];}
            }
            
            if (android) { o = { webkit: t, android: t, mobile: t, version: "0"/*ua.match(webkitVersion)[1]*/ }; }
            
            if (safari) {  
                var aux = ua.match(webkitVersion);
                if (aux){
                    o = { webkit: t, safari: t, version: aux[1] };
                }			
            }  
            
            if (opera) {  
                var aux = ua.match(webkitVersion);
                if (aux){
                    o = { opera: t, version: aux[1] };
                }			
            }
            
            if (gecko) 
            {
                o = { gecko: t, mozilla: t, version: ua.match(/firefox\/(\d+(\.\d+)?)/i)[1] };
                if (firefox) { o.firefox = t; }
            }
            
            if (seamonkey) { o = { seamonkey: t, version: ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1] }; }
            
            return o;
        }
        
        // Completa la informaciÃ³n sobre el modo de compatibilidad
        function detectCompatibility(ua)
        {
            if (ua.msie && ua.version<9) { return 1; }
            return 0;
        }
    
        function detectMp3AudioCompatible(ua){
            //explorer > 9
            if(ua.msie && ua.version>8) return true;
            if(chrome) return true;
            if (ua.safari && ua.version >= 3.1) return true;
            if ((ua.firefox && ua.version >= 21 && win7) || (ua.firefox && ua.version >= 22 && winVista) || (ua.firefox && ua.version >= 22 && oSX) || (ua.firefox && ua.version >= 22 && linux) || (ua.firefox && ua.version >= 22 && ubuntu)) return true;
    
            return false;
        }
    
        function detectMp4AudioCompatible(ua){
    
            return detectMp3AudioCompatible(ua);
        }
    
        function detectAacAudioCompatible(ua){
    
            return detectMp3AudioCompatible(ua);;
        }
    
        function detectMp4VideoCompatible(ua){
            //explorer > 9
            if(ua.msie && ua.version>8) return true;
            if(chrome) return true;
            if (ua.safari && ua.version >= 3.1) return true;
            if ((ua.firefox && ua.version >= 21 && win7) || (ua.firefox && ua.version >= 22 && winVista) || (ua.firefox && ua.version >= 22 && oSX) || (ua.firefox && ua.version >= 22 && linux) || (ua.firefox && ua.version >= 22 && ubuntu)) return true;
    
            return false;
        }
    
        function detectOggVideoCompatible(ua){
            if(chrome) return true;
            if (ua.firefox && ua.version >= 3.5) return true;
            if (ua.gecko && ua.version > 1.9) return true;
            if (ua.opera && ua.version >= 10.50) return true;
    
            return false;
        }
    
        function detectWebmVideoCompatible(ua){
            //explorer > 9
            if(chrome) return true;
            if (ua.firefox && ua.version >= 4.2) return true;
            if (ua.gecko && ua.version >= 2.0) return true;
            if (ua.opera && ua.version >= 10.60) return true;
    
            return false;
        }
    
    
        function detectAndroidNative(){
    
            var versionMin = 5.0;
    
    
            if (android && safari) {
    
                var nativeBrowser,
                    compatible,
                    androidVersion = ua.match(/Android\s(\d+(\.\d+)?)/i)[1];
    
                // Comprobamos si es navegador nativo
                if (!ie11 && !ie && !chrome && !opera && !gecko && !seamonkey) {
    
                    nativeBrowser = true;
    
                } else {
    
                    nativeBrowser = false;
    
                }
    
                //Comprobamos si la version de android es menor de versionMin
                if (nativeBrowser && androidVersion >= versionMin) {
                    compatible = false;
                } else {
                    compatible = true;
                }
    
                return {compatible: compatible, nativeBrowser: nativeBrowser, androidVersion: androidVersion};
    
            } else {
    
                return {compatible: false};
            }
    
        }
    
        // Inicializamos la informaciÃ³n de user agent
        psd.framework.ua = detect();
    
        // Detectamos si ejecutamos con navegador nativo Android
        psd.framework.androidNativeBrowser = detectAndroidNative();
    
        
        // Detectamos el modo de compatibilidad
        psd.framework.compatibility = detectCompatibility(psd.framework.ua);
    
        psd.framework.mp3AudioCompatible = detectMp3AudioCompatible(psd.framework.ua);
        psd.framework.mp4AudioCompatible = detectMp4AudioCompatible(psd.framework.ua);
        psd.framework.aacAudioCompatible = detectAacAudioCompatible(psd.framework.ua);
    
        psd.framework.mp4VideoCompatible = detectMp4VideoCompatible(psd.framework.ua);
        psd.framework.oggVideoCompatible = detectOggVideoCompatible(psd.framework.ua);
        psd.framework.webmVideoCompatible = detectWebmVideoCompatible(psd.framework.ua);
    
    })();function getDevice()
    {
        var device = {};
                device.agent = navigator.userAgent;
                device.mobile = is_MobileDevice(device.agent);
             
        return device;
    }
    
    function is_MobileDevice(agent)
    {
        var isMobile = (
            (agent.indexOf('iPhone') != -1) ||
            (agent.indexOf('iPod') != -1) ||
            (agent.indexOf('iPad') != -1) ||
            (agent.indexOf('Android') != -1)
        );
        return isMobile;
    }
    
    /*funcion para chequear una palabra que exista en el user Agent*/
    var match_UA = function (data) {
        return (getDevice().agent.toLowerCase().indexOf(data) > -1);
    };
    
    /*detectamos si es necesario HLS nativo , detectamos DAI  TRUE = HLS-html5  /  FALSE = RealHLS*/
    function checkNativeHLS(isDAI) {
    
        var _debug = function (data) {
    
            if (psd.framework.debug) {
                console.log('[checkNativeHLS]', data);
            }
        };
    
    
        /**Si es un dispositivo movil**/
        if (getDevice().mobile) {
    
            /*Comprobamos si esta activado DAI*/
            if (isDAI) {
    
                /*Comprobamos si es un dispositivo IOS en caso contrario sera un Android*/
                if (match_UA("iphone") || match_UA("ipad")) {
    
                    _debug("[DAI][HLS][iPhone]");
                    return true;
    
                } else {
                    _debug("[DAI][RealHLS][Android]");
                    return false;
    
                }
    
            } else {
    
                /*En caso de que no este activado DAI ejecutamos modo HTML5 nativo siempre*/
                _debug("[HLS][HTML5 Mobile]");
                return true;
            }
    
    
        } else {
    
            /**Si es un PC - Mac**/
    
            /*Comprobamos si esta activado DAI*/
            if (isDAI) {
    
                /* detectamos si es un PC o un Mac*/
                if (match_UA("macintosh")) {
    
                    /*Si es chrome o firefox de lo contrario sera Safari*/
                    if (match_UA("chrome") || match_UA("firefox")) {
    
                        _debug("[DAI][RealHLS][Chrome-Firefox]");
                        return false;
    
                    } else {
                        _debug("[DAI][HLS][Safari]");
                        return true;
    
                    }
    
                } else {
    
                    _debug("[DAI][RealHLS][PC]");
                    return false;
                }
    
            } else {
    
                /*En caso de que no este activado DAI , pasamos por RealHLS de PC siempre*/
                _debug("[RealHLS][PC-MAC]");
                return false;
    
            }
    
    
        }
    
    };
    
    /**Detectamos el dominio donde esta instanciado el player**/
    function checkDomain(domain) {
    
        if (window.location.href.indexOf(domain) != -1) {
    
            return true;
    
        } else {
    
            return false;
        }
    
    }
    
    
    /**Parse Bitrate Function**/
    /**Parsea las URLs de las playlist en base a un lÃ­mite establecido por ale argumento bitRatemax**/
    function bitRateparse(strRaw, bitRatemax) {
    
        var str,            /*Cadena original*/
            matchSplit,     /*Extrae la parte de las calidades*/
            strComplete,    /*Separador*/
            query,          /*Identificador de cadenas*/
            filter,         /*Filtra la cadena con el bitRatemax seleccionado*/
            strBitrate,     /*selecciona de la array, la cadena que hay que extraer*/
    
            bitRates=[];    /*Calidades*/
    
        /*Copiamos la cadena*/
        str = strRaw;
        /*traemos solo la parte de las calidades*/
        matchSplit = str.split('/');
        matchSplit = String( matchSplit[ ((str.split('/')).length)-2 ]);
    
        strComplete = matchSplit.split(',');
    
        /*Comprobamos el CDN y sacamos las calidades (Fastly, Akamai)*/
        if (matchSplit.indexOf('csmil') !== -1) {
    
            bitRates = matchSplit.match(/(?!\,)(\d+?)(?=\,)/g); // mapeo Akamai
    
    
        } else {
    
            /**dividimos la cadena para quedarnos con la calidad**/
            strComplete.forEach(function(item,index){ // mapeo Fastly
    
                bitRates[index]= (item.split('_'))[(item.split('_')).length-1];
    
            });
    
        }
    
        /*Si solo contemplamos una calidad, no parseamos*/
        if (bitRates.length === 1 || bitRates.length === 0) {
            return strRaw;
        }
    
        /*Hacemos los filtro*/
        filter = bitRates.filter(function (bitrate) {
    
            return parseInt(bitrate) >= bitRatemax;
    
        });
    
    
        /*comprobamos que no borramos todas las calidades por seguridad*/
        if (filter.length === bitRates.length) {
            return strRaw;
        }
    
        filter.forEach(function (item, index) {
    
            /*selecionamos la cadena*/
            strBitrate = strComplete.filter(function (text) {
    
                return text.indexOf(item) !== -1;
    
            });
    
            /*Eliminamos la cadena y limpiamos las comas*/
            str = (str.replace(strBitrate, ''))
                .replace(/(,,\/)|(,\/)|(\/,)/g, '/').replace(/,,/g, ',') /*Parseo Akamai*/
                .replace(/(,,\.mp4)/g, ',.mp4'); /*Parseo Fastly*/
    
        });
    
        return str;
    
    }
    
    
    // TODO - Externalizar utilidad de control de version de flash
    var FlashDetect = new function(){
        var self = this;
        self.release = "1.0.2";
        self.installed = false;
        self.major = -1;
        self.minor = -1;
        self.revision = -1;
        self.revisionStr = "";
        self.activeXVersion = "";
        
        var activeXDetectRules = [
            {
                "name":"ShockwaveFlash.ShockwaveFlash.7",
                "version":function(obj){
                    return getActiveXVersion(obj);
                }
            },
            {
                "name":"ShockwaveFlash.ShockwaveFlash.6",
                "version":function(obj){
                    var version = "6,0,21";
                    try{
                        obj.AllowScriptAccess = "always";
                        version = getActiveXVersion(obj);
                    }catch(err){}
                    return version;
                }
            },
            {
                "name":"ShockwaveFlash.ShockwaveFlash",
                "version":function(obj){
                    return getActiveXVersion(obj);
                }
            }
        ];
        
        var getActiveXVersion = function(activeXObj){
            var version = -1;
            try{
                version = activeXObj.GetVariable("$version");
            }catch(err){}
            return version;
        };
        
        var getActiveXObject = function(name){
            var obj = -1;
            try{
                obj = new ActiveXObject(name);
            }catch(err){}
            return obj;
        };
        
        var parseActiveXVersion = function(str){
            var versionArray = str.split(",");//replace with regex
            return {
                "major":parseInt(versionArray[0].split(" ")[1], 10),
                "minor":parseInt(versionArray[1], 10),
                "revision":parseInt(versionArray[2], 10),
                "revisionStr":versionArray[2]
            };
        };
        
        var parseRevisionStrToInt = function(str){
            return parseInt(str.replace(/[a-zA-Z]/g, ""), 10) || self.revision;
        };
        
        self.majorAtLeast = function(version){
            return self.major >= version;
        };
        
        self.FlashDetect = function(){
            if(navigator.plugins && navigator.plugins.length>0){
                var type = 'application/x-shockwave-flash';
                var mimeTypes = navigator.mimeTypes;
                if(mimeTypes && mimeTypes[type] && mimeTypes[type].enabledPlugin && mimeTypes[type].enabledPlugin.description){
                    var desc = mimeTypes[type].enabledPlugin.description;
                    var descParts = desc.split(' ');//replace with regex
                    var majorMinor = descParts[2].split('.');
                    self.major = parseInt(majorMinor[0], 10);
                    self.minor = parseInt(majorMinor[1], 10); 
                    self.revisionStr = descParts[3];
                    self.revision = parseRevisionStrToInt(self.revisionStr);
                    self.installed = true;
                }
            }else if(navigator.appVersion.indexOf("Mac")==-1 && window.execScript){
                var version = -1;
                for(var i=0; i<activeXDetectRules.length && version==-1; i++){
                    var obj = getActiveXObject(activeXDetectRules[i].name);
                    if(typeof obj == "object"){
                        self.installed = true;
                        version = activeXDetectRules[i].version(obj);
                        if(version!=-1){
                            var versionObj = parseActiveXVersion(version);
                            self.major = versionObj.major;
                            self.minor = versionObj.minor; 
                            self.revision = versionObj.revision;
                            self.revisionStr = versionObj.revisionStr;
                            self.activeXVersion = version;
                        }
                    }
                }
            }
        }();
    };(function(namespace) {
    
        /**
         * Clase base para todos los eventos
         * @constructor
         */
        function Event(type) {
            
            /**
             * Tipo de evento
             */
            this.type = type;
            
            /**
             * Objeto que produce el evento
             */
            this.target = null;
        }
    
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.Event = Event;
    
    }(psd.framework));(function(namespace) {
    
        /**
         * Clase base para todas las clases que lanzan eventos
         * @constructor
         */
        function EventDispatcher() {
            
            // Mapa de listeners registrados
            var _eventListeners = {};
            
            /**
             * Registra un objeto para que pueda recibir notificaciones del evento deseado
             * @param type El tipo de evento
             * @param listener La funcion que procesa el evento
             * @param scope Scope opcional para la ejecuciÃ³n del listener. Si no se recibe,
             *              el listener se ejecutarÃ¡ dentro del contexto "window"
             */
            this.addEventListener = function(type, listener, scope, id_res)
            {
                if (!_eventListeners[type]) { _eventListeners[type] = []; }
                _eventListeners[type].push({listener: listener, scope: scope, id_res: id_res});
            };
    
            /**
             * Elimina un objeto para que deje de recibir notificaciones del evento deseado
             * @param type El tipo de evento
             * @param listener La funcion que procesa el evento
             * @param scope Scope opcional para la ejecuciÃ³n del listener. Si no se recibe,
             *              el listener se ejecutarÃ¡ dentro del contexto "window"
             */
            this.removeEventListener = function(type, listener, scope, id_res)
            {
                var i = 0,
                    listeners = _eventListeners[type].length,
                    eventListeners = [];
    
                for (i = 0; i < listeners; i++)
                {
                    if (_eventListeners[type][i].listener !== listener || _eventListeners[type][i].scope !== scope) {
                        if((typeof id_res!="undefined")&&(id_res==_eventListeners[type][i].id_res))
                        {
                            //en este caso no guardamos el listener
                        }else{
                            eventListeners.push(_eventListeners[type][i]);
                        }
                    }
                }
    
                _eventListeners[type] = eventListeners;
            };
        
            /**
             * Dispara un evento
             * @param event El evento que se quiere disparar
             */
            this.dispatchEvent = function(event) 
            {
                var i = 0;
                if(typeof(event.type)!="undefined")
                {
                    event.target = this;
                    if (_eventListeners[event.type]) {
                        var _eventos = _eventListeners[event.type];
                        for (i = 0; i < _eventos.length; i++) {
                            _eventos[i].listener.apply(_eventos[i].scope, [event]);
                        }
                    }
                }
            };
    
        }
    
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.EventDispatcher = EventDispatcher;
    
    }(psd.framework));(function(namespace) {
        
        // Inheritance class
        ErrorEvent.prototype = new psd.framework.Event();
        
         /**
         * Clase base para todos los eventos de tipo Error
         * @constructor
         */
        function ErrorEvent(type, error) {
            
            psd.framework.Event.call(this, type);
            var errorValid = typeof(error) != "undefined" && error != null;
            
            /**
             * Id del error
             */
            this.id = errorValid && error.id ? error.id : "";
            
            /**
             * Mensaje asociado al error
             */
            this.message = errorValid && error.message ? error.message : "";
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.ErrorEvent = ErrorEvent;
    
    }(psd.framework));
    (function(namespace) {
        
        // Inheritance class
        TimerEvent.prototype = new psd.framework.Event();
    
        /**
         * Define el valor de la constante TIMER
         */
        TimerEvent.TIMER = "timer";
        
        /**
         * Define el valor de la constante TIMER_COMPLETE
         */
        TimerEvent.TIMER_COMPLETE = "timerComplete";
        
        /**
         * Un objeto Timer dispara un TimerEvent cada vez que completa el intervalo 
         * de tiempo definido en la propiedad Timer.delay
         * @constructor
         */
        function TimerEvent(type) 
        {
            // Super
            psd.framework.Event.call(this, type);
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.fenix	
        namespace.TimerEvent = TimerEvent;
    
    })(psd.framework.events);(function(namespace) {
    
        // Inheritance class
        Mediator.prototype = new psd.framework.EventDispatcher();
    
        // Constants
        Mediator._REQUEST_OK_CODE = 200;
        Mediator._REQUEST_ERROR_CODE = 404;
        
        Mediator._STATE_REQUEST_NOT_INITIALIZED_CODE = 0;
        Mediator._STATE_SERVER_CONECTION_STABLISHED_CODE = 1;
        Mediator._STATE_REQUEST_RECEIVED_CODE = 2;
        Mediator._STATE_REQUEST_PROCESSING_CODE = 3;
        Mediator._STATE_REQUEST_FINISHED_CODE = 4;
        
        Mediator.REQUEST_GET  = "GET";
        Mediator.REQUEST_POST = "POST";
        Mediator.REQUEST_HEAD = "HEAD";
        
        Mediator.RESPONSE_TEXT = "text";
        Mediator.RESPONSE_XML = "xml";
        Mediator.RESPONSE_JSON = "json";
        Mediator.RESPONSE_JSONP = "jsonp";
        
        /**
         * ID autoincremental de las peticiones realizadas por este mediator
         */
        Mediator._nextID = 0;
        
        /**
         * Devuelve el siguiente id de peticion para este mediator
         */
        Mediator.getNextKey = function() {
            return Mediator._nextID++;
        };
        
        /**
         * Mediator es una clase generica que puede ser utilizada para interactuar
         * con servicios de datos de manera asincrona
         * @constructor
         */
        function Mediator() 
        {
            // Super
            psd.framework.EventDispatcher.call(this);
            
            // Id de la peticion actual
            var _id = "0";
            
            // Url de la peticion actual
            var _url = "";
            
            // Parser de la peticion actual
            var _parser = null;
    
            //Indica si se utilizarÃ¡ XDomainRequest en navegadores Explorer <= 9 para la carga Ajaz con CORS
            //Por defecto estÃ¡ inhabilidado debido a los problemas que ocasiona esta clase
            var _corsIE = false;
    
            // Tipo de respuesta de la peticion actual
            var _type = Mediator.RESPONSE_XML;
            
            // Referencia dinamica a la instancia para no perder el contexto dentro
            // de las respuestas asincronas del XMLHttpRequest
            var _mediatorInstance = this;
    
            //Nombre de la funciÃ³n que se llama en JSONP
            var _customJSONPCallback = null;
            //ParÃ¡metro que se pasarÃ¡ a la url para solicitar JSONP
            var _customCallbackParam = null;
    
            var _deferredJSONP = (function(mediator) {return function(data) {_jsonp.apply(mediator,[data]);}})(this);
            var _jsonp = function(responseData)
            {
                var parserResult = responseData,
                    mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
                                                        , psd.framework.MediatorResult.MEDIATOR_SUCCESS
                                                        , parserResult );
                                                        
                _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE, _id, mediatorResult));
            };
    
            this.corsIE = function(value){
                if(value && value!=_corsIE) {_corsIE = value;}
                return _corsIE;
            };
    
            this.setCustomCallback = function(customCallback){
                _customJSONPCallback = customCallback;
            };
    
            /**
             * Inicia la mediacion solicitada
             * @param url La url de los datos
             * @param parser El parser que se utiliza para analizar la respuesta
             * @param type El tipo de respuesta (TEXT, XML, JSON)
             */
             this.mediate = function(url, parser, type) 
            {
                var xmlhttp, script,src, separator
                    responseData = "",
                    mediationID = Mediator.getNextKey();
                
                _id = "mediate_" + mediationID;
                _url = url;
                _parser = parser;
                if (type && (type == Mediator.RESPONSE_TEXT || 
                            type == Mediator.RESPONSE_XML || 
                            type == Mediator.RESPONSE_JSON ||
                            type == Mediator.RESPONSE_JSONP)) 
                {
                    _type = type;
                }
    
                if(_type == Mediator.RESPONSE_JSONP)
                {
                    script = document.createElement('script');
                    script.setAttribute("type", "text/javascript");
                    if (_customJSONPCallback){
                        script.setAttribute("src", url);
                        window[_customJSONPCallback] = _deferredJSONP;
                    }else{
                        separator = (url.indexOf("?")>-1)? "&":"?";
                        script.setAttribute("src", url + separator + "jsonp=psd.framework.mediator.jsonp." + _id);
                        psd.framework.mediator.jsonp[_id] = _deferredJSONP;
                    }
                    document.getElementsByTagName("head")[0].appendChild(script);
                } else {
    
                    if ((window.XDomainRequest) && _corsIE){ //IE 8, modo no estÃ¡ndar de realizar peticiones Ajax que soporten CORS
                        xmlhttp = new XDomainRequest();
                        xmlhttp.onerror = function(){
                            mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
                                , psd.framework.MediatorResult.MEDIATOR_ERROR
                                , null
                            );
                            _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
                                , _id
                                , mediatorResult));
                        };
                        xmlhttp.onload = function(){
    
                            //creaciÃ³n del xml a partir del string
    
                            switch (_type) {
                                case Mediator.RESPONSE_TEXT:
                                    responseData = xmlhttp.responseText;
                                    break;
    
                                case Mediator.RESPONSE_XML:
                                    responseData = new ActiveXObject('Microsoft.XMLDOM');
                                    responseData.async='false';
                                    responseData.loadXML(xmlhttp.responseText);
                                    break;
    
                                case Mediator.RESPONSE_JSON:
                                    responseData = xmlhttp.responseText;
                                    break;
                            }
    
                            var parserResult = _parser.parse(responseData);
                                mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
                                    , psd.framework.MediatorResult.MEDIATOR_SUCCESS
                                    , parserResult
                                    );
                                _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
                                                                                                        , _id
                                                                                                        , mediatorResult));
                        }
                    }else{
    
                        // Code for Firefox, Chrome, Opera, Safari
                        if (window.XMLHttpRequest) {
                            xmlhttp = new XMLHttpRequest();
                        }
                        else { // code IE6 (no soporta CORS)
                            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                        }
    
                        xmlhttp.onreadystatechange = function() {
    
                            switch (xmlhttp.readyState) {
                                case Mediator._STATE_REQUEST_NOT_INITIALIZED_CODE:
                                    break;
    
                                case Mediator._STATE_SERVER_CONECTION_STABLISHED_CODE:
                                    break;
    
                                case Mediator._STATE_REQUEST_RECEIVED_CODE:
                                    break;
    
                                case Mediator._STATE_REQUEST_PROCESSING_CODE:
                                    break;
    
                                case Mediator._STATE_REQUEST_FINISHED_CODE:
                                    var mediatorResult;
    
                                    if (xmlhttp.status == Mediator._REQUEST_OK_CODE) {
                                        switch (_type) {
                                            case Mediator.RESPONSE_TEXT:
                                                responseData = xmlhttp.responseText;
                                                break;
    
                                            case Mediator.RESPONSE_XML:
                                                responseData = xmlhttp.responseXML;
                                                break;
    
                                            case Mediator.RESPONSE_JSON:
                                                responseData = xmlhttp.responseText;
                                                break;
                                        }
    
                                        var parserResult = _parser.parse(responseData);
                                        mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_SUCCESS_CODE
                                            , psd.framework.MediatorResult.MEDIATOR_SUCCESS
                                            , parserResult
                                            );
                                        _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_COMPLETE
                                                                                                        , _id
                                                                                                        , mediatorResult));
                                    }
                                    else {
                                        mediatorResult = new psd.framework.MediatorResult( psd.framework.MediatorResult.MEDIATOR_ERROR_CODE
                                            , psd.framework.MediatorResult.MEDIATOR_ERROR
                                            , null
                                            );
                                        _mediatorInstance.dispatchEvent(new psd.framework.MediatorEvent(psd.framework.MediatorEvent.MEDIATE_ERROR
                                                                                                        , _id
                                                                                                        , mediatorResult));
                                    }
                                    break;
                            };
                        };
                    };
    
                    xmlhttp.open(Mediator.REQUEST_GET, _url, true);
                    xmlhttp.send();
                }
            };
            
            return _id;
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.Mediator = Mediator;
        
    }(psd.framework));(function(namespace) {
        
        // Inheritance class
        MediatorEvent.prototype = new psd.framework.Event();
        
        /**
         * La peticion ha concluido correctamente
         */
        MediatorEvent.MEDIATE_COMPLETE = "mediate_complete";
        
        /**
         * Ha sucedido un error durante la peticion
         */
        MediatorEvent.MEDIATE_ERROR = "mediate_error";
        
        /**
         * MediatorEvent es el evento general que todo Mediator dispara como resultado
         * de sus peticiones
         * @param type Tipo del evento
         * @param id Id de la peticion
         * @param mediatorResult Resultado de la peticion
         * @constructor
         */
        function MediatorEvent(type, id, mediatorResult) 
        {
            // Super
            psd.framework.Event.call(this, type);
    
            this.id = id;
            this.result = mediatorResult;
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.MediatorEvent = MediatorEvent;
    
    }(psd.framework));(function(namespace) {
        
        // Constants
        MediatorResult.MEDIATOR_SUCCESS_CODE = 0;
        MediatorResult.MEDIATOR_ERROR_CODE = 1;
        MediatorResult.MEDIATOR_SECURITY_ERROR = 2;
        MediatorResult.MEDIATOR_IO_ERROR = 3;
        
        MediatorResult.MEDIATOR_SUCCESS = "mediator_success";
        MediatorResult.MEDIATOR_ERROR = "mediator_error";
        MediatorResult.MEDIATOR_SECURITY_ERROR = "mediator_security_error";
        MediatorResult.MEDIATOR_IO_ERROR = "mediator_io_error";
    
        /**
         * MediatorResult es una clase que empaqueta de manera general el resultado
         * de una peticion a un servicio a traves de un Mediator
         * @param code Codigo de respuesta
         * @param msg Mensaje de respuesta
         * @param parserResult Resultado del parseo de los datos recibidos
         * @constructor
         */
        function MediatorResult(code, msg, parserResult) 
        {
            this.code = code;
            this.msg = msg;
            this.parserResult = parserResult;
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.MediatorResult = MediatorResult;
    
    }(psd.framework));(function(namespace) {
    
        /**
         * Parser es la clase basica de la que extiende cualquier Parser para el
         * tratamiento del resultado de una peticion de datos
         * @constructor
         */
        function Parser() {
            
            /**
             * Analiza los datos recibidos y los devuelve en el formato deseado. Por
             * defecto, el parser se limita a devolver los datos sin tratarlos.
             * @param data Los datos recibidos
             * @return Un ParserResult con el resultado del parseo
             */
            this.parse = function(data) 
            {
                return new psd.framework.ParserResult(psd.framework.ParserResult.PARSER_SUCCESS_CODE
                                                        , psd.framework.ParserResult.PARSER_SUCCESS
                                                        , data);
            };
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.Parser = Parser;
    
    }(psd.framework));(function(namespace) {
    
        // Inheritance class
        JSONParser.prototype = new psd.framework.Parser();
    
        /**
         * JSONParser es un parser para datos en formato JSON. Si estÃ¡ disponible, 
         * aplica la funciÃ³n nativa JSON.parse al resultado recibido.
         * @constructor
         */
        function JSONParser() {
            
            // Super
            psd.framework.Parser.call(this);
    
            /**
             * className psd.framework.parser.JSONParser
             */
            this.className = "psd.framework.parser.JSONParser";        
            
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            //                           INTERNALS                                //
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            //                              API                                   //
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
    
            /**
             * Convierte los datos recibidos en un objeto de js
             * @param data Los datos recibidos
             * @return Un ParserResult con el resultado del parseo
             */
            this.parse = function(data) 
            {
                var parserResult = new psd.framework.ParserResult(psd.framework.ParserResult.PARSER_ERROR_CODE
                                                            , psd.framework.ParserResult.PARSER_ERROR
                                                            , data);
                                                            
                if(typeof(JSON)!="undefined" && typeof(JSON.parse)!="undefined") {
                    try {
                        if(typeof(data)=="object")
                            parserResult.result = data;
                        else
                            parserResult.result = JSON.parse(data);
    
                        parserResult.code = psd.framework.ParserResult.PARSER_SUCCESS_CODE;
                        parserResult.msg = psd.framework.ParserResult.PARSER_SUCCESS;
                    }catch(err){ parserResult.msg = err.message; }
                }
                
                return parserResult;
            };
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.JSONParser = JSONParser;
    
    }(psd.framework.parser));(function(namespace) {
        
        // Constantes
        ParserResult.PARSER_SUCCESS_CODE = 0;
        ParserResult.PARSER_ERROR_CODE = 1;
        
        ParserResult.PARSER_SUCCESS = "parser_success";
        ParserResult.PARSER_ERROR = "parser_error";
        
        /**
         * ParserResult es la clase general que encapsula el resultado generado por
         * un Parser
         * @param code Codigo del resultado del parseo
         * @param msg Mensaje del resultado del parseo
         * @param parserResult Resultado del parseo
         * @constructor
         */
        function ParserResult(code, msg, parserResult) 
        {
            this.code = code;
            this.msg = msg;
            this.result = parserResult;
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.ParserResult = ParserResult;
    
    }(psd.framework));(function(namespace) {
        
        ObjectUtil.merge = function(obj1, obj2) {
                var obj3 = {};
                for (var attrName in obj1) { obj3[attrName] = obj1[attrName]; }
                for (var attrName in obj2) { obj3[attrName] = obj2[attrName]; }
                return obj3;
        }
            
        function ObjectUtil() {}
    
        // Add context window
        namespace.ObjectUtil = ObjectUtil;
    
    }(psd.framework));(function(namespace) {
        
        StringUtil.trim = function trim(str) {
            return str.replace(/^\s+/g,'').replace(/\s+$/g,'');
        };
            
        function StringUtil() {}
    
        // Add context window
        namespace.StringUtil = StringUtil;
    
    }(psd.framework));(function(namespace) {
    
        // Inheritance class
        Timer.prototype = new psd.framework.EventDispatcher();
    
        /**
         * Timer es una clase que permite ejecutar cÃ³digo siguiendo una determinada
         * secuencia temporal
         * @constructor
         */
        function Timer(delay, repeatCount) 
        {
            // Super
            psd.framework.EventDispatcher.call(this);
            
            /**
             * className psd.framework.utils.Timer
             */
            this.className = "psd.framework.utils.Timer";
            
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            //                           INTERNALS                                //
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            
            // ID de la actual llamada setInterval
            var _intervalID = null;
            
            // Callback para los eventos de setinterval
            var _deferredIntervalCallback = (function(timer) {return function() {_intervalCallback.apply(timer);}})(this);
            var _intervalCallback = function()
            {
                _currentCount++;
                this.dispatchEvent(new psd.framework.events.TimerEvent(psd.framework.events.TimerEvent.TIMER));
                if(_repeatCount != 0)
                {
                    if(_repeatCount == _currentCount)
                    {
                        this.reset();
                        this.dispatchEvent(new psd.framework.events.TimerEvent(psd.framework.events.TimerEvent.TIMER_COMPLETE));
                    }
                }
            };
            
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            //                              API                                   //
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            
            /**
             * NÃºmero de veces que el timer se ha disparado desde que se iniciÃ³
             */
            var _currentCount = 0;
            this.currentCount = function() { return _currentCount; };
            
            /**
             * El retardo, en milisegundos, entre eventos del timer
             */
            var _delay = delay!=undefined?delay:1000;
            this.delay = function(value)
            {
                if(value!=undefined && value>0) { _delay = value; }
                return _delay;
            };
            
            /**
             * El nÃºmero total de repeticiones que debe ejecutarse el timer
             */
            var _repeatCount = repeatCount!=undefined?repeatCount:0;
            this.repeatCount = function(value)
            {
                if(value!=undefined && value>0) { _repeatCount = value; }
                return _repeatCount;
            };
            
            /**
             * El estado actual del timer.
             */
            var _running = false;
            this.running = function() { return _running; };
            
            /**
             * Ejecuta el timer si no estÃ¡ en marcha
             */
            this.start = function()
            {
                if(!_running)
                {
                    _intervalID = setInterval(_deferredIntervalCallback, _delay);
                    _running = true;
                }
            };
            
            /**
             * Detiene el timer
             */
            this.stop = function()
            {
                if(_running)
                {
                    clearInterval(_intervalID);
                    _running = false;
                }
            };
            
            /**
             * Detiene el timer si estÃ¡ en marcha y resetea la propiedad currentCount a 0
             */
            this.reset = function()
            {
                this.stop();
                _currentCount = 0;
            };
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.framework.utils
        namespace.Timer = Timer;
        
    }(psd.framework.utils));(function(namespace) {
    
        /**
         * Gestor de cargas de dependencias de javascript.
         * Permite la carga de mÃºltiples dependencias simultÃ¡neas y una cola
         * de cargas para peticiones diferentes
         * @constructor
         */
        function LibraryManager() 
        {
            // Array de librerÃ­as ya cargadas por el gestor
            var _loadedDependencies = [];
            
            // Cola de carga
            var _loadingQueue = [];
            
            // Elemento de carga actual
            var _loading = null;
            
            // Dependencia de carga actual
            var _loadingDependency = null;
            
            /**
             * Carga librerias de manera dinamica
             * @param loadItem Elemento con informaciÃ³n de la carga. Consta de:
             *          .depends: Array de dependencias a cargar
             *          .success: Callback para cuando se completa la carga correctamente
             *          .error: Callback para cuando falla la carga
             *          .scope: Scope a aplicar para las llamadas de los callbacks
             */
            this.load = function(loadItem) 
            {
                var itemValidation = _validateItem(loadItem);
                
                if(itemValidation!="") { if(psd.framework.debug) {console.log('Invalid load item: ' +itemValidation);} return; }
                
                if( _checkDependencies(loadItem.depends)) { loadItem.success.apply(loadItem.scope); }
                else{ _loadDependencies(loadItem); }
            };
            
            // Valida que un elemento que se quiere cargar es valido
            _validateItem = function(loadItem)
            {
                var validation = "";
                
                if(typeof(loadItem)=='undefined') { validation = "null loaditem"; }
                if(typeof(loadItem.depends)=='undefined') { validation = "null depends"; }
                if(loadItem.depends!=null && typeof(loadItem.depends)!='string' && typeof(loadItem.depends)!='object') { validation = "illegal depends type "+typeof(loadItem.depends); }
                if(typeof(loadItem.success)!='function') { validation = "success is not a function"; }
                if(typeof(loadItem.error)!='function') { validation = "error is not a function"; }
                
                // Si el elemento src es un unico string, lo convertimos en array
                if(typeof(loadItem.depends)=='string') { loadItem.depends = [loadItem.depends]; }
                
                return validation;
            };
            
            // Comprueba si una lista de dependencias ya ha sido cargada por completo
            _checkDependencies = function(dependencies)
            {
                var i, dependenciesReady = true;
             
                for(i in dependencies)
                {
                    dependenciesReady = dependenciesReady && _checkDependency(dependencies[i]);
                    if(!dependenciesReady) { break; }
                }
                
                return dependenciesReady;
            };
            
            // Comprueba si una depencia ya ha sido cargada
            _checkDependency = function(dependency)
            {
                var i;
                for(i in _loadedDependencies) { if(_loadedDependencies[i] == dependency) { return true; } }
                return false;
            };
                    
            // Inicia la carga de una lista de dependencias
            _loadDependencies = function(loadingItem)
            {
                var i;
                
                if((_loading==null && _loadingQueue.length==0)||_loading==loadingItem)
                {
                    _loading = loadingItem;
    
                    if(_checkDependencies(loadingItem.depends)) { _dependencyLoaded(); }
                    else{
                        for(i in loadingItem.depends)
                        {
                            if(!_checkDependency(loadingItem.depends[i])) { _loadDependency(loadingItem.depends[i]); break; }
                        }
                    }
                    
                }else{ _loadingQueue.push(loadingItem); }
            };
            
            // Inicia la carga de una dependencia
            _loadDependency = function(dependency)
            {
                if(psd.framework.debug) {console.log("loading dependency "+dependency);}  
                _loadingDependency = dependency;
                
                var head = document.getElementsByTagName('head')[0];
                var script = document.createElement('script');
                script.type = 'text/javascript';
    
                if (navigator.appName.indexOf("Microsoft") >= 0) {
                    script.onreadystatechange = function() {
                        if (this.readyState == "loaded" ||
                            this.readyState == "complete") {
                            _dependencyLoaded();
                            script.onreadystatechange = null;
                        }
                    };
                }
                else {
                    script.onload = _dependencyLoaded;
                }
                
                script.src = _loadingDependency;
    
                head.appendChild(script);                        
            };
            
            // Detecta la carga completa de una dependencia y continua con el proceso
            // de carga de la lista de dependencias actual
            _dependencyLoaded = function()
            {
                if(psd.framework.debug) {console.log("successfully loaded dependency " + _loadingDependency);}
                _loadedDependencies.push(_loadingDependency);
                _loadingDependency = "";
                
                if(!_checkDependencies(_loading.depends)) { _loadDependencies(_loading); }
                else { 
                    _loading.success.apply(_loading.scope); 
                    _loading=null;
                    
                    if(_loadingQueue.length>0) 
                    { 
                        _loading = _loadingQueue.shift();
                        _loadDependencies(_loading); 
                    }
                }
            };
        }
    
        // Incluimos la declaracion de la clase en el namespace psd.framework
        namespace.LibraryManager = new LibraryManager();
    
    }(window));(function(window) 
    {
        // Generacion del namespace psd.media
        if(window.psd==undefined) { window.psd = {}; }
        if(window.psd.media==undefined) { window.psd.media = {}; }
        if(window.psd.media.skins==undefined) { window.psd.media.skins = {}; }
        if(window.psd.media.skins.generic==undefined) { window.psd.media.skins.generic = {}; }
        if(window.psd.media.wrappers==undefined) { window.psd.media.wrappers = {}; }
    
        if(window.emic==undefined) { window.emic = {}; }
        if(window.emic.top==undefined) { window.emic.top = {}; }
    
    })(window);(function(namespace) {
        
        // Inheritance class
        MediaEvent.prototype = new psd.framework.Event();
    
        /**
         * Define el evento MEDIA_BEGIN
         */
        MediaEvent.MEDIA_BEGIN = "mediaBegin";
        
        /**
         * Define el evento MEDIA_BEGIN
         */
        MediaEvent.MEDIA_START = "mediaStart";
        
        /**
         * Define el evento MEDIA_BEGIN
         */
        MediaEvent.MEDIA_STOP = "mediaStop";
        
        /**
         *
         */
        MediaEvent.MEDIA_FIRST_QUART = "mediaFirstQuart";
        
        /**
         *
         */
        MediaEvent.MEDIA_HALF = "mediaHalf";
        
        /**
         *
         */
        MediaEvent.MEDIA_THIRD_QUART = "mediaThirdQuart";
        
        /**
         *
         */
        MediaEvent.AD_START = "adStart";
        
        /**
         *
         */
        MediaEvent.AD_SKIP = "adSkip";
        
        /**
         *
         */
        MediaEvent.AD_COMPLETE = "adComplete";
        
        /**
         * Define el evento MEDIA_COMPLETE
         */
        MediaEvent.MEDIA_COMPLETE = "mediaComplete";
    
        /**
         * Define el evento MEDIA_PREVIOUS
         */
        MediaEvent.MEDIA_PREVIOUS = "mediaPrevious";
    
        /**
         * Define el evento MEDIA_NEXT
         */
        MediaEvent.MEDIA_NEXT = "mediaNext";
        
        /**
         *
         */
        MediaEvent.ESTADO_BUFFER_FULL = "estadoBufferFull";
        
        /**
         *
         */
        MediaEvent.ESTADO_BUFFER_EMPTY = "estadoBufferEmpty";
        
        /**
         *
         */
        MediaEvent.MEDIA_PROGRESS = "mediaProgress";
        
        /**
         * Define el evento CUEPOINT_DATA
         */
        MediaEvent.CUEPOINT_DATA = "CUEPOINT_DATA";
        
        /**
         * Define el evento MEDIA_COMPLETE
         */
        MediaEvent.INITIALIZED  = "INITIALIZED";
        
        /**
         * Define el evento AD_COMPANION_ON
         */
        MediaEvent.AD_COMPANION_ON  = "adCompanionOn"; 
        
         /**
         * Define el evento AD_COMPANION_OFF
         */
        MediaEvent.AD_COMPANION_OFF  = "adCompanionOff";
        
       
        /**
         * Datos adicionales del evento
         */
        this.data = null;
        
        /**
         * Eventos de estado de reproduccion de contenido multimedia
         * @constructor
         */
        function MediaEvent(type, data) 
        {
            // Super
            psd.framework.Event.call(this, type);
            
            this.data = data;
        }
        
        // Incluimos la declaracion de la clase en el namespace psd.media	
        namespace.MediaEvent = MediaEvent;
    
    })(psd.media);(function(namespace) {
    
        // Inheritance class
        TopEmbedEvent.prototype = new psd.framework.Event();
    
        /**
         * Evento Playlist - dataComplete
         */
        TopEmbedEvent.EVENT_INI = "TopLauncherInitialized";
        TopEmbedEvent.EVENT_ERROR = "TopEmbedError";
    
        /**
         * Datos adicionales del evento
         */
        this.data = null;
    
        /**
         * Eventos de estado de reproduccion de contenido multimedia
         * @constructor
         */
        function TopEmbedEvent(type, data)
        {
            // Super
            psd.framework.Event.call(this, type);
    
            this.data = data;
        }
    
        // Incluimos la declaracion de la clase en el namespace psd.publicidad.events
        namespace.TopEmbedEvent = TopEmbedEvent;
    
    })(psd.media);(function(namespace) {
    
        // Inheritance class
        TopEmbedEventPlaylist.prototype = new psd.framework.Event();
    
        /**
         * Evento Playlist - dataComplete
         */
        TopEmbedEventPlaylist.EVENT_INIT = "TopEventPlaylistInitialized";
        TopEmbedEventPlaylist.EVENT_ERROR = "TopEmbedPlaylistError";
    
        /**
         * Datos adicionales del evento
         */
        this.data = null;
    
        /**
         * Eventos de estado de reproduccion de contenido multimedia
         * @constructor
         */
        function TopEmbedEventPlaylist(type, data)
        {
            // Super
            psd.framework.Event.call(this, type);
    
            this.data = data;
        }
    
        namespace.TopEmbedEventPlaylist = TopEmbedEventPlaylist;
    
    })(psd.media);(function(namespace) {
    
        // Inheritance class
        PlaylistEvent.prototype = new psd.framework.Event();
    
        /**
         * Evento Playlist - dataComplete
         */
        PlaylistEvent.EVENT_ERROR = "eventError";
        PlaylistEvent.DATA_REQUEST = "dataRequest";
        PlaylistEvent.DATA_COMPLETE = "dataComplete";
        PlaylistEvent.MEDIA_CHANGE = "mediaChange";
        PlaylistEvent.PLAYLIST_COMPLETE =   "playlistComplete";
    
    
        /**
         * Datos adicionales del evento
         */
        this.data = null;
    
        /**
         * Eventos de estado de reproduccion de contenido multimedia
         * @constructor
         */
        function PlaylistEvent(type, data)
        {
            // Super
            psd.framework.Event.call(this, type);
    
            this.data = data;
        }
    
        // Incluimos la declaracion de la clase en el namespace psd.publicidad.events
        namespace.PlaylistEvent = PlaylistEvent;
    
    })(psd.media);(function(namespace) {
    
        // Inheritance class
        TopLauncherEvent.prototype = new psd.framework.Event();
    
        /**
         * Evento Playlist - dataComplete
         */
        TopLauncherEvent.EVENT_INI = "MediaPlayerInitialized";
        TopLauncherEvent.EVENT_ERROR = "TopLauncheError";
    
    
        /**
         * Datos adicionales del evento
         */
        this.data = null;
    
        /**
         * Eventos de estado de reproduccion de contenido multimedia
         * @constructor
         */
        function TopLauncherEvent(type, data)
        {
            // Super
            psd.framework.Event.call(this, type);
    
            this.data = data;
        }
    
        // Incluimos la declaracion de la clase en el namespace psd.publicidad.events
        namespace.TopLauncherEvent = TopLauncherEvent;
    
    })(psd.media);(function (namespace) {
    
        function InfoPanel() {
    
            var _that = this;
    
            var _template; /* template personalizado */
    
    
            this.onclick = null;
    
            this.paint = function (container, message, append, base, cover, skin) {
    
    
                /*Mensaje generico*/
                _container = document.getElementById(container);
                _message = message;
                _cover = cover;
    
                /*----------------------------------------*/
    
                /*Funciones par cargar los skins*/
    
                var _URL_TEMPLATE = "/psdmedia/media/simple/skinsInfoPanel/{UDN}/assets/template.html",   // template
                    _URL_STYLE = "/psdmedia/media/simple/skinsInfoPanel/{UDN}/assets/style.css";       // main style
    
                var _CODE_NUM_PARSER_OK = 0,
                    _CODE_NUM_PARSER_ERROR = 1;
    
    
                var _udn = skin; /*Provisional*/
    
                var _urlBaseData = base;
    
    
    
                /*Mensaje generico*/
                var genericMessage = function () {
    
                    _container.style.position = "relative";
    
                    var back = document.createElement("div");
                    back.style.width = "100%";
                    back.style.height = "100%";
                    back.style.position = "absolute";
                    back.style.textAlign = "center";
                    back.style.top = 0;
                    back.style.left = 0;
                    back.style.backgroundColor = "rgba(0,0,0,0.9)";
                    back.style.display = "table";
                    back.className = "mm_infopanel_background";
                    back.style.zIndex = 1000;
                    back.style.cursor = "pointer";
    
                    var msg = document.createElement("div");
                    msg.style.margin = "auto";
                    msg.className = "mm_infopanel_message";
                    msg.style.color = "white";
                    msg.style.fontFamily = "Arial";
                    msg.style.display = "table-cell";
                    msg.style.verticalAlign = "middle";
    
                    msg.innerHTML = message;
    
                    back.appendChild(msg);
    
                    if (this.onclick != null) {
                        back.onclick = function () {
                            _that.onclick(back);
                        }
                    }
    
                    if (!append) {
                        _container.innerHTML = "";
                    }
    
                    _container.appendChild(back);
    
                };
    
    
    
                var _loadTemplate = function () {
    
    
                    _URL_TEMPLATE = _URL_TEMPLATE.replace("{UDN}", _udn);
    
                    var _parser = new psd.framework.Parser(),
                        templateMediator = new psd.framework.Mediator(),
                        url = _urlBaseData ? (_urlBaseData + _URL_TEMPLATE) : _URL_TEMPLATE;
                    templateMediator.corsIE(true);
                    templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                    templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
                    templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
                };
    
                /*----------------------------------------------------------------------*/
    
                /*Cargamos el skin*/
                var _loadCSS = function () {                             // Loading CSS main file
    
                    _URL_STYLE = _URL_STYLE.replace("{UDN}", _udn);
    
                    var fileref = document.createElement("link"),
                        filename = _urlBaseData ? (_urlBaseData + _URL_STYLE) : _URL_STYLE;
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", filename);
                    if (typeof fileref != "undefined") {
                        document.getElementsByTagName("head")[0].appendChild(fileref);
                    }
                };
    
    
    
                var onDataComplete = function (evt) {
    
                    /*Utilizamos nombre exclusivo para las capas*/
                    var TimeRandom = new Date();
                    _IdMedia = container + TimeRandom.getTime() + "_" + Math.floor((Math.random() * 1000) + 1);
    
                    var dataHTML, elementHTML;
                    if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK) {
    
                        _template = evt.result.parserResult.result.replace(/{<-%ID%->}/g, _IdMedia);
                        _template = _template.replace(/{<-%MESSAGE%->}/g,_message);
    
    
                        /**En caso de no tener cover ponemos una imagen generica**/
                        if (typeof (_cover) != 'undefined' && cover != "") {
    
                            _template = _template.replace(/{<-%COVER%->}/g, _cover);
    
                        }else{
    
                            var URLini = _template.indexOf("<<"), URLend = _template.indexOf(">>");
    
                            _template = _template.replace(/{<-%COVER%->}/g, _template.substr(URLini + 2, (URLend - (URLini + 2))));
    
                        };
    
    
                        /**En caso de ser un player embebido y tener sus  estilos propios llamamos desde el template a su custom-CSS**/
                        if (checkDomain(URL_EMBED_PLAYER)) {
    
                            var URLini = _template.indexOf("<!--{{"), URLend = _template.indexOf("}}-->"),
    
                                URLget = _template.substr(URLini, (URLend + 6) - URLini),
                                URLset = _template.substr(URLini + 6, (URLend - (URLini + 6)));
    
                           _template = _template.replace(URLget, URLset);
    
                        };
    
    
    
                        /*mostramos el contenido del mensaje*/
                        _container.innerHTML = _template;
    
    
                    } else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR) {
    
                        genericMessage();
                    }
                };
    
                var onDataError = function (evt) {
    
                    genericMessage();
                };
    
    
                /**Filtramos por unidad de negocio**/
                if (_udn == 'diario_as') {
    
                        _loadTemplate();
                        _loadCSS();
    
    
                } else {
    
                    genericMessage();
    
                }
    
            };
        }
    
        namespace.InfoPanel = InfoPanel;
    
    })(psd.media);
    (function(namespace){
    
        function Lang(){
    
            var translations = {
                "es":{
                    "contenido_no_disponible": "Contenido no disponible",
                    "trans_no_disponible":"No disponible para este dispositivo",
                    "trans_no_comenzado" : "La retransmisiÃ³n aÃºn no ha comenzado",
                    "trans_reanudara" : "La retransmisiÃ³n se reanudarÃ¡ en breve",
                    "trans_finalizada" : "La retransmisiÃ³n ha finalizado",
                    "publicidad" : "Publicidad",
                    "actualizar_plugin" : "Necesitas actualizar tu plugin de Flash",
                    "no_mp4" : "El navegador no admite vÃ­deo HTML5/MP4",
                    "no_mp3" : "El navegador no admite audio HTML5/MP3",
                    "geobloqueado" : "Contenido no disponible en su zona geogrÃ¡fica",
                    "bloqueado" : "Contenido compartido bloqueado",
                    "aun_no_disponible" : "El contenido no estÃ¡ disponible todavÃ­a",
                    "no_disponible" : "El contenido no estÃ¡ disponible",
                    "audio_geobloqueado" : "Audio no disponible en su zona geogrÃ¡fica",
                    "audio_aun_no_disponible" : "Audio no disponible todavÃ­a",
                    "audio_no_disponible" : "Audio ya no disponible",
                    "audio_no_encontrado": "Audio no encontrado",
                    "necesita_plugin" : "Necesita instalar el plugin de flash para ver este contenido",
                    "no_encontrado": "Contenido no encontrado",
                    "cerrar" : "Cerrar",
                    "tamanio_real" : "TamaÃ±o real",
                    "ver_perfil_eskup" : "Ver perfil en Eskup",
                    "teclear_usuario" : "Tienes que teclear usuario y contraseÃ±a",
                    "error_correo" : "El campo 'usuario' no parece un correo electrÃ³nico. Por favor, revÃ­salo.",
                    "foto" : "Foto",
                    "tamanio_ventana" : "TamaÃ±o ventana",
                    "ver_perfil_completo" : "Ver perfil completo",
                    "avatar" : "Avatar",
                    "ver_video": "Ver vÃ­deo",
                    "vervideo_svg": "//ep00.epimg.net/reproductores/vervideo.svg",
                    "directo":"EMISIÃ“N EN DIRECTO",
                    "siguiente_noticia": "Siguiente noticia",
                    "anterior_noticia": "Noticia anterior",
                    "primera_noticia": "No hay noticia anterior",
                    "ultima_noticia": "No hay mÃ¡s noticias",
                    "contenido_no_disponible_as": "Este contenido tiene un vÃ­deo que no estÃ¡ disponible en tu zona geogrÃ¡fica"
                },
                "en":{
                    "contenido_no_disponible_as": "This content has a video that is not available in your geographic area"
                },
                "ca":{
                    "contenido_no_disponible": "Contingut no disponible",
                    "trans_no_disponible":"TransmissiÃ³ no disponible per a aquest dispositiu",
                    "trans_no_comenzado" : "La retransmissiÃ³ encara no ha comenÃ§at",
                    "trans_reanudara" : "La retransmissiÃ³ es reprendrÃ  aviat",
                    "trans_finalizada" : "La retransmissiÃ³ ha finalitzat",
                    "publicidad" : "Publicitat",
                    "actualizar_plugin" : "Necessites actualitzar el teu plugin de Flash",
                    "no_mp4" : "El navegador no admet vÃ­deo HTML5/MP4",
                    "no_mp3" : "El navegador no admet HTML5/MP3",
                    "geobloqueado" : "Contingut no disponible en la seva zona geogrÃ fica",
                    "bloqueado" : "Contingut compartit bloquejat",
                    "aun_no_disponible" : "El contingut encara no estÃ  disponible",
                    "no_disponible" : "El contingut no estÃ  disponible",
                    "audio_geobloqueado" : "Ãudio no disponible en la seva zona geogrÃ fica",
                    "audio_aun_no_disponible" : "Ã€udio no disponible encara",
                    "audio_no_disponible" : "Ã€udio ja no disponible",
                    "audio_no_encontrado": "Ãudio no trobat",
                    "necesita_plugin" : "Necessita instalÂ·lar el plugin de Flash per veure aquest contingut",
                    "no_encontrado": "Contingut no trobat",
                    "cerrar" : "Tancar",
                    "tamanio_real" : "Mida real",
                    "ver_perfil_eskup" : "Veure perfil en Eskup",
                    "teclear_usuario" : "Has de teclejar usuari i contrasenya",
                    "error_correo" : "El camp 'usuari' no sembla un correu electrÃ²nic. Sisplau, revisa'l",
                    "foto" : "Foto",
                    "tamanio_ventana" : "Mida finestra",
                    "ver_perfil_completo" : "Veure perfil complet",
                    "avatar" : "Avatar",
                    "ver_video": "Veure VÃ­deo",
                    "vervideo_svg": "//ep00.epimg.net/reproductores/vervideo_ca.svg",
                    "directo":"EMISSIÃ“ EN DIRECTE",
                    "siguiente_noticia": "Propera notÃ­cia",
                    "anterior_noticia": "NotÃ­cia anterior",
                    "primera_noticia": "No hi ha notÃ­cia anterior",
                    "ultima_noticia": "No hi ha mÃ©s notÃ­cies",
                    "contenido_no_disponible_as": "Aquest contingut ha un vÃ­deo que no estÃ  disponible en la teva zona geogrÃ fica"
    
                },
                "pt-br":{
                    "contenido_no_disponible": "Contenido nÃ£o disponÃ­vel",
                    "trans_no_disponible":"IndisponÃ­vel para este dispositivo",
                    "trans_no_comenzado" : "La retransmisiÃ³n aÃºn no ha comenzado",
                    "trans_reanudara" : "La retransmisiÃ³n se reanudarÃ¡ en breve",
                    "trans_finalizada" : "La retransmisiÃ³n ha finalizado",
                    "publicidad" : "Publicidade",
                    "actualizar_plugin" : "VocÃª precisa atualizar seu plugin Flash",
                    "no_mp4" : "O navegador nÃ£o suporta vÃ­deo HTML5/MP4",
                    "no_mp3" : "O navegador nÃ£o suporta HTML5/MP3",
                    "geobloqueado" : "Contenido nÃ£o disponÃ­vel para sua regiÃ£o",
                    "bloqueado" : "Contenido compartido bloqueado",
                    "aun_no_disponible" : "O contenido ainda nÃ£o estÃ¡ disponÃ­vel",
                    "no_disponible" : "O contenido nÃ£o estÃ¡ disponÃ­vel",
                    "audio_geobloqueado" : "Audio no disponible en su zona geogrÃ¡fica",
                    "audio_aun_no_disponible" : "Audio no disponible todavÃ­a",
                    "audio_no_disponible" : "Audio ya no disponible",
                    "audio_no_encontrado": "Audio no encontrado",
                    "necesita_plugin" : "VocÃª precisa instalar o plugin flash para ver este conteÃºdo",
                    "no_encontrado": "Contenido nÃ£o encontrado",
                    "cerrar" : "Fechar",
                    "tamanio_real" : "Tamanho real",
                    "ver_perfil_eskup" : "Ver perfil em Eskup",
                    "teclear_usuario" : "Digite usuÃ¡rio e senha",
                    "error_correo" : "O campo 'usuÃ¡rio' nÃ£o parece ser um e-mail. Por favor, verifique",
                    "foto" : "Foto",
                    "tamanio_ventana" : "Tamanho Janela",
                    "ver_perfil_completo" : "Ver perfil completo",
                    "avatar" : "Avatar",
                    "ver_video": "Ver vÃ­deo",
                    "vervideo_svg": "//ep00.epimg.net/reproductores/vervideo_pt-br.svg",
                    "directo":"AO VIVO",
                    "siguiente_noticia": "PrÃ³xima notÃ­cia",
                    "anterior_noticia": "NotÃ­cias anteriores",
                    "primera_noticia": "Nenhuma notÃ­cia anterior",
                    "ultima_noticia": "Sem mais notÃ­cias",
                    "contenido_no_disponible_as": "Este conteÃºdo tem um vÃ­deo que nÃ£o estÃ¡ disponÃ­vel na sua Ã¡rea geogrÃ¡fica"
                }
            };
    
            var UNICODEfrom = [
                                "Ã€","Ã","Ã‚","Ãƒ","Ã„",
                                "Ã ","Ã¡","Ã¢","Ã£","Ã¤",
                                "Ãˆ","Ã‰","ÃŠ","Ã‹",
                                "Ã¨","Ã©","Ãª","Ã«",
                                "ÃŒ","Ã","ÃŽ","Ã",
                                "Ã¬","Ã­","Ã®","Ã¯",
                                "Ã’","Ã“","Ã”","Ã•","Ã–",
                                "Ã²","Ã³","Ã´","Ãµ","Ã¶",
                                "Ã™","Ãš","Ã›","Ãœ",
                                "Ã¹","Ãº","Ã»","Ã¼",
                                "Ã‘","Ã±","Ã‡","Ã§"
                            ];
            var UNICODEto   = [
                                "\u00C0","\u00C1","\u00C2","\u00C3","\u00C4",
                                "\u00E0","\u00E1","\u00E2","\u00E3","\u00E4",
                                "\u00C8","\u00C9","\u00CA","\u00CB",
                                "\u00E8","\u00E9","\u00EA","\u00EB",
                                "\u00CC","\u00CD","\u00CE","\u00CF",
                                "\u00EC","\u00ED","\u00EE","\u00EF",
                                "\u00D2","\u00D3","\u00D4","\u00D5","\u00D6",
                                "\u00F2","\u00F3","\u00F4","\u00F5","\u00F6",
                                "\u00D9","\u00DA","\u00DB","\u00DC",
                                "\u00F9","\u00FA","\u00FB","\u00FC",
                                "\u00D1","\u00F1","\u00C7","\u00E7"
                            ];
    
            this.translate = function(lang,key){
                if(typeof(translations[lang])=="undefined"){
                    return "";
                }
                if(translations[lang][key]==null){
                    if(translations["es"][key]!=null)
                        return translations["es"][key];
                    else
                        return "";
                }
    
                return translations[lang][key];
            }
    
            this.translateText = function(lang,text){
                var exp = /{{lang:[A-Za-z0-9\_\-]*}}/g;
                var match = text.match(exp);
    
                for(var i in match){
                    var key = match[i].replace("{{lang:","").replace("}}","");
                    text = text.replace(match[i],this.translate(lang,key));
                }
    
                return text;
            }
    
            this.addTranslation = function(lang,key,value){
                if(typeof(translations[lang]=="undefined"))
                    translations[lang] = {};
    
                translations[lang][key] = value;
            }
    
            this.addTranslations = function(translations_array){
                for(var i in translations_array){
    
                    if(typeof(translations[i])=="undefined")
                        translations[i] = {};
    
                    for(var j in translations_array[i]){
                        translations[i][j] = translations_array[i][j];
                    }
                }
            }
    
            this.UNICODE = function(text){
                for(var i in UNICODEfrom){
                    var regex = new RegExp(UNICODEfrom[i], "g");
                    text = text.replace(regex,UNICODEto[i]);
                }
    
                return text;
            }
    
            this.compatibility = function (lang) {
    
                var search;
    
                for (search in translations) {
    
                    if (lang == search) {
    
                        return true;
                    }
    
                }
    
                return false;
    
            }
        }
        namespace.Lang = Lang;
    
    })(psd.media);
    /*Panel next generico para aceder desde PlayList generadas*/
    (function(namespace) {
    
    
        function NextPanel(timer,skin,skinContainer,urlBase,IdMedia) {
    
    
            var _that = this;
    
            /*Configuracion*/
            var _nextPlayer,                              //funcion siguiente
                _repeatPlayer,                            //funciones repetir
                _timer = timer,                           //tiempo de visualizacion del panel
                _skin = skin,                             //configuracion del skin del panel
                _skinContainer = skinContainer,           //Contenedor donde hira en el nextpanel
                _urlBase = urlBase,                       //URL base donde estan ubicados los assets
                _IdMedia = IdMedia,                       //Identificador unico para parsear el template
                _template;                                //Template
    
            /*visualizacion*/
            var _nextPanel,                               //panel de siguiente video
                _nextMedia,                               //Siguiente video
                _repeatMedia,                             //Repetir video
                _nextTime,                                //mostrar tiempo en el panel
                _next_counter, _counter, _counterTime,    //funciones de la cuenta atras
                _nextThumb,                               //Imagen del siguiente elemento de la lista
                _nextText,                                //texto del siguiente elemento de la lista
                _getSettings,                             //Settings
                _isShowPanel = false,                     //Verifica el estado del panel
                _evenAction;                              //Ultimo evento pulsado
    
    
            var _URL_TEMPLATE = "/psdmedia/media/simple/skinsNextPanel/{UDN}/assets/template.html",   // template
                _URL_STYLE = "/psdmedia/media/simple/skinsNextPanel/{UDN}/assets/style.css";       // main style
    
    
            _CODE_NUM_PARSER_OK = 0,
            _CODE_NUM_PARSER_ERROR = 1;
    
    
                var _udn = _skin;
    
                var _urlBaseData = _urlBase;
    
    
                var _loadTemplate = function () {
    
    
                    _URL_TEMPLATE = _URL_TEMPLATE.replace("{UDN}", _udn);
    
                    var _parser = new psd.framework.Parser(),
                        templateMediator = new psd.framework.Mediator(),
                        url = _urlBaseData ? (_urlBaseData + _URL_TEMPLATE) : _URL_TEMPLATE;
                    templateMediator.corsIE(true);
                    templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                    templateMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
                    templateMediator.mediate(url, _parser, psd.framework.Mediator.RESPONSE_TEXT);
                };
    
                /*----------------------------------------------------------------------*/
    
                /*Cargamos el skin*/
                var _loadCSS = function () {                             // Loading CSS main file
    
                    _URL_STYLE = _URL_STYLE.replace("{UDN}", _udn);
    
                    var fileref = document.createElement("link"),
                        filename = _urlBaseData ? (_urlBaseData + _URL_STYLE) : _URL_STYLE;
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", filename);
                    if (typeof fileref != "undefined") {
                        document.getElementsByTagName("head")[0].appendChild(fileref);
                    }
                };
    
    
                var onDataComplete = function (evt) {
    
                    /*Utilizamos nombre exclusivo para las capas*/
                    var TimeRandom = new Date();
                    _IdMedia  =_IdMedia + TimeRandom.getTime() + "_" + Math.floor((Math.random() * 1000) + 1);
    
                    var  dataHTML, elementHTML;
                    if (evt.result.parserResult.code == _CODE_NUM_PARSER_OK) {
                        _template = evt.result.parserResult.result.replace(/{<-%ID%->}/g, _IdMedia);
    
    
                    }
                    else if (evt.result.parserResult.code == _CODE_NUM_PARSER_ERROR) {
                        //TODO: Error
                    }
                };
    
                var onDataError = function (evt) {
                    //TODO: Error
                };
    
                _loadTemplate();
                _loadCSS();
    
    
            this.showPanel = function (url_thumbnail, title, nextPlayer, automateNextPlayer, repeatPlayer) {
    
                var _skinContainerData = document.getElementById(_skinContainer);
    
                /*Comprobamos si existe el panel*/
                if (!document.getElementById('mm_next_panel_' + _IdMedia)) {
    
                    elementHTML = document.createElement('div');
                    elementHTML.id = 'mm_next_panel_' + _IdMedia;
                    elementHTML.className = 'mm_nextpanel';
                    elementHTML.style.display = "none";
                    elementHTML.innerHTML = _template;
                    _skinContainerData.appendChild(elementHTML);
                }
    
                var _getElementById = function (id) {
                    return document.getElementById(id + _IdMedia);
                };
    
                _nextPanel = _getElementById("mm_next_panel_");
                _nextMedia = _getElementById("mm_nextMedia_");
                _repeatMedia = _getElementById("mm_repeatMedia_");
                _nextTime = _getElementById("mm_nextTime_");
                _nextThumb = _getElementById("mm_nextThumb_");
                _nextText = _getElementById("mm_nextText_");
    
    
                /*recuperamos los datos del siguiente elemento*/
                _nextThumb.src = url_thumbnail;
                _nextText.innerHTML = title;
    
    
                /*Si tenemos los elementos del panel disponible escuchamos sus eventos*/
                _counterTime = _timer;
                _nextTime.innerHTML = _timer;
    
    
                _nextMedia.onclick = (function (that) {
                    return function () {
                        /*boton panel, siguiente*/
                        _that.killPanel();
                        nextPlayer();
                    };
    
                })(this);
    
    
                _nextThumb.onclick = (function (that) {
                    return function () {
                        /*Thumb panel, siguiente*/
                        _evenAction = 'nextThumb';
                        _that.killPanel();
                        nextPlayer();
    
                    };
    
                })(this);
    
    
                _nextText.onclick = (function (that) {
                    return function () {
                        /*Texto panel, siguiente*/
                        _evenAction = 'nextText';
                        _that.killPanel();
                        nextPlayer();
                    };
    
                })(this);
    
    
                _repeatMedia.onclick = (function (that) {
                    return function () {
                        /*boton panel, repetir*/
                        _evenAction = 'repeatMedia';
                        _that.killPanel();
                        _nextTime.innerHTML = _counterTime;
                        repeatPlayer();
    
                    };
    
                })(this);
    
                _next_counter = (function (that) {
                    return function () {
                        _evenAction = 'next_counter';
                        var TotalTime = _counterTime;
    
                        _counter = setInterval(function () {
    
                            if (TotalTime != 0) {
    
                                TotalTime--;
                                _nextTime.innerHTML = TotalTime;
    
                            } else {
                                _that.killPanel();
    
                                automateNextPlayer();
    
    
                            }
    
                        }, 1000);
    
                    }
    
                })(this);
                _that.viewPanel();
            };
    
            /*mostrar panel*/
            this.viewPanel = function (data) {
                _isShowPanel = true;
                _next_counter();
                _nextPanel.style.display = "";
            };
    
    
            /*testeamos si devuelve panel*/
            this.isShowPanel = function () {
                return _isShowPanel;
            };
    
           /*Destruimos el panel*/
            this.killPanel = function () {
                if (typeof(_nextPanel) != "undefined") {
                    _nextPanel.style.display = "none";
                }
                clearInterval(_counter);
                _isShowPanel = false;
            }
    
            /*Recuperamos la ultima accion del panel*/
            this.eventAction = function () {
                return _evenAction;
            }
    
        }
    
    
        namespace.NextPanel = NextPanel;
    
    }(psd.media));(function(namespace) {
        // Inheritance class
        TopLauncher.prototype = new psd.framework.EventDispatcher();
    
        namespace.INTEGRACION= "int";
        namespace.PRODUCCION= "pro";
        namespace.LOCAL= "loc";
    
        window.mm_version = "v1";
    
        function TopLauncher(settings)
        {
            var _that = this;
    
            // Super
            psd.framework.EventDispatcher.call(this);
    
            /**
             * className psd.media.TopLauncher
             */
            this.className = "psd.media.TopLauncher";
    
            _PROTOCOLO_HTTPS = "https";
            _URL_HOST_HTTPS = "https://topsslpl-a.akamaihd.net";
    
            _TYPE_FLASH = "FLASH";
            _TYPE_IOS = "IOS";
            _TYPE_UDS = "UDS";
    
            VIDEO_MEDIA_TYPE = "video";
            AUDIO_MEDIA_TYPE = "audio";
    
            NAME_BITRATE = "bitrate";
            NAME_HEIGHT = "height";
    
            URL_ADBLOCK="/psdmedia/resources/js/psd/ima3.js";
            URL_LOGO_TOP = "/psdmedia/resources/img/top50.png";
            URL_BACKGROUND = "/psdmedia/resources/img/gradient.png";
            URL_PUBLI= "/psdmedia/resources/js/psd/prisaAd.min.js";//JuliÃ¡n
            URL_TOP_PLAYER = "/psdmedia/media/top/TopPlayer.min.js";//julian
            URL_STATS = "/psdmedia/resources/js/psd/statistics.top.min.js";//julian
    
            if (typeof(tplib) != "undefined") {
                URL_TOP_PLAYER = "/psdmedia/media/top/js/TopPlayer.lib.js";
                URL_STATS = "/psdmedia/resources/js/psd/lib/statistics.lib.js";
                URL_PUBLI= "/psdmedia/resources/js/psd/lib/prisaAd.lib.js";
            }
    
            //CODIGOS DE ERRROR
            ERROR_PARSER = "Error Code #2";
            ERROR_WS = "Error Code #3";
            ERROR_CARGA_STATISTICS = "Error Code #4";
            ERROR_CARGA_TOP_PLAYER = "Error Code #5";
    
            ERROR_SERVICIO_MEDIA = "Error_servicio_media";
    
            //TIPOS DE PROVIDER
            ID_PROVIDER_PRISADIGITAL = 1;
            ID_PROVIDER_BRIGHTCOVE = 2;
            ID_PROVIDER_GENERIC = 3;
            ID_PROVIDER_TRITON = 4;
            ID_PROVIDER_AKAMAIHD = 5;
            ID_PROVIDER_YT = 6;
            ID_PROVIDER_DM = 7;
            ID_PROVIDER_VIMEO = 8;
            ID_PROVIDER_HLS = 9;
    
            var YOUTUBE_privacy_STATUS_PUBLIC = "public";
            var YOUTUBE_privacy_STATUS_PRIVATE = "private";
            var YOUTUBE_privacy_STATUS_OCULTO = "unlisted";
    
            //CONTROLLERS
            CONTROLLER_TYPE_AKAMAIHD = "akamaihd";
            CONTROLLER_TYPE_AKAMAIHDS = "akamaihds";
            CONTROLLER_TYPE_TRITON = "triton";
            CONTROLLER_TYPE_HTML5NATIVE = "html5native";
            CONTROLLER_TYPE_YT = "youtube";
            CONTROLLER_TYPE_DM = "dailymotion";
            CONTROLLER_TYPE_VIMEO = "vimeo";
            CONTROLLER_TYPE_HLS = "hls";
            CONTROLLER_TYPE_REAL_HLS = "Realhls";
    
            //-- control fullscreen en dispositivos moviles
            _fullscreen = false;
    
            var _settings = settings;
            var _mediaPlayer,_topPlayer, _externalDomain, _isHttps, _windowError, _reset, _urlBase, _id_video, _id_cuenta;
            var playerConfig, renditions;
            var use_youtube;
            var meta_youtube = false;
    
            var _parentEmbed;
    
            this.url_FAPI = "";
            this.data_FAPI = {};
    
            this.init = function()
            {
                autoLoad.apply(this);
            }
    
            this.setEmbed = function(embed){
    
                _parentEmbed = embed;
            }
    
            this.getEmbed = function(){
                return _parentEmbed;
            }
            //_isHttps= data.urlProtocol.isHttps;
            /**
             * Constructora
             */
            var autoLoad = function()
            {
                /**En caso de que tengamos cover lo seteamos para evitar fallos**/
                if (typeof (_settings.topPlayer) == 'undefined') {
                    _settings.topPlayer = {};
                }
                if (typeof (_settings.topPlayer.media) == 'undefined') {
                    _settings.topPlayer.media = {};
                }
    
                _windowError = new psd.media.TopWindowError({
                    id_container: _settings.player.container,
                    base:_settings.base,
                    skin: _settings.skin.udn,
                    width: _settings.player.width,
                    height: _settings.player.height,
                    secure: _isHttps,
                    imgCover: (_settings.topPlayer.media.imgCover) ? _settings.topPlayer.media.imgCover : ""
                });
    
                var _basePubli;
                var setMm_base= function(alias){
                    var mensaje;
                    switch (alias){
                        case psd.media.LOCAL:
                            _settings.base = "";
                            mensaje= "LOCAL";
                            break;
                        case psd.media.INTEGRACION:
                            _settings.base = "//playerint.top.prisasd.com";
                            mensaje= "INTEGRACIÃ“N";
                            break;
                        case psd.media.PRODUCCION:
                            _settings.base = "//playertop.elpais.com";
                            mensaje= "PRODUCCIÃ“N";
                            break;
                        default :
                            _settings.base = alias;
                            mensaje= "URL BASE PERSONALIZADA: "+ alias;
                    }
                    if(typeof (mm_simple_compilation)!= "undefined"){
                        console.log("\nENTORNO "+ mensaje + "\nmm_simple_compilation: "+mm_simple_compilation + "\n");
                    }
                    else{
                        console.log("\nENTORNO "+ mensaje + "\n");
                    }
                };
                if(typeof(mm_base)!="undefined"){
                    if(mm_base==true || mm_base==false){
                        mm_base= "loc";
                    }
                    if(typeof(mm_base)=='string'){
                        setMm_base(mm_base);
                    }
                }
    
                var setMm_basePubli= function(alias){
                    var mensaje;
                    switch (alias){
                        case psd.media.LOCAL:
                            _basePubli = "";
                            mensaje= "PUBLICIDAD LOCAL";
                            break;
                        case psd.media.INTEGRACION:
                            _basePubli = "//playerint.top.prisasd.com";
                            mensaje= "PUBLICIDAD INTEGRACIÃ“N";
                            break;
                        case psd.media.PRODUCCION:
                            _basePubli = "//playertop.elpais.com";
                            mensaje= "PUBLICIDAD PRODUCCIÃ“N";
                            break;
                        default :
                            _basePubli = alias;
                            mensaje= "PUBLICIDAD PERSONALIZADA: "+ alias;
                    }
                    console.log("\nENTORNO "+ mensaje + "\n");
    
                };
                if(typeof(mm_publi)!="undefined"){
                    if(mm_publi==true || mm_publi==false){
                        mm_publi= "loc";
                    }
                    if(typeof(mm_publi)=='string'){
                        setMm_basePubli(mm_publi);
                    }
                }
    
                _externalDomain = _settings.base != null && _settings.base != undefined ? _settings.base : false;
    
                var addDependence = function(url){
                    var i;
                    for(i = 0; i < url.length; i++){
                        var head, tag;
                        head = document.getElementsByTagName('head')[0];
                        tag = document.createElement('script');
                        if(typeof(mm_publi)!="undefined"){
                            tag.src = _basePubli + url[i];
                        }
                        else{
                            tag.src = _settings.base + url[i];
                        }
                        tag.type = 'text/javascript';
                        head.appendChild(tag);
                    }
                };
                //cargamos detecciÃ³n de adBlock y biblioteca publi.
                addDependence([URL_PUBLI, URL_ADBLOCK]);
                if((_settings.stats != null) && (_settings.stats.conf != null) && ((_settings.stats.conf != ""))&& (typeof(psd.statistics)=="undefined"))
                {
                    var dependencesUrls = [];
                    dependencesUrls.push(_externalDomain ? (_settings.base + URL_STATS) : URL_STATS);
    
                    var libraryParams = {depends: dependencesUrls,
                        success: onDependencesComplete,
                        error: onDependencesError,
                        scope: this
                    };
    
                    LibraryManager.load(libraryParams);
                }
                else{getDataWS();}
            };
    
    
            /**
             * La carga de dependencias se han completado
             */
            var onDependencesComplete = function()
            {
                getDataWS.apply(this);
            }
    
            /**
             * Error en la carga de dependencias
             */
            var onDependencesError = function() {
                //NOTA: Error en la carga de la librerÃ­as TopPlayer
                if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(ERROR_CARGA_STATISTICS);}
            }
    
    
            var getDataWS = function (){
                _urlBase = _settings.ws.urlBase;
                //cuando estÃ© listo ws.urlBase sin el http quitar esta lÃ­nea
                _urlBase= castUrlBase(_urlBase);
                ////////////////////////////////
                _id_video = _settings.ws.id_video;
                _id_cuenta = _settings.ws.id_cuenta;
                loadMediator.apply(this);
            }
    
            /////esta funciÃ³n hay que quitar una vez que el servicio de dato me devuelva la ws.urlBase sin el http
            var castUrlBase = function(_urlBase){
                if(_urlBase.indexOf("http")!= -1){
                    var arrayUrlBase;
                    arrayUrlBase= _urlBase.split("//");
                    _urlBase= "//" + arrayUrlBase[1];
                }
                return _urlBase;
            }
            //////////////////////////////////////////////////////////////////////////////////////////////////////
    
            var loadMediator = function(){
    
                if((typeof _parentEmbed!="undefined")&&(_parentEmbed.pre_data)){
                    //console.log("el predata ya estaba cargado, asÃ­ que pasamos de llamar a la FAPI");
                    onDataComplete(_parentEmbed.pre_data);
    
                    return;
                }
    
                if(_settings.ws.mediaType == undefined){ _settings.ws.mediaType = VIDEO_MEDIA_TYPE}
    
                var _jsonParser = new psd.framework.parser.JSONParser();
                var _dataVideoMediator = new psd.framework.Mediator();
                _dataVideoMediator.corsIE(true);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
    
                /*switch(_id_cuenta){
                 case "playser":
                 case "los40":
                 case "los40argentina":
                 case "diarioas":
                 case "elpais":
                 window.mm_version = "v2";
                 break;
                 }*/
    
                window.mm_version = "v2";
    
                _that.url_FAPI = _urlBase+"/" + window.mm_version + "/search/"+_id_cuenta+"/"+_settings.ws.mediaType+"/idref/"+_id_video, _jsonParser;
    
                if((typeof(_that.getEmbed())!="undefined")&&(_that.getEmbed().format)){
                    _that.url_FAPI += ("/" + _that.getEmbed().format);
                    //_that.url_FAPI = "http://localhost/psdmedia/media/top/tests/station.json";
                }
    
                /*if((typeof(window.mm_tfp)!="undefined")&&(window.mm_tfp==true)){
                 _that.url_FAPI += "/tfp";
                 }*/
    
                _dataVideoMediator.mediate(_that.url_FAPI, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
            }
    
            this.addSetting = function(value)
            {
                _settings = value;
    
                //dmena -> generacion url iframe
                //var m_type =  _settings.ws.mediaType == VIDEO_MEDIA_TYPE ? VIDEO_MEDIA_TYPE : AUDIO_MEDIA_TYPE;
                //var iframe_src = value.ws.urlBase.replace("/api","") + "/embed/" + value.ws.id_cuenta + "/" + m_type + "/" + value.extra.id + "/" + value.ws.id_video;
            }
    
            //EVENTOS MEDIATOR
            var onDataComplete = function (evt)
            {
                var _videoData = evt.result.parserResult;
    
                if((typeof _that.getEmbed!="undefined")&&(typeof _that.getEmbed().API!="undefined")&&(typeof _that.getEmbed().API.onReset!="undefined")){
                    if((_videoData)&&(typeof(_videoData.result)!="undefined")&&(typeof(_videoData.result.data)!="undefined")){
                        _that.getEmbed().API.onReset(_videoData.result.data);
                    }
                }
    
                //if(_videoData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                if(_videoData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE && typeof _videoData.result == 'object' && _videoData.result.total > 0) {
                    _that.data_FAPI = _videoData.result;
                    deferredLoadData(_videoData.result);
                }else {
                    //NOTA: PARSER ERROR - msg:  + _videoData.msg
                    if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(psd.media.TopLauncherEvent.EVENT_ERROR);}
    
                    var obj = {};
                    obj.errorType = ERROR_SERVICIO_MEDIA;
                    this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_ERROR, obj));
    
                    //IMPORTANTE: usamos la variable mm_force_playlist para poder cargar una playlist cuando el player tiene un id_media geobloqueado.
                    //para ello usamos un _data genÃ©rico simulando que nos ha llegado de la FAPI y seteamos el vamor de mm_force_playlist a 2.
                    //con este valor, el TopEmbed sabrÃ¡ que estamos con un data FAKE, y al llegar al final del INIT pintarÃ¡ el mensaje de error del infopanel
                    if(typeof (mm_force_playlist)!="undefined"){
                        //console.log("probamos fake");
                        //var _data = {data: [{publishers: [ ],url_thumbnail: "",location: null,vigency: [],isdvr: false,description: "",end_of_process: "",id_collection: null,publication_date_start: "",asset: [],status: {id: 4,name: "COMPLETED",},youtube_privacy_status: "unlisted",url_mosaic: "",begin_of_process: "",id_external: null,season: null,meta_intellectual_property: [ ],geo_location: "",active: true,tags_externals: [],islive: false,publication_date_end: "",do_modify: true,id: 388067,author: "",chapter: null,details: null,name: "",length: 0,created_at: "",user_id: null,playlist: [],idref: "",process_info: null,total_collection: null,tags: [],logo: false,mail: "",video_upload: [ ],modify_at: "",track: [ ],provider: {id: 1,name: "Prisadigital",},id_contract: "",url_video_still: "",ptags: null,source: {id: 170905,mimetype: null,height: 1080,md5_original: "",container: "AVC",width: 1920,path: null,bitrate: 8000000,agency: null,codec: "AVC High@L4.0",size: 21192587,},order_collection: null,base: null,account: {id: 16,upload_tmp: "",allowed_podcast_tags_type: null,youtube_channel: "UCXISYK3xagaK5DHnhQ4X0hw",description: "Diario As",geo_url_base: "",name: "",triton_base_url: null,mandatory_contract: true,google_calendar_id: null,youtube_partner: {id: 1,email: "",description: "",name: "",},akamai_map_url: null,},id_es_kup: null,youtube_details: {id: 5982,category: 17,youtube_video_title: null,asset_type: null,playlist: null,channel: null,publish_at: null}}],total: 1};
    
                        /*Bloqueamos al publicidad en este caso MMN-280*/
                        if ((typeof (_settings.player) == "undefined")) {
                            _settings.player = {};
                            _settings.player.autoplay = false;
    
                        } else {
                            _settings.player.autoplay = false;
                        }
    
                        if ((typeof (_settings.topPlayer) == "undefined")) {
                            _settings.topPlayer = {};
                            _settings.topPlayer.ad = {};
                            _settings.topPlayer.ad.enabled = false;
                        } else {
    
                            if ((typeof (_settings.topPlayer.ad) == "undefined")) {
                                _settings.topPlayer.ad = {};
                                _settings.topPlayer.ad.enabled = false;
                            } else {
                                _settings.topPlayer.ad.enabled = false;
                            }
                        }
    
                        /*Forzamos el skin transparent MMN-280*/
                        if ((typeof (_settings.skin) == "undefined")) {
                            _settings.skin = {};
                            _settings.skin.id = "transparent";
    
                        } else {
                            _settings.skin.id = "transparent";
                        }
    
    
    
                        var _data = {data: [{url_thumbnail: "",vigency: [],isdvr: false,description: "",asset: [],status: {id: 4,name: "COMPLETED"},youtube_privacy_status: "unlisted",url_mosaic: "",id_external: null,season: null,meta_intellectual_property: [ ],geo_location: "",active: true,tags_externals: [],islive: false,id: 0,author: "",chapter: null,name: "",length: 0,playlist: [],idref: "",tags: [],provider: {id: 1,name: "Prisadigital"},id_contract: "",url_video_still: "",ptags: null,youtube_details: {id: 5982,category: 17,youtube_video_title: null,asset_type: null,playlist: null,channel: null,publish_at: null}}],total: 1};
                        //loadData.apply(this, fake);
                        _that.data_FAPI = _data;
                        deferredLoadData(_data);
                        this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_ERROR, obj));
                        mm_force_playlist = 2;
                    }
                }
    
    
                if((typeof mm_youbora!="undefined")&&(mm_youbora)){
                    _that.getEmbed().load_Youbora();
                }
            };
    
            var onDataError = function (evt)
            {
                if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(ERROR_PARSER);}
    
                var obj = {};
                obj.errorType = ERROR_SERVICIO_MEDIA;
                this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_ERROR, obj));
            }
            //EVENTOS MEDIATOR
    
            /**
             *
             * @param data - Datos relacionados con un video en concreto
             */
    
            var deferredLoadData = (function(launcher){return function(data){loadData.apply(launcher,[data]);}})(this);
    
            var check_youtube = function(datai,data){
                var ret = false;
    
                if((playerConfig.media.youtube_details!=null)&&(playerConfig.media.youtube_details.privacy_status!=null)&&(typeof playerConfig.media.youtube_details.privacy_status!="undefined")){
                    if(playerConfig.media.youtube_details.privacy_status==YOUTUBE_privacy_STATUS_PRIVATE){
                        playerConfig.media.youtube_privacy_status = YOUTUBE_privacy_STATUS_PRIVATE;
                    }
                }
    
                if (
                    (typeof(datai.type) != null)
                        //condiciÃ³n type = youtube
                        && (datai.type.name == "YOUTUBE")
                        //condiciÃ³n src != ""
                        && (datai.src != "")
                        //condiciÃ³n status de youtube = processed
                        &&(datai.tag=="processed")
                        //condiciÃ³n youtube_privacy_status para ver si el vÃ­deo es pÃºblico o privado
                        && (playerConfig.media.youtube_privacy_status != YOUTUBE_privacy_STATUS_PRIVATE)
                        //En algunos casos youtube_privacy_status llega a null, actuamos como si fuese privado
                        && (playerConfig.media.youtube_privacy_status != null)
                    ) {
    
                    //compruebo la propiedad intelectual y si estÃ¡ activa continuo como youtube
    
                    if (data.meta_intellectual_property) {
                        for (meta in data.meta_intellectual_property) {
                            if (data.meta_intellectual_property[meta].name == "youtube")
                                ret = true;
                        }
                    }
    
                    return ret;
                }else{
                    return ret;
                }
            }
    
            var loadData = function (data)
            {
                data = data["data"][0];
                // â†‘â†‘â†‘ EXPLICACIÃ“N DE ESTA COSA TAN RARA
                // Cuando se cambiÃ³ el servicio de datos de la FAPI se aÃ±adiÃ³ un nivel mÃ¡s de encapsulamiento,
                // estando los datos que esperÃ¡bamos contenidos en un array con posiciÃ³n 0 contenido en un objeto "data"
    
                //NOTA: DetecciÃ³n dispositivo
                var mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
                var iphone = navigator.userAgent.match(/iPhone/i);
    
                //Seteamos valores e instanciamos SimpleMediaPlayer
                var srcUDS, defaultMime;
    
                var assetsBitRates = [];
    
                playerConfig = _settings;
    
                defaultMime = (_settings.ws.mediaType == AUDIO_MEDIA_TYPE)? "audio/mp3":"video/mp4";
    
                if ((data.description != undefined)&&(data.description != null)){
                    data.description= data.description.replace(/<[^>]*>?/g, '');
                }
                try{
                    playerConfig.id = data.idref;
                    playerConfig.media = {
                        type:  defaultMime
                        , title: (data.name != undefined)?data.name:""
                        , desc: (data.description != undefined)?data.description:""
                        , author: (data.author != undefined)?data.author:""
                        , date: (data.created_at != undefined)?(data.created_at.split(' ')[0]):""
                        , duration: (data.length != undefined)?data.length:""
                        , live: (data.islive != undefined)?data.islive:false
                        , isDvr: (data.isdvr != undefined)?data.isdvr:false
                        , cdn: { provider:""}
                        , tags:(data.tags != undefined)?data.tags:undefined
                        , urlMosaic: data.url_mosaic
                        , chapter: data.chapter
                        , season: data.season
                        , geo_location: data.geo_location
                        , youtube_privacy_status: data.youtube_privacy_status
                        , id_contract: (data.id_contract != undefined)?data.id_contract:""
                        , details: (data.details != undefined)?data.details:null
                        , tags_externals: (data.tags_externals != undefined)?data.tags_externals:""
                        , youtube_details:(data.youtube_details != undefined)?data.youtube_details:null
                        , station_id:(data.station_id != undefined)?data.station_id:""
                        //, gdprApplies:(typeof this.gdprApplies != undefined)?this.gdprApplies:null
                        //, consentData:(typeof this.consentData!= undefined)?this.consentData:null
                    }
    
                    if(_settings.ws.mediaType == AUDIO_MEDIA_TYPE){
                        playerConfig.media.poster = (data.url_audio_still!= undefined)?data.url_audio_still:"";
                    } else {
    
                        playerConfig.media.poster = (data.url_video_still!= undefined)?data.url_video_still:"";
    
                        /*En caso de que recibamos mm_poster seteamos la caratula con el nuevo valor MMN-350*/
                        if (typeof (window.mm_poster) != 'undefined' && window.mm_poster != '') {
    
                            playerConfig.media.poster = window.mm_poster;
                        }
                    }
                    playerConfig.media.poster_thumbnail = (data.url_thumbnail!= undefined)?data.url_thumbnail:"";
    
                    if((typeof(playerConfig.topPlayer)!="undefined")&&
                        (typeof(playerConfig.topPlayer.media)!="undefined")&&
                        (typeof(playerConfig.topPlayer.media.custom_cover)!="undefined")&&
                        (playerConfig.topPlayer.media.custom_cover!=null)&&
                        (playerConfig.topPlayer.media.custom_cover!=""))
    
                        playerConfig.media.poster = playerConfig.topPlayer.media.custom_cover;
    
                    if (data.provider.id == ID_PROVIDER_AKAMAIHD){
                        playerConfig.media.cdn.provider = CONTROLLER_TYPE_AKAMAIHD;
                        playerConfig.media.clipBegin="1418403600000";
                        playerConfig.media.clipEnd="1418418900000";
                        playerConfig.media.absolute=true;
                    }
                    else{
                        playerConfig.media.cdn.provider = CONTROLLER_TYPE_AKAMAIHDS;
                    }
    
                    playerConfig.id_provider = data.provider.id;
                    playerConfig.id_external = data.id_external;
    
                    //dmena funcion de prueba para nuevos assets
                    if(data.asset.length>0){
                        _that.isExternal = false;
    
                        for(_asset in data.asset){
                            if( (typeof(data.asset[_asset].type)!="undefined")&&
                                (data.asset[_asset].type!=null)&&
                                (typeof(data.asset[_asset].type.name)!="undefined")&&
                                (data.asset[_asset].type.name!=null)
                                ){
                                if(data.asset[_asset].type.name=="YOUTUBE"){
    
                                    if(check_youtube(data.asset[_asset],data)){
                                        playerConfig.id_provider = ID_PROVIDER_YT;
                                        playerConfig.id_external = data.asset[_asset].src;
                                        _that.isExternal = true;
                                    }
                                }else{
                                    if(data.asset[_asset].type.name=="TRITON"){
                                        playerConfig.id_provider = ID_PROVIDER_TRITON;
                                        playerConfig.id_external = data.asset[_asset].src;
                                        _that.isExternal = true;
                                    }
                                }
                            }
                        }
                    }
    
    
    
                    playerConfig.eskup = {idEskup:(data.id_es_kup != undefined)?data.id_es_kup:""}
                    playerConfig.media.srcHTML5 = [];
    
                    //****SRC & SRCHTML5
                    //NOTA: SÃ“LO CUANDO NO ES HTTPS - Cogemos las url de playlist tanto para FLASH como para una de las urls de html5 (IOS). La otra url para html5 es de tipo UDS y se ha cogido de la que menos calidad tenga de los assets (arriba)
                    if (data.playlist.length > 0) {
    
                        /**Parseamos la URLs para restrigir las calidades, depende de la configuracion del player**/
                        if (playerConfig.skin !== undefined) {
    
                            if (playerConfig.skin.maxbitrate !== undefined && playerConfig.skin.maxbitrate != 0) {
    
                                (data.playlist).forEach(function (item, index) {
    
                                    data.playlist[index].url = bitRateparse(item.url, playerConfig.skin.maxbitrate);
    
                                });
                            }
                        };
    
                        for(var i=0; i<data.playlist.length; i++)
                        {
                            if((typeof _settings!="undefined")&&(typeof _settings.topPlayer!="undefined")&&(typeof _settings.topPlayer.media!="undefined")&&(typeof _settings.topPlayer.media.dist!="undefined")){
                                var dist =  _settings.topPlayer.media.dist;
                                var concat = "?";
    
                                if(data.playlist[i].url){
                                    if(data.playlist[i].url.indexOf("?")>0){
                                        concat = "&";
                                    }
                                    if(!data.isLive)
                                        data.playlist[i].url += (concat + "dist=" + dist);
                                }
                            }
    
                            if (data.playlist[i].type_url.name == _TYPE_FLASH){playerConfig.media.src = data.playlist[i].url}
                            else if (data.playlist[i].type_url.name == _TYPE_IOS)
                            {
                                //Para los audios de los dispositivos mÃ³viles, no funcionan los m3u8. SÃ³lo incluiremos las urls de UDS
                                if ((!mobile) || ((mobile) && ((playerConfig.skin.mode == "video") || (playerConfig.skin.mode == undefined)))){
                                    playerConfig.media.srcHTML5.push(data.playlist[i].url);
                                }
                            }
                        }
                    }
    
                    //tucumovido
    
                    //AÃ±adimos el parÃ¡metro DIST en caso de que estÃ© seteado en el window
                    if((typeof _settings!="undefined")&&(typeof _settings.topPlayer!="undefined")&&(typeof _settings.topPlayer.media!="undefined")&&(typeof _settings.topPlayer.media.dist!="undefined")){
                        var dist =  _settings.topPlayer.media.dist;
    
                        if(data.asset.length>0){
                            for(var ii=0;ii<data.asset.length;ii++){
                                var concat = "?";
                                if(data.asset[ii].src){
                                    if(data.asset[ii].src.indexOf("?")>0){
                                        concat = "&";
                                    }
                                    if(data.asset[ii].type){
                                        if(data.asset[ii].type.name!="YOUTUBE"){
                                            if(!data.isLive)
                                                data.asset[ii].src += (concat + "dist=" + dist);
                                        }
                                    }
                                    else{
                                        if(!data.isLive)
                                            data.asset[ii].src += (concat + "dist=" + dist);
                                    }
                                }
    
                                for(var jj=0;jj<data.asset[ii].url.length;jj++){
                                    var concat = "?";
                                    if(data.asset[ii].url[jj].url){
                                        if(data.asset[ii].url[jj].url.indexOf("?")>0){
                                            concat = "&";
                                        }
                                        if(data.asset[ii].url[jj].url.indexOf("youtube")>-1){
                                            //si es youtube no hacemos nada
                                        }else{
                                            if(!data.isLive)
                                                data.asset[ii].url[jj].url += (concat + "dist=" + dist);
                                        }
                                    }
                                }
                            }
                        }
                    }
    
                    // DMENA nueva funcionalidad YOUTUBE/CUSTOM
                    // AquÃ­ rellenamos el campo CUSTOM para todos los elementos de ASSET.
                    // En caso de que sean normales y antiguos, CUSTOM = TRUE. En caso de que sean Youtube, CUSTOM = FALSE
    
                    use_youtube = false;
    
                    if(data.asset.length>0){
                        for(var ii=0; ii<data.asset.length; ii++)
                        {
                            data.asset[ii].custom = false;
    
                            //si no hay TYPE, para hacerlo retrocompatible
                            if(typeof(data.asset[ii].type)=="undefined"){
                                data.asset[ii].custom = true;
                            }else{
                                //si el TYPE es CUSTOM
                                if(
                                    (data.asset[ii].type==null)||
                                        (data.asset[ii].type.name=="CUSTOM")||
                                        (data.asset[ii].type=="")
                                    ){
                                    data.asset[ii].custom = true;
    
                                    //si el TYPE es de YOUTUBE y se cumplen las condiciones para pintar youtube
                                }else{
                                    if((typeof(playerConfig.media.youtube_privacy_status)=="undefined")||(playerConfig.media.youtube_privacy_status==YOUTUBE_privacy_STATUS_OCULTO)){
                                        playerConfig.media.youtube_privacy_status = YOUTUBE_privacy_STATUS_PUBLIC;
                                    }
    
                                    var _metaYouTube = function (youtube) {
    
                                        if (youtube) {
                                            use_youtube = true;
                                            playerConfig.id_provider = ID_PROVIDER_YT;
                                            playerConfig.id_external = data.asset[ii].src;
                                            playerConfig.skin.id = "transparent";
                                            if (typeof (playerConfig.ads) == "undefined") {
                                                playerConfig.ads = {};
                                            }
                                            playerConfig.ads.enabled = false;
    
                                            /*Hacemos la llamada del API-iFrame y seteamos los valores para no volver a llamarla*/
    
                                            if (typeof (playerConfig.topPlayer) == "undefined") {
                                                playerConfig.topPlayer = {};
                                            }
                                            if (typeof (playerConfig.topPlayer.media) == "undefined") {
    
                                                playerConfig.topPlayer.media = {};
                                            }
    
                                            if (typeof (playerConfig.topPlayer.media.YTiFrame) == "undefined") {
                                                playerConfig.topPlayer.media.YTiFrame = {};
                                                playerConfig.topPlayer.media.YTiFrame = true;
                                            }
    
    
                                            //if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                                            if (typeof(mm_ytload) == 'undefined') {
                                                window.mm_ytload = false;
    
                                                var tag = document.createElement('script');
                                                var t = document.createTextNode("function onYouTubePlayerAPIReady(){mm_ytload = true;}");
                                                tag.appendChild(t);
                                                document.body.appendChild(tag);
    
    
                                                //var tag = document.createElement('script');
                                                //tag.type = 'text/javascript';
                                                //if (!getDevice().mobile) {
                                                //    //tag.async = true;
                                                //}
                                                //tag.src = "https://www.youtube.com/iframe_api";
                                                //var firstScriptTag = document.getElementsByTagName('script')[0];
                                                //firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                                            }
    
                                        }
                                    }
    
                                    /*En caso de que de ser un video Remoto comprovamos si el provider es Youtube*/
                                    if (playerConfig.id_provider == ID_PROVIDER_YT) {
    
                                        meta_youtube = true;
    
                                        /*Detectamos Si es un video remoto*/
                                        if (data.id_external != null && data.asset[ii].tag == null) {
    
                                            _metaYouTube(meta_youtube);
    
                                        }else{
    
                                            /*Detectamos Si hay mas de un asset y el estado es incorrecto*/
                                            if (data.asset[ii].tag != null) {
    
                                                _metaYouTube(meta_youtube);
    
                                            }
    
                                        }
    
    
                                    }
                                }
                            }
                        }
                    }else{
    
                        /*Pasamos por este flujo en aquellas seÃ±ales que son videos remotos de YouTube con asset=[]*/
    
                        /*Para los casos en que utilicemos players de YouTube pero no tengamos assets, seteamos para llamar al IframeAPI desde el Top player*/
    
                        if (typeof (playerConfig.topPlayer) == "undefined") {
                            playerConfig.topPlayer = {};
                        }
                        if (typeof (playerConfig.topPlayer.media) == "undefined") {
    
                            playerConfig.topPlayer.media = {};
                        }
    
                        if (typeof (playerConfig.topPlayer.media.YTiFrame) == "undefined") {
                            playerConfig.topPlayer.media.YTiFrame = {};
                            playerConfig.topPlayer.media.YTiFrame = false;
                        }
    
                    }
    
                    if((!use_youtube)&&(_that.isExternal==false)){
                        //NOTA: Cogemos url UDS para HTML5 con menor bitrate para http y https
                        if (data.asset.length > 0)
                        {
                            var lowBitRate = {};
                            for(var j=0; j<data.asset.length; j++)
                            {
                                if(data.asset[j].custom){
                                    //Tanto si es la primera vez que entra en el bucle como si encuentra un bitrate inferior, actualiza el objeto lowBitRate
                                    if ((lowBitRate.bitrate == undefined) ||(data.asset[j].bitrate < lowBitRate.bitrate))
                                    {
                                        lowBitRate.index = j;
                                        lowBitRate.bitrate =  data.asset[j].bitrate;
                                    }
                                }
                            }
    
                            //Cogemos la url UDS del menor bitrate
                            for(var k=0; k<data.asset[lowBitRate.index].url.length; k++)
                            {
                                if(data.asset[lowBitRate.index].custom){
                                    if ((data.playlist.length==0)&&(data.asset[lowBitRate.index].url[k].type_url.name == _TYPE_IOS))
                                    {
                                        srcIOS = data.asset[lowBitRate.index].url[k].url;
                                        playerConfig.media.srcHTML5.push(srcIOS);
                                    }
    
                                    if (data.asset[lowBitRate.index].url[k].type_url.name == _TYPE_UDS)
                                    {
                                        srcUDS = data.asset[lowBitRate.index].url[k].url;
                                        playerConfig.media.srcHTML5.push(srcUDS);
                                    }
                                    else if ((data.asset[lowBitRate.index].url[k].type_url.name == _TYPE_FLASH) && (playerConfig.id_provider == ID_PROVIDER_GENERIC))
                                    {
                                        playerConfig.media.src = data.asset[lowBitRate.index].url[k].url;
                                    }
                                }
                            }
                            //Si no hay url de html5, ponemos la url de Flash
                            if (playerConfig.media.srcHTML5.length == 0){
                                if(typeof (playerConfig.media.src)!="undefined")
                                    playerConfig.media.srcHTML5.push(playerConfig.media.src);
                            }
                        }
                        //****SRC & SRCHTML5
    
    
                        //****RENDITIONS - Sirve para mandar los bitrates que hay para que el usuario pueda manualmente cambiar de uno a otro, a travÃ©s del botÃ³n de la barra de progreso
                        if (data.asset.length > 0)
                        {
                            for(var z=0; z<data.asset.length; z++)
                            {
                                if(data.asset[z].custom){
                                    var asset = {};
                                    asset.assetBitrate = data.asset[z].bitrate;
                                    asset.assetHeight = data.asset[z].height;
                                    assetsBitRates.push(asset)
                                }
                            }
                            if(assetsBitRates.length>0){
                                //Ordena el array por bitrate (ascendente);
                                assetsBitRates = assetsBitRates.sort(function(a,b){return parseFloat(a.assetBitrate) - parseFloat(b.assetBitrate)});
    
                                var nameRendition = NAME_HEIGHT;
                                playerConfig.media.renditions = [];
                                for(var i=0; i<assetsBitRates.length; i++)
                                {
                                    if(nameRendition == NAME_BITRATE){playerConfig.media.renditions.push(assetsBitRates[i].assetBitrate + "bps");}
                                    else if (nameRendition == NAME_HEIGHT){playerConfig.media.renditions.push(assetsBitRates[i].assetHeight + "p");}
                                }
                            }
                        }
                        //****RENDITIONS
                    }
    
    
                    // 2017-12-19 NEW, si tenemos m3u8, machacamos el media.src de flash
    
                    // if ( playerConfig.media.live && (typeof (playerConfig.media.srcHTML5) != "undefined") && (playerConfig.media.srcHTML5.length>0)) {
                    if ( typeof (playerConfig.media.srcHTML5) != "undefined" && playerConfig.media.srcHTML5.length>0 ) {
                        for(var i in playerConfig.media.srcHTML5){
                            var URLtest = playerConfig.media.srcHTML5[i];
                            if(URLtest.indexOf(".m3u8")>0){
                                if(mobile || this.hlsIsSupported()) {
                                    playerConfig.media.src = URLtest;
                                }
                            }
                        }
                    }
    
                    if(playerConfig.id_provider != ID_PROVIDER_TRITON && playerConfig.id_provider != ID_PROVIDER_YT){
                        if (typeof (playerConfig.media.src) != "undefined") {
                            var URLtest = playerConfig.media.src;
                            if (URLtest.indexOf(".m3u8") > 0) {
                                playerConfig.id_provider = ID_PROVIDER_HLS;
                            }
                        }
                    }
    
                    //if (((_settings.media.live)&&(playerConfig.id_provider==ID_PROVIDER_PRISADIGITAL))||((playerConfig.id_provider == ID_PROVIDER_HLS)&&((this.hlsIsSupported()== false)||(this.hlsIsSupported()=== undefined)))||(playerConfig.id_provider==ID_PROVIDER_GENERIC)) {
                    if(typeof playerConfig.media.src != 'undefined'){
                        if ( (playerConfig.id_provider == ID_PROVIDER_HLS && (this.hlsIsSupported()=== false || this.hlsIsSupported()=== undefined )) ||
                            playerConfig.media.src.indexOf(".f4m") > 0 )  {
                            var s = document.createElement("script");
                            s.src = _settings.base + "/psdmedia/resources/js/ext/swfobject/swfobject.js";
                            document.querySelector("head").appendChild(s);
                        }
                    }
    
                    // fin NEW
    
                    if (playerConfig.ads != null)
                    {
                        if ((data.ptags != undefined) && (data.ptags != null))
                        {
                            playerConfig.ads.pTags = data.ptags;
                        }
                    }
    
                    //NOTA: Para mÃ³viles sÃ³lo ponemos el modo html5 y directLink, para pc pondremos flash
                    if (mobile){playerConfig.player.mode = "html5,directlink"}
                    else {playerConfig.player.mode = "flash"}
    
    
                    //INSTANCIACIÃ“N PLAYER
                    //TODO: Evaluar mediante el estudia del useragent la siguiente propiedad
                    var isExplorer10 = false;
    
                    //Forzamos el skin generic para versiones no compatibles con Full Screen html5
                    //if (!isExplorer10 && (_id_cuenta == ID_CUENTA_MERISTATION))
                    //    playerConfig.skin.id = "generic";
    
                    renditions = [];
    
                    var aux;
                    for(var i=0; i<assetsBitRates.length; i++)
                    {
                        aux = {"label":assetsBitRates[i].assetHeight + "p" , "bitrate": assetsBitRates[i].assetBitrate + "bps" }
                        renditions.push(aux);
                    }
    
                    //Nota: Cargamos primero la librerÃ­a TopPlayer porque necesitamos acceder a constantes para la configuraciÃ³n
                    if (!_reset)
                    {
                        //Carga dinÃ¡mica de TopPlayer
    
                        var topPlayerLibrary = {depends: _externalDomain ? (_settings.base + URL_TOP_PLAYER) : URL_TOP_PLAYER
                            , success: onTopPlayerLibraryComplete
                            , error: onTopPlayerLibraryError
                            , scope: this
                        };
    
                        if(typeof (mm_top_compilation)=="undefined"){
                            LibraryManager.load(topPlayerLibrary);
                        }
                        else{
                            setConfigTopPlayer.apply(this);
                        }
                    }
                    else {setConfigTopPlayer.apply(this);}
                }
                catch (err)
                {
                    //console.log("ERROR!!!:",err);
                    if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage();}
                }
            }
    
            var onTopPlayerLibraryComplete = function()
            {
                setConfigTopPlayer.apply(this);
            }
    
            var setConfigTopPlayer = function()
            {
                var config;
    
                if (playerConfig.topPlayer){config = playerConfig.topPlayer;}
                else {config = {};}
    
                //SOCIAL
                if (!config.social){config.social = {};}
    
                config.social.eskupData = playerConfig.eskup;
    
    
                //GENERIC
                if (!config.generic){config.generic = {};}
    
                config.generic.container = playerConfig.player.container,
                    config.generic.id = playerConfig.player.container.replace(".","_") + "_TopPlayer",
                    config.generic.width = playerConfig.player.width,
                    config.generic.height = playerConfig.player.height,
                    config.generic.urlBase = playerConfig.base,
                    config.generic.id_player = playerConfig.extra.id,
                    config.generic.id_cuenta = playerConfig.ws.id_cuenta;
    
    
                //UI
                if (!config.ui){config.ui = {};}
    
                //TODO: Descomentar la linea de abajo y comentar el skin de prueba. EstÃ¡ asÃ­ porque el skin que actualmente devuelve no existe y da error
                config.ui.skin = playerConfig.skin.id,
                    //config.ui.skin = emic.top.UIModule.SKIN_TEST,
                    config.ui.poster = playerConfig.media.poster,
                    config.ui.posterThumbnail = playerConfig.media.poster_thumbnail,
                    config.ui.bgColor = playerConfig.player.bgColor,
                    config.ui.skinData = playerConfig.skin,
                    config.ui.absoluteTime = playerConfig.media.absoluteTime,
                    config.ui.overrideNativeControls = playerConfig.skin.html5
                config.ui.showPreview = false;
                //config.ui.preview = "", //TODO: pendiente por parte de Nacho
                //config.ui.previewData = "",//TODO: pendiente por parte de Nacho
    
                //AD
                if (!config.ad){config.ad = {};}
    
                if(typeof(config.ad.enabled)!="undefined"){
                    if(typeof(playerConfig.ads) != "undefined")
                        playerConfig.ads.enabled = config.ad.enabled;
                }
    
                /*en caso de ser un ID con controlador de you tube se fuerza la publi a false*/
                if (typeof(playerConfig.ads) != "undefined") {
    
                    if (typeof(playerConfig.ads.enabled) != "undefined") {
                        if (playerConfig.ads.enabled) {
                            playerConfig.ads.enabled = true;
                        } else {
                            playerConfig.ads.enabled = false;
                        }
                    } else {
                        playerConfig.ads.enabled = true;
                    }
                } else {
                    playerConfig.ads = {};
                    playerConfig.ads.enabled = false;
                }
    
                if(use_youtube){
                    playerConfig.ads.enabled = false;
                }
    
                if (playerConfig.ads.enabled)
                {
    
                    /*Pasamos un nuevo objeto para poder setear  publicidad en le player de YouTube*/
                    config.ad.enabledYouTube = playerConfig.ads.enabled;
    
                    //config.ad.conf = "http://10.90.1.61:33399/psdmedia/media/simple/TopLauncher/data/conf_html5.json",
                    if (playerConfig.ads.conf){config.ad.conf = playerConfig.ads.conf;}
                    if (playerConfig.ads.pTags){config.ad.pTags = playerConfig.ads.pTags;}
                    if (playerConfig.ads.enabled){config.ad.enabled = playerConfig.ads.enabled;}
    
                }
                else {
    
                    /*Pasamos un nuevo objeto para poder setear  publicidad en el player de YouTube*/
                    config.ad.enabledYouTube = config.ad.enabled;
    
                    config.ad.enabled = false;
                }
    
                //****MEDIA****//
                if (!config.media){config.media = {};}
    
                if(typeof mm_autoplay!="undefined")
                    mm_autoplay = true;
    
                switch (playerConfig.id_provider)
                {
                    case ID_PROVIDER_TRITON:
                        if((getDevice().mobile)&&(typeof mm_autoplay!="undefined"))
                            mm_autoplay = false;
    
                        config.media.id = playerConfig.id_external;
                        config.media.idTOP = playerConfig.id;
                        config.media.provider = "triton";
    
                        if (playerConfig.media.live){
                            config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_TRITON];
                            config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                        }
                        else {config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_AKAMAIHD];}
    
                        break;
                    case ID_PROVIDER_GENERIC:
                        config.media.id = playerConfig.id;
                        config.media.idTOP = playerConfig.id;
                        config.media.url = playerConfig.media.src;
                        config.media.urlHTML5 = playerConfig.media.srcHTML5;
                        config.media.controllerPriority = [emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                        config.media.provider = "generic";
                        break;
                    case ID_PROVIDER_PRISADIGITAL:
                    case ID_PROVIDER_BRIGHTCOVE:
                        config.media.id = playerConfig.id;
                        config.media.idTOP = playerConfig.id;
                        config.media.url = playerConfig.media.src;
                        config.media.urlHTML5 = playerConfig.media.srcHTML5;
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                        config.media.provider = "prisadigital";
                        break;
                    case ID_PROVIDER_YT:
                        config.media.id = playerConfig.id_external;
                        config.media.idTOP = playerConfig.id;
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_YT];
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                        config.media.provider = "youtube";
                        //config.ui.skin = "transparent";
                        config.ui.skin = "transparent";
                        config.ad.enabled = false;
                        //ponemos autoplay a false cuando el controlador es youtube porque si no intenta hacer un reboot y no se puede en esa clase de controladores
                        mm_autoplay = undefined;
                        break;
                    case ID_PROVIDER_DM:
                        config.media.id = playerConfig.id_external;
                        config.media.idTOP = playerConfig.id;
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_DM];
                        config.media.tecPriorityPC = [emic.top.MediaModule.TECHNOLOGY_HTML5];
                        config.media.provider = "dailymotion";
                        break;
                    case ID_PROVIDER_HLS:
                        config.media.id = playerConfig.id;
                        config.media.idTOP = playerConfig.id;
                        config.media.url = playerConfig.media.src;
                        config.media.urlHTML5 = playerConfig.media.srcHTML5;
                        //TODOjc
                        if(this.hlsIsSupported()){
                            config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_REAL_HLS];
                        } else {
                            config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_HLS];
                        }
                        config.media.provider = "hls";
                        break;
                    default:
                        config.media.id = playerConfig.id;
                        config.media.idTOP = playerConfig.id;
                        config.media.url = playerConfig.media.src;
                        config.media.urlHTML5 = playerConfig.media.srcHTML5;
                        config.media.provider = "default";
    
                        config.media.controllerPriority= [emic.top.MediaModule.CONTROLLER_TYPE_HTML5NATIVE];
                };
    
                //Si en la configuraciÃ³n del player hay un valor seleccionado en el campo Autoplay distito de Nulo, cogemos esa opciÃ³n como prioritaria.
                //En caso contrario cogemos el valor del json si es que llega, sino el valor por defecto serÃ­a autoplay=false.
                if (playerConfig.player.autoplay != null){config.media.autoplay= playerConfig.player.autoplay;}
                else if (config.media.autoplay == undefined){config.media.autoplay = false;}
    
                //config.media.autoplay= playerConfig.player.autoplay;
                config.media.wmode= playerConfig.player.wmode;
                config.media.title= playerConfig.media.title;
                config.media.description= playerConfig.media.desc;
                config.media.isLive= playerConfig.media.live;
                config.media.isDVR = playerConfig.media.isDvr;
                config.media.clipBegin= playerConfig.media.clipBegin;
                config.media.clipEnd= playerConfig.media.clipEnd;
                config.media.absolute= playerConfig.media.absolute;
                config.media.author= playerConfig.media.author;
                config.media.date= playerConfig.media.date;
                config.media.duration = playerConfig.media.duration;
                config.media.urlMosaic = playerConfig.media.urlMosaic;
                config.media.chapter = playerConfig.media.chapter;
                config.media.season = playerConfig.media.season;
                config.media.geo_location = playerConfig.media.geo_location;
                config.media.youtube_privacy_status = playerConfig.media.youtube_privacy_status;
                config.media.details = playerConfig.media.details;
                config.media.youtube_details = playerConfig.media.youtube_details;
                config.media.station_id = playerConfig.media.station_id;
                //config.media.consentData = playerConfig.media.consentData;
                //config.media.gdprApplies = playerConfig.media.gdprApplies;
    
    
                if((typeof config.media.station_id!="undefined")&&(config.media.station_id!=null)&&(config.media.station_id!="")){
                    if(typeof config.media.urlHTML5!="undefined"){
                        for(var i=0;i<config.media.urlHTML5.length;i++){
                            var separator = config.media.urlHTML5[i].indexOf("?")>0?"&":"?";
                            config.media.urlHTML5[i] += separator + "stid=" + config.media.station_id;
                        }
                    }
                    if(typeof config.media.url!="undefined"){
                        var separator = config.media.url.indexOf("?")>0?"&":"?";
                        config.media.url += separator + "stid=" + config.media.station_id;
                    }
                }
    
    
    
                if(config.media.isLive)
                    config.media.defaultLive = config.media.idTOP;
    
                if (playerConfig.security != undefined)
                {
                    config.media.authParams = playerConfig.security.authParams;
                    config.media.authParamsHTML5 = playerConfig.security.authParamsHTML5;
                }
    
                config.media.mimetype = playerConfig.media.type;
                config.media.renditions = renditions;
    
    
                config.media.tags = {};
                config.media.tags.canal = getTagByLetter.apply(this, ["Canal"]);
                config.media.tags.programa = getTagByLetter.apply(this, ["P"]);
                config.media.tags.emisora = getTagByLetter.apply(this, ["E"]);
                config.media.tags.seccion = getTagByLetter.apply(this, ["S"]);
                config.media.tags.tematica = getTagByLetter.apply(this, ["T"]);
                config.media.tags.cp = getTagCP.apply(this);
                config.media.tags.tematicaParent = getTagByLetter.apply(this, ["W"]);
                config.media.tags.tagContrato = getTagByLetter.apply(this, ["contrato"]);
                config.media.tags.allTags = getAllTags.apply(this, [config.media.tags]); // Metemos en el objetos todos los tags con comas para posteriormente usarlo tanto en la v13 de las estadÃ­sticas como para segmentar publicidad
                config.media.tags.allTagsList = getAllTagsList(config.media.tags.allTags); // variable List3
                config.media.tags.tagsArrayExternal = getTagsArray();
                config.media.tags.externals = getTagsExternals(playerConfig.media.tags_externals);
                config.media.tags.iptc = getTagsIPTC(playerConfig.media.tags_externals);
                config.media.tags.iab = getTagsIAB(playerConfig.media.tags_externals);
                config.media.tags.youbora = playerConfig.media.tags;
    
                config.media.tags.tagsNoticiasId = getTagsNoticias(playerConfig.topPlayer.media.tags_noticia_array);
    
                //ESTADÃSTICAS
                if (!config.stat){config.stat = {};}
    
                if((playerConfig.stats != null) && (playerConfig.stats.conf != null) && (playerConfig.stats.conf != ""))
                {
                    config.stat.conf = playerConfig.stats.conf;
                    if (!config.stat.extraData){config.stat.extraData = {};}
    
                    config.stat.extraData.canal = config.media.tags.canal;
                    config.stat.extraData.programa = config.media.tags.programa;
                    config.stat.extraData.emisora = config.media.tags.emisora;
                    config.stat.extraData.seccion = config.media.tags.seccion;
                    config.stat.extraData.tematica = config.media.tags.tematica;
                    config.stat.extraData.tematicaParent = config.media.tags.tematicaParent;
                    config.stat.extraData.tipoContenido = "Programa";
                    config.stat.extraData.idTop = playerConfig.id;
                    config.stat.extraData.playerName = playerConfig.extra.description;
                    config.stat.extraData.tags = config.media.tags.allTags;
                    config.stat.extraData.tagsList = config.media.tags.allTagsList;
                    config.stat.extraData.id_contract = playerConfig.media.id_contract;
                    config.stat.extraData.tags_externals = config.media.tags.externals;
                    config.stat.extraData.tagContrato = config.media.tags.tagContrato;
    
    
                }
                else {
                    config.stat.enabled = false;
                }
    
                //TODOjc1402 y 2404
                if(typeof mm_autoplay_disable != 'undefined' && mm_autoplay_disable == true){
                    _reset = false;
                    mm_autoplay_disable = false;
                }
                if(!(typeof mm_autoplay != 'undefined' && mm_autoplay == true)) {
                    if(typeof mm_playlist_no_reset != 'undefined' && mm_playlist_no_reset == true){
                        _reset = false;
                        mm_playlist_no_reset = false;
                    }
                }
    
                if (_reset)
                {
                    _reset = false;
    
                    if (_topPlayer != undefined){_topPlayer.load(config);}
                }
                else
                {
                    _topPlayer = new emic.top.TopPlayer();
                    _topPlayer.addEventListener(emic.top.event.TopEvent.ON_READY,onTopEventsReady, this);
    
                    //compruebo la propiedad intelectual,si es youtube y no tiene cover ponemos autoplay=false #1.4
                    if (config.media.provider == 'youtube') {
    
                        if (typeof(config.media.cover) != 'undefined') {
                            if (!config.media.cover) {
                                //config.media.autoplay = false;
                            }
                        }
                    }
    
                    _topPlayer.init(config);
    
                    if(typeof _topPlayer.setLauncher == 'function')
                        _topPlayer.setLauncher(this);
                }
            }
    
            var onTopEventsReady = function()
            {
                this.dispatchEvent(new psd.media.TopLauncherEvent(psd.media.TopLauncherEvent.EVENT_INI));
            }
    
            var onTopPlayerLibraryError = function()
            {
                //Error carga librerÃ­a TopPlayer
                if (_settings.ws.mediaType == VIDEO_MEDIA_TYPE){_windowError.paintMessage(ERROR_CARGA_TOP_PLAYER);}
            }
    
            var getTagsArray = function(){
                var ret = [];
    
                if (playerConfig.media.tags_externals!= undefined)
                {
                    if (playerConfig.media.tags_externals.length > 0)
                    {
                        for(var i=0; i<playerConfig.media.tags_externals.length; i++)
                        {
                            ret[ret.length] = {"id":playerConfig.media.tags_externals[i]["id"],"name":playerConfig.media.tags_externals[i]["name"]};
                        }
                    }
                }
    
                return ret;
            }
    
            var getTagByLetter = function(letter)
            {
                var tags = "";
    
                if (playerConfig.media.tags != undefined)
                {
                    if (playerConfig.media.tags.length > 0)
                    {
                        for(var i=0; i<playerConfig.media.tags.length; i++)
                        {
                            if (playerConfig.media.tags[i].type == letter)
                            {
                                tags += (tags == "")?(playerConfig.media.tags[i].name):(","+playerConfig.media.tags[i].name);
                            }
                        }
    
                        return tags;
                    }
                    else {return "";}
                }
                else {return "";}
            }
    
            var getTagCP = function()
            {
                var tags = "";
    
                if (playerConfig.media.tags != undefined)
                {
                    if (playerConfig.media.tags.length > 0)
                    {
                        for(var i=0; i<playerConfig.media.tags.length; i++)
                        {
                            if ((playerConfig.media.tags[i].type == "CP")&&(playerConfig.media.tags[i].tag_parent==null))
                            {
                                tags += (tags == "")?(playerConfig.media.tags[i].name):(","+playerConfig.media.tags[i].name);
                            }
                        }
    
                        return tags;
                    }
                    else {return "";}
                }
                else {return "";}
            }
    
            var getAllTags = function(tagsObj)
            {
                var tags = "";
                for(tagName in tagsObj)
                {
                    if ((tagsObj[tagName] != "") && (tagsObj[tagName] != " "))
                    {
                        tags +=(tags == "")?(tagsObj[tagName]):("," + tagsObj[tagName]);
                    }
                }
    
                return tags;
            }
    
            var getAllTagsList = function (tagsList) {
    
                var StringList = tagsList.replace(/,/gi, ";");
    
                return StringList;
            }
    
            var getTagsIPTC = function(tagsList){
                var ret = [];
    
                if (tagsList != '') {
                    for (var i=0;i<tagsList.length;i++) {
                        if((tagsList[i].cod_iptc!="")&&(tagsList[i].cod_iptc!=null)&&(typeof tagsList[i].cod_iptc!="undefined")){
                            ret.push(tagsList[i].cod_iptc);
                        }
                    }
                }
    
                return ret.join(",");
            }
    
            var getTagsIAB = function(tagsList){
                var ret = [];
    
                if (tagsList != '') {
                    for (var i=0;i<tagsList.length;i++) {
                        if((tagsList[i].cod_iab!="")&&(tagsList[i].cod_iab!=null)&&(typeof tagsList[i].cod_iab!="undefined")){
                            ret.push(tagsList[i].cod_iab);
                        }
                    }
                }
    
                return ret.join(",");
            }
    
            var getTagsExternals = function (tagslist) {
    
                if (tagslist != '') {
                    var arrayTags = '',
                        semicolon = ';';
    
                    for (a in tagslist) {
                        if (a == tagslist.length - 1) {
                            semicolon = ''
                        }
                        arrayTags += tagslist[a].idref + semicolon;
                    }
    
                    return arrayTags;
    
                } else {
    
                    return '';
                }
    
            }
    
            var getTagsNoticias = function (tagslist) {
                if (tagslist != '') {
                    var tagsNoticias = '',
                        semicol = ',';
                    for (a in tagslist) {
                        if (a == tagslist.length - 1) {
                            semicol = ''
                        }
                        tagsNoticias += tagslist[a].id + semicol;
                    }
                    return tagsNoticias;
    
                } else {
    
                    return '';
                }
            }
    
            var getUrlHttps = function(url)
            {
                var arraySrc = url.split("://")[1].split("/");
                arraySrc[0] = _URL_HOST_HTTPS; //Cambiado el dominio que llegue por el de https
    
                return arraySrc.join("/");
            }
    
            this.getMediaPlayer = function()
            {
                if (_mediaPlayer) {return _mediaPlayer;}
                else if(_topPlayer){return _topPlayer;}
            }
    
            this.reset = function(urlBase, id_cuenta, id_video, reset_config)
            {
                if(urlBase==undefined){
                    urlBase = _settings.ws.urlBase;
                }
    
                for(var i in reset_config){
                    var level0 = reset_config[i];
    
                    if(_settings[i]!=undefined){
                        for(var j in level0){
                            var level1 = level0[j];
                            if(typeof(_settings[i][j])!="undefined")
                                _settings[i][j] = level1;
                        }
                    }
                }
    
                _reset = true;
    
                _id_cuenta = id_cuenta;
                _id_video = id_video;
    
    
                loadMediator.apply(this);
    
            }
    
            this.setRatio = function(_widht,_height,_preserve){
                _topPlayer.setRatio(_widht,_height,_preserve);
            }
    
            this.hlsIsSupported = function(){
                var mediaSource = window.MediaSource = window.MediaSource || window.WebKitMediaSource;
                var sourceBuffer = window.SourceBuffer = window.SourceBuffer || window.WebKitSourceBuffer;
                var isTypeSupported = mediaSource && typeof mediaSource.isTypeSupported === 'function' && mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    
                // if SourceBuffer is exposed ensure its API is valid
                // safari and old version of Chrome doe not expose SourceBuffer globally so checking SourceBuffer.prototype is impossible
                var sourceBufferValidAPI = !sourceBuffer || sourceBuffer.prototype && typeof sourceBuffer.prototype.appendBuffer === 'function' && typeof sourceBuffer.prototype.remove === 'function';
                return isTypeSupported && sourceBufferValidAPI;
            }
        }
    
        namespace.TopLauncher = TopLauncher;
    
    })(psd.media);(function(namespace) {
        // Inheritance class
        TopEmbed.prototype = new psd.framework.EventDispatcher();
    
        function TopEmbed(iniSettings, pFromManager)
        {
            var _that = this;
            var _manager = null;
            var _realIniSettings = null;
    
            this.onInit = function(that){};
            this.a_name = "";
            if(typeof(iniSettings)!="undefined")
                this.a_name = iniSettings["id_player"] + "_" + iniSettings["id_media"];
    
            this.settings_pre = {};
    
            var loadCookieSync = function(station_id){
                if(iniSettings.media_type!="audio")
                    return;
    
                switch(iniSettings.id_cuenta){
                    case "elpais":
                    case "diarioas":
                    case "elcomidista":
                    case "smoda":
                    case "motor":
                    case "verne":
                    case "cincodias":
                    case "retina":
                        //para estas unidades de negocio no cargamos cookie sync
                        break;
                    default:
                        if(typeof(tdIdsync) != "object"){
    
                            if(typeof Didomi!="undefined"){
                                window.mm_didomi_cs_t = Didomi.getUserConsentStatusForVendor("239");
    
                                var consent = window.cmpConsentString;
                                var gdpr = window.mm_didomi_cs_t||false;
    
                                var js = document.createElement('script');
                                js.type = 'text/javascript';
                                js.src = "https://playerservices.live.streamtheworld.com/api/idsync.js?stationId=" + station_id + "&gdpr=" + gdpr + "&gdpr_consent=" + consent;
    
                                js.onload = function(){
                                    if((typeof mm_demo!="undefined")&&(mm_demo))
                                        console.log("%cCookie Sync loaded","font-weight:bold;color:orange")
                                }
    
                                var s = document.getElementsByTagName('script')[0];
                                s.parentNode.insertBefore(js, s);
                            }else{
                                window.didomiOnReady = window.didomiOnReady || [];
                                window.didomiOnReady.push(function(Didomi) {
                                    Didomi.getObservableOnUserConsentStatusForVendor('239')
                                        .subscribe(function(consentStatus) {
                                            if (consentStatus === undefined) {
                                                window.mm_didomi_cs_t = false;
                                            } else if (consentStatus === true) {
                                                window.mm_didomi_cs_t = true;
                                            } else if (consentStatus === false) {
                                                window.mm_didomi_cs_t = false;
                                            }
    
                                            var consent = window.cmpConsentString;
                                            var gdpr = window.mm_didomi_cs_t;
    
                                            var js = document.createElement('script');
                                            js.type = 'text/javascript';
                                            js.src = "https://playerservices.live.streamtheworld.com/api/idsync.js?stationId=" + station_id + "&gdpr=" + gdpr + "&gdpr_consent=" + consent;
    
                                            js.onload = function(){
                                                if((typeof mm_demo!="undefined")&&(mm_demo))
                                                    console.log("%cCookie Sync loaded","font-weight:bold;color:orange")
                                            }
    
                                            var s = document.getElementsByTagName('script')[0];
                                            s.parentNode.insertBefore(js, s);
    
                                        });
                                });
                            }
                        }
                }
            };
    
            (function(){
                if(typeof mm_cookiesync=="undefined")
                    return;
    
                var cuenta = "";
                if(typeof iniSettings!="undefined")
                    cuenta = iniSettings.id_cuenta;
                if(typeof mm_demo!="undefined")
                    cuenta = "demo";
    
                if(cuenta=="")
                    return;
    
                var _url = "//fapi-top.prisasd.com/short/" + cuenta + "/accountstationid";
    
                var _jsonParser = new psd.framework.parser.JSONParser();
                var _dataVideoMediator = new psd.framework.Mediator();
                _dataVideoMediator.corsIE(true);
    
                onDataCompleteSSDD_CS = function(evt){
                    if((typeof(evt.result.parserResult.result.success)!="undefined")&&(evt.result.parserResult.result.success==false))
                        return;
    
                    if(evt.result.parserResult.result.data[0].station_id){
    
                        var stid = evt.result.parserResult.result.data[0].station_id;
    
                        if(typeof mm_demo!="undefined")
                            stid = 167083;
    
                        if(stid!="")
                            loadCookieSync(stid);
                    }
                }
    
                onDataErrorSSDD_CS = function(){
    
                }
    
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataCompleteSSDD_CS, this);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataErrorSSDD_CS, this);
                _dataVideoMediator.mediate(_url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
    
    
    
                /*setTimeout(function(){
                 console.log("llamamos a loadcookiesync")
                 loadCookieSync();
                 },500);*/
            })()
    
            // Super
            psd.framework.EventDispatcher.call(this);
    
            /**
             * className psd.media.TopEmbed
             */
            this.className = "psd.media.TopEmbed";
            this.pluginsList = {};
            this.plugins = {};
            this.base = "";
    
            URL_BASE_DEV = "//webfastapi.top.des.prisadigital.int"; //url_desarrollo
            URL_BASE_PRO = "//fapi-top.prisasd.com"; //url producciÃ³n
            //URL_BASE_SSL = "https://topsslpl-a.akamaihd.net";
    
            MEDIA_TYPE_VIDEO = "video";
            MIN_PLAYER_WIDTH = 320; //Es el mÃ­nimo ancho de reproducciÃ³n de la publicidad.
            ERROR_PARSER = "Error Code #1";
    
            ERROR_SERVICIO_PLAYER = "Error_servicio_player";
            ERROR_SERVICIO_MEDIA = "Error_servicio_media";
    
            URL_EMBED_PLAYER = "instanceplayer.prisasd.com";
    
            var _iniSettings = iniSettings;
            this.iniSettings = _iniSettings;
    
            var _dev = false;
    
            var  _windowError, _url_base_api, _mediaLauncherTop, _mediaPlayer, _data, _reset;
            var _isInitialized = false;
            this.playList = undefined;
    
            var check_mmdebug = function(level){
                var ret = false;
    
                if((typeof(window.mm_debug)!="undefined")&&(window.mm_debug!="")&&(window.mm_debug!=0)&&(window.mm_debug!="0")){
                    ret = true;
    
                    window.mm_debug += "";
    
                    var mm_debug_split = window.mm_debug.split("|");
    
                    if(typeof(level)!="undefined"){
                        level = level.split("|");
    
                        ret = false;
    
                        for(var i in level){
                            for(var j in mm_debug_split){
                                if((level[i]==mm_debug_split[j])||(mm_debug_split[j]=="all")){
                                    ret = true;
                                }
                            }
                        }
                    }else{
                        ret = false;
    
                        for(var j in mm_debug_split){
                            if(mm_debug_split[j]=="all"){
                                ret = true;
                            }
                        }
                    }
                }
    
                return ret;
            }
    
            emic.top.debug = function (msg, params, level) {
                if ((emic.top.debugTop)||(check_mmdebug(level))) {
                    var d = new Date(),
                        output = "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]" + msg;
    
                    if (typeof(console)!=undefined)
                        if (console.log)
                            console.log(output,  params ? params : "");
                        else if (console.debug)
                            console.debug(output,  params ? params : "");
    
                    var consola = document.getElementById(emic.top.externalConsole);
                    if (consola) {
                        var auxText;
                        if (typeof(params) == "object") {
                            auxText = "\n";
                            for (var i in params) {
                                auxText += "  --> " + i + ": " + params[i] + "\n";
                            }
                        } else {
                            auxText = (params==undefined)? "":params;
                        }
    
                        consola.innerHTML = consola.innerHTML + "[" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "]" + msg + auxText + "\n";
                    }
                }
            };
    
            var _embedToManager = function(){
                var _tmpManager = new psd.media.TopEmbedManager();
                _tmpManager.addEmbed(this);
                this.removeEventListener(psd.media.TopEmbedEvent.EVENT_INI, _embedToManager, this);
            }
    
            /**
             ** si no viene desde el manager (pFromManager no estÃ¡ en true)
             ** * si tiene managerOpt, metemos este embed en el manager --> manager.add()
             ** * si no tiene managerOpt, metemos este embed en el manager, despues del EVENT_INI --> manager.addEmbed()
             **/
            if(typeof _iniSettings != "undefined"){
                if(typeof pFromManager != "boolean"){
                    if(typeof _iniSettings.managerOpt == 'undefined'){
                        this.addEventListener(psd.media.TopEmbedEvent.EVENT_INI, _embedToManager, this);
                    }
                } else {
                    if(pFromManager){
                        if(_iniSettings.managerOpt != "undefined"){
                            delete _iniSettings.managerOpt;
                        }
                    }
                }
            }
    
            this.getManager = function(){
                return _manager;
            }
    
            this.setManager = function(manager){
                _manager = manager;
            }
    
            var _init = function()
            {
                if (_iniSettings != undefined) {
    
                    if((typeof mm_disable_autoplay_safari!="undefined")&&(mm_disable_autoplay_safari==true)){
                        if(
                            (typeof _iniSettings.topPlayer!="undefined")
                            &&
                            (typeof _iniSettings.topPlayer.media!="undefined")
                            &&
                            (typeof _iniSettings.topPlayer.media.autoplay!="undefined")
                            &&
                            /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
                        ){
                            if(typeof mm_debug) console.log("SOY SAFARI -> DESACTIVAMOS AUTOPLAY")
                                _iniSettings.topPlayer.media.autoplay = false;
                        }
                    }
    
                    if(typeof mm_debug!="undefined"){
                        console.log("%cMMDEBUG::INIT","color:orange;",_iniSettings);
                    }
    
                    if((typeof JSON!="undefined")&&(typeof JSON.parse!="undefined")&&(typeof JSON.stringify!="undefined")){
                        _realIniSettings = JSON.parse(JSON.stringify(_iniSettings));
                    }else{
                        _realIniSettings = _iniSettings;
                    }
    
                    if(typeof psdgetgetpsd!="undefined"){
                        if(psdgetgetpsd("mm_id_player"))
                            _iniSettings.id_player = psdgetgetpsd("mm_id_player");
                        if(psdgetgetpsd("mm_id_media"))
                            _iniSettings.id_media = psdgetgetpsd("mm_id_media");
                        if(psdgetgetpsd("mm_media_type"))
                            _iniSettings.media_type = psdgetgetpsd("mm_media_type");
                    }
    
                    if(typeof psdgetgetpsd!="undefined"){
                        if(psdgetgetpsd("mm_vars")){
                            var mm_vars = psdgetgetpsd("mm_vars").split(";");
                            for(var i in mm_vars){
                                var mm_var = mm_vars[i].split(":");
    
                                var aux_val = mm_var[1];
    
                                if(aux_val=="true")
                                    aux_val = true;
                                else if(aux_val=="false")
                                    aux_val = false;
                                else if(Number.isInteger(Number(aux_val)))
                                    aux_val = Number(aux_val);
    
                                window[mm_var[0]] = aux_val;
                            }
                        }
                    }
    
                    if(typeof _iniSettings.managerOpt != 'undefined'){
                        if(_iniSettings.managerOpt === null){
    
                        } else {
                            var _tmpManager = new psd.media.TopEmbedManager();
                            var _managerOpt = _iniSettings.managerOpt;
                            delete _iniSettings.managerOpt;
                            _tmpManager.add(_iniSettings, _managerOpt, this);
                            return;
                        }
                    }
    
                    //2017-08-30, URL_list estÃ¡ vacia, entonces es playList = true;
                    if(typeof _iniSettings.playList == 'object' && _iniSettings.playList.URL_list === ""){
                        _iniSettings.playListBAK = _iniSettings.playList;
                        _iniSettings.playList = true;
                    }
                    //2017-08-30, playList=true, recupera los tags y genera una playList
                    if(typeof _iniSettings.playList == 'boolean' && _iniSettings.playList === true){
                        this.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInitWithTags, this);
                        _iniSettings.playList = "";
                    }
                    if(typeof _iniSettings.playList == 'object' && JSON.stringify(_iniSettings.playList) != "{}"){
                        var playListConf = iniSettings.playList;
                        _iniSettings.playList = '';
                        this.setPlayList(playListConf, _iniSettings);
                    } else {
                        //AÃ±adimos una funcionalidad para poder pintar players en divs que no tienen identificador.
                        if((_iniSettings.id_container==null)||((_iniSettings.id_container==undefined))||(_iniSettings.id_container==""))
                        {
                            var _auxid = "PLAYER_" + (parseInt(Math.random()*1000) + new Date().getTime());
    
                            document.write("<div id='" + _auxid + "'></div>");
    
                            _iniSettings.id_container = _auxid;
                        }
    
                        if (_iniSettings.dev != undefined){_dev = _iniSettings.dev;}
                        else {_dev = false;}
    
                        setWindowError();
                        getUrlBase.apply(this);
                        loadMediator.apply(this);
                    }
                }
            }
    
            //2017-08-30, playList=true, recupera los tags y genera una playList
            var _playListInitWithTags = function(){
    
                this.removeEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInitWithTags, this);
                if(this.getMediaPlayer!=undefined && this.getMediaPlayer().getData!=undefined && this.getMediaPlayer().getData().mediaData!=undefined){
                    var _tags = this.getMediaPlayer().getData().mediaData.tags.externals;
                    if(_tags.length > 0){
                        _tags = _tags.split(';');
                        for(var i in _tags){
                            _tags[i] = 'tags_externals.idref|'+ _tags[i];
                        }
                        _tags = _tags.join(',');
                        var _urlPlayList = _data.ws.urlBase +"/" + window.mm_version + "/search/"+_iniSettings.id_cuenta+"/"+_iniSettings.media_type+"/tags?tags=mn(idref|"+_iniSettings.id_media+")m("+_tags+")&orderBy=modify_at|desc&size=12&itemIdref=" + _iniSettings.id_media;
                        var _plSet;
                        if(typeof _iniSettings.playListBAK=='object'){
                            _plSet = _iniSettings.playListBAK;
                            _plSet.URL_list = _urlPlayList;
                            delete(_iniSettings.playListBAK);
                        } else {
                            if(_iniSettings.media_type == MEDIA_TYPE_VIDEO)
                                _plSet = {URL_list: _urlPlayList, nextpanel: {active: true, time: 5, skin: 'default'}};
                            else
                                _plSet = {URL_list: _urlPlayList};
                        }
                        delete(_iniSettings.id_media);
                        delete(_iniSettings.playList);
                        this.setPlayList(_plSet, _iniSettings);
                    }
                }
            }
    
            var destroyActivePlayList = function(){
                if(this.getSettings()!=undefined) {
                    if(this.getSettings().isPlaylist === true){
                        //mm_playlist_no_reset = true;
                        this.playList.destroyPlayLists();
                        this.playList = null;
                        _iniSettings.isPlaylist = false;
                        _iniSettings.playlistUrl = '';
                    }
                }
            }
    
            this.setPlayList = function(pConfPlaylist, pConfPlayer){
                if(typeof this.getMediaPlayer() != 'undefined' && typeof this.getMediaPlayer().getMediaModule() != 'undefined')
                    this.getMediaPlayer().getMediaModule().stop();
    
                //si existe una playList, la reseteamos
                destroyActivePlayList.apply(this);
    
                if(typeof pConfPlaylist.id_container != 'undefined' && pConfPlaylist.id_container != ''){
                    var tmp = document.getElementById(pConfPlaylist.id_container);
                    if(!(tmp == null))
                        tmp.innerHTML = '';
                }
                if(typeof pConfPlayer.id_container != 'undefined' && pConfPlayer.id_container != ''){
                    var tmp = document.getElementById(pConfPlayer.id_container);
                    if(!(tmp == null))
                        tmp.innerHTML = '';
                }
    
                this.playList = new psd.media.TopEmbedPlaylist(this, pConfPlaylist);
                if(typeof pConfPlayer == 'object'){
                    this.playList.setPlayerSettings(pConfPlayer);
                    this.playList.init();
                } else {
                    if(this.isInitialized()){
                        this.playList.init();
                    } else {
                        this.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInit, this);
                    }
                }
            }
    
            var _playListInit = function(){
                this.removeEventListener(psd.media.TopEmbedEvent.EVENT_INI,_playListInit, this);
                this.playList.init();
            }
            /** **/
    
            this.getSettings = function(real){
                if(real)
                    return _realIniSettings;
    
                return _iniSettings;
            }
    
            var getUrlBase = function()
            {
                if (_dev){_url_base_api = URL_BASE_DEV;}
                else {_url_base_api = URL_BASE_PRO;}
            }
    
            var loadMediator = function(){
                var _jsonParser = new psd.framework.parser.JSONParser();
                var _dataVideoMediator = new psd.framework.Mediator();
                _dataVideoMediator.corsIE(true);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
                _dataVideoMediator.mediate(_url_base_api +"/api/" + _iniSettings.id_cuenta + "/player/" + _iniSettings.id_player, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
            }
    
            var setWindowError = function(){
                if (_iniSettings.overwriteWidth){width = _iniSettings.overwriteWidth;}
                else {width = document.getElementById(_iniSettings.id_container).clientWidth;}
    
                if (_iniSettings.overwriteHeight){height = _iniSettings.overwriteHeight; }
                else {height = document.getElementById(_iniSettings.id_container).clientHeight;}
    
                /**En caso de que tengamos cover lo seteamos para evitar fallos**/
                if (typeof (_iniSettings.topPlayer) == 'undefined') {
                    _iniSettings.topPlayer = {};
                }
                if (typeof (_iniSettings.topPlayer.media) == 'undefined') {
                    _iniSettings.topPlayer.media = {};
                }
    
                _windowError = new psd.media.TopWindowError({
                    id_container: _iniSettings.id_container,
                    id_cuenta: _iniSettings.id_cuenta,
                    base:_iniSettings.base,
                    width: width,
                    height: height,
                    secure: _iniSettings.secure,
                    imgCover: (_iniSettings.topPlayer.media.imgCover) ? _iniSettings.topPlayer.media.imgCover : ""
                });
            }
    
    
            //EVENTOS MEDIATOR
            var onDataComplete = function (evt)
            {
                var _playerData = evt.result.parserResult;
    
                if(_playerData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                    loadData.apply(this, [_playerData.result])
                }
                else {
                    if ((_iniSettings.media_type == undefined) || (_iniSettings.media_type == MEDIA_TYPE_VIDEO)){_windowError.paintMessage(ERROR_PARSER,_iniSettings);}
    
                    var obj = {};
                    obj.errorType = ERROR_SERVICIO_PLAYER;
                    this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, obj));
                }
            };
    
            var onDataError = function (evt)
            {
                if ((_iniSettings.media_type == undefined) || (_iniSettings.media_type == MEDIA_TYPE_VIDEO)){_windowError.paintMessage(ERROR_PARSER,_iniSettings);}
    
                var obj = {};
                obj.errorType = ERROR_SERVICIO_PLAYER;
                this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, obj));
            }
            //EVENTOS MEDIATOR
    
    
            var loadData = function (data)
            {
                //data.base = ""; //NOTA: SÃ“LO DE PRUEBA. COMENTAR ESTA LINEA
                _data = data;
                this.base = _data.base;
                this.format = typeof(_data.ws.format)!="undefined"?_data.ws.format:"";
    
                //NOTA: Ponemos el player sin autoplay para safari por problema al conectar con la seÃ±al cuando hay autoplay
                if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
                {
                    if (data.ws.mediaType == MEDIA_TYPE_VIDEO) {
                        _data.player.autoplay = false;
                    }
                }
    
                data.ws.id_video = _iniSettings.id_media;
                data.player.container = _iniSettings.id_container;
    
                // si existe el objeto topPlayer
                if (typeof(_iniSettings.topPlayer) != "undefined") {
    
                    if (typeof(_iniSettings.topPlayer.media) != "undefined") {
                        if (_iniSettings.topPlayer.media.autoNext != undefined) {
                            _data.player.autoNext = _iniSettings.topPlayer.media.autoNext;
                        }
                        if (_iniSettings.topPlayer.media.clickPlayList != undefined) {
                            _data.player.clickPlayList = _iniSettings.topPlayer.media.clickPlayList;
                        }
                        if (_iniSettings.topPlayer.media.autoplay != undefined) {
                            if(_iniSettings.topPlayer.media.autoplay == true || _iniSettings.topPlayer.media.autoplay == false){
                                if(_data.player.autoplay!=false)
                                    _data.player.autoplay = _iniSettings.topPlayer.media.autoplay;
                            }
                        }
    
                    }
                }else{
                    _iniSettings.topPlayer = {};
                }
    
                if(typeof(_iniSettings.topPlayer.media)=="undefined")
                    _iniSettings.topPlayer.media = {};
    
                if(typeof mm_dist!="undefined")
                    _iniSettings.topPlayer.media.dist = mm_dist;
                if(typeof mm_csegid!="undefined")
                    _iniSettings.topPlayer.media.csegid = mm_csegid;
    
                if(typeof(psdgetgetpsd)!="undefined"){
                    if(psdgetgetpsd("mm_base")!=null){
                        window.mm_base = psdgetgetpsd("mm_base");
                    }
    
                    if(psdgetgetpsd("mm_AdServer")!=null){
                        window.mm_AdServer = psdgetgetpsd("mm_AdServer");
    
                        if(psdgetgetpsd("mm_AdServer")=="google")
                            window.mm_AdServer = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=";
                        if(psdgetgetpsd("mm_AdServer")=="google2")
                            window.mm_AdServer = "https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=";
                    }
    
                    if(psdgetgetpsd("mm_noads")==true){
                        window.mm_noads = true;
                    }
    
                    if((typeof window.mm_noads!="undefined")&&(window.mm_noads==true)){
                        if(typeof _iniSettings.topPlayer.ad=="undefined"){
                            _iniSettings.topPlayer.ad = {};
                        }
                        _iniSettings.topPlayer.ad.enabled = false;
                    }
    
                    if(psdgetgetpsd("mm_debug")!=null){
                        window.mm_debug = psdgetgetpsd("mm_debug");
                    }
    
                    if(psdgetgetpsd("mm_force_iphone_ad")!=null){
                        window.mm_force_iphone_ad = true;
                    }
    
                    if(psdgetgetpsd("mm_autoplay")=="true"){
                        _iniSettings.topPlayer.media.autoplay = true;
                    }
    
                    if(psdgetgetpsd("mm_premuted")=="true"){
                        _iniSettings.topPlayer.media.premuted = true;
                    }
                    if (psdgetgetpsd("mm_poster") != null) {
                        window.mm_poster = psdgetgetpsd("mm_poster");
                    }
                }
    
                //esta era la funciÃ³n que eliminaba la publi de iphone. la comentamos porque el problema ya lo hemos resuelto
                /*
                if(_iniSettings.media_type=="audio"){
                    //si existe la funciÃ³n getDevice
                    if(typeof(getDevice)!="undefined"){
                        //y el user agent contiene las cadenas "iphone" o "safari"
                        if((getDevice().agent.toLowerCase().indexOf("iphone")>0)
                            ||
                            ((getDevice().agent.toLowerCase().indexOf("safari")>0)
                                &&
                                (getDevice().agent.toLowerCase().indexOf("chrome")==-1))
                            )
    
                        {
                            //si no usamos la variable "mm_force_iphone_ad" para forzar el fallo y poder hacer debug
                            if(typeof mm_force_iphone_ad=="undefined"){
                                if(typeof _iniSettings.topPlayer.ad=="undefined"){
                                    _iniSettings.topPlayer.ad = {};
                                }
                                window.mm_iphone_ad_disabled = true;
                                _iniSettings.topPlayer.ad.enabled = false;
                            }
                        }
                    }
                }*/
    
                if(_iniSettings.topPlayer){data.topPlayer = _iniSettings.topPlayer;}
    
                //-- Seteamos en topPlayer para evitar el PostRoll
                if (typeof _iniSettings.isPlaylist != 'undefined') {
    
                    if (typeof (_iniSettings.topPlayer) != "undefined") {
                        if (typeof (_iniSettings.topPlayer.media) != "undefined") {
    
                            _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                            _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                        }else{
    
                            _iniSettings.topPlayer.media = {};
                            _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                            _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                        }
    
                    } else {
    
                        _iniSettings.topPlayer = {};
                        if (typeof (_iniSettings.topPlayer.media) != "undefined") {
    
                            _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                            _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                        } else {
    
                            _iniSettings.topPlayer.media = {};
                            _iniSettings.topPlayer.media.isPlaylist = _iniSettings.isPlaylist;
                            _iniSettings.topPlayer.media.playlistUrl = _iniSettings.playlistUrl;
                        }
    
    
                    }
    
    
                    data.topPlayer = _iniSettings.topPlayer;
                }
    
                /*Guardamos los datos de Ancho y Alto en caso de que lleguen de PAIS*/
    
                if(typeof (_iniSettings.ancho)!="undefined"||typeof (_iniSettings.alto)!="undefined") {
    
                    if (typeof (data.topPlayer) == "undefined") {
    
                        data.topPlayer = {};
    
                    }
    
                    if (typeof (data.topPlayer.media) == "undefined") {
    
                        data.topPlayer.media = {};
                        data.topPlayer.media.ancho = _iniSettings.ancho;
                        data.topPlayer.media.alto = _iniSettings.alto;
    
                    } else {
    
                        data.topPlayer.media.ancho = _iniSettings.ancho;
                        data.topPlayer.media.alto = _iniSettings.alto;
    
                    }
    
                }
    
    
                if(_iniSettings.mainPlayer){data.mainPlayer = _iniSettings.mainPlayer;}
    
                //Si nos llega valor lo sustituimos por lo que nos llegue en el servicio de datos, ya que serÃ¡ el valor del tamaÃ±o del iframe.
                if (_iniSettings.overwriteWidth){data.player.width = _iniSettings.overwriteWidth;}
                if (_iniSettings.overwriteHeight){data.player.height = _iniSettings.overwriteHeight; }
    
                if(_iniSettings.media_type != undefined){data.ws.mediaType = _iniSettings.media_type}
                else{ data.ws.mediaType = MEDIA_TYPE_VIDEO}
    
                if (_reset)
                {
                    _reset = false;
    
                    var url = _url_base_api+"/api";
                    _mediaLauncherTop.addSetting(data);
                    _mediaLauncherTop.reset(url, _iniSettings.id_cuenta,_iniSettings.id_media);
                }
                else {
    
                    _mediaLauncherTop = new psd.media.TopLauncher();
                    _mediaLauncherTop.addSetting(data);
                    _mediaLauncherTop.init();
                    //_mediaLauncherTop.gdprApplies = this.gdprApplies;
                    //_mediaLauncherTop.consentData = this.consentData;
    
                    _mediaLauncherTop.setEmbed(this);
    
                    _mediaLauncherTop.addEventListener(psd.media.TopLauncherEvent.EVENT_INI,onLauncherEventsIni,this);
                    _mediaLauncherTop.addEventListener(psd.media.TopLauncherEvent.EVENT_ERROR,onLauncherEventsError,this);
                }
            }
    
            function generateAPI(){
                this.API = {};
    
                var mp = this.getMediaPlayer();
                var mm = this.getMediaPlayer().getMediaModule();
                var am = this.getMediaPlayer().getAdModule();
                var uim = this.getMediaPlayer().getUIModule();
    
                var that = this;
    
                var style_title = "color:white;padding:5px;border-radius:5px;font-weight:bold;font-family:Arial;font-size:110%;text-shadow:0 1px 2px rgba(0,0,0,0.8);";
                var style_p = "padding-left:20px;font-weight:bold";
    
                this.API.man = function(){
                    console.log("");
                    console.log("%cTopEmbed API â–¶ ",style_title + "background:#66628d;font-size:20px;padding:10px;border:2px solid #47436c");
                    console.log("%cNeed help? %cdmena@clb.t-prisa.com","padding-left:20px;","color:#66628d;font-family:Arial;");
                    console.log("");
                    console.log("%cMedia functions","background:#00bcd4;" + style_title);
                    console.log("%cplay()                       %cPlays the content",style_p,"color:#666");
                    console.log("%cpause()                      %cPauses the content",style_p,"color:#666");
                    console.log("%cseek(second,percent)         %cSeeks the content to a specific second",style_p,"color:#666");
                    console.log("%cseekSeconds(seconds)         %cAdds the specified seconds",style_p,"color:#666");
                    console.log("%csetVolume(percet)            %cChanges the volume. Value must be a float between 0 and 1",style_p,"color:#666");
                    console.log("%cmute()                       %cMutes/unmutes the content",style_p,"color:#666");
                    console.log("%cfullScreen()                 %cRequests fullscreen",style_p,"color:#666");
                    console.log("%cexternalOrder(name,params)   %cSends an specificall order to the UI skin",style_p,"color:#666");
                    console.log("%cgetTime()                    %cReturns the current played seconds",style_p,"color:#666");
                    console.log("%cgetStatus()                  %cReturns the current status of the content (play/pause/initial",style_p,"color:#666");
                    console.log("%cgetVolume()                  %cReturns the current volume of the content between 0 and 1",style_p,"color:#666");
                    console.log("%cgetDuration()                %cReturns the duration of the media",style_p,"color:#666");
                    console.log("%cMedia listeners","background:gold;" + style_title);
                    console.log("%conReset(evt)                 %cDispatched when player is reseted",style_p,"color:#666");
                    console.log("%conLoadingStart(evt)          %cDispatched when source is loading",style_p,"color:#666");
                    console.log("%conMediaBegin(evt)            %cDispatched when media begins",style_p,"color:#666");
                    console.log("%conMediaEnd(evt)              %cDispatched when media ends",style_p,"color:#666");
                    console.log("%conError(evt)                 %cDispatched when media fails",style_p,"color:#666");
                    console.log("%conBufferEmpty(evt)           %cDispatched when buffer is empty",style_p,"color:#666");
                    console.log("%conBufferFull(evt)            %cDispatched when buffer is full",style_p,"color:#666");
                    console.log("%conProgress(evt)              %cDispatched when media progresses",style_p,"color:#666");
                    console.log("%conStatusChange(evt)          %cDispatched when status changes",style_p,"color:#666");
                    console.log("%conVolumeChange(evt)          %cDispatched when volume changes",style_p,"color:#666");
                    console.log("%conSeekStart(evt)             %cDispatched when seek starts",style_p,"color:#666");
                    console.log("%conSeekComplete(evt)          %cDispatched when seek completes",style_p,"color:#666");
                    console.log("%conOrderExternal(evt)         %cDispatched when player wants to report an specific information or query",style_p,"color:#666");
                    console.log("%cAd listeners","background:#cd5566;" + style_title);
                    console.log("%conLoadingAdStart(evt)        %cDispatched when ad is required",style_p,"color:#666");
                    console.log("%conAdStart(evt)               %cDispatched when ad starts",style_p,"color:#666");
                    console.log("%conAdEnd(evt)                 %cDispatched when ad ends",style_p,"color:#666");
                    console.log("%conAdError(evt)               %cDispatched when ad fails",style_p,"color:#666");
                    console.log("%conAdSkip(evt)                %cDispatched when ad is skipped",style_p,"color:#666");
                    console.log("%cDebug functions","background:#3bcf67;" + style_title);
                    console.log("%cgetName()                    %cReturns the player name",style_p,"color:#666");
                    console.log("%cgetContainer()               %cReturns the DOM element which contains the player",style_p,"color:#666");
                    console.log("%cgetContainerName()           %cReturns the id of the div which contains the player",style_p,"color:#666");
                    console.log("%cgetSettings(real)            %cReturns the settings of the player. If \"real\" only input settings will be displayed",style_p,"color:#666");
                    console.log("%chighlight(css)               %cApplies a highlight to the player for debug. If param is null default highlight will be displayed",style_p,"color:#666");
                    console.log("%cinfo2()                      %cDisplays a lateral panel with players info.",style_p,"color:#666");
                    console.log("%cAPIonWindow()                %cOnly for fast debug. Copies de API methods into de window object \"api\".",style_p,"color:#666");
                }
    
                var currentTime = 0;
                var currentVolume = 0;
                var lastVolume = 0.7;
                var currentStatus = "initial";
                var currentPosition = "preview";
    
                this.API.help = this.API.man;
    
                this.API.play = function(){
                    if(mm)mm.play();
                }
    
                this.API.pause = function(){
                    if(mm)mm.pause();
                }
    
                this.API.seek = function(time,percent){
                    if(percent){
                        if(mm){
                            if(time>1){
                                time /= 100;
                            }
                            mm.seekByProp(time)
                        }
                    }
                    else
                    if(mm)mm.seek(time);
    
                }
    
                this.API.seekSeconds = function(seconds){
                    if(mm){
                        _that.API.seek(_that.API.getTime() + seconds);
                    }
                }
    
                this.API.setVolume = function(percent){
                    if(mm)mm.setVolume(percent);
                }
    
                this.API.mute = function(){
                    if(!mm)return;
    
                    if(currentVolume==0)
                        _that.API.setVolume(lastVolume);
                    else
                        mm.mute();
                }
    
                this.API.externalOrder = function(order,params){
                    _mediaLauncherTop.getMediaPlayer().getUIModule().externalOrder(order,params);
                }
    
                this.API.fullScreen = function(){
                    _mediaLauncherTop.getMediaPlayer().getUIModule().getSkin().notifyOrderFullScreen();
                }
    
                this.API.getName = function(){
                    return _that.a_name;
                }
    
                this.API.getTime = function(){
                    return currentTime;
                }
    
                this.API.getStatus = function(){
                    return currentStatus;
                }
    
                this.API.getPosition = function(){
                    return currentPosition;
                }
    
                this.API.getVolume = function(){
                    return currentVolume;
                }
    
                this.API.getContainer = function(){
                    return document.getElementById(that.getSettings().id_container);
                }
    
                this.API.getContainerName = function(){
                    return that.getSettings().id_container;
                }
    
                this.API.getSettings = function(real){
                    return that.getSettings(real);
                }
    
                this.API.getDuration = function(seconds){
                    switch(seconds){
                        case "H":
                            return mp.getData().mediaData.duration/1000/60/60;
                            break;
                        case "m":
                            return mp.getData().mediaData.duration/1000/60;
                            break;
                        case "s":
                            return mp.getData().mediaData.duration/1000;
                            break;
                        default:
                            return mp.getData().mediaData.duration;
                            break;
                    }
                }
    
                this.API.highlight = function(force){
                    if(force===true){
                        that.API.getContainer().className = that.API.getContainer().className.replace(/ mm_highlight/g,"");
                        that.API.getContainer().className += " mm_highlight";
                    }
                    if(force===false){
                        that.API.getContainer().className = that.API.getContainer().className.replace(/ mm_highlight/g,"");
                    }
    
                    if(force==null){
                        if(that.API.getContainer().className.indexOf("mm_highlight")>-1){
                            console.log("encontrado");
                            that.API.getContainer().className = that.API.getContainer().className.replace(/ mm_highlight/g,"");
                        }
                        else{
                            that.API.getContainer().className += " mm_highlight";
                        }
                    }
    
                    if(!document.getElementById("mm_highlight")){
                        var new_style = document.createElement("style");
                        new_style.id = "mm_highlight";
    
                        new_style.innerHTML = ".mm_highlight{\
                            border:5px solid #aaff00;\
                            box-sizing:border-box;\
                            }";
    
                        document.head.appendChild(new_style);
                    }
                };
    
                this.API.info2 = function(){
                    psd.media.psdManager.info2()
                }
    
                this.API.APIonWindow = function(){
                    window.api = _that.API;
                }
    
                this.API.onReset = function(evt){};
                this.API.onLoadingStart = function(evt){};
                this.API.onMediaBegin = function(evt){};
                this.API.onMediaEnd = function(evt){};
                this.API.onError = function(evt){};
                this.API.onProgress = function(evt){};
                this.API.onStatusChange = function(evt){};
                this.API.onPositionChange = function(evt){};
                this.API.onVolumeChange = function(evt){};
                this.API.onBufferEmpty = function(evt){};
                this.API.onBufferFull = function(evt){};
                this.API.onOrderExternal = function(evt){};
                this.API.onSeekStart = function(evt){};
                this.API.onSeekComplete = function(evt){};
    
                this.API.onLoadingAdStart = function(evt){};
                this.API.onAdStart = function(evt){};
                this.API.onAdEnd = function(evt){};
                this.API.onAdError = function(evt){};
                this.API.onAdSkip = function(evt){};
    
                this.API.onAll = function(msg){
                    this.onLoadingAdStart = function(ev){console.log(msg,ev)};
                    this.onAdStart = function(ev){console.log(msg,ev)};
                    this.onAdEnd = function(ev){console.log(msg,ev)};
                    this.onAdError = function(ev){console.log(msg,ev)};
                    this.onAdSkip = function(ev){console.log(msg,ev)};
                    this.onLoadingStart = function(ev){console.log(msg,ev)};
                    this.onMediaBegin = function(ev){console.log(msg,ev)};
                    this.onReset = function(ev){console.log(msg,ev)};
                    this.onMediaEnd = function(ev){console.log(msg,ev)};
                    this.onStatusChange = function(ev){console.log(msg,ev)};
                    this.onBufferEmpty = function(ev){console.log(msg,ev)};
                    this.onBufferFull = function(ev){console.log(msg,ev)};
                    this.onOrderExternal = function(ev){console.log(msg,ev)};
                    this.onSeekStart = function(ev){console.log(msg,ev)};
                    this.onSeekComplete = function(ev){console.log(msg,ev)};
                }
    
                var pre_onReset = function(evt){
                    _that.API.onReset(evt);
                    if(typeof window.pre_onReset!="undefined") window.pre_onReset(evt);
                }
    
                var pre_onMediaBegin = function(evt){
                    _that.API.onMediaBegin(evt);
                    if(typeof window.onMediaBegin!="undefined") window.onMediaBegin(evt);
                }
    
                var pre_onLoadingStart = function(evt){
                    _that.API.onLoadingStart(evt);
                    if(typeof window.onLoadingStart!="undefined") window.onLoadingStart(evt);
                }
    
                var pre_onLoadingAdStart = function(evt){
                    _that.API.onLoadingAdStart(evt);
                    if(typeof window.onLoadingAdStart!="undefined") window.onLoadingAdStart(evt);
                }
    
                var pre_onMediaEnd = function(evt){
                    _that.API.onMediaEnd(evt);
                    if(typeof window.onMediaEnd!="undefined") window.onMediaEnd(evt);
                }
    
                var pre_onProgress = function(evt){
                    currentTime = evt.data.currentTime;
                    _that.API.onProgress(evt);
                    if(typeof window.onProgress!="undefined") window.onProgress(evt);
                }
    
                var pre_onStatus = function(evt){
                    currentStatus = evt.data.status;
                    _that.API.onStatusChange(evt);
                    if(typeof window.onStatusChange!="undefined") window.onStatusChange(evt);
                }
    
                var pre_onPositionChange = function(evt){
                    currentPosition = evt.data.position;
                    _that.API.onPositionChange(evt);
                    if(typeof window.onPositionChange!="undefined") window.onPositionChange(evt);
                }
    
                var pre_onError = function(evt){
                    _that.API.onError(evt);
                    if(typeof window.onError!="undefined") window.onError(evt);
                }
    
                var pre_onVolumeChange = function(evt){
                    if(evt.data!=0)
                        lastVolume = evt.data;
    
                    currentVolume = evt.data;
    
                    _that.API.onVolumeChange(evt);
                    if(typeof window.onVolumeChange!="undefined") window.onVolumeChange(evt);
                }
    
                var pre_onAdStart = function(evt){
                    _that.API.onAdStart(evt);
                    if(typeof window.onAdStart!="undefined") window.onAdStart(evt);
                }
    
                var pre_onAdEnd = function(evt){
                    _that.API.onAdEnd(evt);
                    if(typeof window.onAdEnd!="undefined") window.onAdEnd(evt);
                }
    
                var pre_onAdError = function(evt){
                    _that.API.onAdError(evt);
                    if(typeof window.onAdError!="undefined") window.onAdError(evt);
                }
    
                var pre_onAdSkip = function(evt){
                    _that.API.onAdSkip(evt);
                    if(typeof window.onAdSkip!="undefined") window.onAdSkip(evt);
                }
    
                var pre_onBufferEmpty = function(evt){
                    _that.API.onBufferEmpty(evt);
                    if(typeof window.onBufferEmpty!="undefined") window.onBufferEmpty(evt);
                }
    
                var pre_onBufferFull = function(evt){
                    _that.API.onBufferFull(evt);
                    if(typeof window.onBufferFull!="undefined") window.onBufferFull(evt);
                }
    
                var pre_onOrderExternal = function(evt){
                    _that.API.onOrderExternal(evt);
                    if(typeof window.onOrderExternal!="undefined") window.onOrderExternal(evt);
                }
    
                var pre_onSeekStart = function(evt){
                    _that.API.onSeekStart(evt);
                    if(typeof window.onSeekStart!="undefined") window.onSeekStart(evt);
                }
    
                var pre_onSeekComplete = function(evt){
                    _that.API.onSeekComplete(evt);
                    if(typeof window.onSeekComplete!="undefined") window.onSeekComplete(evt);
                }
    
                if(mm){
                    mm.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN,pre_onMediaBegin);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_END,pre_onMediaEnd);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_ERROR,pre_onError);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS,pre_onProgress);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE,pre_onStatus);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE,pre_onVolumeChange);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY,pre_onBufferEmpty);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL,pre_onBufferFull);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START,pre_onSeekStart);
                    mm.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE,pre_onSeekComplete);
    
                    if(typeof emic.top.event.MediaEvent.ON_LOADING_START!="undefined")
                        mm.addEventListener(emic.top.event.MediaEvent.ON_LOADING_START,pre_onLoadingStart);
                }
                if(am){
                    am.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START,pre_onAdStart);
                    am.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_END,pre_onAdEnd);
                    am.addEventListener(emic.top.event.AdEvent.ON_AD_ERROR,pre_onAdError);
                    am.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_SKIP,pre_onAdSkip);
    
                    if(typeof emic.top.event.AdEvent.ON_LOADING_AD_START!="undefined")
                        am.addEventListener(emic.top.event.AdEvent.ON_LOADING_AD_START,pre_onLoadingAdStart);
                }
                if(uim){
                    uim.addEventListener(emic.top.event.UIEvent.ON_ORDER_EXTERNAL,pre_onOrderExternal);
                }
                if(mp){
                    mp.addEventListener(emic.top.event.TopEvent.ON_POSITION_CHANGE,pre_onPositionChange);
                }
    
                if((typeof mm_youbora!="undefined")&&(mm_youbora)&&(typeof this.getSettings(true).noyb=="undefined")){
                    _that.load_Youbora();
                }
            };
    
            this.load_Youbora = function(){
                if(typeof _that.API=="undefined"){
                    return;
                }
    
                if (typeof youbora != "undefined" &&
                    typeof youbora.adapters.PrisaAdapter != "undefined") {
                    // Turn on logs
                    if(typeof mm_youbora_debug!="undefined")
                        youbora.Log.logLevel = youbora.Log.Level.VERBOSE;
    
                    /*
                    var t_emisora = _that.API.getSettings().topPlayer.media.tags.emisora;
                    var t_programa = _that.API.getSettings().topPlayer.media.tags.programa;
                    var t_seccion = _that.API.getSettings().topPlayer.media.tags.seccion;
    
                    if(typeof _that.API.getSettings().topPlayer.media.tags.youbora!="undefined"){
                        var ty = _that.API.getSettings().topPlayer.media.tags.youbora;
                        for(var i=0;i<ty.length;i++){
                            if(ty[i].tyle=="P"){
                                t_programa = ty[i].name; //cambiar por description si queremos el nombre sin normalizar
                            }
                            if(ty[i].tyle=="E"){
                                t_emisora = ty[i].name; //cambiar por description si queremos el nombre sin normalizar
                            }
                            if(ty[i].tyle=="S"){
                                t_seccion = ty[i].name; //cambiar por description si queremos el nombre sin normalizar
                            }
                        }
                    }
                    */
    
                    var _youbura_cdn = null;
                    var _youbora_user = null;
    
                    switch(_that.getSettings().topPlayer.media.provider){
                        case "triton":
                            _youbura_cdn = "TRITON";
                            break;
                        case "youtube":
                            _youbura_cdn = "YOUTUBE";
                            break;
                    }
    
                    if((typeof PRISA!="undefined")&&(typeof PRISA.user!="undefined")&&(typeof PRISA.user.getData()!="undefined")&&(PRISA.user.getData().uid!="")&&(typeof PRISA.user.getData().nickname!="undefined")){
                        _youbora_user = PRISA.user.getData().uid;
                    }
    
                    var backgroundenabled = false;
                    if(_that.API.getSettings().media_type=="video")
                        backgroundenabled = true;
    
                    var _youbora_plugin_config = {
                        'accountCode': 'prisa',
                        'content.id': _that.API.getSettings().topPlayer.media.idTOP,
                        'content.playbackType': _that.API.getSettings().media_type,
                        //'content.playbackType': _that.API.getSettings().media_type=="audio"?"AOD":"VOD",
                        'content.package': _that.API.getSettings().id_cuenta,
                        'content.title': _that.API.getSettings().topPlayer.media.title,
                        'content.channel': _that.API.getSettings().topPlayer.media.tags.emisora.split(",")[0],
                        'content.program': _that.API.getSettings().topPlayer.media.tags.programa.split(",")[0],
                        'content.customDimension.1': _that.API.getSettings().topPlayer.media.tags.seccion.split(",")[0],
                        'background.enabled': backgroundenabled,
                        'app.name': "Web"
                        // 'user.name': 'dev',
                        // 'user.obfuscateIP': false,
                        // 'parse.hls': true,
                        // 'parse.dash': false,
                        // 'parse.locationHeader': false,
                        // 'parse.CDNNode': true,
                        // 'network.ip': '1.1.1.1',
                        // 'network.isp': 'MyISP',
                        // 'network.connectionType': 'dialup',
                        // 'app.https': true,
                        // 'content.transactionCode': 'myTransCode',
                        // 'content.resource': 'mysrc.mp4',
                        // 'content.isLive': true,
                        // 'content.isLive.noSeek': false,
                        // 'content.title': 'My Title',
                        // 'content.program': 'My Program',
                        // 'content.duration': 100,
                        // 'content.fps': '100',
                        // 'content.bitrate': 1000000,
                        // 'content.throughput': 8000000,
                        // 'content.rendition': 'My Rendition',
                        // 'content.cdn': 'NICE264',
                        // 'content.metadata': {
                        //   custom_info: 'info'
                        // },
                        // 'content.metrics': {},
                        // 'ad.title': 'Ad title',
                        // 'ad.resource': 'fake.resource.com',
                        // 'ad.campaign': 'campaign name',
                        // 'ad.creativeId': 'creativeId',
                        // 'ad.provider': 'provider',
                        // 'ad.metadata': {
                        //   custom_info: 'info'
                        // },
                        // 'ad.expectedPattern': {
                        //   pre: [1],
                        //   mid: [1,2],
                        //   post: [1]
                        // },
                        // 'ad.ignore': false,
                        // 'content.customDimension.1': 'myExtraParam1',
                        // 'content.customDimension.2': 'myExtraParam2',
                        // 'background.enabled': false,
                        // 'background.settings': 'stop',
                        // 'background.settings.android': 'stop',
                        // 'background.settings.iOS': 'stop',
                        // 'background.settings.desktop': 'stop',
                        // 'background.settings.tv': 'stop',
                        // 'offline': false,
                        // 'session.context': false,
                        // 'session.metrics': {}
                    };
    
                    if(backgroundenabled){
                        _youbora_plugin_config["background.settings.android"] = "pause";
                        _youbora_plugin_config["background.settings.iOS"] = "pause";
                    }
    
                    if(_youbura_cdn!=null){
                        _youbora_plugin_config["content.cdn"] = _youbura_cdn;
                    }
    
                    if(_youbora_user!=null){
                        _youbora_plugin_config["user.name"] = _youbora_user;
                    }
    
                    _that.ybplugin = new youbora.Plugin(_youbora_plugin_config);
    
                    _that.ybplugin.setAdapter(new youbora.adapters.PrisaAdapter (_that));
                    _that.ybplugin.setAdsAdapter(new youbora.Adapter());
    
                    var adm = _that.getMediaPlayer().getAdModule();
    
                    var ad_fired = false;
    
                    var _ad_fire_start = function(){
                        if((typeof _that.API!="undefined")&&(_that.API.getPosition()=="positionAdPostroll"))
                            return;
    
                        if(typeof mm_youbora_debug!="undefined"){
                            console.log("{{YOUBORA}} Evento AdStart");
                        }
                        if(!ad_fired){
                            _that.ybplugin.getAdsAdapter().fireStart();
                            ad_fired = true;
                        }
                    }
    
                    var _ad_fire_stop = function(){
                        if((typeof _that.API!="undefined")&&(_that.API.getPosition()=="positionAdPostroll"))
                            return;
    
                        if(typeof mm_youbora_debug!="undefined"){
                            console.log("{{YOUBORA}} Evento AdStop");
                        }
                        _that.ybplugin.getAdsAdapter().fireStop();
                        ad_fired = false;
                    }
    
                    //adm.removeEventListener(emic.top.event.AdEvent.ON_LOADING_AD_START, _ad_fire_start,null,"youbora_ad_fire_start");
                    adm.removeEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START,   _ad_fire_start,null,"youbora_ad_fire_start");
                    adm.removeEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_END,     _ad_fire_stop,null,"youbora_ad_fire_stop");
                    adm.removeEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_SKIP,    _ad_fire_stop,null,"youbora_ad_fire_stop");
                    adm.removeEventListener(emic.top.event.AdEvent.ON_AD_ERROR,         _ad_fire_stop,null,"youbora_ad_fire_stop");
    
                    //adm.addEventListener(emic.top.event.AdEvent.ON_LOADING_AD_START,    _ad_fire_start,null,"youbora_ad_fire_start");
                    adm.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START,      _ad_fire_start,null,"youbora_ad_fire_start");
                    adm.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_END,        _ad_fire_stop,null,"youbora_ad_fire_stop");
                    adm.addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_SKIP,       _ad_fire_stop,null,"youbora_ad_fire_stop");
                    adm.addEventListener(emic.top.event.AdEvent.ON_AD_ERROR,            _ad_fire_stop,null,"youbora_ad_fire_stop");
                }
            }
    
            //EVENTOS
            function onLauncherEventsIni()
            {
                _mediaPlayer = _mediaLauncherTop.getMediaPlayer();
    
                //cargamos los plugins por defecto que no hace falta instanciar
                loadDefaultPlugins();
                //deletePlugins()
                loadPlugins();
    
                //SÃ³lo hacemos la capa mÃ¡s grande en el caso de los reproductores de audio. Para los playes de video, la publicidad tendrÃ¡ el tamaÃ±o que han especificado del player.
                if (_data.ws.mediaType != MEDIA_TYPE_VIDEO)
                {
                    _mediaPlayer.addEventListener(psd.media.MediaEvent.AD_START, onMediaAdStart);
                    _mediaPlayer.addEventListener(psd.media.MediaEvent.AD_SKIP, onMediaAdSkip);
                    _mediaPlayer.addEventListener(psd.media.MediaEvent.AD_COMPLETE, onMediaAdStop);
                }
    
                _isInitialized = true;
                //console.log("%cYAAAAA LANZAMOS INI","{color:#ff8800;font-size:200px;}");
    
                if(typeof(_iniSettings.ratio)!="undefined"){
                    var default_ratio_w = parseInt(_iniSettings.ratio.split(":")[0]);
                    var default_ratio_h = parseInt(_iniSettings.ratio.split(":")[1]);
                    if (_data.ws.mediaType == MEDIA_TYPE_VIDEO){
                        if((typeof (default_ratio_w)=="number")&&(typeof (default_ratio_h)=="number"))
                            this.setRatio(default_ratio_w,default_ratio_h,true);
                    }
                }
    
                generateAPI.apply(this);
    
                if((typeof(psdgetgetpsd)!="undefined")&&(psdgetgetpsd("mm_debug")==true)){
                    var cssman = "color:#333;padding:5px 0;font-weight:bold;font-family:Arial;font-size:120%;";
                    var csscode = "color:blue;font-weight:unset;";
                    console.log("%cTopEmbed %c" + this.a_name + "%c loaded successfully! %câ¤",cssman + "color:green;","color:#333",cssman + "color:green;","color:red;");
                    console.log("%cDo you need help? Type %cMM.player.API.man()%c in console to display the manual",cssman,cssman + csscode,cssman);
                }
    
                this.onInit(this);
    
                this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_INI,_data));
    
                if((typeof(mm_force_playlist)!="undefined")&&(mm_force_playlist==2)){
                    onDataError.apply(this);
                    mm_force_playlist = 1;
                    //this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, {}));
                }
            }
    
            this.addPlugin = function(plugin,pre){
                if(pre){
                    if(typeof this.iniSettings.plugins=="undefined")
                        this.iniSettings.plugins = [];
    
                    this.iniSettings.plugins.push(plugin);
                }
                else
                {
                    var _urlBase = _that.base;
    
                    if((typeof(_iniSettings.topPlayer)!="undefined")&&(typeof(_iniSettings.topPlayer.generic)!="undefined")&&(typeof(_iniSettings.topPlayer.generic.urlBase)!="undefined"))
                        _urlBase = _iniSettings.topPlayer.generic.urlBase;
    
                    var lib = "";
                    if(typeof(tplib)!="undefined"){
                        lib = "/lib";
                    }
    
                    _that.pluginsList[plugin.type] = plugin;
                    if((plugin.disabled)&&(plugin.disabled==true)){
                        if(typeof(_that.pluginsList[plugin.type])!="undefined"){
                            delete(_that.pluginsList[plugin.type]);
                        }
                    }else{
                        var script = document.createElement("script");
                        script.type = "text/javascript";
                        script.src = _urlBase + "/psdmedia/media/top/widgets/" + plugin.type + lib + "/" + plugin.type + ".js";
                        script.onload = (function(plugintype,pluginconf){
                            return function(){
                                var plugin = new window[plugintype](_that);
    
                                _that.pluginsList[plugintype] = plugin;
                                _that.pluginsList[plugintype].init(pluginconf);
                            }
                        })(plugin.type,plugin.conf);
                        document.head.appendChild(script);
                    }
                }
            }
    
            function loadPlugins(){
                if(typeof(_iniSettings.plugins)!="undefined"){
                    var _urlBase = _that.base;
    
                    if((typeof(_iniSettings.topPlayer)!="undefined")&&(typeof(_iniSettings.topPlayer.generic)!="undefined")&&(typeof(_iniSettings.topPlayer.generic.urlBase)!="undefined"))
                        _urlBase = _iniSettings.topPlayer.generic.urlBase;
    
                    var lib = "";
                    if(typeof(tplib)!="undefined"){
                        lib = "/lib";
                    }
    
                    for(var i in _iniSettings.plugins){
                        _that.pluginsList[_iniSettings.plugins[i].type] = _iniSettings.plugins[i];
                    }
    
                    emic.top.debug("PLUGINS",_that.pluginsList);
    
                    for(var i in _that.pluginsList){
                        if((_that.pluginsList[i].disabled)&&(_that.pluginsList[i].disabled==true)){
                            if(typeof(_that.pluginsList[_that.pluginsList[i].type])!="undefined"){
                                delete(_that.pluginsList[_that.pluginsList[i].type]);
                            }
                        }else{
                            if ((_that.pluginsList[i].type != "FloatingPlayerWidget") || ((_that.pluginsList[i].type == "FloatingPlayerWidget") && !match_UA("macintosh"))) { //Conidicion aÃ±adida para evitar los errores del player flotante en los MAC
                                var script = document.createElement("script");
                                script.type = "text/javascript";
                                script.src = _urlBase + "/psdmedia/media/top/widgets/" + _that.pluginsList[i].type + lib + "/" + _that.pluginsList[i].type + ".js";
                                script.onload = (function(ii){
                                    return function(){
                                        var plugin = new window[_that.pluginsList[ii].type](_that);
                                        plugin.init(_that.pluginsList[ii].conf);
    
                                        _that.plugins[_that.pluginsList[ii].type] = plugin;
                                    }
                                })(i);
                                document.head.appendChild(script);
                        }
                        }
                    }
                }
            }
    
            function loadDefaultPlugins(){
                if(typeof(_iniSettings)!="undefined"){
                    if(typeof(_iniSettings.plugins)=="undefined"){
                        _iniSettings.plugins = [];
                    }
    
                    //plugin de control mediante teclado
                    _that.pluginsList["KeyWidget"] = {"type":"KeyWidget","conf":{}};
                }
            }
    
            function onLauncherEventsError(evt)
            {
                var obj = {};
                obj.errorType = evt.data.errorType;
                this.dispatchEvent(new psd.media.TopEmbedEvent(psd.media.TopEmbedEvent.EVENT_ERROR, obj));
    
            }
    
            function onMediaAdStart(evt)
            {
                var width, height;
    
                //Si el ancho del player de audio es < 320, lo forzamos a 320 px de ancho
                if (_data.player.width < MIN_PLAYER_WIDTH){width = MIN_PLAYER_WIDTH}
                else {width = _data.player.width}
    
                //Cogiendo el ancho del reproductor, calculamos un alto con proporciones de 16:9
                height = (width * 9)/16;
    
                document.getElementById(_iniSettings.id_container).style.width = width + "px";
                document.getElementById(_iniSettings.id_media + "_simple").style.width =  width + "px";
    
                document.getElementById(_iniSettings.id_container).style.height = height + "px";
                document.getElementById(_iniSettings.id_media + "_simple").style.height =  height + "px";
    
            }
    
            function onMediaAdSkip(evt)
            {
                document.getElementById(_iniSettings.id_container).style.width = _data.player.width + "px";
                document.getElementById(_iniSettings.id_media + "_simple").style.width =  _data.player.width + "px";
    
                document.getElementById(_iniSettings.id_container).style.height =  _data.player.height + "px";
                document.getElementById(_iniSettings.id_media + "_simple").style.height =  _data.player.height + "px";
            }
    
            function onMediaAdStop()
            {
                document.getElementById(_iniSettings.id_container).style.width = _data.player.width + "px";
                document.getElementById(_iniSettings.id_media + "_simple").style.width =  _data.player.width + "px";
    
                document.getElementById(_iniSettings.id_container).style.height =  _data.player.height + "px";
                document.getElementById(_iniSettings.id_media + "_simple").style.height =  _data.player.height + "px";
            }
    
    
            this.getMediaPlayer = function()
            {
                return _mediaPlayer;
            }
    
    
            this.reset = function(data)
            {
                //si se hace el STOP con mm_autoplay se escuchan a la vez los enlatados y los directos
                if(typeof(mm_autoplay)=="undefined")
                    this.getMediaPlayer().getMediaModule().stop();
    
                if(typeof mm_debug!="undefined"){
                    console.log("%cMMDEBUG::RESET","color:orange;",data);
                }
    
                if(JSON.stringify(data.playList) == "{}"){
                    destroyActivePlayList.apply(this);
                }
                _reset = true;
    
                if (data.dev != undefined){_dev = data.dev;}
                else {_dev = false;}
    
                getUrlBase.apply(this);
    
                if(data.id_cuenta){_iniSettings.id_cuenta = data.id_cuenta;}
                if(data.id_media){_iniSettings.id_media = data.id_media;}
                if(data.media_type){_iniSettings.media_type = data.media_type;}
                if(data.id_player){_iniSettings.id_player = data.id_player;}
                if(data.id_container){_iniSettings.id_container = data.id_container;}
                if(data.topPlayer){_iniSettings.topPlayer = data.topPlayer;}
                if(data.mainPlayer){_iniSettings.mainPlayer = data.mainPlayer;}
    
                loadMediator.apply(this);
    
                if((typeof(mm_autoplay)!="undefined")&&(mm_autoplay==true)){
                    if((typeof this.API!="undefined")&&(typeof this.API.getPosition!="undefined")&&(this.API.getPosition()!="preview")){
                        if((typeof(this.getMediaPlayer)!="undefined")&&(typeof(this.getMediaPlayer().getMediaModule())!=undefined)){
                            if((this.API.getStatus()!="stop")&&(this.API.getStatus()!="initial")){
                                this.getMediaPlayer().getMediaModule().play();
                                this.getMediaPlayer().getMediaModule().pause();
                            }
                        }
                    }
                }
            }
    
    
            this.init = function(data)
            {
                _iniSettings = data;
    
                if (data.dev != undefined){_dev = data.dev;}
                else {_dev = false;}
    
                _init.apply(this)
            }
    
            this.isInitialized = function()
            {
                return _isInitialized;
            }
    
            this.setRatio = function(_width,_height,_preserve){
                _mediaLauncherTop.setRatio(_width,_height,_preserve);
            }
    
            _init.apply(this);
        }
    
        namespace.TopEmbed = TopEmbed;
    
    }(psd.media));(function(namespace) {
        // Inheritance class
        TopPlaylist.prototype = new psd.framework.EventDispatcher();
    
        function TopPlaylist(TopEmbedPlaylist)
        {
            // Super
            psd.framework.EventDispatcher.call(this);
    
            /**
             * className psd.media.TopPlaylist
             */
            this.className = "psd.media.TopPlaylist";
    
            this.embedplaylist = TopEmbedPlaylist;
    
            var _data = [];
    
            var _iniSettings, _skinPlaylist;
    
            this.index = 0;
    
            this.init = function(iniSettings,index)
            {
                this.addEventListener("onPlayListChangeMedia", onPlayListChangeMedia, this);
                this.index = index;
                _iniSettings = iniSettings;
                getSkinTopPlaylist.apply(this);
            }
    
            this.reDraw = function(){
                _skinPlaylist.paintPlaylist();
            }
    
            this.setData = function(data){
                _data = data;
            }
    
            this.resetData = function(data){
                _skinPlaylist.setDataPlaylist(data);
            }
    
            var getSkinTopPlaylist = function()
            {
                _skinPlaylist = new psd.media.TopPlaylist_lista(_iniSettings,this.index,this.embedplaylist);
    
                if(_iniSettings.playListSkin=="generica"){
                    var url_template = "/psdmedia/media/simple/skinsPlaylist/playlist.css";
    
                    var _URL_BASE = _iniSettings.player.getMediaPlayer().getData().genericData.urlBase;
                    var _externalDomain = _URL_BASE != null && _URL_BASE != undefined ? _URL_BASE : false;
    
                    if(_iniSettings.styleItemsContainer!=undefined)
                        _skinPlaylist.setType(_iniSettings.styleItemsContainer);
    
                    var fileref=document.createElement("link"),
                        filename = _externalDomain ? (_URL_BASE + url_template) : url_template;
    
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", filename);
                    if (typeof fileref!="undefined")
                        document.getElementsByTagName("head")[0].appendChild(fileref);
                }
    
                _skinPlaylist.addEventListener(psd.media.PlaylistEvent.DATA_REQUEST,onTopPlayListEvent, this);
                _skinPlaylist.addEventListener(psd.media.PlaylistEvent.DATA_COMPLETE,onTopPlayListEvent, this);
                _skinPlaylist.addEventListener(psd.media.PlaylistEvent.MEDIA_CHANGE,onTopPlayListEvent, this);
                _skinPlaylist.addEventListener(psd.media.PlaylistEvent.PLAYLIST_COMPLETE,onTopPlayListEvent, this);
    
                _skinPlaylist.init(_data);
                _skinPlaylist.load();
            }
    
            var onTopPlayListEvent = function(evt)
            {
                if (evt.type == psd.media.PlaylistEvent.DATA_COMPLETE){
                    _skinPlaylist.paintPlaylist();
                }
    
                this.dispatchEvent(evt);
            }
    
            /*var onDataComplete = function(e)
            {
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE, e.data));
                _skinPlaylist.paintPlaylist();
            }*/
    
            this.next = function()
            {
                _skinPlaylist.next();
            }
    
            this. previous = function()
            {
                _skinPlaylist.previous();
            }
    
            this.gotoByIndex = function(index)
            {
                _skinPlaylist.gotoByIndex(index);
            }
    
            this.gotoByIdRef = function(idref)
            {
                _skinPlaylist.gotoByIdRef(idref);
            }
    
            this.changeConfig = function(obj)
            {
                _skinPlaylist.changeConfig(obj);
            }
    
            this.getTopPlaylist = function()
            {
                return _skinPlaylist;
            }
    
            this.playIndex = function (index){
                if(index<_skinPlaylist.data()[0].length)
                    _skinPlaylist.loadMedia(index);
            }
    
            function onPlayListChangeMedia(){
                this.getTopPlaylist().setPlayerEventos();
            }
        }
    
        namespace.TopPlaylist = TopPlaylist;
    
    }(psd.media));
    (function(namespace) {
        // Inheritance class
        TopEmbedPlaylist.prototype = new psd.framework.EventDispatcher();
    
        function TopEmbedPlaylist(playerSettings,playlistSettings)
        {
            // Super
            psd.framework.EventDispatcher.call(this);
    
            /**
             * className psd.media.TopEmbedPlaylist
             */
            this.className = "psd.media.TopEmbedPlaylist";
    
            var _playerSettings = playerSettings;
            var _newPlayerSettings;
    
            var _playlistSettings = playlistSettings;
    
            var _url_list;
            var _currentPlaylist = 0;
            var _currentIndex = 0;
    
            var mediaTopEmbed;
            var mediaTopPlaylist;
    
            var _playlists = [];
    
            var _data;
    
            var _that = this;
    
            var _selectedIndex = 0;
    
            var _dataVideoMediator = null;
            var _jsonParser = null;
    
            var _redrawing = false;
    
            var _interval = null;
    
            var dynindex = 0;
    
            var _CONTAINER = null;
            var _CONTAINER_PLAYER = null;
            var _CONTAINER_PLAYLIST = null;
    
            var _do_resize_16_9 = false;
            var _default_player_percent = 0.7;
    
            var _MIN_WIDTH = 768;
    
            var _pendingPlayIndex = [0,-1];
            var _isDead = false;
            this.ancho = 0;
            this.alto = 0;
    
            this.getMediaTopEmbed = function(){
                return mediaTopEmbed;
            };
    
            this.getMediaTopPlaylist = function(){
                return _playlists;
            };
    
            this.destroyPlayLists = function(){
                for(var i in _playlists){
                    if(typeof _playlists[i].getTopPlaylist == 'function'){
                        _playlists[i].getTopPlaylist().destroyBasePlayList();
                    }
                }
                _isDead = true;
            }
    
            this.setPlayerSettings = function(pSettings){
                _newPlayerSettings = pSettings;
            }
    
            var onDataComplete = function(evt){
                if((evt.result!=undefined)&&(evt.result.parserResult!=undefined)&&(evt.result.parserResult.result!=undefined)&&(evt.result.parserResult.result.data!=undefined)){
                    _data = evt.result.parserResult.result.data;
    
                    if(_data.length<1){
                        if((typeof(_playlistSettings[0])!="undefined")&&(document.getElementById(_playlistSettings[0].id_container_playlist)))
                            document.getElementById(_playlistSettings[0].id_container_playlist).className += " mm_playlist_empty";
                    }
    
                    //eliminamos los valores que no existan en la fapi
                    var aux_data = [];
    
                    for(var i in _data){
                        if(_data[i]!=null){
                            aux_data.push(_data[i]);
                        }
                    }
    
                    if(aux_data.length==0){
                        //_playerSettings = null;
                        //_playerSettings.id_media = null;
    /*
                        if(typeof mediaTopEmbed != 'object'){
                            mediaTopEmbed = new psd.media.TopEmbed();
                        }
    
                        if(typeof _playerSettings.topPlayer != 'undefined' && typeof _playerSettings.topPlayer.media != 'undefined'){
                            this.ancho = _playerSettings.topPlayer.media.ancho;
                            this.alto = _playerSettings.topPlayer.media.alto;
                        }
    */
                        mediaTopEmbed.init(_playerSettings);
                        //mediaTopEmbed.paintError();
    
                        //mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_loadPlaylist);
                        return;
                    }
    
                    _data = aux_data;
    
                    //limpiar los campos description
                    for(var i in _data){
                        if(_data[i].description != null){
                            var descripcion= _data[i].description;
                            descripcion= descripcion.replace(/<[^>]*>?/g, '');
                            _data[i].description= descripcion;
                        }
                    }
    
                    if(_redrawing){
                        for(_play in _playlists){
                            if(dynindex==_play){
                                _playlists[_play].resetData(_data);
                                _playlists[_play].reDraw();
    
                                if(_pendingPlayIndex[1]>-1){
                                    this.playIndex(_pendingPlayIndex[0],_pendingPlayIndex[1]);
                                    _pendingPlayIndex[1] = -1;
                                }
                            }
                        }
                    }else{
                        if((_playlistSettings[_currentPlaylist].reload_secs!=undefined)&&(_playlistSettings[_currentPlaylist].reload_secs>0)){
                            (function setinter(cual){
                                _interval = setInterval(function(){
                                    resetDyn.apply(this,[cual]);
                                },_playlistSettings[_currentPlaylist].reload_secs*1000);
                            })(_currentIndex);
                        }
    
                        if((typeof(_playerSettings.id_media)=="undefined")||(_playerSettings.id_media=="")){
                            var indice = 0;
    
                            if(typeof (playlistSettings.index)!="undefined"){
                                if(playlistSettings.index<0)
                                    playlistSettings.index = (Math.random()*(_data.length-1))|0;
    
                                if((typeof(playlistSettings.reorder)!="undefined")&&(playlistSettings.reorder==true)){
                                    for(var i=0;i<playlistSettings.index;i++){
                                        _data[_data.length-1] = _data.shift();
                                    }
                                }else{
                                    indice = playlistSettings.index;
                                }
                            }
    
                            if((typeof (playlistSettings.shuffle)!="undefined")&&(playlistSettings.shuffle==true)){
                                indice = 0;
    
                                var cual = 0;
                                if(typeof (playlistSettings.index)!="undefined")
                                    cual = playlistSettings.index;
    
                                var first = _data.splice(cual,1)[0];
    
                                _data.sort(function(a, b){return 0.5 - Math.random()});
                                _data.shift(first);
                            }
    
    
                            if(indice<0)indice = 0;
                            if(indice>=_data.length)indice = _data.length-1;
    
                            playlistSettings.index = indice;
    
                            _playerSettings.id_media = _data[indice].idref;
                        }
    
                        if(_currentPlaylist==0){
                            if(typeof mediaTopEmbed != 'object'){
                                mediaTopEmbed = new psd.media.TopEmbed();
                            }
    
                            if(typeof _playerSettings.topPlayer != 'undefined' && typeof _playerSettings.topPlayer.media != 'undefined'){
                                this.ancho = _playerSettings.topPlayer.media.ancho;
                                this.alto = _playerSettings.topPlayer.media.alto;
                            }
    
                            mediaTopEmbed.init(_playerSettings);
                            mediaTopEmbed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,_loadPlaylist, this);
                        }else{
                            _loadPlaylist();
                        }
                    }
                }
            }
    
            var onDataError = function(evt){
                //console.log("error playlistttt");
                if((typeof(_playlistSettings[0])!="undefined")&&(document.getElementById(_playlistSettings[0].id_container_playlist)))
                    document.getElementById(_playlistSettings[0].id_container_playlist).className += " mm_playlist_empty";
            }
    
            this.isArray =  function(obj){
                return Object.prototype.toString.call(obj) === "[object Array]";
            }
    
            this.init = function()
            {
                //parÃ¡metros por defecto;
                if(_playlistSettings.skinPlaylist!=undefined){
                    // renombramos skinPlaylist a styleItemsContainer
                    _playlistSettings.styleItemsContainer = _playlistSettings.skinPlaylist;
                    delete _playlistSettings.skinPlaylist;
                }
                if(_playlistSettings.autoNext==undefined)
                    _playlistSettings.autoNext = true;
                //este valor ya no se usa
                if(_playlistSettings.skin!=undefined)
                    delete _playlistSettings.skin;
                //repeat por defecto a 2
                if(_playlistSettings.repeat==undefined)
                    _playlistSettings.repeat = 2; // repeat all
                // tenemos 2 playListSkins por defecto, dependiendo de si seteamos o no el styleItemsContainer 
                if(_playlistSettings.playListSkin==undefined || _playlistSettings.playListSkin == ''){
                    if(typeof _playlistSettings.styleItemsContainer != "undefined" && _playlistSettings.styleItemsContainer != ""){
                        _playlistSettings.playListSkin = 'generica';
                    } else {
                        _playlistSettings.playListSkin = 'vacia';
                    }
                }
                if(_playlistSettings.playListSkin == 'vacia')
                    _playlistSettings.styleItemsContainer = '';
                //fin parÃ¡metros por defecto
    
    
                if(_playerSettings.className == "psd.media.TopEmbed"){
                    mediaTopEmbed = _playerSettings;
                    if(typeof _newPlayerSettings != 'undefined'){
                        _playerSettings = _newPlayerSettings;
                    } else {
                        _playerSettings = mediaTopEmbed.getSettings();
                    }
                }
                _playerSettings.isPlaylist = true; //-- desactivar publicidad POSTROLL
                _playerSettings.playlistUrl = playlistSettings.URL_list;
    
    
                if(!this.isArray(_playlistSettings))
                    _playlistSettings = [_playlistSettings];
    
                if((_playlistSettings[0].id_container_playlist=="")||((_playlistSettings[0].id_container_playlist==undefined))){
                    var _containername = _playerSettings.id_container;
                    _CONTAINER = document.getElementById(_playerSettings.id_container);
                       if(_playlistSettings[0].playListSkin == 'vacia') {
                        _CONTAINER_PLAYER = document.createElement("div");
                        _CONTAINER_PLAYER.id = _playerSettings.id_container + "__player";
                        _CONTAINER_PLAYER.style.width = "100%";
                        _CONTAINER_PLAYER.style.height = "100%";
                        _CONTAINER_PLAYER.style["float"] = "left";
                        _playerSettings.id_container = _containername + "__player";
                        _CONTAINER.appendChild(_CONTAINER_PLAYER);
    
                       } else {
                        _CONTAINER_PLAYER = document.createElement("div");
                        _CONTAINER_PLAYER.id = _playerSettings.id_container + "__player";
                        _CONTAINER_PLAYER.style.width = "70%";
                        _CONTAINER_PLAYER.style.height = "100%";
                        _CONTAINER_PLAYER.style["float"] = "left";
    
                        _CONTAINER_PLAYLIST = document.createElement("div");
                        _CONTAINER_PLAYLIST.id = _playerSettings.id_container + "__playlist";
                        _CONTAINER_PLAYLIST.style.width = "30%";
                        _CONTAINER_PLAYLIST.style.height = "100%";
                        _CONTAINER_PLAYLIST.style["float"] = "left";
    
                        _playerSettings.id_container = _containername + "__player";
                        _playlistSettings[0].id_container_playlist = _containername + "__playlist";
    
                        _CONTAINER.appendChild(_CONTAINER_PLAYER);
                        _CONTAINER.appendChild(_CONTAINER_PLAYLIST);
    
                        _do_resize_16_9 = true;
                    }
                }
    
                _jsonParser = new psd.framework.parser.JSONParser();
                _dataVideoMediator = new psd.framework.Mediator();
                _dataVideoMediator.corsIE(true);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
                _dataVideoMediator.mediate(_playlistSettings[_currentPlaylist].URL_list, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
    
                (function(index){
                    _currentIndex = index;
                })(_currentPlaylist);
            }
    
            var resetDyn = function(cual){
                _redrawing = true;
    
                dynindex = cual;
                //al llegar los datos se llama a -> onDataComplete
                _dataVideoMediator.mediate(_playlistSettings[cual].URL_list, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
            }
    
            this.resetPlayList = function(cual,conf,index){
                _playlistSettings[cual] = conf;
                resetDyn(cual);
    
                if(index!=null){
    
                    var aux_current = (function(value){ return value;})(_currentIndex);
    
                    _pendingPlayIndex = [aux_current,index];
                    //this.playIndex(cual,index);
                }
            }
    
            var _loadPlaylist = function(){
                if(_isDead) return;
                //TODOjc1402 y 2803
                if(typeof _playlistSettings[_currentPlaylist] == 'undefined'){
                    _that.getMediaTopPlaylist()[0].dispatchEvent(new psd.media.PlaylistEvent("onPlayListChangeMedia",{}));
                    return;
                }
                _playlistSettings[_currentPlaylist].player = mediaTopEmbed;
    
                var mediaTopPlaylist = new psd.media.TopPlaylist(_that);
    
                if(_playlistSettings[_currentPlaylist].playerPercent!=undefined)
                    _default_player_percent = _playlistSettings[_currentPlaylist].playerPercent;
    
                mediaTopPlaylist.addEventListener(psd.media.PlaylistEvent.DATA_COMPLETE,
                    function(evt){
                        if(_currentPlaylist==_playlistSettings.length-1){
                            if(_do_resize_16_9){
    
                                //--En caso de tener fullscreen activado
                                if (!_fullscreen) {
                                    _that.resize_16_9(_default_player_percent, true);
                                }
                            }
                            //_that.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE,{}));
                        };
                });
    
                _playlists[_currentPlaylist] = mediaTopPlaylist;
    
                mediaTopPlaylist.setData(_data);
                mediaTopPlaylist.init(_playlistSettings[_currentPlaylist],_currentPlaylist);
    
                _currentPlaylist++;
    
                if(_currentPlaylist<_playlistSettings.length){
                    _that.init();
                }else{
                    _that.dispatchEvent(new psd.media.TopEmbedEventPlaylist(psd.media.TopEmbedEventPlaylist.EVENT_INIT,{"TopEmbed":mediaTopEmbed,"TopPlaylist":_playlists}));
                }
            }
    
            this.playIndex = function(indexplaylist,index){
                //console.log(_playlists,_playlists[indexplaylist]);
                _playlists[indexplaylist].playIndex(index);
            }
    
            this.resize_16_9 = function(percentplayer,onresize){
    
                var contenedor = _CONTAINER;
                var cont_player = _CONTAINER_PLAYER;
                var cont_lista = _CONTAINER_PLAYLIST
    
                if(contenedor==null){
                    return;
                }
    
                var applypercent = percentplayer;
    
                if((typeof(playerSettings.getSettings)=="function")&&(playerSettings.getSettings()["media_type"]=="audio")){
                    cont_player.style.width = "100%";
                    cont_player.style.display = "inline-block";
    
    
                    if((typeof(playerSettings.getSettings().topPlayer)!="undefined")&&(typeof(playerSettings.getSettings().topPlayer.generic)!="undefined"))
                        cont_player.style.height = parseInt(playerSettings.getSettings().topPlayer.generic.height) + "px";
    
                    cont_lista.style.width = "100%";
                    cont_lista.style.height = "400px";
                }else{
                    var WIDTH =  Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    
                    if(WIDTH<_MIN_WIDTH){
                        applypercent = 1;
                        if(cont_lista.className.indexOf("mm_mobile_list")<0)
                            cont_lista.className += " mm_mobile_list";
                    }else{
                        applypercent = percentplayer;
                    }
    
                    var anchuratotal = contenedor.offsetWidth;
    
                    var anchuraplayer = anchuratotal*(applypercent*100)/100;
    
                    cont_player.style.width = Math.floor(anchuraplayer) + "px";
                    cont_player.style.height = Math.floor(anchuraplayer*9/16) + "px";
    
                    var alturatotal = cont_player.offsetHeight;
    
                    contenedor.style.height = alturatotal + "px";
    
                    if(applypercent==1)
                        cont_lista.style.width = anchuratotal + "px";
                    else
                        cont_lista.style.width = (anchuratotal - anchuraplayer) + "px";
    
                    cont_lista.style.height = Math.floor(alturatotal) + "px";
                }
    
                if(onresize){
                    (function(that){
                        var _preonresize = null;
    
                        if(window.onresize!=null)
                            _preonresize = window.onresize;
    
                        window.onresize = function(){
                            if(_preonresize!=null)
                                _preonresize();
    
                            //--En caso de tener fullscreen activado
                            if (!_fullscreen) {
    
                                that.resize_16_9(percentplayer, false);
    
                            }
    
                        }
                    })(this);
                }
            };
        }
    
        namespace.TopEmbedPlaylist = TopEmbedPlaylist;
    
    }(psd.media));
    (function(namespace) {
        function TopEmbedManager(iniSettings){
            if(typeof psd.media.psdManager != "object"){
                psd.media.psdManager = new psd.media.TopEmbedManagerGeneral(iniSettings);
            }
            
            this.add = function(config,config_image_url, _embed){
                psd.media.psdManager.add(config, config_image_url, _embed);
            }
    
            this.addEmbed = function(_embed){
                psd.media.psdManager.addEmbed(_embed);
            }
        }
    
        namespace.TopEmbedManager = TopEmbedManager;
    
    }(psd.media));
    
    
    (function(namespace) {
        // Inheritance class
        TopEmbedManagerGeneral.prototype = new psd.framework.EventDispatcher();
    
        //Esta clase se encarga de generar TopEmbeds automÃ¡ticamente a partir del click sobre una imagen de previsualizaciÃ³n
        //En caso de que nos manden una imagen vacÃ­a ("") se generarÃ¡ el player automÃ¡ticamente sin esperar al click del usuario
        //AsÃ­ mismo relaciona los players para que todos tengan constancia de las reproducciones de los demÃ¡s y actÃºen en consecuencia (por ejemplo, pausar el player reproduciÃ©ndose al hacer play sobre otro)
        function TopEmbedManagerGeneral(iniSettings)
        {
            // Super
            psd.framework.EventDispatcher.call(this);
            /**
             * className psd.media.TopEmbedManagerGeneral
             */
            this.className = "psd.media.TopEmbedManagerGeneral";
            var _that = this;
    
            //guardamos la referencia del player en reproduccion
            var _currentEmbed;
    
            this.idx = -1;
            this.elemsMgr = [];
    
            //flag que indica que cuando pulsemos sobre un player haremos pause sobre los demÃ¡s
            this.pauseOthersOnPlay = false;
            //flag que indica que cuando pulsemos sobre un player haremos mute sobre los demÃ¡s
            this.muteOthersOnPlay = false;
            //funciÃ³n implementable por el integrador para que haga la acciÃ³n deseada cuando se cambia el estado de un player
            //por defecto estÃ¡ configurado para que haga reset sobre el player que se estaba escuchando
           this.customActionOnPlay = function(e1,e2,t){
                this.elemsMgr[e1].embed
                if(typeof this.elemsMgr[e1].embed != "undefined" && this.elemsMgr[e1].embed != ''){
                    if(typeof this.elemsMgr[e2].embed != "undefined" && this.elemsMgr[e2].embed != ''){
                        if((e1 != e2)&&(t=="play"))
                            this.reset(e1);
                    }   
                }
            };
    
            this.info2 = function(){
                if(document.getElementById('psdInfo2Manager') != null) return;
                var tmp=document.getElementById('psdInfo2Manager');
                var divInfo = document.createElement('div');
                divInfo.id = "psdInfo2Manager";
                divInfo.style = 'width: 300px;height: 100%;position: fixed;top: 0px;right: 0px;background-color: beige;opacity: 0.9;z-index: 1000000000;font-size: 1em; overflow:scroll';
                var body = document.body.appendChild(divInfo);
    
                var tmp = document.createElement('div');
                tmp.id = "psdInfo2ManagerBut";
                tmp.style = "position: fixed;right: 300px;background-color: sandybrown;";
                tmp.innerHTML = "<span id='psdInfo2ManagerButTxt' style='font-size:3em'>&nbsp;&rarrb;&nbsp;</span>";
                divInfo.appendChild(tmp);
                tmp.onclick = function(){
                    var tmp = document.getElementById('psdInfo2Manager');
                    var tmp2 = document.getElementById('psdInfo2ManagerBut');
                    var tmp3 = document.getElementById('psdInfo2ManagerButTxt');
                    if(tmp.style.width=="300px"){
                        tmp.style.width = "30px";
                        tmp2.style.right = "0px";
                        tmp3.innerHTML = "&nbsp;&larrb;&nbsp;";
                    } else {
                        tmp.style.width = "300px";
                        tmp2.style.right = "300px";
                        tmp3.innerHTML = "&nbsp;&rarrb;&nbsp;";
                    }
                }
                for(var i in this.elemsMgr){
                    var tmpX = document.getElementById(this.elemsMgr[i].confs.id_container);
                    tmpX.style.outline = '7px solid red';
                    tmpX.onmouseover = function(){
                        var tmp = document.getElementById('divInfo_'+this.id);
                        tmp.style.backgroundColor = 'red';
                        tmp.style.color = 'white';
                    };
                    tmpX.onmouseout = function(){
                        var tmp = document.getElementById('divInfo_'+this.id);
                        tmp.style.backgroundColor = '';
                        tmp.style.color = '';
                    };
                    var tmp = document.createElement('div');
                    var tmp2 = document.createElement('a');
                    tmp2.onclick = (function(ind){return function(){window.location.hash = ind;}})(this.elemsMgr[i].confs.id_container);
                    var tmp3 = document.createElement('div');
                    tmp3.id = 'divInfo_' + this.elemsMgr[i].confs.id_container;
                    tmp3.style = "border:thin solid black; margin: 10px;";
                    tmp3.innerHTML = '** Sin TopEmbed **';
    
                    tmp2.innerHTML = "("+i+") <b>"+this.elemsMgr[i].confs.id_container+"</b> ";
                    var tmpDivImg = document.createElement('div');
                    tmpDivImg.style = 'clear:both;'
                    var tmp4 = tmpX.getElementsByTagName('img');
                    if(tmp4.length > 0){
                        tmp4 = tmp4[0];
                        if(tmp4.getAttribute('data-src') == null){
                            var tmp5 = '<div style="float:left"><img src="'+tmp4.src+'" style="width:100px;" /></div>'; 
                        } else 
                            var tmp5 = '<div style="float:left"><img src="'+tmp4.getAttribute('data-src')+'" style="width:100px;" /></div>'; 
                        
                        tmp5+='<ul><li>Width:'+tmp4.getAttribute('width') +'</li><li>Height:'+tmp4.getAttribute('height')+'</li></ul>';
                        tmp5+='<div style="clear: both;"></div>';
                        tmpDivImg.innerHTML = tmp5;
                    }
    
                    tmp.appendChild(tmp2);
                    tmp.appendChild(tmpDivImg);
                    tmp.appendChild(tmp3);
                    divInfo.appendChild(tmp);
                }
    
                setInterval(function(){info2Status.apply(_that)}, 1000);
            }
    
            info2Status = function(){
    
                for(var i in this.elemsMgr){
                    var tmp = this.elemsMgr[i].embed;
                    if(tmp != ''){
                        if(tmp.isInitialized()){
                            var tmpContainer = document.getElementById('divInfo_' + tmp.getSettings().id_container);
                            if(tmpContainer == null) {
                                var tmpContainer = document.getElementById('divInfo_' + tmp.getSettings().id_container.replace('__player',''));
                            }
                            if(tmpContainer != null) {
                                if(tmp.getMediaPlayer().getCurrentPosition() == emic.top.TopPlayer.POSITION_MEDIA){
                                    tmpContainer.style.outline = '5px solid red';
                                } else {
                                    tmpContainer.style.outline = '';
                                }
                                tmpContainer.innerHTML = '<ul><li>'+tmp.getMediaPlayer().getData().internalData.controllerName+'</li><li>'+tmp.getMediaPlayer().getCurrentPosition()+'</li><li>'+tmp.getMediaPlayer().getMediaModule().getStatus()+'</li><li>'+tmp.getMediaPlayer().getAdModule().getStatus()+'</li>';
                            }
                        }
                    }
                }
            }
    
            this.existsFPW = function(config){
                if((typeof(config)!="undefined")&&(config!=null)){
                    if((typeof(config.plugins)!="undefined")&&(config.plugins!=null)){
                        for(var i in config.plugins){
                            if(config.plugins[i].type=="FloatingPlayerWidget"){
                                if((typeof(config.plugins[i].conf)!="undefined")&&(config.plugins[i].conf)!=null){
                                    if((typeof(config.plugins[i].conf.force_on_viewport)!="undefined")&&(config.plugins[i].conf.force_on_viewport)==true){
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
                return false;
            }
    
            /*En caso de que Autoplay = true llegue desde la configuracion eliminamos la caratula y arranco el video*/
            this.setCover = function (config, image) {
    
                /*En caso de que no tengamos cover retornamos imagen=vacia*/
                if (typeof (image) != "undefined" && image != "") {
    
                    if (typeof (config.topPlayer) != "undefined") {
                        if (typeof (config.topPlayer.media) != "undefined") {
    
                            /*guardamos el valor de la imagen para reutilizarlo en los casos #1.5 y #2.5 'Excepcion'*/
                            config.topPlayer.media.imgCover = image;
    
                            /*En caso de ser movil no ponemos cover aunque estÃ© en Autoplay #5.1*/
                            if ((_that.existsFPW(config))
                                ||
                                (config.topPlayer.media.autoplay && !getDevice().mobile)) {
    
                                /*En caso de que no tengamos cover en PC seteamos autoplay=false en YouTube #1.4*/
                                config.topPlayer.media.cover = false;
    
                                return "";
    
                            } else {
    
                                /*En caso de que tengamos cover en PC seteamos autoplay=true en YouTube #1.3*/
                                config.topPlayer.media.cover = true;
    
                                return image;
                            }
                        }
                    }
    
                    return image;
    
                } else {
    
                    return "";
                }
            };
    
            var PcControl = function () {
    
                var autoplay;
    
                /*Si el dispositivo es un PC forzamos el autoplay a true para usar caratula+autoplay*/
                if (!getDevice().mobile) {
                    autoplay = true;
                } else {
                    autoplay = false;
                }
    
                return autoplay
    
            };
    
            /*Comprobamos si tenemos una caratula y en caso de ternerla forzamos el AUTOPLAY*/
            this.setAutoplay = function (config, cover, URLnoticia) {
    
                if (typeof(cover) != "undefined" && cover != "") {
                    if (typeof (config.topPlayer) == "undefined") {
    
                        config.topPlayer = {};
                    }
    
                    if (typeof (config.topPlayer.media) == "undefined") {
    
                        config.topPlayer.media = {};
    
                        /*en caso de que no llegue link de noticias los players siempre estan sin autoplay*/
                        if (typeof (URLnoticia) != "undefined" && URLnoticia != "" && URLnoticia != null) {
                            if(!_that.existsFPW(config))
                                config.topPlayer.media.autoplay = true;
                        } else {
    
                            config.topPlayer.media.autoplay = PcControl();
                        }
    
                    } else {
    
                        /*en caso de que no llegue link de noticias los players siempre estan sin autoplay*/
                        if (typeof (URLnoticia) != "undefined" && URLnoticia != "" && URLnoticia != null) {
                            if(!_that.existsFPW(config))
                                config.topPlayer.media.autoplay = true;
                        } else {
    
                            config.topPlayer.media.autoplay = PcControl();
                        }
    
                    }
    
                    return config;
    
                }
    
                return config;
            };
    
            /*En caso de querer insertar HTML en la caratula utilizamos esta funcion */
            this.generateHTML = function (conf,data) {
    
                /*Elemento customizable por parametros*/
    
                if (typeof (data) != "undefined" && data != "" && data != null) {
    
                   var Array_custom, dom_custom ;
    
                    dom_custom = document.createDocumentFragment();
    
                for (var i in data){
    
                    Array_custom = document.createElement(data[i].HTMLelement);
    
                    /*Clase personalizada*/
                    if (typeof(data[i].ClassName) != "undefined" && data[i].ClassName != "") {
    
                        Array_custom.className = data[i].ClassName;
                    };
    
                    /*estilo personalizado*/
                    if (typeof(data[i].style) != "undefined" && data[i].style != "") {
    
                        /*Marcamos cada atributo independientemente MMN-175*/
    
                        var stringStyle = String(data[i].style);
                        var attributes = stringStyle.split(';');
                        //
                        for (var count = 0; count < attributes.length; count++) {
                            var entry = attributes[count].split(':');
                            Array_custom.style[entry[0]] = entry[1];
    
                        }
    
    
                       // Array_custom.style = data[i].style;
    
                    };
    
                    Array_custom.innerHTML = data[i].value;
                    dom_custom.appendChild(Array_custom);
                }
    
                    return dom_custom;
    
    
                } else {
    
                    return false;
                }
    
            };
    
            //funciÃ³n para aÃ±adir una imagen clickable que cargarÃ¡ un TopEmbed dinÃ¡mico.
            //Al llamar a esta funciÃ³n se genera directamente la imagen sin tener que llamar a otra
            /*En caso de visualizarse con un dispositivo movil incluimos la URL seccion*/
            this.add = function(config,config_image_url,_embed){
    
                if(config_image_url[3]==true){
    
                    var xapi = "fapi-top";
    
                    switch(config.id_cuenta){
                        case "diarioas":
                            xapi = "gapi";
                            break;
                    }
    
                    var url = "//" + xapi + ".prisasd.com/api/v2/search/{id_cuenta}/{media_type}/idref/{id_media}";
                    url = url.replace("{id_cuenta}",config.id_cuenta).replace("{media_type}",config.media_type).replace("{id_media}",config.id_media);
    
                    var onDataComplete_pre = function(evt){
                        var _videoData = evt.result.parserResult;
    
                        if(_videoData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE && typeof _videoData.result == 'object' && _videoData.result.total > 0) {
                            _embed.pre_data = evt;
    
                            try{
                                if((evt["result"]["parserResult"]["result"]["data"][0]["status"]["id"]==4)||(evt["result"]["parserResult"]["result"]["data"][0]["status"]["id"]==6)){
                                    config_image_url[3] = false;
                                    this.add(config,config_image_url,_embed);
                                }else{
                                    return;
                                }
                            }
                            catch(exc){
                                return;
                            }
                        }else {
                            _embed.pre_data = "";
                        }
                    }
    
                    var onDataError_pre = function(evt){
                    }
    
                    var _jsonParser = new psd.framework.parser.JSONParser();
                    var _dataVideoMediator = new psd.framework.Mediator();
                    _dataVideoMediator.corsIE(true);
                    _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete_pre, this);
                    _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError_pre, this);
                    _dataVideoMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
    
    
                    return;
                }
    
                this.idx++;
                this.elemsMgr[this.idx] = {
                    'embed': _embed!=undefined?_embed:''
                };
    
                if(getDevice().mobile === true && typeof config.plugins != 'undefined'){
                    for(var i in config.plugins){
                        if(config.plugins[i].type == 'FloatingPlayerWidget'){
                            config_image_url[0] = "";
                        }
                    }
                }
    
                //si el quinto parÃ¡metro es true significa que no es una imagen, sino un vÃ­deo.
                //ATENCIÃ“N, hay una detecciÃ³n automÃ¡tica mÃ¡s adelante para evitar que el integrador cometa errores al setear este campo.
                //si la extensiÃ³n del parÃ¡metro 0 es .mp4 se fuerza este valor a vÃ­deo. Si la extensiÃ³n es .jpg o .png se fuerza a imagen.
                if(config_image_url[4]){
                    this.elemsMgr[this.idx].is_video = config_image_url[4];
                }
    
                var ext = config_image_url[0];
    
                if(ext){
                    switch(ext.substr(ext.lastIndexOf('.') + 1).toLowerCase()){
                        case "mp4":
                            this.elemsMgr[this.idx].is_video = true;
                            break;
                        case "jpg":
                        case "png":
                            this.elemsMgr[this.idx].is_video = false;
                            break;
                    }
                }
    
                if((typeof (config_image_url)=="undefined")||(config_image_url == null)){
                    this.elemsMgr[this.idx].confs = this.setAutoplay(config);
                    this.elemsMgr[this.idx].htmlObj = this.generateHTML(config); /*HTML personalizado*/
                    this.generateContainer(this.idx, _embed);
                }else{
                    this.elemsMgr[this.idx].images = this.setCover(config, config_image_url[0]);
                    this.elemsMgr[this.idx].urlsNoticia = config_image_url[1];
                    this.elemsMgr[this.idx].confs = this.setAutoplay(config, config_image_url[0],config_image_url[1]);
                    this.elemsMgr[this.idx].preloadData = config_image_url[4];
    
                    if(typeof this.elemsMgr[this.idx].confs.topPlayer=="undefined")
                        this.elemsMgr[this.idx].confs.topPlayer = {};
                    if(typeof this.elemsMgr[this.idx].confs.topPlayer.media=="undefined")
                        this.elemsMgr[this.idx].confs.topPlayer.media = {};
    
                    var preload_img = document.createElement("img");
    
                    preload_img.src = config_image_url[0];
                    preload_img.that = this;
    
                    preload_img.onerror = function(){
                    };
    
                    preload_img.onload = function(){
    
                        /**Hay que tener cuidado al pasar objetos y sus contextos ya que cuando instanciamos mas de un player el evento asyncrono onload hace que se mezclen los datos
                         * hay que incluir un that dentro del elemento "img" que pase el contexto actual de la instancia para poder recuperar los datos correctamente**/
                        if (this.that.elemsMgr[this.that.idx].preloadData != true)
                            this.that.elemsMgr[this.that.idx].confs.topPlayer.media.custom_cover = this.that.elemsMgr[this.that.idx].images;
                    };
    
                    this.elemsMgr[this.idx].htmlObj = this.generateHTML(config,config_image_url[2]); /*HTML personalizado*/
                    this.generateContainer(this.idx, _embed);
                }
            };
    
            //funciÃ³n para aÃ±adir un embed que ya existe en la pÃ¡gina del integrador
            this.addEmbed = function(embed){
    
                embed.setManager(this);
    
                this.idx++;
                this.elemsMgr[this.idx] = {
                    'embed': embed,
                    'confs': embed.iniSettings
                };
    
                if(typeof embed.iniSettings.managerOpt != 'undefined'){
                    this.elemsMgr[this.idx].images = embed.iniSettings.managerOpt[0];
                } else {
                    this.elemsMgr[this.idx].images = "";
                }
                this.generateEmbed(this.idx);
            };
    
            //setea el width y height del tag img del cover
            var setWidthHeight = function (pElem, pIndex, pContainer) {
                var pContent;
                if (typeof (pContainer) != 'undefined' && pContainer != "") {
                    pContent = pContainer;
                } else {
                    pContent = pElem;
                }
                pElem.width = pContent.clientWidth;
                if (typeof this.elemsMgr[pIndex].confs.topPlayer.media.alto != 'undefined' && typeof this.elemsMgr[pIndex].confs.topPlayer.media.ancho != 'undefined') {
                    pElem.height = (pContent.clientWidth * this.elemsMgr[pIndex].confs.topPlayer.media.alto / this.elemsMgr[pIndex].confs.topPlayer.media.ancho);
                } else {
                    pElem.height = (pContent.clientWidth * 314 / 560);
                }
            };
    
            /*para la correcta indexacion en google agregamos estos tres elementos*/
            var microData = function (url) {
    
                var checkHttps = function (url) {
                    if (url.indexOf("https") != -1) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
    
                var urlImg = url;
    
                if (url.indexOf("https") == -1) {
                    if (checkHttps(window.document.location.protocol)) {
    
                        urlImg = 'https:' + url;
    
                    } else {
    
                        urlImg = 'http:' + url;
    
                    }
                }
    
                var dom_microdata = document.createDocumentFragment();
    
                var dom_url = document.createElement("meta");
                dom_url.setAttribute('itemprop', 'url');
                dom_url.setAttribute('content', urlImg);
    
                var dom_meta_a = document.createElement("meta");
                dom_meta_a.setAttribute('itemprop', 'width');
                dom_meta_a.setAttribute('content', '980');
    
                var dom_meta_b = document.createElement("meta");
                dom_meta_b.setAttribute('itemprop', 'height');
                dom_meta_b.setAttribute('content', '552');
    
                dom_microdata.appendChild(dom_url);
                dom_microdata.appendChild(dom_meta_a);
                dom_microdata.appendChild(dom_meta_b);
    
                return dom_microdata
    
            }
    
    
            //crea la imagen clickable en la pÃ¡gina a partir de un Ã­ndice referente al array donde guardamos las imÃ¡genes
            this.generateContainer = function(index, _embed){
                if(this.elemsMgr[index].images != ""){
                    var container = document.getElementById(this.elemsMgr[index].confs.id_container);
    
                    //creamos la estructura de DOM de El PaÃ­s
                    var dom_div = document.createElement("div");
                    var dom_a_posicionador = document.createElement("a");
                    var dom_span_boton_video = document.createElement("span");
                    dom_a_posicionador.className = "posicionador";
                    dom_span_boton_video.className = "boton_video";
                    dom_a_posicionador.href = "javascript:void(0)";
                    var img = null;
    
                    if(this.elemsMgr[index].is_video){
                        img = document.createElement("video");
                        img.setAttribute("muted",true);
                        img.setAttribute("loop",true);
                        img.setAttribute("autoplay",true);
    
                        /*img.onmouseover = function(){
                            if(typeof this.play!="function")
                                return;
    
                            this.currentTime = 0;
                            var promise = this.play();
    
                            if (promise !== undefined) {
                                promise.then(function() {
                                    // Autoplay started!
                                    var correcto = true;
                                }).catch(function(error){
                                    // Autoplay was prevented.
                                    // Show a "Play" button so that user can start playback.
                                    var bloqueado = true;
                                });
                            }
                        }
    
                        img.onmouseout = function(){
                            if(typeof this.pause!="function")
                                return;
    
                            this.currentTime = 0;
                            this.pause();
                        }*/
    
                        img.src = this.elemsMgr[index].images;
                        img.onload = function(){
                            setWidthHeight.apply(_that, [this, index]);
                            this.play();
                        }
    
                        img.oncanplaythrough  = function(){
                            setWidthHeight.apply(_that, [this, index]);
                            this.muted = true;
                            this.play();
                        }
                    }
                    else{
                        img = document.createElement("img");
    
                        if(typeof(window.lzld) == 'function'){
                            img.setAttribute('data-src', this.elemsMgr[index].images);
                            img.setAttribute('src', '//ep01.epimg.net/t.gif');
                            setWidthHeight.apply(this, [img, index, container]);
                            img.onload = function(){lzld(this);};
                        } else {
                            img.src = this.elemsMgr[index].images;
                            img.onload = function(){
                                setWidthHeight.apply(_that, [this, index]);
                            }
                        }
                    }
    
                    img.style.width = "100%";
                    img.style.height = "100%";
    
                    /**En caso de ser AS y PC evitamos que el usuario interactue con la caratula**/
                    if (_embed.getSettings().id_cuenta != 'diarioas' && !getDevice().mobile) {
    
                        dom_a_posicionador.onclick = (function(ind){
                            return function(e){
                                _that.generateEmbed(ind);
                                dom_a_posicionador.onclick = null;
                            }
                        })(index);
                    }
    
                    /*si no tenemos URL de noticias instanciamos directamente el player*/
                    if ((typeof (this.elemsMgr[index].urlsNoticia) != "undefined") && (this.elemsMgr[index].urlsNoticia != "") && (this.elemsMgr[index].urlsNoticia != null)) {
                        if (!getDevice().mobile) {
                            /*Posicionamos el elemento custom HTML en el DOM*/
                            if (this.elemsMgr[index].htmlObj) {
                                dom_a_posicionador.appendChild(this.elemsMgr[index].htmlObj);
                            }
                        }else{
                            dom_a_posicionador.onclick = "";
                            dom_a_posicionador.href = this.elemsMgr[index].urlsNoticia;
                        }
                        container.innerHTML = "";
                        dom_div.appendChild(dom_a_posicionador);
                        dom_a_posicionador.appendChild(dom_span_boton_video);
                        dom_a_posicionador.appendChild(img);
    
                        /*microdateado*/
                        dom_a_posicionador.appendChild(microData(this.elemsMgr[index].images));
    
                    } else {
                        /*Posicionamos el elemento custom HTML en el DOM*/
                        if (this.elemsMgr[index].htmlObj) {
    
                            /*replicamos el fragmento apra poder reutilizarlo*/
                            var rangeObj = document.createRange ();
                            rangeObj.selectNodeContents (this.elemsMgr[index].htmlObj);
                            var documentFragment = rangeObj.cloneContents ();
    
                            /**Si la cuenta es AS no pintamos los elementos por defecto**/
                            if (_embed.getSettings().id_cuenta != 'diarioas' && !getDevice().mobile) {
    
                                dom_a_posicionador.appendChild(documentFragment);
                            }
                        }
    
    
                        /**Si la cuenta es AS no pintamos los elementos por defecto**/
                        if (_embed.getSettings().id_cuenta != 'diarioas' && !getDevice().mobile) {
    
                            dom_a_posicionador.appendChild(dom_span_boton_video);
                        }
    
                        /*en caso de que sea un PC ignoramos el eliminar la caratula*/
                        if (!getDevice().mobile) {
                            container.innerHTML = "";
                            dom_div.appendChild(dom_a_posicionador);
    
                            /**Si la cuenta es AS no pintamos los elementos por defecto**/
                            if (_embed.getSettings().id_cuenta != 'diarioas' && !getDevice().mobile) {
    
                                dom_a_posicionador.appendChild(dom_span_boton_video);
                            }
    
                            dom_a_posicionador.appendChild(img);
    
                            /*microdateado*/
                            dom_a_posicionador.appendChild(microData(this.elemsMgr[index].images));
    
                        } else {
                            _that.generateEmbed(index);
                        }
                    }
    
    
                    /**En caso de ser AS y PC hacemos una comprobacion previa del servicio de datos**/
                    if (_embed.getSettings().id_cuenta == 'diarioas' && !getDevice().mobile) {
    
    
                        /*Pintamos la caratula por defecto*/
                        container.appendChild(dom_div);
    
                        var xapi = 'gapi';
    
                        var url = "//" + xapi + ".prisasd.com/api/v2/search/{id_cuenta}/{media_type}/idref/{id_media}";
                        url = url.replace("{id_cuenta}", _embed.getSettings().id_cuenta).replace("{media_type}", _embed.getSettings().media_type).replace("{id_media}", _embed.getSettings().id_media);
    
    
                        /**En caso de que no tengamos cover lo seteamos para evitar fallos**/
                        if (typeof (_embed.getSettings().topPlayer) == 'undefined') {
                            _embed.getSettings().topPlayer = {};
                        }
                        if (typeof (_embed.getSettings().topPlayer.media) == 'undefined') {
                            _embed.getSettings().topPlayer.media = {};
                        }
    
                        var _windowError = new psd.media.TopWindowError({
                            id_container: _embed.getSettings().id_container,
                            id_cuenta: _embed.getSettings().id_cuenta,
                            skin: 'diario_as',
                            imgCover: (_embed.getSettings().topPlayer.media.imgCover) ? _embed.getSettings().topPlayer.media.imgCover : ""
                        });
    
    
    
                        var _jsonParser = new psd.framework.parser.JSONParser();
                        var _dataVideoMediator = new psd.framework.Mediator();
                        _dataVideoMediator.corsIE(true);
                        _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, function (e) {
    
                            var _videoData = e.result.parserResult;
    
                            if (_videoData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE && typeof _videoData.result == 'object' && _videoData.result.total > 0) {
    
                                /***Parseado correcto, el elemento existe**/
    
    
                                /**Activamos la acciÃ³n de la caratula para instanciar el player**/
                                dom_a_posicionador.onclick = (function(ind){
                                    return function(e){
                                        _that.generateEmbed(ind);
                                        dom_a_posicionador.onclick = null;
                                    }
                                })(index);
    
                                /*En caso de id valido Integramos los elementos  de boton y HTMLobj que faltan*/
                                dom_a_posicionador.appendChild(documentFragment);
                                dom_a_posicionador.appendChild(dom_span_boton_video);
    
    
                            } else {
    
                                /***El elemento esta geobloqueado, no esta disponible o no existe***/
                                _windowError.paintMessage();
                            }
    
    
                        }, this);
                        _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, function (e) {
    
                            _windowError.paintMessage();
    
                        }, this);
                        _dataVideoMediator.mediate(url, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);
    
                    }else{
    
    
                        /*Pintado por defecto*/
                        container.appendChild(dom_div);
                    }
    
    
                }
                else{
                    _that.generateEmbed(index);
                }
            };
    
            this.getPlayers = function(){
                return _that.elemsMgr;
            }
    
            //genera un TopEmbed dinÃ¡micamente
            this.generateEmbed = function(indexConf){
    
                (function () {
                    if ( typeof window.CustomEvent === "function" ) return false; //If not IE
    
                    function CustomEvent ( event, params ) {
                        params = params || { bubbles: false, cancelable: false, detail: undefined };
                        var evt = document.createEvent( 'CustomEvent' );
                        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
                        return evt;
                    }
    
                    CustomEvent.prototype = window.Event.prototype;
    
                    window.CustomEvent = CustomEvent;
                })();
    
                this.doSwitch = false;
    
                this.onSwitch = function(e1,e2){
                    return false;
                }
    
    
    
                var onInit = function(){
    
                    if((getDevice().mobile)&&(this.elemsMgr[indexConf].images)){
                        var _embed = this.elemsMgr[indexConf].embed;
                        /*var img = document.createElement("img");
                        img.src = "http://ep02.epimg.net/elcomidista/imagenes/2016/03/09/articulo/1457553124_158725_1458301568_noticia_fotograma.jpg";
                        img.style = "position:absolute;width:100%;height:100%;top:0;left:0;";
                        img.embed = this.elemsMgr[indexConf].embed;
    
                        img.onclick = function(){
                            this.embed.API.play();
                            img.style = "display:none;";
                        }*/
    
                        var container = document.getElementById(this.elemsMgr[indexConf].confs.id_container);
    
                        var dom_div = document.createElement("div");
                        var dom_a_posicionador = document.createElement("a");
                        var dom_span_boton_video = document.createElement("span");
                        dom_a_posicionador.className = "";
                        dom_a_posicionador.id = _embed.getSettings().topPlayer.generic.container + "_posicionador_a";
                        dom_span_boton_video.className = "boton_video";
                        dom_span_boton_video.style.zIndex = "1001";
                        dom_span_boton_video.style.pointerEvents = "none";
    
                        dom_a_posicionador.href = "javascript:void(0)";
    
                        //if para diferenciar etiquetas en funcion de si la cover es img o loop
                        if(this.elemsMgr[indexConf].is_video){
                            var img = document.createElement("video");
                        }else{
                            var img = document.createElement("img");
                        }
    
                        img.mm_container = document.getElementById("UIModule_" + this.elemsMgr[indexConf].confs.id_container + "_TopPlayer");
                        //img.uim_container = document.getElementById("MediaModule_" + this.elemsMgr[indexConf].confs.id_container + "_TopPlayer");
    
                        img.mm_container.style.display = "none";
                        //img.uim_container.style.display = "none";
    
    
                        // if para aÃ±adir las variables especificas de un loop como cover del video
                        if(this.elemsMgr[indexConf].is_video){
                            //img = document.createElement("video");
                            img.setAttribute("muted",true);
                            img.setAttribute("loop",true);
                            img.setAttribute("autoplay",true);
    
                            img.src = this.elemsMgr[indexConf].images;
                            img.onload = function(){
                                setWidthHeight.apply(_that, [this, indexConf]);
                                this.play();
                            }
    
                        img.oncanplaythrough  = function(){
                            setWidthHeight.apply(_that, [this, indexConf]);
                            this.muted = true;
                            this.play();
                            }
                        }   
                        else{
    
                            if(typeof(window.lzld) == 'function'){
                                img.setAttribute('data-src', this.elemsMgr[indexConf].images);
                                img.setAttribute('src', '//ep01.epimg.net/t.gif');
                                setWidthHeight.apply(this, [img, indexConf, container]);
                                img.onload = function(){
                                    lzld(this);
                                };
                            } else {
                                img.src = this.elemsMgr[indexConf].images;
                                img.onload = function(){
                                    setWidthHeight.apply(_that, [this, indexConf]);
                                }
                            }
                        }
                        img.style.width = "100%";
                        img.style.height = "100%";
    
                        /*Para compatibilizar los estilos con IOS mÃ¡s antiguos con Safari modificamos las estructuras de los estilos MMN-175*/
                        //img.style = "position:absolute;width:100%;height:100%;top:0;left:0;z-index:1000";
                        img.style.position = "absolute";
                        img.style.width = "100%";
                        img.style.height = "100%";
                        img.style.top = "0";
                        img.style.left = "0";
                        img.style.zIndex = "1000";
    
                        img.embed = this.elemsMgr[indexConf].embed;
    
                        var ocultar_imagen = function(loading){
                            img.style.pointerEvents = "none";
                            img.style.display = "none";
                            img.mm_container.style.display = "block";
                            if(loading){
                                if((typeof (img.embed.getMediaPlayer().getUIModule().getSkin)=="function")&&(typeof (img.embed.getMediaPlayer().getUIModule().getSkin().showLoading)== "function")){
                                    img.embed.getMediaPlayer().getUIModule().getSkin().showLoading(true,true);
                                }
                            }
                            document.getElementById(_embed.getSettings().topPlayer.generic.container + "_posicionador_a").style.display = "none";
                        }
    
                        var pre_OAS = img.embed.API.onAdStart;
                        var pre_OMB = img.embed.API.onMediaBegin;
    
                        img.embed.API.onAdStart = function(evt){
                            if(typeof pre_OAS=="function"){
                                pre_OAS.call(this,evt);
                            }
                            if(img.style.display!="none"){
                                ocultar_imagen();
                            }
                        }
    
                        img.embed.API.onMediaBegin = function(evt){
                            if(typeof pre_OMB=="function"){
                                pre_OMB.call(this,evt);
                            }
                            if(img.style.display!="none"){
                                ocultar_imagen();
                            }
                        }
    
                        img.onerror = function(){
                            ocultar_imagen();
                        }
    
                        img.onclick = function(){
                            ocultar_imagen(true);
                            this.embed.API.play();
                        }
    
    
                        /*Posicionamos el elemento custom HTML en el DOM*/
                        if (_that.elemsMgr[indexConf].htmlObj) {
                            dom_a_posicionador.appendChild(_that.elemsMgr[indexConf].htmlObj);
                        }
    
                        dom_div.appendChild(dom_a_posicionador);
                        dom_a_posicionador.appendChild(dom_span_boton_video);
                        dom_a_posicionador.appendChild(img);
    
                        /*microdateado*/
                        dom_a_posicionador.appendChild(microData(this.elemsMgr[indexConf].images));
    
                        document.getElementById(_embed.getSettings().topPlayer.generic.container + "_base").appendChild(dom_a_posicionador);
    
    
                        /*Evitamos volver a poner la caratula en las playlist (provisional)*/
                        this.elemsMgr[indexConf].images = null;
                    }
    
                    var _onMediaHandler = (function(pIndexEmbed){
                        return function(evt){
                            //this.dispatchEvent(new psd.media.TopEmbedEvent("topembedmanager_event", evt));
                            var event = new CustomEvent('topembedmanager_event',{"detail":evt});
                            document.dispatchEvent(event);
    
                            _currentEmbed = pIndexEmbed; //--player en reproduccion
                            if(evt.data.status=="play" || evt.data.status=="onPreloadControllerComplete"){
                                for(var i in _that.elemsMgr){
                                    if(i != pIndexEmbed){
                                        if(typeof _that.elemsMgr[i].embed == 'object' && _that.elemsMgr[i].embed.isInitialized()){
                                            if(typeof _that.elemsMgr[i].embed.nextPanel == 'object'){
                                                if(_that.elemsMgr[i].embed.nextPanel.isShowPanel())
                                                    _that.elemsMgr[i].embed.nextPanel.killPanel();
                                            }
                                            if(_that.elemsMgr[i].embed.getMediaPlayer().getCurrentPosition() != emic.top.TopPlayer.POSITION_PREVIEW){
                                                if(this.doSwitch){
                                                    this.onSwitch(_that.elemsMgr[i].embed,_that.elemsMgr[pIndexEmbed].embed,evt.data.status);
                                                }
                                                else{
                                                    if(_that.pauseOthersOnPlay)
                                                        _that.pause(i,true);
    
                                                    if(_that.muteOthersOnPlay)
                                                        _that.mute(i,true);
    
                                                    if(_that.customActionOnPlay!=null){
                                                        _that.customActionOnPlay.apply(_that,[i, pIndexEmbed, evt.data.status]);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            return;
                        }
                    })(indexConf);
    
                    var _onAdHandler = (function(pIndexEmbed){
                        return function(evt){
                            //this.dispatchEvent(new psd.media.TopEmbedEvent("topembedmanager_event", evt));
                            var event = new CustomEvent('topembedmanager_event',{"detail":evt});
                            document.dispatchEvent(event);
    
                            _currentEmbed = pIndexEmbed; //--player en reproduccion
                            for(var i in _that.elemsMgr){
                                if(i != pIndexEmbed){
                                    if(typeof _that.elemsMgr[i].embed == 'object' && _that.elemsMgr[i].embed.isInitialized()){
                                        if(typeof _that.elemsMgr[i].embed.nextPanel == 'object'){
                                            if(_that.elemsMgr[i].embed.nextPanel.isShowPanel())
                                                _that.elemsMgr[i].embed.nextPanel.killPanel();
                                            }
                                        if(_that.elemsMgr[i].embed.getMediaPlayer().getCurrentPosition() != emic.top.TopPlayer.POSITION_PREVIEW){
                                            if(_that.customActionOnPlay!=null){
                                                _that.customActionOnPlay.apply(_that,[i, pIndexEmbed, evt.data.status]);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    })(indexConf);
    
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_INSTREAM_START, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_INSTREAM_END, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_START, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_PAUSE, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_RESUME, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VOLUME_CHANGE, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_ERROR, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_SKIP, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_AD_VIDEO_END, _onAdHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getAdModule().addEventListener(emic.top.event.AdEvent.ON_NO_AD, _onAdHandler, this);
    
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_INIT_COMPLETE, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_READY, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_RESET_COMPLETE, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_ERROR, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_TAG, _onMediaHandler, this);
                    _that.elemsMgr[indexConf].embed.getMediaPlayer().getMediaModule().addEventListener(emic.top.event.MediaEvent.ON_METADATA, _onMediaHandler, this);
                }
    
                if(this.elemsMgr[indexConf].embed != ''){
                    this.elemsMgr[indexConf].embed;
                    if(this.elemsMgr[indexConf].embed.isInitialized() === true){
                        //onInit();
                        this.elemsMgr[indexConf].embed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,onInit, this);
                    } else {
                        this.elemsMgr[indexConf].embed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,onInit, this);
                        this.elemsMgr[indexConf].embed.init(this.elemsMgr[indexConf].confs);
                    }
                } else {
                    this.elemsMgr[indexConf].embed = new psd.media.TopEmbed(this.elemsMgr[indexConf].confs, true);
                    this.elemsMgr[indexConf].embed.addEventListener(psd.media.TopEmbedEvent.EVENT_INI,onInit, this);
                }
            };
    
            //reproduce un TopEmbed indicado por el parÃ¡metro index, referente al array de embeds que hemos guardado
            //en caso de no pasar Ã­ndice se reproduce todo, lo cual es absurdo pero la posibilidad existe
            this.play = function(index){
                var _ind = _currentEmbed;
                if (typeof(index) != "undefined")
                    _ind = index;
                this.setPlayPauseMute(this.elemsMgr[_ind].embed, 'play');
            };
    
            //pausa el TopEmbed con Ã­ndice index
            //en caso de querer el comportamiento contrario, es decir, que la funciÃ³n aplique sobre todos los TopEmbed menos el del parÃ¡metro index se debe indicar que others=true
            this.pause = function(index,others){
                if (typeof(index) == "undefined") {
                    this.setPlayPauseMute(this.elemsMgr[_currentEmbed].embed, 'pause');
                } else {
                    if (typeof(others) == "undefined") {
                        for (var i in this.elemsMgr) {
                            if ((i == index)) {
                                this.setPlayPauseMute(this.elemsMgr[i].embed, 'pause');
                            }
                        }
                    } else if (others == true) {
                        for (var i in this.elemsMgr) {
                            if (i != index) {
                                this.setPlayPauseMute(this.elemsMgr[i].embed, 'pause');
                            }
                        }
                    }
                }
            };
    
            //muta el TopEmbed con Ã­ndice index
            //en caso de querer el comportamiento contrario, es decir, que la funciÃ³n aplique sobre todos los TopEmbed menos el del parÃ¡metro index se debe indicar que others=true
            this.mute = function(index,others){
                if (typeof(index) == "undefined") {
                    this.setPlayPauseMute(this.elemsMgr[_currentEmbed].embed, 'mute');
                } else {
                    if (typeof(others) == "undefined") {
                        for (var i in this.elemsMgr) {
                            if ((i == index)) {
                                this.setPlayPauseMute(this.elemsMgr[i].embed, 'mute');
                            }
                        }
                    } else if (others == true) {
                        for (var i in this.elemsMgr) {
                            if (i != index) {
                                this.setPlayPauseMute(this.elemsMgr[i].embed, 'mute');
                            }
                        }
                    }
                }
            }
    
            this.setPlayPauseMute = function(pEmbed, pAccion){
                if(pEmbed != ''){
                    if(pEmbed.isInitialized()){
                        switch (pAccion) {
                            case 'play':
                                pEmbed.getMediaPlayer().getMediaModule().play();
                                break;
                            case 'pause':
                                pEmbed.getMediaPlayer().pause();
                                break;
                            case 'mute':
                                pEmbed.getMediaPlayer().getMediaModule().mute();
                                break;
                        }
                    }
                }
            }
    
            //resetea un Topembed indicado por index
            this.reset = function(pIndexEmbed){
                this.elemsMgr[pIndexEmbed].embed.getMediaPlayer().reboot();
            }
    
            document.addEventListener('showInfo2', function(){_that.info2()});
        }
    
        namespace.TopEmbedManagerGeneral = TopEmbedManagerGeneral;
    
    }(psd.media));(function(namespace) {
        // Inheritance class
        TopPlaylist_BaseController.prototype = new psd.framework.EventDispatcher();
    
        function TopPlaylist_BaseController(iniSettings,index,embedplaylist)
        {
            // Super
            psd.framework.EventDispatcher.call(this);
    
            /**
             * className psd.media.TopPlaylist_BaseController
             */
            this.className = "psd.media.TopPlaylist_BaseController";
    
            REPEAT_ONE = "1";
            REPEAT_ALL = "2";
    
            //estilo por defecto de contenedor de items
            this.tipo = "";
    
            this.index = index;
            this.embedplaylist = embedplaylist;
    
            this.currentIdRef = "";
            this.currentStatus = "";
            this.autoPlayPlayList = true;
    
            var that = this;
            var mediaPlayer;
    
            ERROR_SERVICIO_PLAYLIST = "Error_servicio_playlist";
    
    
            var _iniSettings = {};
            //var _iniSettings = iniSettings;//-- jacob estaba comentado ,falla cuando se invoca directamente el Base_controller desde la pagina
    
            var _dataPage, _arrayData, _jsonParser, _dataVideoMediator;
            var _dev = false;
    
            var _actualGenericIndex = 0; //Ãndice actual que se estÃ¡ escuchando, segÃºn el servicio de datos
    
            var _current = 0; //Ãndice actual que se estÃ¡ escuchando, segÃºn nuestro modelo de datos
    
            var _actualPage = 0;
    
            var _playingPlaylist = false;
            var skinPlayer;
    
            var _nextPanel;
            var _primerVideoPlayList = true; /*Controlamos si es la primera vez que se reproduce en la playlist*/
    
            this.destroyBasePlayList = function(){
                if(typeof this.playlistContainer == 'object'){
                    this.playlistContainer.innerHTML = '';
                    this.playlistContainer = false;
                }
    
                mediaPlayer = _iniSettings.player.getMediaPlayer().getMediaModule();
    
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_READY, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, onMediaEndHandler,this);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_CUE, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_METADATA, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_ERROR, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_PROGRESS, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_SEEK_START, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, onMediaHandler);
                mediaPlayer.removeEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, onMediaHandler);
    
                skinPlayer = _iniSettings.player.getMediaPlayer().getUIModule();
                skinPlayer.removeEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, onSkinHandler, this);
                skinPlayer.removeEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, onSkinHandler, this);
            }
    
            this.init = function(data)
            {
                //TODOjc1402
                mm_playlist_no_reset = true;
                //onSetPlayerEvents.apply(this);
                this.setPlayerEventos();
                //dmena XXX
                //loadMediator.apply(this);
                //dmena NNN
                this.setDataPlaylist(data);
                //TODOjc1402
                this.currentIdRef = _iniSettings.player.getSettings().id_media;
                if(typeof _iniSettings.player.getSettings().topPlayer.media.autoplay == 'boolean'){
                    this.autoPlayPlayList = _iniSettings.player.getSettings().topPlayer.media.autoplay;
                }
                this.currentStatus = 'pause';
    
                /*Panel NextPanel*/
    
    
                    if (_iniSettings.nextpanel.active) {
    
                        /*Pasamos la configuracion inicial al next panel*/
    
                        var playerConfig=_iniSettings.player.getSettings(),
                            timer = _iniSettings.nextpanel.time,
                            skin = _iniSettings.nextpanel.skin,
                            skinContainer = playerConfig.id_container + '_base',
                            urlBase = playerConfig.topPlayer.generic.urlBase,
                            IdMedia = playerConfig.id_media;
    
                        _nextPanel = new psd.media.NextPanel( timer, skin, skinContainer, urlBase, IdMedia);
                        _iniSettings.player.nextPanel = _nextPanel;
    
    
                    }
    
    
            };
    
            this.setPlayerEventos = function(){
                onSetPlayerEvents.apply(this);
            }
    
            function onSetPlayerEvents()
            {
                //Recogemos eventos
                mediaPlayer = _iniSettings.player.getMediaPlayer().getMediaModule();
    
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_READY, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_BEGIN, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_MEDIA_END, onMediaEndHandler,this);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_CUE, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_METADATA, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_ERROR, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_STATUS_CHANGE, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_VOLUME_CHANGE, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_REQUEST, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SWITCH_COMPLETE, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_PROGRESS, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SEEK_COMPLETE, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_SEEK_START, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_EMPTY, onMediaHandler);
                mediaPlayer.addEventListener(emic.top.event.MediaEvent.ON_BUFFER_FULL, onMediaHandler);
    
                skinPlayer = _iniSettings.player.getMediaPlayer().getUIModule();
                skinPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_NEXT, onSkinHandler, this);
                skinPlayer.addEventListener(emic.top.event.UIEvent.ON_ORDER_PREV, onSkinHandler, this);
            };
    
    
            /*En caso de que autonext sea true o false testeamos el nextpanel*/
            var _nextCheck = function () {
                /*Mostramos el panel*/
    
                if (_iniSettings.nextpanel.active) {
    
                    /*Ponemos los datos del player siguiente*/
    
                    var assets, url_thumbnail, title;
    
                    if (_arrayData[_actualPage].length == 0 || _current == (_arrayData[_actualPage].length) - 1) {
                        assets = _arrayData[_actualPage][0];
    
                    } else {
                        assets = _arrayData[_actualPage][_current + 1];
    
                    }
    
                    /*recuperamos la URl y titulo para el panel*/
                    url_thumbnail = assets.url_thumbnail;
                    title = assets.name;
    
                    _nextPanel.showPanel(url_thumbnail, title, function () {
                        that.nextOnclick();                //-- nextPlayer (organico)
                    }, function () {
                        that.nextAuto();                   //-- nextPlayer (Secuencial)
                    }, function () {
                        that.resetMedia(_current, false);  //-- Repeat (organico)
                    });
    
    
                } else {
                    if((_current + 1) == _arrayData[_actualPage].length && _iniSettings.repeat != REPEAT_ALL){
                        //no continua la reproducciÃ³n de la playList
                    } else {
                        if(_iniSettings.autoNext == true)
                            that.next();
                    }
                }
    
    
            } ;
    
            function onMediaEndHandler(evt)
            {
                if(this.embedplaylist._selectedIndex==undefined)
                    this.embedplaylist._selectedIndex = 0;
    
                if(this.embedplaylist._selectedIndex!=this.index){
                    return;
                }
    
                if (_playingPlaylist) {
    
                    /*Si la playlist se compone de un solo elemento no pasamos al next*/
                    if (_arrayData[_actualPage].length > 1) {
    
                        if (_iniSettings.autoNext == true) {
                            if (_iniSettings.repeat == REPEAT_ONE) {
                                _resetMedia.apply(this);
                            }
                            else {
                                _nextCheck();
                            }
                        } else {
                            _nextCheck();
                        }
                    }
                }
    
            };
    
            function onMediaHandler(evt)
            {
                if (evt.type == emic.top.event.MediaEvent.ON_MEDIA_BEGIN)
                {
                    that.currentIdRef = evt.id;
                    _playingPlaylist = true;
                }
                if(evt.type == emic.top.event.MediaEvent.ON_STATUS_CHANGE){
                    that.currentStatus = evt.data.status;
                    //setSelectedState(that.currentStatus);
                    setSelectedState.apply(that);
                }
            };
    
            function onSkinHandler(evt)
            {
                switch (evt.type)
                {
                    case emic.top.event.UIEvent.ON_ORDER_NEXT:
                        this.next();
                    break;
    
                    case emic.top.event.UIEvent.ON_ORDER_PREV:
                        this.previous();
                    break;
                }
            };
    
            var loadMediator = function()
            {
                _jsonParser = new psd.framework.parser.JSONParser();
                _dataVideoMediator = new psd.framework.Mediator();
                _dataVideoMediator.corsIE(true);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_COMPLETE, onDataComplete, this);
                _dataVideoMediator.addEventListener(psd.framework.MediatorEvent.MEDIATE_ERROR, onDataError, this);
            };
    
            var loadService = function()
            {
                var obj = {};
                obj.page = _actualPage;
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_REQUEST, obj));
    
                //if(_current==0){
                    //skinPlayer.externalOrder(emic.top.ui.ORDER_ENABLE_BUTTONS_PREV_OFF,_current); //---jacob Button_Previo off inicialmente
                    //skinPlayer.externalOrder(emic.top.ui.ORDER_ENABLE_BUTTONS_NEXT_ON,_current)
                //}
                //_dataVideoMediator.mediate(_iniSettings.URL_list, _jsonParser, psd.framework.Mediator.RESPONSE_JSON);//--jacob nuevo parseo
            };
    
            //EVENTOS MEDIATOR
            var onDataComplete = function (evt)
            {
                var _playerData = evt.result.parserResult;
    
                if(_playerData.code == psd.framework.ParserResult.PARSER_SUCCESS_CODE) {
                    _dataPage = _playerData.result;
    
                        _arrayData = [_dataPage];
    
                    var obj = {};
                    obj.data = _arrayData;
                    obj.page = _actualPage + 1;
                    this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE,obj));
    
                }else {
                    var obj = {};
                    obj.errorType = ERROR_SERVICIO_PLAYLIST;
                    this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.EVENT_ERROR, obj));
                }
            };
    
            this.setDataPlaylist = function(data){
                _dataPage = data;
    
                _arrayData = [_dataPage];
    
                var obj = {};
                obj.data = _arrayData;
                obj.page = _actualPage + 1;
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.DATA_COMPLETE,obj));
            }
    
            var onDataError = function (evt)
            {
                var obj = {};
                obj.errorType = ERROR_SERVICIO_PLAYLIST;
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.EVENT_ERROR, obj));
            };
            //EVENTOS MEDIATOR
    
            this.esElMismo = function(current){
                if(that.currentIdRef==_arrayData[_actualPage][current].idref){
                    return true;
                }
                else{
                    return false;
                }
            }
    
            var setSelectedState = function(){
                this.setSelectedStateThis(this.currentStatus);
            }
    
            var _resetMedia = function(fromButton)
            {
    
                if (fromButton && that.currentIdRef == _arrayData[_actualPage][_current].idref) {
                    //TODOjc1402
                    var mediaPlayer = _iniSettings.player.getMediaPlayer().getMediaModule();
                    if(mediaPlayer.isPlaying()){
                        that.currentStatus = 'play';
                    } else {
                        that.currentStatus = 'pause';
                    }
                    switch(that.currentStatus){
                        case "play":
                            mediaPlayer.pause();
                            break;
                        case "pause":
                            mediaPlayer.play();
                            break;
                    }
                }else{
                    var obj = {};
                    obj.actualIndex = _current;
                    obj.actualIdref = _arrayData[_actualPage][_current].idref;
    
                    //TODOjc1402
                    that.currentIdRef = _arrayData[_actualPage][_current].idref;
                    mm_playlist_no_reset = true;
    
                    this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.MEDIA_CHANGE,obj));
    
                    var _clickPlayList= false;//es una variable de tipo bool que serÃ¡ "TRUE" si alguiÃ©n clickeÃ³ en un elemento
                    // de la lista de la Play List y quedarÃ¡ en "FALSE" si no lo hizo. A esta variable la vamos a pasar al TopPlayer
                    // cuando termine un video "MEDIA_END" se setearÃ¡ de nuevo a "FALSE".
    
                    var _playerData= _iniSettings.player.getMediaPlayer().getData();
    
    
                   /*Si la accion viene de un clickButton de verdad lo seteamos*/
                    if (fromButton) {//entra aquÃ­ cuando clickea en un elemento de la Play List
                        _clickPlayList = true;
                        _autoValue = true;
                    } else {
                        _clickPlayList = false;
                        _autoValue = true;
                    }
    
                    /*Si el panel esta activo y es repeat*/
                    if (_iniSettings.nextpanel.active) {
                        if (_nextPanel.eventAction() == 'repeatMedia') {
                            _clickPlayList = true;
                        }
                    }
    
                    /*Controlamos que AUTOPLAY solo se envie en el primer elemento de reproducion */
                    if (_primerVideoPlayList) {
                        _primerVideoPlayList = false;
                    }
    
                    /*Reseteamos el contador para evitar conflictos en caso de que la lista sea visible*/
    
    
                    if (_iniSettings.nextpanel.active) {
    
                        /*si el panel es activo lo cerramos*/
                        if (_nextPanel.isShowPanel()) {
                            _nextPanel.killPanel();
                        }
    
    
                        /*En caso de ser el primer elemento de la lista evitamos lanzar Reload MMN-7*/
                        if (_nextPanel.eventAction() != 'repeatMedia') {
                            _playerData.mediaData.reload = false;
                        }
    
                    }
    
    
                    var tmpParams = {
                        "dev": _iniSettings.dev,
                        "id_cuenta": _iniSettings.id_cuenta,
                        "id_media": _arrayData[_actualPage][_current].idref,
                        "media_type": _arrayData[_actualPage].type,
                        "topPlayer": {
    
                            ad: {
                                "tags_noticia": _playerData.adData.tags_noticia
                            },
    
                            media: {
                                "autoplay": _autoValue,
                                "autoNext": _iniSettings.autoNext,
                                "clickPlayList": _clickPlayList,
                                "primerVideoPlayList":_primerVideoPlayList,
                                "premuted": _playerData.mediaData.premuted,
    
                                "un_creacion": _playerData.mediaData.un_creacion,
                                "portal_creacion": _playerData.mediaData.portal_creacion,
                                "seccion_creacion": _playerData.mediaData.seccion_creacion,
    
                                "reload": _playerData.mediaData.reload
    
                            }
                        }
                    };
                    if(typeof this.embedplaylist.ancho == 'number' && typeof this.embedplaylist.alto == 'number'){
                        tmpParams.topPlayer.media.ancho = this.embedplaylist.ancho;
                        tmpParams.topPlayer.media.alto = this.embedplaylist.alto;
                    }
    
                    //lanzamos el evento, para que puedan recargar la pÃ¡gina.
                    var _tmpEvent = document.createEvent("CustomEvent");
                    _tmpEvent.initCustomEvent('psdMediaChange', false, false, {
                        'id_media': tmpParams.id_media
                    });
                    document.dispatchEvent(_tmpEvent);
    
                    _iniSettings.player.reset(tmpParams);
    
                }
            };
    
            this.next = function()
            {
                /*Secuencial*/
                this.nextAuto();
            };
    
            this.setSelected = function(){};
    
            var endPlaylist = function()
            {
                this.dispatchEvent(new psd.media.PlaylistEvent(psd.media.PlaylistEvent.PLAYLIST_COMPLETE));
    
                if ((typeof(_iniSettings.repeat)!="undefined") && (_iniSettings.repeat == REPEAT_ALL) )
                {
                        _resetMedia.apply(this);
                }
            };
    
            this.previous = function () {
                this.prevOnclick();
            };
    
            this.config = function(obj)
            {
                if (obj != undefined)
                {
                    if (typeof (obj.URL_list) != "undefined"){_iniSettings.URL_list = obj.URL_list;}
                    if (typeof (obj.autoNext) != "undefined"){_iniSettings.autoNext = obj.autoNext;}
                    if (typeof (obj.pagination) != "undefined"){_iniSettings.pagination = obj.pagination;}
                    if (typeof (obj.repeat) != "undefined"){_iniSettings.repeat = obj.repeat;}
                    if (typeof (obj.id_cuenta) != "undefined"){_iniSettings.id_cuenta = obj.id_cuenta;}
                    if (typeof (obj.player) != "undefined"){_iniSettings.player = obj.player;}
                    if (typeof (obj.secure) != "undefined"){_iniSettings.secure = obj.secure;}
                    if (typeof (obj.dev) != "undefined"){_iniSettings.dev = obj.dev;}
                    if(typeof (obj.nextpanel) != "undefined"){
                        _iniSettings.nextpanel = obj.nextpanel;
                    } else {
                        _iniSettings.nextpanel = {'active':false};
                    }
                }
            };
    
            this.data = function()
            {
                return _arrayData;
            };
    
            this.actualIndex = function()
            {
                return _actualGenericIndex;
            };
    
            this.resetMedia = function(item,frombutton)
            {
                _current = item;
    
                _resetMedia.apply(this,[frombutton]);
            };
    
            this.load = function(iniSettings)
            {
                this.config(iniSettings);
                resetValues();
                //skinPlayer.externalOrder(emic.top.ui.ORDER_ENABLE_BUTTONS_ON,_current);//--jacob fallo al llamar a external order
    
                loadService.apply(this);
    
            };
    
            this.setType = function(tipo){
                this.tipo = tipo;
            }
    
            var resetValues = function()
            {
    
            };
    
            //FUNCIONES SOBREESCRITAS EN LAS VISTAS
            this.paintPlaylist = function(){};
            this.config(iniSettings);
        }
    
        namespace.TopPlaylist_BaseController = TopPlaylist_BaseController;
    
    }(psd.media));
    (function(namespace) {
        // Inheritance class
        TopPlaylist_lista.prototype = new psd.media.TopPlaylist_BaseController();
    
        function TopPlaylist_lista(iniSettings,index,embedplaylist)
        {
    
            // Super
            psd.media.TopPlaylist_BaseController.call(this, iniSettings)
    
            /**
             * className psd.media.TopPlaylist_lista
             */
            this.className = "psd.media.TopPlaylist_lista";
    
            this.index = index;
            this.embedplaylist = embedplaylist;
            this.playlistContainer = false;
    
            var _iniSettings = iniSettings;
            var data, _arrayData, elemento;
    
            var _that = this;
    
            var _current = 0;
    
            if(typeof (iniSettings.index)!="undefined")
                _current = iniSettings.index;
    
            var _total;
            var _elementos = [];
    
            var _lastid = null;
    
            var _lastidrefs = "";
    
            //---modificar literales del footer
    
            var nElementos = function (elemento) {
    
                if (elemento >= 1 || elemento == 0) {
    
                    return elemento + " elementos";
    
                } else {
    
                    return elemento + " elemento";
                }
    
            }
    
            this.setSelectedStateThis = function(status){
                if(_current < _elementos.length){
                    switch (status) {
                        case "play":
                        _elementos[_current].setIconPause();
                        break;
                        case "pause":
                        _elementos[_current].setIconPlay();
                        break;
                    }
                }
            }
    
            this.secondsAsTimeCode = function(time, format)
            {
                var hours = Math.floor(time/3600),
                    minutes = Math.floor((time - (hours*3600))/60),
                    seconds = Math.floor(time - (hours*3600) - (minutes*60)),
                    timecode = "";
    
                if(hours<10) {hours = "0" + hours;}
                if(minutes<10) {minutes = "0" + minutes;}
                if(seconds<10) {seconds = "0" + seconds;}
    
                if(format==null) {timecode = hours + ":" + minutes + ":" + seconds;}
                else
                {
                    if(hours<1)
                        timecode = format.replace('hh:', '');
                    else
                        timecode = format.replace('hh', hours);
    
                    timecode = timecode.replace('mm', minutes);
                    timecode = timecode.replace('ss', seconds);
                }
    
                return timecode;
            };
    
            //-- Pinta el listado
    
            this.paintPlaylist = function() {
                var _data = _iniSettings.player.getSettings().topPlayer.generic;
                var script = document.createElement("script");
                var base = _data.urlBase ? _data.urlBase : "";
                script.src = base + "/psdmedia/media/simple/skinsPlaylist/";
                switch (_iniSettings.playListSkin) {
                    case 'oneplayer':
                        if (typeof(tplib) != "undefined") 
                            script.src+= "oneplayer.lib.js";
                        else
                            script.src+= "oneplayer.min.js";
                        break;
                    case 'eppodcast':
                        if (typeof(tplib) != "undefined")
                            script.src+= "eppodcast.lib.js";
                        else
                            script.src+= "eppodcast.min.js";
                        break;
                    case 'vacia':
                        if (typeof(tplib) != "undefined") 
                            script.src+= "vacia.lib.js";
                        else
                            script.src+= "vacia.min.js";
                        break;
                    case 'generica':
                        if(!this.tipo) this.tipo = 'lista';
                    default:
                        if (typeof(tplib) != "undefined") 
                            script.src+= "generica.lib.js";
                        else 
                            script.src+= "generica.min.js";
                        _iniSettings.playListSkin = 'generica';
                    break;
                }
                
                script.type = 'text/javascript';
                script.onload = (function(that) {
                    return function(){
                        that.onPlayListTemplateLoad();
                    }
                })(this);
                document.getElementsByTagName('head')[0].appendChild(script);
            }
    
            this.onPlayListTemplateLoad = function(){
                _arrayData = this.data();
                _arrayData = _arrayData[0];
                _total = _arrayData.length;
    
                var _currentidrefs = "";
    
                for (var jj=0; jj < _arrayData.length; jj++)
                {
                    if (_arrayData[jj] != undefined){
                        _currentidrefs += _arrayData[jj].idref;
                    }
                }
    
                if(_currentidrefs==_lastidrefs){
                    return;
                }
    
                _lastidrefs = _currentidrefs;
    
                var tpl = eval("new psd.skins."+_iniSettings.playListSkin+"(this)");
                tpl.setPlayListContainer(_iniSettings.id_container_playlist);
                this.playlistContainer = tpl.getPlayListContainer();
    
                if (this.playlistContainer){
                    container = tpl.getItemsContainer();
                    if(this.tipo){
                        if(!container.classList.contains(this.tipo)){
                            container.className+= " " + this.tipo;
                        }
                    }
                    _elementos = [];
                    for (var jj=0; jj < _arrayData.length; jj++) {
                        if (_arrayData[jj] != undefined) {
                            elemento=_arrayData[jj];
                            item_container = tpl.addItem(elemento);
                            item_container.onclick = (function(index){
                                return function(){
                                        //TODOjc01
                                        if(!_that.esElMismo(index)){
                                            if(typeof(_that) == 'object' && typeof(_that.embedplaylist) == 'object'
                                                && typeof(_that.embedplaylist.getMediaTopEmbed) == 'function'
                                                && typeof(_that.embedplaylist.getMediaTopEmbed().getMediaPlayer) == 'function'
                                                && typeof(_that.embedplaylist.getMediaTopEmbed().getMediaPlayer().getMediaModule) == 'function'
                                                && typeof(_that.embedplaylist.getMediaTopEmbed().getMediaPlayer().getMediaModule().stop) == 'function'){
                                                _that.embedplaylist.getMediaTopEmbed().getMediaPlayer().getMediaModule().stop();
                                        }
                                    }
                                    /*Organico*/
                                    _that.loadMedia(index,true);
                                    _current = index;
                                    _that.embedplaylist._selectedIndex = _that.index;
                                }
                            })(jj);
    
                            item_container.tag = _arrayData[jj].id;
                            _elementos.push(item_container);
                            if(_lastid!=null){
                                if(_lastid==_arrayData[jj].id){
                                    this.setSelected(jj);
                                }
                            }
                        }
                        else {}
                    }
                tpl.doPostCreateTpl();
                if(typeof _iniSettings.player.getSettings().topPlayer.ui == 'object'){
                    if(_iniSettings.player.getSettings().topPlayer.ui.skinData.soy_embed === true){
                        var tmp = document.getElementsByTagName('body');
                        tmp[0].classList.add('widget');
                    }
                }
            };
    
            /*Organico*/
            this.prevOnclick = function(){
                _current--;
                if(_current<0)
                    _current = _total-1;
                this.loadMedia(_current,true);
            }
            this.nextOnclick = function(){
                _current++;
                if(_current>(_total-1))
                    _current = 0;
                this.loadMedia(_current,true);
            };
    
            /*Invocamos esta funcion cuando la transicion de la playlist es automatica */
            /*Secuencial*/
                this.nextAuto = function () {
                    _current++;
                    if (_current > (_total - 1))
                        _current = 0;
    
                    this.loadMedia(_current);
    
                };
    
    
            this.setSelected = function(index){
                if(index >= _elementos.length) {
                    _current = index;
                } else {
                    for(j=0;j<_elementos.length;j++){
                        _elementos[j].noSelected();
                    }
                    if(index<_elementos.length){
                        _elementos[index].setSelected();
                        _current = index;
                        _lastid = _elementos[index].tag;
                    }
                }
            };
    
            this.loadMedia = function(index,clickButton){
                    //se manda fromButton=true porque al hacer click sobre un elemento queremos que se reproduzca siempre
                /*Detectamos si es un button*/
                if (clickButton) {
                    this.resetMedia(index, true);
                } else {
                    this.resetMedia(index, false);
                }
    
                this.setSelected(index);
            }
    
                this.setSelected(_current);// --Seleccionar el 1ÂºElemento
            };
    
        }
    
        namespace.TopPlaylist_lista = TopPlaylist_lista;
    
    }(psd.media));
    (function(namespace) {
        // Inheritance class
        TopWindowError.prototype = new psd.framework.EventDispatcher();
    
        function TopWindowError(iniSettings)
        {
            // Super
            psd.framework.EventDispatcher.call(this);
    
            /**
             * className psd.media.TopWindowError
             */
            this.className = "psd.media.TopWindowError";
    
            var URL_BASE_SSL = "https://topsslpl-a.akamaihd.net";
            var URL_LOGO_TOP = "/psdmedia/resources/img/top50.png";
            var URL_BACKGROUND = "/psdmedia/resources/img/gradient.png";
            var DEFAULT_URL_BASE = "http://player-top.prisasd.com";
    
    
            var _iniSettings = iniSettings;
    
            this.paintMessage = function (errorCode,settings)
            {
                var infopanel = new psd.media.InfoPanel();
    
                var lang = new psd.media.Lang();
    
    
                if (typeof (LANG) != "undefined")
                    window.mm_lang = LANG;
                if (typeof (window.mm_lang) == "undefined") {
    
                    /* window.mm_lang = "es";*/
    
                    var text, langtext;
    
                    /*En caso de no tengamos variable que nos detecte el idioma detectamos el idioma y vemos compatibilidad*/
                    langtext = (navigator.language || navigator.userLanguage).substr(0, 2);
    
                    if (lang.compatibility(langtext)) {
                        window.mm_lang = langtext;
    
                    } else {
    
                        window.mm_lang = "es";
                    }
    
    
                }
    
    
               //var _message = "El contenido no se encuentra disponible.";    contenido_no_disponible
    
                /**En caso de recibir el skin lo seteamos**/
                if (typeof (settings) != 'undefined') {
                    if (typeof (settings.topPlayer.ui.skinData.udn)) {
                        _iniSettings.skin = settings.topPlayer.ui.skinData.udn;
                        console.log(settings.topPlayer.ui.skinData.udn);
    
                    }
    
                }
    
    
                /**En caso de ser AS modificamos la naturaleza del mensaje**/
                if (_iniSettings.skin == "diario_as") {
    
                    text = 'contenido_no_disponible_as';
    
                    iniSettings.base = '//as.player-top.prisasd.com';
    
                } else {
    
                    text = 'contenido_no_disponible';
                }
    
    
    
                var _message = lang.translate(window.mm_lang, text);
    
                    infopanel.paint(_iniSettings.id_container,_message,true,_iniSettings.base,_iniSettings.imgCover,_iniSettings.skin);
    
                    return;
            }
    
        }
    
        namespace.TopWindowError = TopWindowError;
    
    }(psd.media));}