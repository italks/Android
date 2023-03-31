# Gradle插件

Chaquopy 作为 Android 基于 Gradle 的构建系统的插件分发。它可以在满足以下要求的任何应用程序中使用：

- 在项目的顶级`build.gradle`文件中，Android Gradle Plugin版本应介于 4.1 和 7.2 之间。Chaquopy 的旧版本支持早至 2.2 的[旧版本](../History/VersionSummary.md)。

  - Android 插件可能被列为`com.android.application`,`com.android.library`或 `com.android.tools.build:gradle`.

- minSdkVersion必须至少为 21。旧版本的 Chaquopy最早支持到15的[旧版本](../History/VersionSummary.md)。

## 基础设置

### 引入Gradle插件

在您的项目`settings.gradle`或`build.gradle`文件中，在`pluginManagement`或`buildscript`找到仓库列表 ，并确保它包含`mavenCentral` 如果您的项目是由最新版本的 Android Studio 生成的，则该行应该已经存在。

>以下说明使用plugins语法。如果您的项目使用以前的buildscript和语法，请按照此处的apply说明进行操作，但将 Chaquopy 版本号替换为如下所示的当前版本号。

在您的顶级`build.gradle`文件中，设置 Chaquopy 版本：

```Groovy
plugins {
    id 'com.chaquo.python' version '14.0.2' apply false
}
```

在模块级 `build.gradle`文件中（通常在目录中），在Android 插件之后app应用 Chaquopy 插件：

```Groovy
plugins {
    id 'com.android.application'
    id 'com.chaquo.python'
}
```

所有其他配置都将在此模块级别完成`build.gradle`。下面的示例将显示其中的配置，但也可以在产品风格`defaultConfig`中完成。

Chaquopy 插件也可以在Android 库模块(AAR)中使用。但是，它只能在一个项目的一个模块中使用：要么在应用程序模块中，要么在一个库模块中。如果在多个模块中使用，可能会导致构建失败，即使成功，应用中也只会包含一个模块的Python代码

### ABI 选择

Python 解释器是本机组件，因此您必须使用abiFilters 设置来指定您希望应用支持哪些 ABI。当前可用的 ABI 是：

- armeabi-v7a, 几乎所有 Android 设备都支持。

- arm64-v8a，受最新的 Android 设备支持。

- x86, 对于 Android 模拟器。

- x86_64, 对于 Android 模拟器。

在开发过程中，您可能希望全部启用它们，即：

```Groovy
defaultConfig {
    ndk {
       abiFilters "armeabi-v7a", "arm64-v8a", "x86", "x86_64"
    }
}
```

无需实际安装 NDK，因为 Chaquopy 的所有本地库都已预编译和剥离。

每个 ABI 都会使应用程序的大小增加几 MB，再加上任何本机要求的大小 。如果您发现这会使您的应用程序太大，请参阅 常见问题解答。

### Python版本

您可以像这样设置应用程序的 Python 版本：

```Groovy
defaultConfig {
    python {
        version "3.8"
    }
}
```

在此版本的 Chaquopy中，默认的 Python 版本为 3.8。其他可用版本是 3.9、3.10 和 3.11，但这些可用的软件包可能较少。

### 构建Python

某些功能需要 Python 3.7 或更高版本才能在构建机器上使用。这些功能在其文档部分中由注释指示。

默认情况下，Chaquopy 将尝试使用操作系统的标准命令在 PATH 上查找 Python，首先使用匹配的次要版本，然后使用匹配的主要版本。例如，如果您应用的 Python 版本为 3.8，则：

- 在 Linux 和 Mac 上它会尝试python3.8，然后python3。

- 在 Windows 上，它将尝试，然后。py -3.8py -3

- 在所有平台上，它最终都会尝试python。

如果这对您不起作用，请使用buildPython设置来设置您的 Python 命令。例如，在 Windows 上，您可以使用以下其中一项：

```Groovy
defaultConfig {
    python {
        buildPython "C:/path/to/python.exe"
        buildPython "C:/path/to/py.exe", "-3.8"
    }
}
```

## 开发

### 源代码

python默认情况下，Chaquopy 会在每个 源集的子目录中查找 Python 源代码。例如，main源集的 Python 代码应该放在src/main/python.

要包含来自其他目录的 Python 源代码，请使用android.sourceSets块。例如：

```Groovy
android {
    sourceSets {
        main {
            python.srcDir "some/other/dir"
        }
    }
}
```

setRoot方法只对标准的Android目录生效。如果你也想设置Python目录，你必须明确地这样做，例如：

```Groovy
main {
    setRoot "some/other/main"
    python.srcDirs = ["some/other/main/python"]
}
```

与 Java 一样，如果给定构建变体的源目录包含同一文件名的多个副本，通常会出错。仅当重复文件全部为空时才允许这样做，例如__init__.py.

### 开始

构建应用程序非常重要，以便在尝试运行Python代码之前始终使用AndroidPlatform调用[Python.start()](https://chaquo.com/chaquopy/doc/current/java/com/chaquo/python/Python.html#start(com.chaquo.python.Python.Platform)) 。有两种基本方法可以实现这一点：

如果应用程序始终使用 Python，则从保证每个进程只运行一次的位置调用 Python.start()，例如Application.onCreate()。最简单的方法是使用PyApplication或您自己的子类。只需将以下属性添加到`<application>`中的元素AndroidManifest.xml

```java
android:name="com.chaquo.python.android.PyApplication"
```

或者，如果应用程序只是有时使用 Python，则在首先检查它是否已经启动后调用 Python.start()：

```Java
// "context" must be an Activity, Service or Application object from your app.
if (! Python.isStarted()) {
    Python.start(new AndroidPlatform(context));
}
```

### 要求

>此功能需要构建机器上的 Python，可以使用 buildPython设置对其进行配置。

pip可以使用中的块将外部 Python 包内置到应用程序中`build.gradle`。在此块中，添加行，这些行可以采用pip installinstall接受的任何形式。例如：

```Groovy
defaultConfig {
    python {
        pip {
            // A requirement specifier, with or without a version number:
            install "scipy"
            install "requests==2.24.0"

            // An sdist or wheel filename, relative to the project directory:
            install "MyPackage-1.2.3-py2.py3-none-any.whl"

            // A directory containing a setup.py, relative to the project
            // directory (must contain at least one slash):
            install "./MyPackage"

            // "-r"` followed by a requirements filename, relative to the
            // project directory:
            install "-r", "requirements.txt"
        }
    }
}
```

在我们最近的测试中，Chaquopy 可以安装PyPI上排名前 1000 的包中的 90% 以上。这包括几乎所有的纯 Python 包，以及不断增加的带有本地组件的包。要查看当前可用的本机包，您可以在此处浏览存储库。要请求添加或更新软件包，或者对于安装要求的任何其他问题，请访问我们的问题跟踪器。

要将选项传递给，请将它们作为以逗号分隔的列表提供给设置。例如：pip installoptions

```Groovy
pip {
    options "--extra-index-url", "https://example.com/private/repository"
    install "MyPackage==1.2.3"
}
```

可以使用pip 文档中的任何选项，但与目标环境相关的选项除外，例如--target,--user或 -e。如果有多options行，它们将按给定的顺序组合。

### 静态代理生成器

>此功能需要构建机器上的 Python，可以使用 buildPython设置对其进行配置。

静态代理功能允许一个 Python 类扩展一个 Java 类，或者在 Java 代码或文件中直接引用而AndroidManifest.xml无需通过 Java API。

要使用此功能，请使用“静态代理”部分中描述的语法编写 Python 类，然后在文件中列出它们包含的模块，`build.gradle`如下所示：

```Groovy
defaultConfig {
    python {
        staticProxy "module.one", "module.two"
    }
}
```

## 包装

### 提取包

在运行时，Python 模块通常直接从 APK 加载，不作为单独的文件存在。如果您的源代码 或需求中有某些包需要作为单独的文件存在，您可以使用extractPackages设置来执行此操作，如下所示：

```Groovy
defaultConfig {
    python {
        extractPackages "package1", "package2.subpkg"
    }
}
```

每个提取的文件都会稍微减慢您的应用程序的启动速度，因此应该在尽可能深的包上使用此设置。

### 数据文件

您的源代码和要求中的任何数据文件都将自动内置到您的应用程序中。您可以使用相对于__file__.

例如，如果数据文件与 Python 文件位于同一目录中：

```python
from os.path import dirname, join
filename = join(dirname(__file__), "filename.txt")
```

然后，您可以将此文件名传递给open，或任何其他读取文件的函数。

如果数据文件和 Python 文件在不同的目录中，则相应地更改路径。例如，如果 Python 文件是alpha/hello.py，而数据文件是 bravo/filename.txt，则将filename.txt上面的内容替换为../bravo/filename.txt.

与Python 模块不同，数据文件总是在运行时提取到文件系统中。__init__.py但是，在导入相应的 Python 包之前，不会提取存储在包含文件的顶级目录中的文件 。Python 启动时将提取所有其他文件。

不要在运行时向这些目录写入任何文件，因为它们可能会在应用程序升级时被删除。相反，将文件写入os.environ["HOME"]，如“ os ”部分中所述。

### 字节码编译

>此功能需要构建机器上的 Python，可以使用 buildPython设置对其进行配置。

如果将 Python 代码编译为 .pyc 格式，您的应用程序将启动得更快，因此默认启用。

如果字节码编译成功，原始 .py 文件将不会包含在 APK 中，除非它们被extractPackages设置覆盖。但是，这会阻止源代码文本出现在堆栈跟踪中，因此在开发过程中您可能希望禁用它。有以下各项的单独设置：

src:本地源代码

pip:要求

stdlib: Python 标准库

例如，要禁用本地源代码的编译：

```Groovy
defaultConfig {
    python {
        pyc {
            src false
        }
    }
}
```

对于srcand pip，您的buildPython必须使用与 Chaquopy 本身相同的字节码格式。通常这意味着它必须具有相同的次要版本，例如，如果您的应用程序的 Python 版本是 3.8，则buildPython可以是 Python 3.8 的任何版本。

如果字节码编译失败，构建将继续并发出警告，除非您已明确将其中一项设置pyc为true. 你的应用程序仍然可以运行，但它的代码必须在目标设备上编译，这意味着它的启动速度会变慢并使用更多的存储空间。

## Python 标准库

Chaquopy 支持整个 Python 标准库，但下面列出的模块除外。如果您发现任何其他模块有问题，请告诉我们。

### 不支持的模块

以下模块不受支持，因为它们需要 Android 上不可用的操作系统功能：

- `crypt`

- `grp`

- `nis`

- `spwd`

以下模块不受支持，因为它们需要我们目前不包含的库：

- `curses`

- `dbm.gnu`

- `dbm.ndbm`

- `readline`

- `tkinter`

- `turtle`

### 多处理

因为 Android 不支持 POSIX 信号量，所以大多数`multiprocessing`API 都会失败并出现错误“此平台缺少功能正常的 sem_open 实现”。最简单的解决方案是编辑您的代码以改为使用`multiprocessing.dummy`。

### 操作系统

不要将简单的文件名传递给写入文件的函数，因为这将尝试写入当前目录，这在 Android 上通常是只读的。相反，使用相对于 的路径 os.environ["HOME"]，如下所示：

```python
import os
from os.path import join
filename = join(os.environ["HOME"], "filename.txt")
```

然后，您可以将此文件名传递给open，或任何其他写入文件的函数。

os.environ["HOME"]设置为您应用程序的内部存储目录。在此位置创建的任何文件或子目录都将保留，直到应用程序被卸载。

如果您的应用程序是可调试的，您可以使用设备文件资源管理器从 Android Studio 读取和写入此目录。它的路径类似于/data/data/your.application.id/files.

### SSL

该模块配置为使用来自certifissl版本 2022.12.7的 CA 捆绑包的副本。不使用系统 CA 存储。

### 系统

sys.stdout并分别使用标签 和sys.stderr重定向到Logcat。默认情况下，这些流是行缓冲的：如果你想禁用它，请使用set 。python.stdoutpython.stderrio.TextIOWrapper.reconfigurewrite_through=True

此重定向不会影响非 Python 库可能使用的本机 stdout 和 stderr 流。如果您也想重定向它们，请参阅 AndroidPlatform.redirectStdioToLogcat。

默认情况下，sys.stdin始终返回 EOF。如果您想运行一些需要交互式文本输入的代码，请查看控制台应用程序模板。

## Android Studio 插件

要将 Python 编辑支持添加到 Android Studio 用户界面，您可以选择安装“Python Community Edition”插件。然而，Chaquopy 没有与这个插件集成，所以你会看到警告“没有为模块配置 Python 解释器”，你的代码可能会显示许多错误指示符，例如“未解析的引用”和“没有命名的模块”。这些都是无害的：继续运行您的应用程序，如果确实有错误，详细信息将显示在 Logcat中。
