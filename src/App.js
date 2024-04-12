import React, { useMemo, useState } from 'react';

import logo from './logo.svg';
import './App.css';


const TestChildChild = ({errormsg}) => {
    return useMemo(() => {
        return (
            <div>
                {
                    errormsg ?
                        <div>
                            {/*It can only be reproduced when there are many DOM nodes*/}
                            <div>
                                <div>4378957943323</div>
                                <div>4378957943323</div>
                                <div>4378957943323</div>
                                <div>4378957943323</div>
                            </div>

                            {errormsg}
                        </div>
                    : null
                }
            </div>
        )
    }, [errormsg])
}
const TestChild = (props) => {
    return useMemo(() => {
        return (
            <>
                <TestChildChild {...props}></TestChildChild>
            </>
        )
    }, [props])
}
export const Test = (props) => {

    return (
        <div>
            <TestChild
                errormsg={!!props.testValue ? 'test1' : undefined}></TestChild>

            <input type="text" onBlur={() => {
                console.log('test onBlur')
                props.onChangeTest && props.onChangeTest()
            }} />

            <button onClick={() => {
                console.log('test page btn')
            }}>btn test</button>

            {/* Placing the sub-component below behaves normally */}
            {/*<TestChild*/}
            {/*  errormsg={!!props.testValue ? 'test1' : undefined}></TestChild>*/}

        </div>
    );
};

/**
 * The problem is that the click event of the button is not triggered.
 * 1、First, enter the box to focus on the input box, and then click the button to trigger the button event.
 * 2、The click event of the button is not triggered.
 */

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const [testValue, setTestValue] = useState(0);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Test
            testValue={testValue}
            onChangeTest={() => {
              setTestValue(testValue + 1);
            }}
        />
      </header>
    </div>
  );
}

export default App;
