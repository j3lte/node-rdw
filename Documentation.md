#Index

**Classes**

* [class: RDWSearch](#RDWSearch)
  * [new RDWSearch(apiKey)](#new_RDWSearch)
  * [rDWSearch.search(filterParams)](#RDWSearch#search)
  * [~~rDWSearch.searchPlate(plate, callback)~~](#RDWSearch#searchPlate)
  * [rDWSearch.searchPlateDeferred(plate)](#RDWSearch#searchPlateDeferred)
* [class: SearchUtils](#SearchUtils)
  * [new SearchUtils()](#new_SearchUtils)
  * [SearchUtils.colors](#SearchUtils.colors)
  * [SearchUtils.params](#SearchUtils.params)
  * [SearchUtils.createFilterString(filterArray)](#SearchUtils.createFilterString)
 
<a name="RDWSearch"></a>
#class: RDWSearch
**Members**

* [class: RDWSearch](#RDWSearch)
  * [new RDWSearch(apiKey)](#new_RDWSearch)
  * [rDWSearch.search(filterParams)](#RDWSearch#search)
  * [~~rDWSearch.searchPlate(plate, callback)~~](#RDWSearch#searchPlate)
  * [rDWSearch.searchPlateDeferred(plate)](#RDWSearch#searchPlateDeferred)

<a name="new_RDWSearch"></a>
##new RDWSearch(apiKey)
RDWSearch constructor

**Params**

- apiKey `string` - Azure market apiKey (not necessary for this service)  

<a name="RDWSearch#search"></a>
##rDWSearch.search(filterParams)
Main search method

**Params**

- filterParams `string` | `Array.<string>` - The parameters for filtering. This can either be a String, or an Array  

**Returns**: `Object` - - Promise  
<a name="RDWSearch#searchPlate"></a>
##~~rDWSearch.searchPlate(plate, callback)~~
searchPlate - Search a dutch license plate in the RDW database

**Params**

- plate `string` - The license plate, without dashes. E.g. '1222XX' == '12-22-XX'  
- callback `function` - Callback function  

***Deprecated***  
<a name="RDWSearch#searchPlateDeferred"></a>
##rDWSearch.searchPlateDeferred(plate)
searchPlateDeferred - Searches a dutch license plate, Promise style.

**Params**

- plate `string`  

**Returns**: `object`  
<a name="SearchUtils"></a>
#class: SearchUtils
**Members**

* [class: SearchUtils](#SearchUtils)
  * [new SearchUtils()](#new_SearchUtils)
  * [SearchUtils.colors](#SearchUtils.colors)
  * [SearchUtils.params](#SearchUtils.params)
  * [SearchUtils.createFilterString(filterArray)](#SearchUtils.createFilterString)

<a name="new_SearchUtils"></a>
##new SearchUtils()
SearchUtils constructor

<a name="SearchUtils.colors"></a>
##SearchUtils.colors
All the colors that you can choose from

**Type**: `Array`  
<a name="SearchUtils.params"></a>
##SearchUtils.params
Available parameters to search with

**Type**: `Object`  
<a name="SearchUtils.createFilterString"></a>
##SearchUtils.createFilterString(filterArray)
Create a filter object.

**Params**

- filterArray `Array.<string>` - Array with the filters  

**Returns**: `object` - The object containing either an error, or a filterString  
