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
            var contextURL: string = context.webAbsoluteUrl;
            var newContext = context;
            var maxCount = Math.ceil(timeoutMillis / intervalTimeMillis);

            var interval = setInterval(() => {
                counter++;
                if (counter >= maxCount) {
                    clearInterval(interval)
                    console.error('SPPageContextInfo: Could not get new context because of timeout')
                    resolve(newContext)
                }
                observedURL = this.splitURL(observedURL)["beforeSitePageURL"]
                if (!(observedURL === contextURL.toLowerCase())) {
                    SPPageContextInfo.contextChooser().then(spPageContext => {
                        newContext = spPageContext;
                        contextURL = newContext.webAbsoluteUrl;
                    })

                } else {
                    clearInterval(interval)
                    resolve(newContext)
                }
            }, intervalTimeMillis)
        })
    }

    private static splitURL(url: string) {
        url = url.toLowerCase();
        if (url.includes('/sitepages/')) {
            var splittedUrl = url.split('/sitepages/')
            return { beforeSitePageURL: splittedUrl[0], afterSitePageURL: splittedUrl[1] }
        }
        return { beforeSitePageURL: url, afterSitePageURL: "" }
    }
}