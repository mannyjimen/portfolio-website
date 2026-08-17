import { useState, useEffect } from 'react';
import { ScrambleText} from '../components/ScrambleText';
import CodePane from '../components/CodePane';
import "../index.css";
import "./CompilerDemo.css"

const DOC_EXAMPLES = [
    {
        title: "expression evaluation / print",
        example_filename: "expression_print.mnky",
        description: `No designated print function (yet). The last expression evaluated will be the only value printed.\n\nIn the code box below, we can see three expression statements, however, since the 3rd line is the last expression processed in the program, its value (7) will be printed`,
        code: `5 + 2;\n"hello" + "world";\n3 + 4;`,
        output: "7",
    },
    {
        title: "variable bindings",
        example_filename: "bindings.mnky",
        description: `Can bind values to identifiers using keyword "let".\nCan follow the format "let <identifier> = <expression>;" for standard variable binding.\n\nIn the code box below, we bind "first_name" to string literal "john", and "last_name" to "doe". We then concatenate the first and last name identifiers (along with a space in between).`,
        code: `let first_name = "john";\nlet last_name = "doe";\nfirst_name + " " + last_name;`,
        output: `john doe`,
    }
]

function CompilerDemo() {
    //three react variables
    const [isReady, setIsReady] = useState(false);
    const [sourceCode, setSourceCode] = useState(`let x = "hello";\nx + " world!";`);
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

    //will run initial monkey code once wasm is ready
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

            {/* main interactive section*/}
            <CodePane
                code={sourceCode}
                output={output || (isReady ? "": "initializing virtual machine...")}
                fileName='demo.mnky'
                isEditable={true}
                onCodeChange={setSourceCode}
                onRun={runCode}
                isReady={isReady}
            />

            {/* documentation section*/}
            <div style={{marginTop: "3rem"}}>
                <h3 className="project-name">documentation (current state)</h3>
                {DOC_EXAMPLES.map((doc, idx) => (
                    <div key={idx} style={{ marginBottom: "2rem"}}>
                        {/* <h4>{doc.title}</h4> */}
                        <p className="project-blurb" style={{ marginBottom: "1rem"}}>
                            {doc.description}
                        </p>
                        <CodePane
                            code={doc.code}
                            output={doc.output}
                            fileName={doc.example_filename}
                            containerClass="example-container"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CompilerDemo