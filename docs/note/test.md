---
title: test page 
author: kiana
date: '2022-1-24'
---
# useMemo的记忆化
Question：useMemo是怎么对比每次的依赖项，当依赖项是一个多层级的object时，会怎么对比是否有变化？


claude35_sonnet2 Answer：

useMemo 在对比依赖项时使用的是浅比较（shallow comparison）机制。让我们详细了解一下：

1. 基本类型的比较：
```javascript
// 对于基本类型（number, string, boolean 等），直接比较值
useMemo(() => {
  // ...
}, [count, name]) // 直接比较 count 和 name 的值是否改变
```

2. 对象类型的比较：
```javascript
// 对于对象类型，只比较引用地址
const obj = { a: 1, b: { c: 2 } };

useMemo(() => {
  // ...
}, [obj]) // 只比较 obj 的引用，不会深入比较内部属性
```

3. 多层级对象的处理：
```javascript
// 错误示范
const Component = () => {
  const obj = { a: 1, b: { c: 2 } };
  
  const memoizedValue = useMemo(() => {
    // 每次渲染都会重新创建计算，因为 obj 是每次渲染都新建的对象
    return expensive(obj);
  }, [obj]);
}

// 正确示范
const Component = () => {
  const [data, setData] = useState({ a: 1, b: { c: 2 } });
  
  const memoizedValue = useMemo(() => {
    return expensive(data.a, data.b.c); // 直接使用具体的值作为依赖
  }, [data.a, data.b.c]);
}
```

4. 最佳实践：

```javascript
// 1. 使用扁平化的依赖
const Component = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  
  const memoizedValue = useMemo(() => {
    return expensive(a, b);
  }, [a, b]); // 扁平化的依赖更容易追踪变化
}

// 2. 如果必须使用对象，确保对象的引用稳定
const Component = () => {
  const obj = useMemo(() => ({
    a: 1,
    b: { c: 2 }
  }), []); // 创建稳定的对象引用
  
  const memoizedValue = useMemo(() => {
    return expensive(obj);
  }, [obj]);
}

// 3. 使用 useCallback 包装函数依赖
const Component = () => {
  const callback = useCallback(() => {
    // ...
  }, []);
  
  const memoizedValue = useMemo(() => {
    return expensive(callback);
  }, [callback]);
}
```

5. 需要注意的问题：

```javascript
// 问题1：依赖项过多
const Component = () => {
  const obj = {
    a: { b: { c: { d: 1 } } },
    e: { f: { g: 2 } }
  };
  
  // 不推荐
  const memoizedValue = useMemo(() => {
    return expensive(obj);
  }, [obj.a.b.c.d, obj.e.f.g]); // 依赖项过多且难以维护
  
  // 推荐
  const flattenedValues = useMemo(() => ({
    d: obj.a.b.c.d,
    g: obj.e.f.g
  }), [obj.a.b.c.d, obj.e.f.g]);
  
  const memoizedValue = useMemo(() => {
    return expensive(flattenedValues);
  }, [flattenedValues]);
}

// 问题2：不必要的 memo
const Component = () => {
  const obj = { a: 1 };
  
  // 不必要的 memo，因为 obj 每次渲染都是新的
  const memoizedValue = useMemo(() => obj, [obj]);
}
```

建议：

1. 尽量使用扁平化的数据结构作为依赖项
2. 如果必须使用复杂对象，考虑只依赖真正需要的具体值
3. 使用 useState 或 useMemo 来维护复杂对象的稳定引用
4. 注意区分何时真正需要使用 useMemo
5. 考虑使用 useCallback 来处理函数依赖
6. 在遇到性能问题时才去优化，避免过度优化

理解这些细节对于正确使用 useMemo 和优化 React 应用性能非常重要。
