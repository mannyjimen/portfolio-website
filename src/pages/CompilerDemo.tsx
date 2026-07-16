import { useState, useEffect } from 'react';

function CompilerDemo() {
    //three react variables
    const [isReady, setIsReady] = useState(false);
    const [sourceCode, setSourceCode] = useState(`let x = "hey john"`);
    const [output, setOutput] = useState(``);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/wasm_exec.js";

        //as soon as /wasm_exec.js loads
        script.onload = () => {
            //@ts-ignore
            const go = new window.Go()
            WebAssembly.instantiateStreaming(fetch("main.wasm"), go.importObject)
            .then((result) => {
                go.run(result.instance);
                //@ts-ignore
                setIsReady(true)
            });
        };

        //injecting script onto page
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    //handling running code on compiler
    const runCode = () => {
        //@ts-ignore
        const result = window.runMonkey(sourceCode);
        setOutput(result);
    };

    return (
        //simple dynamic text box with run button
        <div>
            <textarea
                value = {sourceCode}
                onChange = {(e) => setSourceCode(e.target.value)}
                rows = {6}
            />
            
            <button
                onClick = {runCode}
                disabled = {!isReady}
            >
                Run
            </button>
            <div>
                {output}
            </div>
        </div>
    );
}

export default CompilerDemo