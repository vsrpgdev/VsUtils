// #region RPG Maker MZ --------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc Version 1.2.0 VsUtils, helper methods and other utilities
 * @author VsRpgDev
 * @url https://github.com/vsrpgdev/VsUtils
 * @help 
*/
//#endregion --------------------------------------------------------------------------

//@ts-ignore ---------------- Header line for all VsRpgDev Plugins, create the global VsRpgDev object -------------
"undefined"==typeof Vs&&(Vs={get author(){return"VsRpgDev"}, get isVsRpgDev(){return"VsRpgDev"==Vs.author}, plugins:{}, c(m,...p){ p.filter(x => { const v=x.split("."); const found = Object.entries(Vs.plugins).some(p => p[1].PluginName == v[0] && (v.length < 2 || v[1]==p[1].Version[0])&& (v.length < 3 || v[2]<=p[1].Version[1]));    return !found;   }).forEach(e => {throw new Error(`${m} Error: plugin '${e}' not found or wrong version`)}); } });

(()=>{
  
  const pluginName = "VsUtils";

//#region global Classes --------------------------------------------------------------------------
  let _vsUtils = class{
    
    static get PluginName () {return pluginName}
    
    /**  @type {[number,number,number]} */
    static get Version () {return [1,2, 0]}

    /**
     * 
     * @param {string} json string
     * @returns {any} returns object
     */
    static jsonParseRecursive(json)
    {
      try
      {
        let data=JSON.parse(json);
  
        if (Array.isArray(data))
          return data.map(v => Vs.plugins.VsUtils.jsonParseRecursive(v));
        else if (typeof(data) == "object")
          return Object.entries(data).map(v => [v[0], Vs.plugins.VsUtils.jsonParseRecursive(v[1])]).reduce((p,c,i,a) => { p[c[0]]=c[1]; return p},{});
        if (typeof(data) =="string")
          data = Vs.Utils.convertEscapeCharacters(data);
        return data;
      }
      catch{
        let result = Vs.Utils.convertEscapeCharacters(json);
        try
        {
          return JSON.parse(result);
        }
        catch
        {
          return result
        }
      }
    }

    /**
     * 
     * @param {any} instance 
     * @param {any} obj 
     */
    static assignObjectEntries(instance, obj)
    {
      if (typeof(obj) != "object" )
        return;
      if (typeof(instance) != "object" )
        return;

      Object.entries(obj).forEach((key)=> {
        if(instance[key[0]] && typeof(instance[key[0]]) == "object")
        {
          this.assignObjectEntries(instance[key[0]], key[1]);
        }
        else
        {
          instance[key[0]] = key[1];
        }
      });

      return;
    }

    static createInstanceFromJson(classType, json)
    {
      let instance = new classType();
      let obj = this.jsonParseRecursive(json);
      
      if (typeof(obj) == "object")
        this.assignObjectEntries(instance,obj);
      else
         instance = obj;

      return instance;
    }

    static pluginParameterToObject(classType, param, nullable)
    {
      if (nullable == undefined) nullable = false;

      let instance = classType ? new classType() : {};
      
      if (param == null)
      {
        if (nullable)
          return null;
        else
          param = {};
      }

      return Object.entries(param).reduce((p,c,i,a) => {
        if (p[c[0]] != undefined && typeof(p[c[0]]) == "object")
          this.assignObjectEntries(p[c[0]], this.jsonParseRecursive(c[1]));
        else
          p[c[0]] = this.jsonParseRecursive(c[1]);
        return p;
      }, instance);
    }

    
    /**
     * Creates a proxy for a single instance, ensuring it is of the specified class type.
     *
     * @param classType - The class type used for the instance.
     * @param obj - The object in which the instance is stored.
     * @param key - The key under which the instance is stored.
     * @param {boolean|undefined} [nullable] , is the variable nullable
     */
    static instanceProxy(classType,obj, key,nullable)
    {
      if (nullable == undefined) nullable = false;
      let privateData = null;
      
      let getter = () => {return privateData;};
      let setter = (value) => {
        if (!(value instanceof classType)) {

          if (nullable && value == null)
          {
            privateData = value;
            return;
          }
          const newInstance = new classType();
          _vsUtils.assignObjectEntries(newInstance, value);
          privateData = newInstance;
        } else {
          privateData = value;
        }
      }
      
      Object.defineProperty(obj, key, {
        get: getter,
        set: setter,
        configurable: false,
        enumerable: true
      });
    }

    /**
     * Creates a proxy for a single instance, ensuring it is of the specified class type.
     *
     * @param classType - The class type used for the instance.
     * @param obj - The object in which the instance is stored.
     * @param key - The key under which the instance is stored.
     * @param {boolean} [nullable] , is the variable nullable
     */
    static arrayInstanceProxy(classType,obj, key,nullable)
    {
      if (nullable == undefined) nullable = false;
      let privateData = [];
    
      let proxy = new Proxy(privateData,{
        get: (target, prop, receiver) => {
          return Reflect.get(target, prop, receiver);
        },
        set: (target, prop, value, receiver) => {
          if (!isNaN(Number(prop)))
          {
            if (nullable && value == null)
            {
              return Reflect.set(target, prop, null, receiver);
            }
            let newC = new classType();
            this.assignObjectEntries(newC,value);
            return Reflect.set(target, prop, newC, receiver);
          }
          return  Reflect.set(target, prop, value, receiver);
        },
      });
    
      Object.defineProperty(obj, key, {
        value: proxy,
        writable: false, 
        configurable: false, 
        enumerable: true
      });
    }

    
    static registerCommandTyped(pluginName,commandName, classType , func)
    {
      PluginManager.registerCommand(pluginName,commandName, (v)=> {
        func(Vs.Utils.pluginParameterToObject(classType,v));
      });
    }

  }

  // @ts-ignore
  PluginManager.registerCommandTyped =  _vsUtils.registerCommandTyped;
  window.VsUtils = _vsUtils;

// #endregion -------------------------------------------------------------------------------

//#region internal Classes,Methods and variables ---------------------------------------------------
  function degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  function radToDeg(radians) {
    return radians * (180 / Math.PI);
  }
//#endregion internal Classes,Methods and variables ---------------------------------------------------

//#region core script overrides --------------------------------------------------------------------------
// #endregion core script overrides --------------------------------------------------------------------------

//#region Vs namespace  --------------------------------------------------------------------------
    if (Vs.isVsRpgDev)
    {
      Vs.plugins.VsUtils = _vsUtils;
  
      Vs.Utils={...(Vs.Utils ?? {}),
        jsonParseRecursive: _vsUtils.jsonParseRecursive,
        assignObjectEntries: _vsUtils.assignObjectEntries,
        createInstanceFromJson: _vsUtils.createInstanceFromJson,
        pluginParameterToObject: _vsUtils.pluginParameterToObject,
        instanceProxy: _vsUtils.instanceProxy,
        arrayInstanceProxy: _vsUtils.arrayInstanceProxy
      };
      Vs.System={...(Vs.System ?? {}),
        registerCommandTyped: _vsUtils.registerCommandTyped
      };
      Vs.Math={...(Vs.Math ?? {}),
        degToRad: degToRad,
        radToDeg: radToDeg
      };
    }
    else
    {
      console.error("Vs is already used by another Plugin!!!");
    }
//#endregion Vs namespace  --------------------------------------------------------------------------
  
})();