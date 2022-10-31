import { DOMObject } from '../../src/classes/elements/DOMObject';

describe('DOMObject.spec.js', () => {
  it('Cheking render', () => {
    const dom = new DOMObject({ type: 'foo' });
    dom.render();
  });

  it('Cheking makeStyles', () => {
    const dom = new DOMObject({
      type: 'foo',
      appearance: {
        param1: 200,
        param2: 'test',
      },
    });
    dom.applicableStyles = {
      converted1: { param: 'param1', postfix: 'px' },
      converted2: { param: 'param2' },
      converted3: { param: 'param3', default: 'test3' },
      converted4: { param: 'param4' },
    };
    expect(dom.makeStyles()).toEqual({
      converted1: '200px',
      converted2: 'test',
      converted3: 'test3',
    });
  });

  it('Cheking applyStyles with all types of params', () => {
    const dom = new DOMObject({
      appearance: {
        param1: 200,
        param2: 'test',
      },
    });
    const applicableStyles = {
      converted1: { param: 'param1', postfix: 'px' },
      converted2: { param: 'param2' },
      converted3: { param: 'param3', default: 'test3' },
      converted4: { param: 'param4' },
    };
    expect(dom.applyStyles(applicableStyles)).toEqual({
      converted1: '200px',
      converted2: 'test',
      converted3: 'test3',
    });
  });

  it('Cheking applyStyles without params', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });

    expect(dom.applyStyles()).toEqual({});
  });

  it('Cheking convertStyles without params', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });
    // const applicableStyles = {
    //   converted1: { param: 'param1', postfix: 'px' },
    //   converted2: { param: 'param2' },
    //   converted3: { param: 'param3', default: 'test3' },
    //   converted4: { param: 'param4' },
    // };
    const style = {
      style1: 'test1',
      style2: 'test2',
    };

    expect(dom.convertStyles(style)).toEqual(' style1:test1; style2:test2;');
  });

  it('Cheking applySettings with all params', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });
    dom.template = '[%value1%] [%  value2   %] [%value3%]';
    const settings = {
      value1: 'test1',
      value2: 'test2',
      value3: 'test3',
    };

    expect(dom.applySettings(settings)).toEqual('test1 test2 test3');
  });

  it('Cheking applySettings without all params', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });
    dom.template = '[%value1%] [%  value2   %] [%value3%]';
    const settings = {
      value1: 'test1',
      value2: 'test2',
    };

    expect(dom.applySettings(settings)).toEqual('test1 test2 ');
  });

  it('Cheking applySettings without params', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });
    dom.template = '[%value1%] [%  value2   %] [%value3%]';

    expect(dom.applySettings()).toEqual('  ');
  });

  it('Cheking trigger event without extra data', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });
    dom.render();
    let test = false;
    const testBlock = {
      testFunc() {
        test = true;
      },
    };
    dom.el.addEventListener('TestEvent', testBlock.testFunc);
    dom.trigger('TestEvent');

    expect(test).toEqual(true);
  });

  it('Cheking trigger event with extra data', () => {
    const dom = new DOMObject({
      param1: 200,
      param2: 'test',
    });
    dom.render();
    let test = false;
    let extra;
    const testBlock = {
      testFunc(event) {
        test = true;
        extra = event.detail.extra;
      },
    };
    dom.el.addEventListener('TestEvent', testBlock.testFunc);
    dom.trigger('TestEvent', {
      test: 'testData',
    });

    expect(test).toEqual(true);
    expect(extra).toEqual({
      test: 'testData',
    });
  });
});
