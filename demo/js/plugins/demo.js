/*:
 * @target MZ
 * @plugindesc example plugin
 * @author VsRpgDev
 * @help 
 * 
 * @param exampleParameter
 * @text exampleParameter
 * @type string
*/


//check if VsUtils is loaded
Vs.c("demo","VsUtils");


//----------------- jsonParseRecursive ----------------------------------
const parameters = PluginManager.parameters("demo");
const exampleParameter = parameters["exampleParameter"] || "";

//global
let jsonObj = VsUtils.jsonParseRecursive("{\"x\":1,\"x\":2}");

//window
jsonObj = window.VsUtils.jsonParseRecursive("{\"x\":1,\"x\":2}");

//Vs namespace
jsonObj = Vs.plugins.VsUtils.jsonParseRecursive("{\"x\":1,\"x\":2}");

//Utils namespace
jsonObj = Vs.Utils.jsonParseRecursive("{\"x\":1,\"x\":2}");



//----------------- assignObjectEntries ----------------------------------


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

//assigns the values from position into instance
VsUtils.assignObjectEntries(instance, {position:{x:10,y:25}});
window.VsUtils.assignObjectEntries(instance, {position:{x:10,y:25}});
Vs.plugins.VsUtils.assignObjectEntries(instance, {position:{x:10,y:25}});
Vs.Utils.assignObjectEntries(instance, {position:{x:10,y:25}});


//----------------- createInstanceFromJson ----------------------------------
let newInstance = VsUtils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
newInstance = window.VsUtils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
newInstance = Vs.plugins.VsUtils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));
newInstance = Vs.Utils.createInstanceFromJson(TestClass, JsonEx.stringify({position:{x:10,y:25}}));

//----------------- pluginParameterToObject ----------------------------------
VsUtils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
window.VsUtils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
Vs.plugins.VsUtils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});
Vs.Utils.pluginParameterToObject(TestClass,{position: "{\"x\":\"15\"}"});

//---------------------instanceProxy------------------------
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


let tmp2 = {
  _x:5,
  get x() {
    return this._x;
  },
  set x (value){
    this._x=value;
  },

  noGetter:1
}
//true
console.log(Vs.plugins.VsUtils.hasGetterAndSetter(tmp2,"x"));
//false
console.log(Vs.Utils.hasGetterAndSetter(tmp2,"noGetter"));
//false
console.log(VsUtils.hasGetterAndSetter(tmp2,"xyz"));


let proxy = Vs.plugins.VsUtils.createProxyObj(tmp2,{
  target: tmp2,

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

let waiter = Vs.System.spawnInterpreterWaiter();
//interpreter halts until destroy is calld
waiter.destroy();
