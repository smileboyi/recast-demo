const recast = require('recast');

const code = 
`
function add(a,b){
    return a +
    // 有什么奇怪的东西混进来了
    b;
}
`

// 代码段转ast
const ast = recast.parse(code);
const add = ast.program.body[0];
console.log(add);


// 引入变量声明，变量符号，函数声明三种“模具”
const { variableDeclaration, variableDeclarator, functionExpression } = recast.types.builders;
// 将准备好的组件置入模具，并组装回原来的ast对象。
ast.program.body[0] = variableDeclaration('const', [
    variableDeclarator(add.id, functionExpression(
        null, // Anonymize the function expression.
        add.params,
        add.body
    ))
])
//将AST对象重新转回可以阅读的代码
const output = recast.print(ast).code;
console.log(output);
// 格式化的代码段
const output2 = recast.prettyPrint(ast, { tabWidth: 2 }).code;
console.log(output2);
// recast.print是recast.parse的逆向工程
console.log(recast.print(recast.parse(output)).code === output);

