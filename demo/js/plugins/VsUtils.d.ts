
namespace Vs
{
  namespace plugins{
    declare class VsUtils{

      /**
       * 
       * @param json json string
       * @returns returns object
       */
      static jsonParseRecursive(json: string): any;

      /**
       * @param instance - Die Instanz, der die Eigenschaften zugewiesen werden.
       * @param obj - Das Objekt mit den zuzuweisenden Werten.
       */
      static assignObjectEntries(instance: any, obj: any): void;

      /**
       * @param classType
       * @param json 
       * @returns 
       */
      static createInstanceFromJson<T>(classType: new () => T, json: string): T;

      /**
       * 
       * @param classType 
       * @param plugin param 
       * @param nullable 
       * @returns param as json object
       */ 
      static pluginParameterToObject<T>(classType?: new () => T, param: any, nullable?: boolean) : T

      /**
       * Creates a proxy for a single instance, ensuring it is of the specified class type.
       *
       * @param classType - The class type used for the instance.
       * @param obj - The object in which the instance is stored.
       * @param key - The key under which the instance is stored.
       * @param nullable - allow null as value
       */
      static instanceProxy<T>(classType: new () => T, obj: Record<string, any>, key: string, nullable? :boolean): void;

      /**
       * Creates a proxy for an array-like object, ensuring that all inserted elements
       * are instances of a specified class.
       *
       * @param classType - The class type used for new elements.
       * @param obj - The object in which the proxy is stored.
       * @param key - The key under which the proxied array is stored.
       * @param nullable - allow null as value
       */
      static arrayInstanceProxy<T>(classType: { new (): T }, obj: Record<string, any>, key: string, nullable? :boolean): void;


          
      /**
       * Registers a command for a plugin.
       * @param pluginName The name of the plugin.
       * @param commandName The name of the command.
       * @param classType class of the parameter
       * @param func The function to execute for the command.
       */
      static registerCommandTyped<T>(pluginName: string, commandName: string, classType: { new (): T },  func: (args: T) => void): void;
      
      /**
       * gets the plugin name
       */
      static readonly PluginName: string;

      /**
       * gets the version in major, minor, patch
       */
      static readonly Version : [number,number,number];
    }
  }
  namespace Utils{
    let jsonParseRecursive : typeof Vs.plugins.VsUtils.jsonParseRecursive;
    let assignObjectEntries : typeof Vs.plugins.VsUtils.assignObjectEntries;
    let createInstanceFromJson : typeof Vs.plugins.VsUtils.createInstanceFromJson;
    let pluginParameterToObject : typeof Vs.plugins.VsUtils.pluginParameterToObject;
    let instanceProxy : typeof Vs.plugins.VsUtils.instanceProxy;
    let arrayInstanceProxy : typeof Vs.plugins.VsUtils.arrayInstanceProxy;
  }
  namespace System{
    let registerCommandTyped : typeof Vs.plugins.VsUtils.registerCommandTyped;
  }
  namespace Math{
    /**
     * converts degrees to radian
     */
    declare function degToRad(degrees:number) : number;

    /**
     * converts radian to degrees
     */
    declare function radToDeg(radians:number) : number;
  }
}
interface Window 
{
  VsUtils: typeof Vs.plugins.VsUtils;
}

declare let VsUtils : typeof Vs.plugins.VsUtils;
