(function(){"use strict";let e;self.onmessage=s=>{const{type:a,payload:t}=s.data;switch(a){case"init":e=new Worker("/stockfish.wasm"),e.onmessage=o=>{self.postMessage({type:"output",payload:o.data})};break;case"command":e&&e.postMessage(t);break;case"terminate":e&&e.terminate();break}}})();
//# sourceMappingURL=stockfishWorker-CRlKRqDa.js.map
