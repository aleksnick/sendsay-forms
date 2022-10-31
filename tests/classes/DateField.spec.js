import { DateField } from '../../src/classes/elements/DateField';

describe('Field.spec.js', () => {
  const rawData = {
    content: {
      label: 'От года до дня',
      placeholder: '',
      accuracy: 'yd',
    },
    type: 'dateField',
    field: {
      aid: 'a403',
      qid: 'q94',
      id: 'q156',
    },
    appearance: {
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 5,
      hidden: false,
      paddingTop: 5,
    },
  };

  it('Checking DateField render', () => {
    const obj = new DateField(rawData);
    obj.render();
  });
  it('Check DateField getValue -- YD', () => {
    rawData.content.accuracy = 'yd';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987';
    expect(obj.getValue()).toEqual('1987-03-17');
  });
  it('Check DateField getValue -- YH', () => {
    rawData.content.accuracy = 'yh';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987 20';
    expect(obj.getValue()).toEqual('1987-03-17 20');
  });
  it('Check DateField getValue -- YM', () => {
    rawData.content.accuracy = 'ym';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987 20:22';
    expect(obj.getValue()).toEqual('1987-03-17 20:22');
  });
  it('Check DateField getValue -- YS 1', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987 20:22:33';
    expect(obj.getValue()).toEqual('1987-03-17 20:22:33');
  });
  it('Check DateField getValue -- YS 2', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987';
    expect(obj.getValue()).toEqual('1987-03-17 00:00:00');
  });

  it('Check DateField validate -- YS 1', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987';
    expect(obj.validate()).toEqual(true);
  });
  it('Check DateField validate -- YS 2', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987 20:00:';
    expect(obj.validate()).toEqual(false);
  });
  it('Check DateField validate -- YS 3', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/1987 20:00';
    expect(obj.validate()).toEqual(true);
  });
  it('Check DateField validate -- YS 4', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/19';
    expect(obj.validate()).toEqual(true);
  });
  it('Check DateField validate -- YS 5', () => {
    rawData.content.accuracy = 'ys';
    const obj = new DateField(rawData);
    obj.el.querySelector('input').value = '17/03/';
    expect(obj.validate()).toEqual(false);
  });

  it('Check applyDateTemplate 1', () => {
    const obj = new DateField(rawData);
    expect(obj.applyDateTemplate('dd/dd/dddd', '11223333')).toEqual('11/22/3333');
  });
  it('Check applyDateTemplate 2', () => {
    const obj = new DateField(rawData);
    expect(obj.applyDateTemplate('dd/dd/dddd', '112233')).toEqual('11/22/33');
  });
  it('Check applyDateTemplate 3', () => {
    const obj = new DateField(rawData);
    expect(obj.applyDateTemplate('dd/dd/dddd', '1122')).toEqual('11/22');
  });
  it('Check applyDateTemplate 4', () => {
    const obj = new DateField(rawData);
    expect(obj.applyDateTemplate('dd/dd/dddd', '1122333344')).toEqual('11/22/3333');
  });
});
