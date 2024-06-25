const express = require("express");
const app = express();
const bodyP = require("body-parser");
const compiler = require("compilex");
const options = { stats: true };
const cors = require("cors")
compiler.init(options);
app.use(bodyP.json());
app.use(cors());
app.use("./codemirror-5.65.16", express.static("C:/miniProject/CodeSphere/codemirror-5.65.16"));

app.get("/", function(req, res) {
    res.sendFile("C:/miniProject/CodeSphere/public/indexCompiler.html");
});

app.post("/compile", function(req, res) {
    var code = req.body.code;
    var input = req.body.input;
    var lang = req.body.lang;

    function sendResponse(data) {
        if (data.error) {
            res.send({ output: data.error });
        } else if (data.output) {
            res.send({ output: data.output });
        } else {
            res.send({ output: "Unknown error occurred" });
        }
    }

    try {
        if (lang == "Cpp") {
            var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };

            if (!input) {
                compiler.compileCPP(envData, code, function(data) {
                    sendResponse(data);
                });
            } else {
                compiler.compileCPPWithInput(envData, code, input, function(data) {
                    sendResponse(data);
                });
            }
        } else if (lang == "Java") {
            var envData = { OS: "windows" };

            if (!input) {
                compiler.compileJava(envData, code, function(data) {
                    sendResponse(data);
                });
            } else {
                compiler.compileJavaWithInput(envData, code, input, function(data) {
                    sendResponse(data);
                });
            }
        } else if (lang == "Python") {
            var envData = { OS: "windows" };

            if (!input) {
                compiler.compilePython(envData, code, function(data) {
                    sendResponse(data);
                });
            } else {
                compiler.compilePythonWithInput(envData, code, input, function(data) {
                    sendResponse(data);
                });
            }
        }
    } catch (e) {
        res.send({ output: `Server error: ${e.message}` });
    }
});

app.listen(3500)
