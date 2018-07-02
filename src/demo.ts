import { SPPageContextInfo } from "./SPPageContextInfo";

SPPageContextInfo.getContext().then(context=>{
    console.log(context.webAbsoluteUrl);
})