import "../pages/CompilerDemo.css"

interface CodePaneProps {
    code: string;
    output: string;
    fileName?: string;
    isEditable?: boolean;
    onCodeChange?: (val: string) => void;
    onRun?: () => void;
    isReady?: boolean;
    containerClass?: string;
}

function CodePane({
    code,
    output,
    fileName,
    isEditable = false,
    onCodeChange,
    onRun,
    isReady = true,
    containerClass = "demo-container",
}: CodePaneProps) {
    return (
        <div className={containerClass}>
            {/* actual code editor/viewer pane */}
            <div className = "pane">
                <div className="pane-header">{fileName}</div>
                <textarea
                    className={`code-editor ${!isEditable ? `code-editor-readonly` : ''}`}
                    value={code}
                    onChange={(e) => onCodeChange && onCodeChange(e.target.value)}
                    readOnly={!isEditable}
                    spellCheck="false"
                    tabIndex={isEditable ? 0 : -1}
                />
                {isEditable && onRun && (
                    <div className="run-button-pane">
                        <button className="run-button" onClick={onRun} disabled={!isReady}>
                            {isReady ? "compile and run": "loading wasm"}
                        </button>
                    </div>
                )}
            </div>

            {/* output pane */}
            <div className="pane">
                <div className="pane-header">output</div>
                <div className="output-text-box">{output}</div>
            </div>
        </div>
    );
}

export default CodePane;