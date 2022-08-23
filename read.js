#!/usr/bin/env node
const recast = require('recast');

const TNT = recast.types.namedTypes;

// 命令行输入: node read demo.js
recast.run(function (ast, printSource) {
    console.log(ast);
    // 提供一个printSource函数，可将ast转成源码
    printSource(ast);

    // AST节点遍历
    recast.visit(ast, {
        visitExpressionStatement: function (path) {
            // ast对象
            console.log(path.node);
            // ast对象对应的源码
            printSource(path.node);

            // 判断是否为ExpressionStatement，正确则输出一行字。
            if (TNT.ExpressionStatement.check(path.value)) {
                console.log('这是一个ExpressionStatement');
            }

            // 判断是否为ExpressionStatement，正确不输出，错误则全局报错
            // TNT.ExpressionStatement.assert(node);

            this.traverse(path);
            // 不加报错
            return false
        }
    })
})