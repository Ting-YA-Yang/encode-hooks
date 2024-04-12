import { useMemo, useState } from 'react';

export interface Actions<T> {
  setLeft: () => void;
  setRight: () => void;
  set: (value: T) => void;
  toggle: () => void;
}

/* 定义不带参数的函数useToggle的参数类型和返回值类型
T = boolean 默认接收boolean类型参数
[boolean, Actions<T>] 函数返回值类型： boolean | Actions中的类型
Actions<T> 这里的T指的是useToggle<T = boolean>传入的类型，即默认boolean
*/
function useToggle<T = boolean>(): [boolean, Actions<T>];

// 定义带一个默认值参数的函数useToggle的参数类型和返回值类型
function useToggle<T>(defaultValue: T): [T, Actions<T>];

// 定义带两个参数的函数useToggle的参数类型和返回值类型
function useToggle<T, U>(defaultValue: T, reverseValue: U): [T | U, Actions<T | U>];

// (false as unknown) as D 将boolean类型的false值当成D类型
function useToggle<D, R>(defaultValue: D = (false as unknown) as D, reverseValue?: R) {
  const [state, setState] = useState<D | R>(defaultValue);

  const actions = useMemo(() => {  // useMemo缓存方法，当依赖值不发生改变时方法不发生改变
    const reverseValueOrigin = (reverseValue === undefined ? !defaultValue : reverseValue) as D | R;

    const toggle = () => setState((s) => (s === defaultValue ? reverseValueOrigin : defaultValue));
    const set = (value: D | R) => setState(value);
    const setLeft = () => setState(defaultValue);
    const setRight = () => setState(reverseValueOrigin);

    return {
      toggle,
      set,
      setLeft,
      setRight,
    };
  }, []);

  return [state, actions];
}

export default useToggle;
