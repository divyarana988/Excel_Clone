class stackClass{
    constructor() {
        this.arr = [];
        this.top = -1;
    }

    push(x) {
        this.arr.push(x);
        this.top++;
    }

    pop() {
        if (this.top == -1) {
            return "error";
        }
        this.top--;
        return this.arr.pop();
    }
    peek() {
        if (this.top == -1) {
            return "error";
        }
        return this.arr[this.top];
    }

    size() {
        return this.top + 1;
    }


}



function eval(formula) {
    let str = formula.split(" ");
    let operands = new stackClass();
    let operators = new stackClass();


    for (let i = 0; i < str.length; i++) {

        let ch = str[i];

        if (isNumber(ch)) {
            operands.push(parseInt(ch));
        }
        else if (ch == '(') {
            operators.push(ch);
        }
        else if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
            while (operators.size() > 0 && operators.peek() != '(' && precedence(ch) <= precedence(operators.peek())) {
                let operand2 = operands.pop();
                let operand1 = operands.pop();
                let operator = operators.pop();

                let ans = calculate(operand1, operand2, operator);
                operands.push(ans);
            }
            operators.push(ch);
        }
        else if (ch == ')') {
            while (operators.size() > 0 && operators.peek() != '(') {
                let operand2 = operands.pop();
                let operand1 = operands.pop();
                let operator = operators.pop();

                let ans = calculate(operand1, operand2, operator);
                operands.push(ans);
            }
            if (operators.size() > 0) {
                operators.pop();
            }
        }
    }

    while (operators.size() > 0) {
        let operand2 = operands.pop();
        let operand1 = operands.pop();
        let operator = operators.pop();

        let ans = calculate(operand1, operand2, operator);
        operands.push(ans);
    }

    let val = operands.peek();
    return val;

}


function precedence(op) {
    if (op == '+') {
        return 1;
    } else if (op == '-') {
        return 1;
    } else if (op == '*') {
        return 2;
    } else {
        return 2;
    }
}


function calculate(val1, val2, op) {
    if (op == '+') {
        return val1 + val2;
    } else if (op == '-') {
        return val1 - val2;
    } else if (op == '*') {
        return val1 * val2;
    } else {
        return val1 / val2;
    }
}


function isNumber(n) {
    return !isNaN(parseInt(n))
}