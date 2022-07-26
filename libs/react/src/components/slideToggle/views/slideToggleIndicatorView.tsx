import React from 'react';

function SlideToggleIndicatorView(props: {value: boolean}){
  return <div>{props.value.toString()}</div>
}

export { SlideToggleIndicatorView };