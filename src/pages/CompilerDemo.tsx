import { useState, useEffect } from 'react';
import { ScrambleText} from '../components/ScrambleText';
import "../index.css";
import "./CompilerDemo.css"

function CompilerDemo() {
    //three react variables
    const [isReady, setIsReady] = useState(false);
    const [sourceCode, setSourceCode] = useState(`let x = "hello";
x + " world!";`);
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

    //will run on startup only
    useEffect(() => {
        if (isReady) {
            //@ts-ignore
            const result = window.runMonkey(sourceCode);
            setOutput(result);
        }
    }, [isReady]);

    //handling running code on compiler
    const runCode = () => {
        //@ts-ignore
        const result = window.runMonkey(sourceCode);
        setOutput(result);
    };

    return (
        //simple dynamic text box with run button
        <div className='container'>
            <h1 className='name-style'>
                <ScrambleText text="monkey compiler demo" />
            </h1>
            <div className='demo-container'>
                {/*code text box*/}
                <div className='pane'>
                    <div className='pane-header'>demo.mnky</div>
                    <textarea
                        className='code-editor'
                        value = {sourceCode}
                        onChange = {(e) => setSourceCode(e.target.value)}
                        rows = {6}
                    />
                    {/*run button*/}
                    <div className='run-button-pane'>
                    <button
                        className='run-button'
                        onClick = {runCode}
                        disabled = {!isReady}
                    >
                        compile and run
                    </button>                
                    </div>
                </div>

                {/*output text box*/}
                <div className='pane'>
                    <div className='pane-header'>output</div>
                    <div className='output-text-box'>
                    {output}
                    </div>
                </div>

            </div>
            <div>
                <br></br>
                <h3>documentation (current state): </h3>

                No designated <strong>print</strong> function (yet).
                The last expression seen will be the only value printed.
                <br></br>
                In the code box below, we can see three expression statements, however, since the 3rd
                line is the last expression processed in the program, its value (7) will be printed;
                <br></br>

                <div className='example-container'>
                {/*code text box*/}
                <div className='pane'>
                    <div className='pane-header'>demo.mnky</div>
                    <textarea
                        className='code-editor'
                        value = {`5 + 2;\n"hello" + "world";\n3 + 4;`}
                        rows = {6}
                    />
                </div>

                {/*output text box*/}
                <div className='pane'>
                    <div className='pane-header'>output</div>
                    <div className='output-text-box'>
                    {"7"}
                    </div>
                </div>

            </div>

            </div>

        </div>
    );
}

export default CompilerDemo