import React from "react";
import './Calculator.css'

class Calculator extends React.Component {
    constructor() {
        super()
        this.state = {
            calc: '',
            lastEvaluated: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleSingleClear = this.handleSingleClear.bind(this)
        this.handleResult = this.handleResult.bind(this)
    }

    handleClick(event) {
        const value = event.target.value;
        this.setState((prevState) => {
            let current = prevState.calc;
    
            // Prevent multiple leading zeros
            if ((current === '0' && value === '0') || (current === '' && value === '00')) {
                return null;
            }
    
            // If calc is '0' and input is non-operator, replace
            if (current === '0' && /[0-9]/.test(value)) {
                return { calc: value };
            }
            // Allow - after operators e.g 5 * - 5
            if (/[+\-*/]/.test(value)) {
                const lastChar = current.slice(-1);
            
                // Allow minus after operator
                if (/[+\*/]/.test(lastChar) && value === '-') {
                    return { calc: current + value };
                }
            
                // Replace last operator(s) with the new one
                if (/[+\-*/]/.test(lastChar)) {
                    return { calc: current.replace(/[\+\-\*\/]+$/, value) };
                }
            }

            // Prevent duplicate of . within current number
            if (value === '.') {
                const parts = current.split(/[\+\-\*\/]/);
                const lastNum = parts[parts.length - 1];
                if (lastNum.includes('.')) return null;
            }

            if (this.state.lastEvaluated && /[0-9.]/.test(value)) {
                return this.setState({ calc: value, lastEvaluated: false });
            }
            if (this.state.lastEvaluated && /[+\-*/]/.test(value)) {
                return this.setState({ calc: this.state.calc + value, lastEvaluated: false });
            }
    
            return { calc: current + value };
        });
    }

    handleClear() {
        this.setState({ calc: ''} )
    }

    handleSingleClear() {
        this.setState((prevState) => ({
            calc: prevState.calc.slice(0, -1)
        }))
    }

    handleResult() {
        try {
            // Prevent ending with operator
            const cleaned = this.state.calc.replace(/[\+\-\*\/]+$/, '');
            const result = eval(cleaned);
            this.setState({ 
                calc: result.toFixed(4).replace(/\.?0+$/, ''), // trims unnecessary zeros
                lastEvaluated: true
             })
        } catch (error) {
            this.setState({ calc: 'Error', lastEvaluated: true });
        }
    }

    render() {
        return(
            <div>
                <div className="container">
                    <div className="calculator">
                        <form>
                            <div id="display">{this.state.calc || '0'}</div>
                            <div className="row">
                                <input type="button" onClick={this.handleClear} value={"AC"} name="calc" id="clear" className="operator"/>
                                <input type="button" onClick={this.handleSingleClear} value={"DEL"} name="calc" id="singleClear" className="operator"/>
                                <input type="button" onClick={this.handleClick} value={"."} name="calc" id="decimal" className="operator"/>
                                <input type="button" onClick={this.handleClick} value={"/"} name="calc" id="divide" className="operator"/>
                            </div>
                            <div className="row">
                                <input type="button" onClick={this.handleClick} value={7} name="calc" id="seven"/>
                                <input type="button" onClick={this.handleClick} value={8} name="calc" id="eight"/>
                                <input type="button" onClick={this.handleClick} value={9} name="calc" id="nine"/>
                                <input type="button" onClick={this.handleClick} value={"-"} name="calc" id="subtract"/>
                            </div>
                            <div className="row">
                                <input type="button" onClick={this.handleClick} value={4} name="calc" id="four"/>
                                <input type="button" onClick={this.handleClick} value={5} name="calc" id="five"/>
                                <input type="button" onClick={this.handleClick} value={6} name="calc" id="six"/>
                                <input type="button" onClick={this.handleClick} value={"+"} name="calc" id="add"/>
                            </div>
                            <div className="row">
                                <input type="button" onClick={this.handleClick} value={1} name="calc" id="one"/>
                                <input type="button" onClick={this.handleClick} value={2} name="calc" id="two"/>
                                <input type="button" onClick={this.handleClick} value={3} name="calc" id="three"/>
                                <input type="button" onClick={this.handleClick} value={"*"} name="calc" id="multiply"/>
                            </div>
                            <div>
                                <input type="button" onClick={this.handleClick} value={0} name="calc" id="zero"/>
                                <input type="button" onClick={this.handleClick} value={"00"} name="calc" id="double-zero"/>
                                <input type="button" value={"="} name="calc" onClick={this.handleResult} id="equals"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Calculator