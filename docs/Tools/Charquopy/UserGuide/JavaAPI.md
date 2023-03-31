# Java API 

Java API 提供了从 Java 代码使用 Python 类和对象的工具。

## 摘要

1. 如有必要，请调用Python.start()。
2. 调用Python.getInstance()获取 Python 的接口。
3. 调用getModule()或 getBuiltins()以获取表示 Python 模块的PyObject 。
4. 使用PyObject方法访问模块的函数、类和其他对象。

## 例子

以下都假设py是一个Python实例。

模块、类、属性和方法：

```python java
# Python code                             // Java equivalent
import zipfile                            PyObject zipfile = py.getModule("zipfile")
zf = zipfile.ZipFile(                     PyObject zf = zipfile.callAttr("ZipFile",
  "example.zip")                                                         "example.zip");
zf.debug = 2                              zf.put("debug", 2);
zf.comment                                zf.get("comment");
zf.write(                                 zf.callAttr("write",
  "filename.txt",                                     "filename.txt",
  compress_type=zipfile.ZIP_STORED)                   new Kwarg("compress_type",
                                                                zipfile.get("ZIP_STORED")));
```

原始类型：

```python java
# Python code                             // Java equivalent
import sys                                PyObject sys = py.getModule("sys");
sys.maxsize                               sys.get("maxsize").toLong();
sys.version                               sys.get("version").toString();
sys.is_finalizing()                       sys.callAttr("is_finalizing").toBoolean();
```

容器类型：

```python java
# Python code                             // Java equivalent
import sys                                PyObject sys = py.getModule("sys");
sys.version_info[0]                       sys.get("version_info").asList().get(0).toInt();

import os                                 PyObject os = py.getModule("os");
os.environ["HELLO"]                       os.get("environ").asMap().get("HELLO").toString();
os.environ["HELLO"] = "world"             os.get("environ").asMap().put(
                                              PyObject.fromJava("HELLO"),
                                              PyObject.fromJava("world"));
```

## 参考

有关完整文档，请参阅[Javadoc](https://chaquo.com/chaquopy/doc/current/java/overview-summary.html)。