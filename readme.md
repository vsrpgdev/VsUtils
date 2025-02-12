# RPG Maker MZ - VsUtils Plugin - Version: 1.6.0

1. [Dependencies](#1-dependencies)
1. [Installation](#2-installation)
    1. [Fast](#21-fast)
    1. [Manual](#22-manual)
1. [Configuration](#3-configuration)
1. [Usage](#4-usage)
    1. [Demo](#41-demo)
    1. [Methods](#42-methods)
        - [jsonParseRecursive](#jsonparserecursive)
        - [assignObjectEntries](#assignobjectentries)
        - [createInstanceFromJson](#createinstancefromjson)
        - [pluginParameterToObject](#pluginparametertoobject)
        - [instanceProxy](#instanceproxy)
        - [arrayInstanceProxy](#arrayinstanceproxy)
        - [dictionaryInstanceProxy](#dictionaryinstanceproxy)
        - [registerCommandTyped](#registercommandtyped)
        - [hasGetterAndSetter](#hasgetterandsetter)
        - [createProxyObj](#createproxyobj)
        - [RegisterAdditionalFile](#registeradditionalfile)
        
        - [spawnInterpreterWaiter](#spawninterpreterwaiter)  
    1. [Plugin Commands](#43-plugin-commands)
        - [preloadImage](#preloadimage)
        - [preloadImages](#preloadimages)

      
1. [How does the plugin work](#5-how-does-the-plugin-work)
1. [Changes to the core script](#6-changes-to-the-core-script)
1. [Troubleshooting](#7-troubleshooting)
1. [License](#8-license)

this plugin contains multiple utility methods used in my other plugins.
some of them are
- a method to parse json strings recursive (json object which contain other json objects)
- a way to register plugin commands in a typed way (define a class for your arguments and auto creates a instance)

# 1. Dependencies
- Plugin [vsrpgdev/VsConvertEscapeCharacters v1.2+](https://github.com/vsrpgdev/VsConvertEscapeCharacters)
# 2. Installation 

## 2.1. fast

1. create a new rpg maker project or choose an existing one.
2. copy everything from the [demo](./demo/) directory into your rpg maker project directory\
**make sure you dont already have an jsonconfig.json in your project**

## 2.2. manual

1. install and activate [VsConvertEscapeCharacters](https://github.com/vsrpgdev/VsConvertEscapeCharacters) from github
1. Copy [VsUtils.js](./js/plugins/VsUtils.js) into your plugin directory
2. Activate the Plugin in **RPG Maker**
3. *[Optional]* if you want to use vscode IntelliSense also copy [VsUtils.d.ts](./js/plugins/VsUtils.d.ts) and [Vs.d.ts](./js/plugins/Vs.d.ts) into your plugins directory\
  Additionally, if you don’t already have one, copy  [jsconfig.json](./js/jsconfig.json) into you **js** directory (**not the plugin directory**).\
  to fully use IntelliSense you also ned type files for the rpg maker core files. you can use your own or copy the [types](./js/types/) folder into your js directory.

# 3. Configuration
no configuration required
# 4. Usage
like all my plugins you get multiple entry points for the plugin.

```javascript
//through the window object
window.VsUtils

//global
VsUtils

//Vs.plugins namespace
Vs.plugins.VsUtils
```

## 4.1 demo
you can find a demo (without ressources and core script) [here (./demo)](./demo/)
## 4.2 methods

- ## jsonParseRecursive
  parses a json string containing recursive json elements into a json object

  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static jsonParseRecursive(json): any;
  ```
  ### Parameters:
  > ### json [string](https://www.w3schools.com/js/js_strings.asp)
  json string to parse

  > ### return any
  the parsed json object (string,number,object, etc)

  ### examples:
  ```javascript
  //global
  let jsonObj = VsUtils.jsonParseRecursive("{\"x\":1,\"x\":2}");

  //window
  jsonObj = window.VsUtils.jsonParseRecursive("{\"x\":1,\"x\":2}");

  //Vs namespace
  jsonObj = Vs.plugins.VsUtils.jsonParseRecursive("{\"x\":1,\"x\":2}");

  //Utils namespace
  jsonObj = Vs.Utils.jsonParseRecursive("{\"x\":1,\"x\":2}");
  ```
---

- ## assignObjectEntries
  assigns all entries of an object to the specified instance

  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static assignObjectEntries(instance: any, obj: any): void;
  ```
  ### Parameters:
  > ### instance any
  your class instance

  > ### obj any
  javascript object

  ### examples:
  ```javascript
  class TestPosition
  {
    _x=0
    _y=0

    get x(){return this._x}
    set x(value){ this._x = value}
  }

  class TestClass
  {
    position= new TestPosition()
  }

  let instance = new TestPosition();

  VsUtils.assignObjectEntries(instance, {position:{x:10,y:25}});
  window.VsUtils.assignObjectEntries(instance, {position:{x:10,y:25}});
  Vs.plugins.VsUtils.assignObjectEntries(instance, {position:{x:10,y:25}});
  Vs.Utils.assignObjectEntries(instance, {position:{x:10,y:25}});
  ```
---

- ## createInstanceFromJson
  creates a new instance of the type classType and fills it with all entreies from json object.
  only the main class gets created, if you have children which are also classes you have to create them in your constructor

  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static createInstanceFromJson<T>(classType: new () => T, json: string): T;
  ```
  ### Parameters:
  > ### classType T
  the class you whant to create an instance of

  > ### json string
  json string

  > ### return T:
  an instance of your class
  
  ### examples:
  ```javascript
  class TestPosition
  {
    _x=0
    _y=0

    get x(){return this._x}
    set x(value){ this._x = value}
  }

  class TestClass
  {
    position= new TestPosition()
  }

  let instance = new TestPosition();

  let newInstance = VsUtils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
  newInstance = window.VsUtils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
  newInstance = Vs.plugins.VsUtils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
  newInstance = Vs.Utils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
  ```
---


- ## pluginParameterToObject
  converts a plugin parameter to a javascript object
  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static pluginParameterToObject<T>(classType?: new () => T, param: any, nullable? :boolean) : T
  ```
  ### Parameters:
  > ### classType T
  the class you whant to create an instance of or null

  > ### param any
  plugin parameter

  > ### (optinal) nullable boolean
  is null or undefine allowed

  > ### return any:
  a javascript object created from the plugin parameter
  
  ### examples:
  ```javascript
  VsUtils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
  window.VsUtils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
  Vs.plugins.VsUtils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
  Vs.Utils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
  ```
---

- ## instanceProxy
  creates a proxy for a getter, setter member which ensures the type to be classType 
  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static instanceProxy<T>(classType: new () => T, obj: Record<string, any>, key: string): void;
  ```
  ### Parameters:
  > ### classType T
  the class you whant to create an instance of or null

  > ### obj any
  the object in which the getter setter should be created

  > ### key string:
  key of the new member

  ### examples:
  ```javascript
  class SubClass
  {
    constructor()
    {
      console.log("hello world");
    }
    name = "test"
  }
  class InstanceClass
  {
    constructor()
    {
      VsUtils.instanceProxy(SubClass,this,"sub");
      window.VsUtils.instanceProxy(SubClass,this,"sub2");
      Vs.plugins.VsUtils.instanceProxy(SubClass,this,"sub3");
      Vs.Utils.instanceProxy(SubClass,this,"sub4");
    }
    sub = null;
    sub2 = null;
    sub3 = null;
    sub34 = null;
  }
  ```
---

- ## arrayInstanceProxy
  creates a proxy for a getter, setter member which ensures the type to be classType 
  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static arrayInstanceProxy<T>(classType: { new (): T }, obj: Record<string, any>, key: string, nullable? :boolean): void;
  ```
  ### Parameters:
  > ### classType T
  the class you whant to create an instance of or null

  > ### obj any
  the object in which the getter setter should be created

  > ### key string:
  key of the new member

  ### examples:
  ```javascript
  class SubClass2
  {
    constructor()
    {
      console.log("hello world");
    }
    name = "test"
  }
  class InstanceClass2
  {
    constructor()
    {
      VsUtils.arrayInstanceProxy(SubClass,this,"sub");
      window.VsUtils.arrayInstanceProxy(SubClass,this,"sub2");
      Vs.plugins.VsUtils.arrayInstanceProxy(SubClass,this,"sub3");
      Vs.Utils.arrayInstanceProxy(SubClass,this,"sub4");
    }
    sub = [];
    sub2 = [];
    sub3 = [];
    sub34 = [];
  }
  ```
---

- ## dictionaryInstanceProxy
  creates a proxy for a getter, setter member which ensures the type to be classType 
  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static dictionaryInstanceProxy<T>(classType: { new (): T }, obj: Record<string, any>, key: string, nullable? :boolean): void;
  ```
  ### Parameters:
  > ### classType T
  the class you whant to create an instance of or null

  > ### obj any
  the object in which the getter setter should be created

  > ### key string:
  key of the new member

  ### examples:
  ```javascript
  class SubClass2
  {
    constructor()
    {
      console.log("hello world");
    }
    name = "test"
  }
  class InstanceClass2
  {
    constructor()
    {
      VsUtils.arrayInstanceProxy(SubClass,this,"sub");
      window.VsUtils.arrayInstanceProxy(SubClass,this,"sub2");
      Vs.plugins.VsUtils.arrayInstanceProxy(SubClass,this,"sub3");
      Vs.Utils.arrayInstanceProxy(SubClass,this,"sub4");
    }
    sub = {};
    sub2 = {};
    sub3 = {};
    sub34 = {};
  }
  ```
---

- ## registerCommandTyped
  register a plugin command and auto converts it to **classType**

  Namespace: **VsUtils, Vs.System**
  ```javascript
  static registerCommandTyped<T>(pluginName: string, commandName: string, classType: { new (): T },  func: (args: T) => void): void;
  ```
  ### Parameters:
  > ### pluginName string
  your plugin name

  > ### commandName string
  command name

  > ### classType { new (): T }
  class of your command paramter

  > ### func (args: T) => void:
  your callback method

  ### examples:
  ```javascript
  class Item
  {
    /**@type {string} */
    name = ""

    /**@type {number} */
    value = 0.0
  }

  class PLuginArg
  {
    constructor()
    {
      Vs.Utils.arrayInstanceProxy(Item,this,"items",false);
    }
    /**@type {Item[]} */
    items = []
  }

  VsUtils.registerCommandTyped("demo","testcommand",PLuginArg, (args) => {

    //you even get intelisense here
    args.items.forEach(item => {
      console.log(item.name+ " "+item.value)
    });
  });

  class PLuginArg2
  {
    constructor()
    {
    }
    
    value = "test"
    value2 = 123
  }

  Vs.System.registerCommandTyped("demo","testcommand",PLuginArg2, (args) => {
    console.log(args.value+" "+args.value2);
  });
  
  // @ts-ignore
  PluginManager.registerCommandTyped("demo","testcommand",PLuginArg2, (args) => {
    console.log(args.value+" "+args.value2);
  });
  ```
---

- ## hasGetterAndSetter
  checks if key prop of obj is a property with getter and setter available

  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static hasGetterAndSetter(obj: any, prop: string) : boolean;
  ```
  ### Parameters:
  > ### obj any
  your object

  > ### prop string
  property name/key

  > ### return boolean
  returns the key prop is a property with getter and setter available

  ### examples:
  ```javascript
  let tmp = {
    get x() {
      return 1;
    },
    set x (value){
    },
    noGetter:1
  }

  //true
  console.log(Vs.plugins.VsUtils.hasGetterAndSetter(tmp,"x"));
  //false
  console.log(Vs.Utils.hasGetterAndSetter(tmp,"noGetter"));
  //false
  console.log(VsUtils.hasGetterAndSetter(tmp,"xyz"));
  ```
---

- ## createProxyObj
  creats a proxy object for target and extend it with the properties from object additionalValues.

  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  static createProxyObj<
        T extends object, 
        U extends object & { target: T } = { target: T }
      >(
        target: T,
        additionalValues?: U
      ): T & Omit<U, "target">;
  ```
  ### Parameters:
  > ### target any
  your object

  > ### additionalValues obj
  your extension object for target

  > ### return Proxy
  returns a proxy object with all members from target and additionalValues

  ### examples:
  ```javascript
  let proxy = Vs.plugins.VsUtils.createProxyObj(tmp,{
    target: tmp,

    get z(){
      return this.target.x*2;
    },
    set z(value){
      this.target.x = value/2;
    }
  })

  //10
  console.log(proxy.z);
  proxy.z = 8;
  //4
  console.log(proxy.x);
  ```
---

- ## RegisterAdditionalFile
  register an additional data file for your plugin

  Namespace: **VsUtils, Vs.Utils**
  ```javascript
  function RegisterAdditionalFile(fileName:string, loaded:(datas:string)=>void, error:()=>void, optional:boolean);
  ```
  ### Parameters:
  > ### fileName string
  filename and path

  > ### loaded (data)=>void
  callback method when file is loaded

  > ### error ()=>void
  callback method when file couldn't be loaded

  > ### optional boolean
  file is optional, no error when missing
---

- ## spawnInterpreterWaiter
  creats a proxy object for target and extend it with the properties from object additionalValues.

  Namespace: **VsUtils, Vs.System**
  ```javascript
  static spawnInterpreterWaiter(): Vs.plugins.VsUtils.VsInterpreterWaiter;
  ```
  ### return VsInterpreterWaiter
  returns an interpreter waiter object, which halts the execution of the interpreter until its destroy method gets called.
  
  ### examples:
  ```javascript
  let waiter = Vs.System.spawnInterpreterWaiter();
  //interpreter halts until destroy is calld
  waiter.destroy();
  ```
---

## 4.3 plugin commands

### `preloadImage`
**Description:**  preloads an image 
- **Arguments:**
  - `image` (string, default: "") path to image
  - `wait for completion` (boolean, default: false) should the game interpreter be halted until the images is loaded
  - `throw error` (boolean, default: false) hould and error be trhown if the image couldn't be loaded
---

### `preloadImages`
**Description:**  preloads a list of images
- **Arguments:**
  - `images` (string[], default: []) list of images
  - `wait for completion` (boolean, default: false) should the game interpreter be halted until the images is loaded
  - `throw error` (boolean, default: false) hould and error be trhown if the image couldn't be loaded

---


# 5. How does the plugin work
defines methods which you can call in your plugin or in script commands
# 6. Changes to the core script
here you can look for possible conflicts with other plugins which change the same files
  - ## rmmz_objects.js
    - ### Game_Interpreter 
      - ### updateWaitMode
        **method override, orignal gets called**\
        wait for VsInterpreterWaiter is added
  - ## rmz_core.js
    - ### Bitmap
      - ### _onError
        **method override, orignal gets called**
      - ### addErrorListener
        **added, if already existing original gets called**
      - ### _onError
        **added, if already existing original gets called**
      - ### _vsCallErrorListeners
        **added**
      - ### _vsErrorListeners
        **added**


# 7. Troubleshooting
# 8. License
VsUtils by vsrpgdev is marked with CC0 1.0 Universal. To view a copy of this license, visit https://creativecommons.org/publicdomain/zero/1.0/