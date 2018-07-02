export class SPPageContextInfo {
    public static getContext(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (window["_spPageContextInfo"]) {
                resolve(window["_spPageContextInfo"]);
            }
            else if (window['moduleLoaderPromise']) {
                window['moduleLoaderPromise'].then((a) => {
                    resolve(a.context.pageContext.legacyPageContext);
                })
            }
            else {
                reject();
            }
        })
    }
}