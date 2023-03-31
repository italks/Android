# Python API 

该java模块提供了从 Python 代码使用 Java 类和对象的工具。

## 数据类型

### 概述

数据类型在 Python 和 Java 之间的转换如下：

- Javanull对应 Python None。
- Java 的布尔、整数和浮点类型分别对应于Python 和 bool。当 Java 代码使用“装箱”类型时，从 Python 转换为 Java 时自动装箱，从 Java 转换为 Python 时自动拆箱。intfloat
- JavaString和charPython 都对应str。
- Java 数组由对象表示jarray。Java 数组参数和字段也可以从任何序列隐式转换，字符串除外。
- 所有其他 Java 对象都由对象表示jclass。

从 Java 接收到的对象jclass或jarray对象将在 Python 中表示为其实际运行时类型，这不一定是从中获取对象的方法、字段或参数的声明类型。它可以被视为使用该 cast功能的另一种兼容类型。

### 原语
Python bool、int或对象可以直接传递给任何兼容的 Java 方法参数或字段float。str

但是，Java 的原始类型比 Python 多，因此当多个兼容的整数或浮点重载适用于方法调用时，将使用最长的一个。String同样，当将 1 个字符的字符串传递给对和都有重载的方法时 char，String将使用重载。

如果这些规则没有给出所需的结果，可以使用以下包装类来选择要使用的 Java 基本类型：

> java类 。jboolean（值）
> java类 。jbyte（值，截断=假）
> java类 。jshort（价值，截断=假）
> java类 。jint（价值，截断=假）
> java类 。jlong ​​（价值，截断=假）
> java类 。jfloat（价值，截断=假）
> java类 。jdouble（价值，截断=假）
> java类 。jchar（值）
> java类 。jvoid
> jvoid无法实例化，但可以在定义静态代理时用作返回类型 。

例如，如果p是PrintStream：

```python
p.print(42)              # will call print(long)
p.print(jint(42))        # will call print(int)
p.print(42.0)            # will call print(double)
p.print(jfloat(42.0))    # will call print(float)
p.print("x")             # will call print(String)
p.print(jchar("x"))      # will call print(char)
```

数字类型包装器采用可选truncate参数。如果设置了这个，给定值的任何多余的高位都将被丢弃，就像 Java 中的强制转换一样。否则，将超出范围的值传递给包装器类将导致OverflowError.

当使用这些包装器时，Java 重载解析规则将对包装参数生效。例如，ajint将仅适用于 Javaint或更大的版本，并且 将使用最短的适用重载。

### 课程

> 与其jclass直接调用，通常使用 import hook更方便。

`java.jclass(cls_name)`
返回 Java 类或接口类型的 Python 类。该名称必须是完全限定的，使用 Java 表示法（例如java.lang.Object）或 JNI 表示法（例如 Ljava/lang/Object;）。要引用嵌套类或内部类，请使用 将其与包含类分开$，例如java.lang.Map$Entry。

如果找不到该类，则NoClassDefFoundError引发 a 。

Java 类和对象可以使用普通的 Python 语法：

```python
Calendar = jclass("java.util.Calendar")
c = Calendar.getInstance()
c.getTimeInMillis()
1588934677166
c.getTime()
<java.util.Date 'Fri May 08 11:44:37 GMT+01:00 2020'>
c.get(Calendar.YEAR)
2020
c.before(Calendar.getInstance())
True
```

重载方法按照Java规则解析：

```pythn
from java.lang import String, StringBuffer
sb = StringBuffer(1024)
sb.append(True)
sb.append(123)
sb.append(cast(String, None))
sb.append(3.142)
sb.toString()
'true123null3.142'
```

如果方法或字段名称与 Python 保留字冲突，可以通过附加下划线来访问它，例如frombecomes from_。原始名称仍然可以通过访问getattr。

除了属性访问之外，Java 对象还支持以下操作：

str调用toString。

==并!=调用equals。

is等同于 Java ==（即它测试对象身份）。

hash调用hashCode。

Java 语法的等价物ClassName.class是ClassName.getClass()；getClass()即可以在类和实例上调用该 方法。

如果一个 Java 对象实现了一个函数式接口，那么它可以像使用语法的函数一样被调用()。这包括 lambda、方法引用和任何具有单个抽象方法的接口，例如java.lang.Runnable. 如果一个对象实现了多个功能接口，您必须使用cast来选择您想要的一个，或者简单地按名称调用方法。

Java 类层次结构反映在 Python 中，例如，如果s是 JavaString对象，则 和都将返回。所有数组和接口类型也被视为.isinstance(s, Object)isinstance(s, CharSequence)Truejava.lang.Object

### 数组

爪哇。jarray（元素类型）
返回 Java 数组类型的 Python 类。元素类型可以指定为以下任何一种：

- 原始类型jboolean,jbyte等
- jclass由或本身返回的 Java 类jarray。
- 一个java.lang.Class实例
- JNI 类型签名

jarray对象表示 Java 数组。它们支持标准的 Python 序列协议，包括：

- []使用语法获取和设置元素。支持负索引。
- [:]使用语法获取和设置切片。获取切片时，将返回一个相同类型的新数组。
- 使用copy方法或copy.copy函数进行复制。将返回一个相同类型的新数组。copy.deepcopy目前不支持。
- 使用 获取长度len，使用 测试是否为空bool。
- 迭代使用for，搜索使用in。
- 由于 Java 数组是固定长度的，因此它们不支持append、del或任何其他添加或删除元素的方式。

所有数组都是 的实例java.lang.Object，因此它们继承了和的Object实现。然而，这些默认实现并不是很有用，因此等效的 Python 操作定义如下：toStringequalshashCode

- str返回数组内容的表示。
- ==并且!=可以将数组的内容与任何序列进行比较。
- 与 Python 列表一样，Java 数组对象在 Python 中不可散列，因为它们是可变的。

### 创建

通常不需要jarray直接创建对象，因为任何序列（字符串除外）都可以直接传递给采用数组类型的 Java 方法或字段。

但是，如果一个方法有多个数组类型的重载，您可能需要消除调用的歧义。例如，如果一个类同时定义了和，那么调用 将失败并出现不明确的重载错误。要调用重载，请使用 .f(long[] x)f(int[] x)f([1,2,3])int[]f(jarray(jint)([1,2,3]))

更多示例：

```python java
# Python code                                 // Java equivalent
jarray(jint)([1, 2, 3])                       new int[] {1, 2, 3}
jarray(jarray(jint))([[1, 2], [3, 4]])        new int[][] {{1, 2}, {3, 4}}
jarray(String)(["Hello", "world"])            new String[] {"Hello", "world"}
jarray(jchar)("hello")                        new char[] {'h', 'e', 'l', 'l', 'o'}
```

您还可以传递一个整数来创建一个用零填充的数组，false或者null：

```python java
# Python code                                 // Java equivalent
jarray(jint)(5)                               new int[5]
```

### 转换

Java 数组boolean, byte, short, int,long和float都double实现了 Python缓冲协议。因此，如果将 Java 数组转换为 NumPy 数组，它将自动使用正确的数据类型：

```python
a = jarray(jshort)([0, 32767])
numpy.array(a)
array([    0, 32767], dtype=int16)
```

调用bytes数组将返回其在内存中的表示形式：

```python
a = jarray(jshort)([0, 32767])
bytes(a)
b'\x00\x00\xff\x7f'
```

将 Pythonbytes或bytearray对象转换为 Javabyte[]数组时，会进行无符号到有符号的转换：Python 值 128 到 255 将映射到 Java 值 -128 到 -1：

```python
b = bytes([0, 127, 128, 255])
jarray(jbyte)(b)
jarray('B')([0, 127, -128, -1])
```

类似地，将byte[]数组转换为bytesorbytearray对象时，有一个有符号到无符号的转换：

```python
a = jarray(jbyte)([0, 127, -128, -1])
[int(x) for x in bytes(a)]
[0, 127, 128, 255]
```

### 铸造

爪哇。投射（cls， obj）
返回给定对象作为给定类的视图。该类必须是由 jclass或jarray或类或数组的 JNI 类型签名创建的。该对象必须可以分配给给定的类，或者None（代表 Java null），否则TypeError将被引发。

这可能有用的情况与可能使用 Java cast 语法的情况相同(ClassName)obj。通过更改对象的外观类型：

不同的成员可能在对象上可见。

将对象传递给方法时，可以选择不同的重载。

### 导入钩子

导入挂钩允许您编写类似于 的代码，这相当于.from java.lang import StringString = jclass("java.lang.String")

- 仅 支持表格，例如将不起作用。from ... import import java.lang.String
- 不支持通配符导入，例如将不起作用。from java.lang import *
- 只能从 Java 导入类和接口，不能导入包，例如 ，将不起作用。同样，Java 包永远不会添加到 .import java.langfrom java import langsys.modules
- 不能直接导入嵌套类和内部类。相反，导入外部类，并将嵌套类作为属性访问，例如Outer.Nested.
为避免混淆，建议避免使用同名的 Java 包和 Python 模块。但是，这仍然是可能的，但要符合以下几点：
- 从 Java 包导入的名称不会自动添加为 Python 模块的属性。
- 来自两种语言的导入可能会混合，即使在一个 语句中也是如此。如果您尝试导入以两种语言存在的名称，将返回来自 Python 的值。这可以通过访问 Java 名称来解决 。例如，如果 Java 和 Python 都有一个名为 的类，那么您可以像这样访问它们：`from ... importjclasscom.example.Class`

```python
from com.example import Class as PythonClass
JavaClass = jclass("com.example.Class")
```

- 支持相对包语法。例如，在一个名为 Python 的模块中 com.example.module：
  
```python
from . import Class                # Same as "from com.example import Class"
from ..other.package import Class  # Same as "from com.other.package import Class"
```

爪哇。set_import_enabled（启用）
设置是否启用导入挂钩。导入钩子在模块首次加载时自动启用 java，所以如果你想禁用它，你只需要调用这个函数。

## 继承 Java 类

要允许在不使用 Chaquopy Java API 的情况下从 Java 调用 Python 代码，您可以在 Python 中继承 Java 类。要使您的继承类对 Java 代码可见，必须生成相应的 Java 代理类，有两种方法可以做到这一点：

动态代理使用java.lang.reflect.Proxy机制在运行时生成 Java 类。

静态代理使用构建时工具生成 Java 源代码。

## 动态代理

`java.dynamic_proxy(*implements)`
    如果你使用这个函数的返回值作为类声明的第一个基础，那么java.lang.reflect.Proxy机制将在运行时为它生成一个Java类。所有参数都必须是 Java 接口类型。

动态代理类的实现就像常规的 Python 类一样，但是由给定接口定义的任何方法名称对 Java 都是可见的。如果 Java 代码调用了 Python 类未实现的接口方法，将抛出PyException 。

简单示例：

```python
from java.lang import Runnable, Thread
class R(dynamic_proxy(Runnable)):
    def __init__(self, name):
            super().__init__()
            self.name = name
    def run(self):
        print("Running " + self.name)

r = R("hello")
t = Thread(r)
t.getState()
<java.lang.Thread$State 'NEW'>
t.start()
Running hello
t.getState()
<java.lang.Thread$State 'TERMINATED'>
```

有关更多示例，请参阅单元测试。

动态代理类有以下限制：

它们不能扩展 Java 类，只能实现 Java 接口。

在 Java 源代码中不能通过名称引用它们。

它们不能在 Java 中实例化，只能在 Python 中实例化。

如果您需要执行任何这些操作，则需要使用静态代理。

## 静态代理

`java.static_proxy(extends=None, *implements, package=None, modifiers='public')`
如果您使用此函数的返回值作为类声明的第一个基础，并将包含模块传递给静态代理生成器工具，那么它将创建一个 Java 源文件，允许类被 Java 代码实例化和访问。

- `extends`必须是 Java 类类型。`None`如果您只想实现接口，则通过。
- 所有其他位置参数必须是 Java 接口类型才能实现。
- `package`是将在其中生成 Java 类的 Java 包的名称，默认与Python 模块名称相同。
- `modifiers`如下所述。

要为该类生成 Java 方法，请使用以下装饰器：
`java.method(return_type, arg_types, *, modifiers='public', throws=None)`
生成 Java 方法。

- `return_type`必须是单个 Java 类型，或者`jvoid`.
- `arg_types`必须是 Java 类型的（可能为空）列表或元组。
- `modifiers`是复制到生成的 Java 声明的字符串。例如，要使方法同步，您可以传递.`modifiers="public synchronized"`
- `throws`是子类的列表或元组`java.lang.Throwable`。

所有 Java 类型都必须指定为以下之一：

- 使用import hook导入的 Java 类。
- 原始类型之一。
- 一种jarray。

同一个方法可以使用多个装饰器，在这种情况下，将为它生成多个 Java 签名（请参阅下面关于重载的注释）。
`java.Override(return_type, arg_types, *, modifiers='public', throws=None)`
与 相同method，但添加了@Override注释。

`java.constructor(arg_types, *, modifiers='public', throws=None)`

与 相同method，只是它生成一个 Java 构造函数。这个装饰器只能用在__init__方法上。注意没有返回类型。

简单示例：

```python java
# Python code                                     // Java equivalent
from com.example import Base, Iface1, Iface1      import com.example.*;
from java.lang import String, Exception

class C(static_proxy(Base, Iface1, Iface2)):      class C extends Base implements Iface1, Iface2 {

    @constructor([jint, String])                      public C(int i, String s) {
    def __init__(self, i, s):                             ...
        ...                                           }

    @method(jvoid, [jint], throws=[Exception])        public void f(int i) throws Exception {
                                                          ...
                                                      }

    @Override(String, [jint, String],                 @Override
              modifiers="protected")                  protected String f(int i, String s) {
    def f(self, i, s=None):                               ...
        ...                                           }
                                                  }
```

有关更多示例，请参阅演示应用程序 和单元测试。

由于静态代理生成器是通过对 Python 源代码进行静态分析来工作的，因此在代码结构上有一些限制：

- 只有无条件出现在模块顶层的类才会被处理。
- 传递给的 Java 类static_proxy或其方法装饰器必须使用导入挂钩导入，而不是动态导入jclass。

可以通过导入顶级类然后使用属性表示法来引用嵌套类，例如Outer.Nested.

语句绑定的名称import必须直接使用。例如，在 之后，您可以在 声明中使用。但是，如果您分配给另一个变量，则不能在声明中使用该变量，因为静态代理生成器将无法解析它。from java.lang import IllegalArgumentException as IAEIAEthrowsIAEthrows

静态代理生成器目前不支持相对包语法。

- 字符串参数必须作为文字给出。
- 当前不支持static_proxy使用其他类扩展类。但是，通过使类继承自公共 Python 基类，它们static_proxy仍然可以在类之间共享行为。static_proxy

## 备注

以下注意事项适用于两种类型的代理：

- 代理类可以有额外的 Python 基类，只要`dynamic_proxy`or `static_proxy`表达式在前。
- 当从 Java 调用 Python 方法时，参数和返回值将按照上述数据类型进行转换。特别是，如果向方法传递一个数组，包括通过可变参数语法（“…”），它将作为一个jarray对象被接收。
- 如果一个方法被重载（即它有多个 Java 签名），Python 签名应该能够接受它们。这通常可以通过鸭子类型、默认参数和*args语法的某种组合来实现。例如，参见f上面静态代理示例中的方法。
- 要调用方法的基类实现，请使用语法 . 目前不支持 Java 方法使用 using ，但可以在.SuperClass.method(self, args)super__init__
- 特殊方法：
  - 如果重写`__init__`，则必须`__init__`使用零参数调用超类。在此之前，该对象不能用作 Java 对象。目前无法向超类构造函数提供参数。
  - 如果您覆盖`__str__`,`__eq__`或 `__hash__`，它们只会在从 Python 访问对象时被调用。通常最好覆盖等效的 Java 方法`toString`,`equals` 和`hashCode`，这将在 Python 和 Java 中生效。
  - 如果您覆盖任何其他特殊方法，请确保针对您不处理的任何情况调用超类实现。

## 异常

### 抛出

java.lang.Throwable表示为继承自标准 PythonException 类，因此所有 Java 异常都可以在 Python 中抛出。

继承 Java 类时，异常可能会从 Python 传播到 Java 代码：

异常将有一个组合的 Python 和 Java 堆栈跟踪，Python 框架由一个以`“<python>”`开头的包名称指示。

如果异常是 Java 类型，将使用原始异常对象。否则，它将表示为PyException。

### 捕捉

Java 方法抛出的异常将传播到调用 Python 代码中。Java 堆栈跟踪被添加到异常消息中：

```python java
from java.lang import Integer
Integer.parseInt("abc")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  ...
java.lang.NumberFormatException: For input string: "abc"
        at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
        at java.lang.Integer.parseInt(Integer.java:580)
        at java.lang.Integer.parseInt(Integer.java:615)
        ```
可以使用标准的 Python 语法捕获 Java 异常，包括通过基类捕获子类异常：
```python java
from java.lang import IllegalArgumentException
try:
    Integer.parseInt("abc")
except IllegalArgumentException as e:
    print type(e)
    print e

<class 'java.lang.NumberFormatException'>
For input string: "abc"
        at java.lang.NumberFormatException.forInputString(NumberFormatException.java:65)
        at java.lang.Integer.parseInt(Integer.java:580)
        at java.lang.Integer.parseInt(Integer.java:615)
        ```
## 多线程
每当 Python 代码调用 Java 方法或构造函数时，全局解释器锁 (GIL) 就会自动释放，从而允许 Python 代码在 Java 代码执行的同时在其他线程上运行。

如果您的程序包含通过Java Thread API 或 Python 模块以外的任何方式创建的线程，您应该了解以下函数：threading

`java.detach()`
从 Java VM 分离当前线程。对于通过模块创建的线程，这是在退出时自动完成的threading。使用该模块的任何其他非 Java 创建的线程 java必须detach在线程退出之前调用，否则进程可能会崩溃。

>与多线程有关的跨语言问题。