import {Component} from 'react';
import {FormContext} from '@mxjs/a-form';
import {DatePicker, TimePicker} from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import {setValue, getValue} from 'rc-field-form/lib/utils/valueUtil';

export default class DateRangePicker extends Component {
  static contextType = FormContext;

  static propTypes = {
    id: PropTypes.string,
    names: PropTypes.array,
    format: PropTypes.string,
    showTime: PropTypes.bool,
    mode: PropTypes.oneOf(['date', 'time']),
  };

  static defaultProps = {
    mode: 'date',
  };

  constructor(props, context) {
    super(props, context);

    context.setInputConverter(this.inputConverter);
    context.setOutputConverter(this.outputConverter);
  }

  inputConverter = (values) => {
    const names = this.getNames();
    const format = this.getFormat();
    const start = getValue(values, names[0]);
    const end = getValue(values, names[1]);
    return setValue(values, [this.props.id], [
      start ? moment(start, format) : null,
      end ? moment(end, format) : null,
    ]);
  };

  outputConverter = (values) => {
    const names = this.getNames();
    const format = this.getFormat();
    const value = getValue(values, [this.props.id]);
    values = setValue(values, names[0], (value && value[0]) ? value[0].format(format) : '');
    values = setValue(values, names[1], (value && value[1]) ? value[1].format(format) : '');
    values = setValue(values, [this.props.id], null);
    return values;
  };

  getNames() {
    return [
      Array.isArray(this.props.names[0]) ? this.props.names[0] : [this.props.names[0]],
      Array.isArray(this.props.names[1]) ? this.props.names[1] : [this.props.names[1]],
    ];
  }

  getFormat() {
    if (this.props.format) {
      return this.props.format;
    }
    return this.props.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD';
  }

  render() {
    const RangePicker = this.props.mode === 'time' ? TimePicker.RangePicker : DatePicker.RangePicker;
    return (
      <RangePicker
        allowEmpty={[true, true]}
        format={this.getFormat()}
        {...this.props}
      />
    );
  }
}
