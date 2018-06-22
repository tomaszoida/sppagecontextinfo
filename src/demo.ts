import { SPPageContextInfo } from "./index";

SPPageContextInfo.getContext().then(context=>{
    console.log(context.webAbsoluteUrl);
})