import React from 'react';
import sinon from 'sinon/pkg/sinon';

import { getDOMNode } from './TestWrapper';
import { Icon } from '../src';

const IconCheckPath = React.forwardRef(function IconCheckPath(props, ref) {
  return (
    <path
      {...props}
      ref={ref}
      d="M27.095 17.886v6.119c0 1.527-0.542 2.832-1.625 3.915s-2.391 1.627-3.915 1.627h-16.011c-1.527 0-2.83-0.544-3.915-1.627s-1.627-2.389-1.627-3.915v-16.009c0-1.529 0.542-2.832 1.625-3.918 1.086-1.083 2.391-1.625 3.918-1.625h16.011c0.809 0 1.559 0.16 2.251 0.48 0.192 0.089 0.309 0.238 0.345 0.441 0.039 0.219-0.018 0.405-0.174 0.558l-0.944 0.944c-0.128 0.13-0.277 0.194-0.443 0.194-0.039 0-0.096-0.014-0.174-0.039-0.295-0.078-0.583-0.114-0.866-0.114h-16.009c-0.846 0-1.573 0.302-2.174 0.905-0.603 0.601-0.905 1.326-0.905 2.174v16.009c0 0.848 0.302 1.57 0.905 2.176 0.601 0.601 1.328 0.903 2.174 0.903h16.011c0.848 0 1.573-0.302 2.174-0.903 0.603-0.603 0.905-1.328 0.905-2.176v-4.889c0-0.167 0.057-0.306 0.174-0.423l1.232-1.232c0.128-0.128 0.277-0.192 0.443-0.192 0.075 0 0.153 0.018 0.231 0.057 0.254 0.103 0.382 0.29 0.384 0.56v0zM31.538 8.475l-15.664 15.664c-0.309 0.309-0.674 0.462-1.097 0.462s-0.789-0.153-1.097-0.462l-8.274-8.274c-0.309-0.311-0.462-0.674-0.462-1.097s0.153-0.789 0.464-1.097l2.114-2.114c0.309-0.309 0.674-0.464 1.097-0.464s0.789 0.153 1.097 0.464l5.061 5.061 12.453-12.45c0.306-0.309 0.674-0.462 1.097-0.462s0.789 0.153 1.097 0.462l2.117 2.117c0.306 0.304 0.459 0.67 0.459 1.093s-0.153 0.791-0.462 1.099v0z"
    ></path>
  );
});
const IconCheck = React.forwardRef(function IconCheck(props, ref) {
  return (
    <svg width="32px" height="32px" viewBox="0 0 32 32" ref={ref} {...props}>
      <IconCheckPath />
    </svg>
  );
});

describe('Icon', () => {
  it('Should be renderEmpty', () => {
    const instanceDom = getDOMNode(<Icon />);
    assert.include(instanceDom.getAttribute('class'), 'rs-icon');
    assert.isEmpty(instanceDom.innerHTML, '');
  });

  it('Should be spin', () => {
    const instanceDom = getDOMNode(<Icon spin />);
    assert.include(instanceDom.getAttribute('class'), 'rs-icon-spin');
  });

  it('Should be flip', () => {
    const instanceDom = getDOMNode(<Icon flip="horizontal" />);
    assert.include(instanceDom.getAttribute('class'), 'rs-icon-flip-horizontal');
  });

  it('Should be rotated', () => {
    const instanceDom = getDOMNode(
      <Icon rotate={45}>
        <IconCheckPath />
      </Icon>
    );
    assert.include(instanceDom.style.transform, 'rotate(45deg)');
  });

  it('Should be pulse', () => {
    const instanceDom = getDOMNode(<Icon pulse />);
    assert.include(instanceDom.getAttribute('class'), 'rs-icon-pulse');
  });

  it('Will append className', () => {
    const instanceDom = getDOMNode(<Icon className="test" />);
    assert.include(instanceDom.getAttribute('class'), 'test');
  });

  it('Should render SVG icon use as props', () => {
    const instanceDom = getDOMNode(<Icon as={IconCheck} />);

    assert.equal(instanceDom.width.baseVal.valueAsString, '1em', 'Validate width');
    assert.equal(instanceDom.height.baseVal.valueAsString, '1em', 'Validate height');
    assert.equal(instanceDom.getAttribute('viewBox'), '0 0 32 32', 'View box');
  });

  it('Should render SVG icon use children', () => {
    const instanceDom = getDOMNode(
      <Icon>
        <IconCheckPath />
      </Icon>
    );

    assert.equal(instanceDom.tagName, 'svg', 'Child is a svg');
    assert.equal(instanceDom.getAttribute('fill'), 'currentColor', 'Fill value equal currentColor');
    assert.equal(instanceDom.width.baseVal.valueAsString, '1em', 'Validate width');
    assert.equal(instanceDom.height.baseVal.valueAsString, '1em', 'Validate height');
  });

  it('Icon with onClick props should can be focus', () => {
    const instanceDom = getDOMNode(<Icon onClick={sinon.fake()} as={IconCheck} />);
    const firstChild = instanceDom.firstChild;
    assert.equal(firstChild.getAttribute('tab-index', '-1'));
  });

  it('Should be filled red color', () => {
    const instanceDom = getDOMNode(
      <Icon fill="red">
        <IconCheckPath />
      </Icon>
    );
    assert.equal(instanceDom.getAttribute('fill'), 'red');
  });

  it('Should be setting width and height', () => {
    const instanceDom = getDOMNode(
      <Icon width={25} height={25}>
        <IconCheckPath />
      </Icon>
    );
    assert.equal(instanceDom.getAttribute('width'), '25');
    assert.equal(instanceDom.getAttribute('height'), '25');
  });

  it('Should can set tabIndex', () => {
    const instanceDom = getDOMNode(<Icon tabIndex={999} onClick={sinon.fake()} as={IconCheck} />);
    assert.equal(instanceDom.getAttribute('tab-index', '999'));
  });
});
