import React from "react";
import {FormContext} from '@mxjs/a-form';
import {DatePicker} from 'antd';

export default class DateRangePicker extends React.Component {
  static contextType = FormContext;

  static defaultProps = {
    format: 'YYYY-MM-DD',
  }

  constructor(props) {
    // Update format for time picker
    if (props.showTime && !props.format) {
      props.format = 'YYYY-MM-DD HH:mm:ss';
    }

    super(props);
  }

  onChange = (value) => {
    const stringValue = value ? [
      value[0] ? value[0].format(this.props.format) : null,
      value[1] ? value[1].format(this.props.format) : null,
    ] : value;
    this.context.setFieldsValue({[this.props.id.substr(1)]: stringValue});
    this.props.onChange(value);
  }

  render() {
    return (
      <DatePicker.RangePicker
        allowEmpty={[true, true]}
        {...this.props}
        onChange={this.onChange}
      />
    )
  }
}
