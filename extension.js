const vscode = require("vscode");

/**
 * Activates the CalcAssist extension.
 * @param {vscode.ExtensionContext} context - The extension context.
 */
function activate(context) {
  // Create status bar item
  let statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100
  );
  statusBarItem.command = "calcassist.calculate";
  statusBarItem.text = "CalcAssist";
  statusBarItem.color = "red";
  context.subscriptions.push(statusBarItem);

  // Register command
  let disposable = vscode.commands.registerCommand(
    "calcassist.calculate",
    () => {
      // Show input box for entering mathematical expression
      vscode.window
        .showInputBox({ prompt: "Enter a mathematical expression" })
        .then((expression) => {
          if (expression) {
            try {
              const result = eval(expression);
              statusBarItem.text = `Result: ${result}`;
            } catch (error) {
              statusBarItem.text = "Invalid expression";
            }
            statusBarItem.show();
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

/**
 * Deactivates the extension.
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
