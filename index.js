import React from "react";
import {FormContext} from '@mxjs/a-form';
import {DatePicker} from 'antd';
import moment from 'moment';

export default class DateRangePicker extends React.Component {
  static contextType = FormContext;

  constructor(props, context) {
    super(props, context);

    context.setInputConverter(this.inputConverter);
    context.setOutputConverter(this.outputConverter);
  }

  inputConverter = (values) => {
    // TODO 增加方法支持 NamePath
    values[this.props.id] = [
      values[this.props.names[0]] ? moment(values[this.props.names[0]]) : null,
      values[this.props.names[1]] ? moment(values[this.props.names[1]]) : null,
    ];
    return values;
  };

  outputConverter = (values) => {
    const format = this.getFormat();
    const value = values[this.props.id];
    values[this.props.names[0]] = (value && value[0]) ? value[0].format(format) : '';
    values[this.props.names[1]] = (value && value[1]) ? value[1].format(format) : '';
    delete values[this.props.id];
    return values;
  };

  getFormat() {
    if (this.props.format) {
      return this.props.format;
    }
    return this.props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  }

  render() {
    return (
      <DatePicker.RangePicker
        allowEmpty={[true, true]}
        format={this.getFormat()}
        {...this.props}
      />
    )
  }
}
