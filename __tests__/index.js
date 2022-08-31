import {render} from '@testing-library/react';
import {Form, FormItem} from '@mxjs/a-form';
import {MemoryRouter} from 'react-router';
import {createPromise} from '@mxjs/test';
import $, {Ret} from 'miaoxing';
import DateRangePicker from '..';

describe('date-range-picker', () => {
  test('date', async () => {
    const promise = createPromise();
    const promise2 = createPromise();
    $.http = jest.fn().mockImplementationOnce(() => promise.resolve({
      ret: Ret.suc({
        data: {
          startDate: '2020-01-01',
          endDate: '2020-02-02',
        }
      })
    })).mockImplementationOnce(() => promise2.resolve({
      ret: Ret.suc({
        data: {}
      })
    }));

    const {container, findByDisplayValue} = render(<MemoryRouter>
      <Form>
        <FormItem name="_date">
          <DateRangePicker names={['startDate', 'endDate']}/>
        </FormItem>
      </Form>
    </MemoryRouter>);

    await promise;
    await findByDisplayValue('2020-01-01');
    expect(container.querySelector('#_date').value).toBe('2020-01-01');

    container.querySelector('form').submit();
    await promise2;

    expect($.http).toMatchSnapshot();
  });

  test('time', async () => {
    const promise = createPromise();
    const promise2 = createPromise();
    $.http = jest.fn().mockImplementationOnce(() => promise.resolve({
      ret: Ret.suc({
        data: {
          startDate: '2020-01-01 01:01:01',
          endDate: '2020-02-02 02:02:02',
        }
      })
    })).mockImplementationOnce(() => promise2.resolve({
      code: 1,
      message: 'success',
      data: {}
    }));

    const {container, findByDisplayValue} = render(<MemoryRouter>
      <Form>
        <FormItem name="_date">
          <DateRangePicker names={['startDate', 'endDate']} showTime/>
        </FormItem>
      </Form>
    </MemoryRouter>);

    await promise;
    await findByDisplayValue('2020-01-01 01:01:01');
    expect(container.querySelector('#_date').value).toBe('2020-01-01 01:01:01');

    container.querySelector('form').submit();
    await promise2;

    expect($.http).toMatchSnapshot();
  });

  test('only start date', async () => {
    const promise = createPromise();
    const promise2 = createPromise();
    $.http = jest.fn().mockImplementationOnce(() => promise.resolve({
      ret: Ret.suc({
        data: {
          startDate: '2020-01-01',
          endDate: '',
        }
      })
    })).mockImplementationOnce(() => promise2.resolve({
      ret: Ret.suc({
        data: {}
      })
    }));

    const {container, findByDisplayValue} = render(<MemoryRouter>
      <Form>
        <FormItem name="_date">
          <DateRangePicker names={['startDate', 'endDate']}/>
        </FormItem>
      </Form>
    </MemoryRouter>);

    await promise;
    await findByDisplayValue('2020-01-01');
    expect(container.querySelector('#_date').value).toBe('2020-01-01');

    container.querySelector('form').submit();
    await promise2;

    expect($.http).toMatchSnapshot();
  });

  test('empty value', async () => {
    const promise = createPromise();
    const promise2 = createPromise();
    $.http = jest.fn().mockImplementationOnce(() => promise.resolve({
      ret: Ret.suc({
        data: {}
      })
    })).mockImplementationOnce(() => promise2.resolve({
      ret: Ret.suc({
        data: {}
      })
    }));

    const {container} = render(<MemoryRouter>
      <Form>
        <FormItem name="_date">
          <DateRangePicker names={['startDate', 'endDate']}/>
        </FormItem>
      </Form>
    </MemoryRouter>);

    await promise;

    container.querySelector('form').submit();
    await promise2;

    expect($.http).toMatchSnapshot();
  });

  test('custom format', async () => {
    const promise = createPromise();
    const promise2 = createPromise();
    $.http = jest.fn().mockImplementationOnce(() => promise.resolve({
      ret: Ret.suc({
        data: {
          startDate: '2020-01-01',
          endDate: '',
        }
      })
    })).mockImplementation(() => promise2.resolve({
      ret: Ret.suc({
        data: {}
      })
    }));

    const {container, findByDisplayValue} = render(<MemoryRouter>
      <Form>
        <FormItem name="_date">
          <DateRangePicker names={['startDate', 'endDate']} format="YYYY/MM/DD"/>
        </FormItem>
      </Form>
    </MemoryRouter>);

    await promise;
    await findByDisplayValue('2020/01/01');
    expect(container.querySelector('#_date').value).toBe('2020/01/01');

    container.querySelector('form').submit();
    await promise2;

    expect($.http).toMatchSnapshot();
  });
});
