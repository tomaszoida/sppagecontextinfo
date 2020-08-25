export class SPPageContextInfo {
    public static getContext(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            SPPageContextInfo.contextChooser().then(spPageContext => {
                SPPageContextInfo.waitForProperContext(window.location.href, spPageContext, 50, 5000).then(newContext => {
                    resolve(newContext);
                });
            });
        })
    }

    private static contextChooser() {
        return new Promise((resolve, reject) => {
            if (window["_spPageContextInfo"]) {
                resolve(window["_spPageContextInfo"]);
            }
            else if (window['moduleLoaderPromise']) {
                window['moduleLoaderPromise'].then((a) => {
                    resolve(a.context.pageContext.legacyPageContext);
                });
            } else {
                reject();
            }
        });
    }

    private static waitForProperContext(observedURL: string, context: any, intervalTimeMillis: number, timeoutMillis: number) {
        return new Promise(resolve => {

            var counter = 0;
            var newContext = context;
            var maxCount = Math.ceil(timeoutMillis / intervalTimeMillis);
            var absoluteUrl = this.getAbsoluteUrl(newContext)

            var interval = setInterval(() => {
                counter++;
                if (counter >= maxCount) {
                    clearInterval(interval)
                    console.error('SPPageContextInfo: Could not get new context because of timeout')
                    resolve(newContext)
                }

                observedURL = this.trimSlash(observedURL);
                if (observedURL.toLowerCase() !== absoluteUrl.toLowerCase() && 
                    observedURL.toLowerCase() !== newContext.webAbsoluteUrl.toLowerCase()) 
                {
                    SPPageContextInfo.contextChooser().then(spPageContext => {
                        newContext = spPageContext;
                        absoluteUrl = this.getAbsoluteUrl(newContext)
                    });

                } else {
                    clearInterval(interval)
                    resolve(newContext)
                }
            }, intervalTimeMillis)
        })
    }

    private static getAbsoluteUrl( context: any){
        return window.location.origin + context.serverRequestPath
    }

    private static trimSlash(urlString: string){
        if(urlString.endsWith('/')){
            return urlString.slice(0, -1)
        }
        return urlString
    }
}