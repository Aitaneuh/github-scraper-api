export function sendConsoleMessage(type, content) {
    console.log(`(${new Date().toISOString()}) - [${type}] ${content}`);
}