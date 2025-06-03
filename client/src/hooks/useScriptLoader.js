// Global script loader to manage script loading state
class ScriptLoader {
    constructor() {
        this.loadedScripts = new Map();
    }

    loadScript(src) {
        if (this.loadedScripts.has(src)) {
            return this.loadedScripts.get(src).promise;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;

        const promise = new Promise((resolve, reject) => {
            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error(`Script load error: ${src}`));
        });

        this.loadedScripts.set(src, { script, promise });
        document.body.appendChild(script);

        return promise;
    }

    removeScript(src) {
        const scriptData = this.loadedScripts.get(src);
        if (scriptData) {
            const { script } = scriptData;
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            this.loadedScripts.delete(src);
        }
    }

    removeAllScripts() {
        this.loadedScripts.forEach((data, src) => {
            this.removeScript(src);
        });
    }
}

export const scriptLoader = new ScriptLoader();
