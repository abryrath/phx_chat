import * as React from 'react';

interface AppProps {
  defaultRoom: string,
 }

const App: React.FunctionComponentElement<AppProps> = (props: AppProps) => {
  return (
    <div>
      <h1>Chat</h1>
      <p>Default Room: {props.defaultRoom}</p>
    </div>
  );
};

App.defaultProps = {
  defaultRoom: 'lobby'
}

export default App;
