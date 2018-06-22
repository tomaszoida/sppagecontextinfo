# sppagecontextinfo
SharePoint page context object for classic and modern pages

## Description
This package allows you to access useful SharePoint page context info object no matter if it is classic or modern site.

## Installation
npm i sppagecontextinfo

## Usage
Use SPPageContextInfo.get method to access _spPageContextInfo object. Context object is returned asynchronously with Promise.

```
import { SPPageContextInfo } from 'sppagecontextinfo';
SPPageContextInfo.get().then(context=>{
  console.log(context.webAbsoluteUrl);
});
```
