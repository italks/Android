# 更新日志
## 14.0.2 (2023-01-29) 
### 向后不兼容
buildPython现在必须至少是 Python 3.7。（ #713）

### 特点
sys.stdout现在sys.stderr默认是行缓冲的。（#654，#746，#757）

添加选项以将本机 stdout 和 stderr 重定向到 Logcat。（#725）

更新至 Python 版本 3.8.16 和 OpenSSL 版本 1.1.1s。这修复了 Google Play 警告“您的应用使用了有缺陷的 OpenSSL 库版本”。（#727）

将 CA 捆绑包更新为 certifi 2022.12.7。（#747）

python在搜索 buildPython 时添加可执行文件作为最终后备。（#752）

恢复extractPackages设置，用于要求其模块作为单独的 .py 文件存在的代码。（#754）

现在支持 Android Gradle 插件版本 7.4。（#756）

更新到 pip 版本 20.1。

### 错误修正
在 pip 中启用 PEP 517 构建。（#715）

当 buildPython 自动检测失败时显示正确的错误消息。（#733）

修复entry_points在 sys.path. （#755）

PIP_REQUIRE_VIRTUALENV修复设置环境变量时“无法找到激活的 virtualenv”错误 。（#777）

## 13.0.0 (2022-11-06) 
现在支持 Android Gradle 插件版本 7.3 ( #663 )。

[ BACKWARD INCOMPATIBLE ]minSdkVersion现在必须至少是 API 级别 21。这仍然涵盖98% 的活动设备。

现在支持 Python 版本 3.9、3.10 和 3.11 ( #661 )。

检测需求文件中列出的文件或目录的更改 ( #660 )。

项目不再需要具有 local.properties 文件，只要 设置了ANDROID_HOMEor环境变量 ( #672 )。ANDROID_SDK_ROOT

启用所有警告，包括DeprecationWarning、 PendingDeprecationWarning和。ImportWarningResourceWarning

更新到 pkg_resources 版本 56.2.0。

更新到 SQLite 版本 3.39.2。

将 Python 3.9 及更高版本更新为 OpenSSL 版本 3.0.5。

## 12.0.1 (2022-07-24) 
第一个开源版本。除了删除许可限制外，这与版本 12.0.0 相同。

## 12.0.0 (2022-05-12) 
现在支持 Android Gradle 插件版本 7.2 ( #613 )。

[向后不兼容] 不再支持 Android Gradle 插件版本 4.0。

更新到 Python 版本 3.8.13（有关详细信息，请参阅其更改日志）。

将 CA 捆绑包更新为 certifi 2021.10.8。

修复signal.valid_signals32 位 ABI ( #600 )。

允许buildscript配置在子项目中（#615）。

## 11.0.0 (2022-02-01) 
现在支持 Android Gradle 插件版本 7.1。

[向后不兼容] 不再支持 Android Gradle 插件版本 3.6。

删除有关未经测试的 Android Gradle 插件版本的警告，因为它们通常是向后兼容的。

现在支持GradlepluginManagement和语法。plugins

Java 数组现在支持copy.copyPython 中的函数。

将不受支持的 Java 对象传递给copy.copy或copy.deepcopy现在pickle 失败并显示更清晰的错误消息。

## 10.0.1 (2021-09-22) 
现在支持 Android Gradle 插件版本 4.2 和 7.0。

[向后不兼容] 不再支持 Android Gradle 插件版本 3.4 和 3.5。

[ BACKWARD INCOMPATIBLE ]version不再支持该设置。只需将其删除即可使用当前版本的 Python。

更新到 Python 版本 3.8.11（有关详细信息，请参阅其更新日志）。

更新到 pip 版本 19.2.3（有关详细信息，请参阅其更新日志）。

将 CA 捆绑包更新为 certifi 2021.5.30。

将buffer属性添加到 stdout 和 stderr 以进行字节输出（#464、#516）。

Java 数组现在支持Python 中的index和count方法。为了支持带有hasattr检查的代码，他们现在还实现了方法__contains__,__iter__和 __reversed__，而不是依赖于回退__getitem__( #306 )。

将 NumPy 数组传递给采用 Java 数组的方法时，修复“具有多个元素的数组的真值不明确”错误（#526）。

NumPy 整数标量和任何其他实现该__index__方法的东西现在都可以用作 Java 数组索引 ( #495 )。

添加解决方法以帮助 Windows 上的 conda Python 找到其 SSL 库 ( #450 )。

当项目路径包含符号链接时，修复 pip_install 中的“int 无效文字”错误 ( #468 )。

修复 Android 7 上 APK 中的空文件导致的崩溃（Electron Cash #2136）。

importlib.util.spec_from_file_location现在适用于从 APK 加载的路径。

## 9.1.0 (2021-01-02) 
修复 Python 3.9 上的错误“'HTMLParser' 对象没有属性 'unescape'”（#416）。

在 Homebrew for Mac 上修复错误“必须提供 home 或 prefix/exec-prefix – 而不是两者”（#405）。

buildPython路径现在可以包含空格。

Java API 现在在@NotNull适当的地方用注解。

Java 数组现在支持copyPython 中的方法。

cast修复用于调用扩展另一个功能接口的功能接口时的错误。

将 CA 捆绑包更新为 certifi 2020.12.5。

json模块性能改进。

Java API 性能改进。

## 9.0.0 (2020-11-06) 
现在支持 Android Gradle 插件版本 4.1。

[向后不兼容] 不再支持 Android Gradle 插件版本 3.3。

更新到 Python 版本 3.8.6（有关详细信息，请参阅其更改日志）。

现在可以使用 ()语法从 Python 调用实现功能接口的 Java/Kotlin 对象。这包括 lambda、方法引用和任何具有单个抽象方法的接口，例如java.lang.Runnable.

现在可以使用负索引和切片语法从 Python 访问 Java 数组。

修复非连续 NumPy 数组到 Java 数组的转换。

os.get_exec_path从( #346 )中删除不可访问的目录。

实现zipimport新的加载器 API。这影响了包裹dateparser。

如果bdist_wheel由于未知原因失败，请返回。这影响了包和（#338）。setup.py installacousticskiteconnect

修复ClassNotFoundException何时minifyEnabled使用（#261）。

## 8.0.1 (2020-07-28) 
使缺少的multiprocessing原语在使用时抛出异常而不是在导入时抛出异常。这影响了包joblib和librosa（#21）。

使用ctypes.util.find_librarypip 安装搜索库。这影响了包soundfile（#201）。

修复影响包openpyxl和webcolors.

## 8.0.0 (2020-06-15) 
现在支持 Android Gradle 插件版本 4.0。

[向后不兼容] 不再支持 Android Gradle 插件版本 3.2。

更新到 Python 版本 3.8.3（有关详细信息，请参阅其更改日志）。

现在支持在 Android 库模块 (AAR) 中使用 Chaquopy ( #94 )。

Java 原始数组现在支持 Python 缓冲区协议，允许在两种语言之间进行高性能数据传输。

顶级非包目录中的数据文件现在会在应用程序首次启动时从 APK 中提取，因此可以使用相对于__file__.

## 7.0.3 (2020-05-11) 
修复使用（又名）时出现的 “此平台缺少功能性 sem_open 实现”错误。这影响了 TensorFlow 的许多常见用途。multiprocessing.dummy.Poolmultiprocessing.pool.ThreadPool

在 API 级别 23 ( #228 )之前解决 64 位 ABI 上的动态链接器错误。

修复运行具有较小堆大小的 Gradle 时出现的内存不足错误。

修复与外部包的不兼容问题importlib_metadata（#276）。

修复NoClassDefFoundError使用 Python 访问某些androidx类时的问题，包括 AppCompatTextView.

修复 Javabyte[]数组到 Python的转换bytearray。

pkg_resources通过将初始化推迟到首次导入模块来提高启动速度。

将 CA 捆绑包更新为 certifi 2020.4.5.1。

## 7.0.2 (2020-03-05) 
[向后不兼容] 更新到 Python 版本 3.8.1（有关详细信息，请参阅3.7和3.8发行说明）。

除此列表中的模块外，现在支持所有 Python 标准库模块。特别是，添加了对bz2、 importlib.metadata和importlib.resources的支持lzma。

大多数本机软件包已升级到更新的版本。如果您在build.gradle或requirements.txt文件中使用了特定版本号，您可能需要更新它们。有关完整列表，请参阅存储库索引。

现在支持 Android Gradle 插件版本 3.6。

[向后不兼容] 不再支持 Android Gradle 插件版本 3.1。

[向后不兼容] buildPython现在必须至少是 Python 3.5。

使用配置公开 Java API api，以便它可用于动态功能模块。

将 CA 捆绑包更新为 certifi 2019.9.11。

修复使用androidx.

修复涉及 Java API 的死锁。

改进无法用作轮子的包的本地缓存。

减少一些临时文件名的长度以避免 Windows 260 个字符的限制。

提高启动速度。

## 6.3.0 (2019-08-25) 
现在支持 Android Gradle 插件版本 3.5。

默认情况下预编译 Python 代码以进行.pyc格式化，因此不必在设备上进行编译。这显着提高了应用程序启动速度和存储使用率。

删除extractPackages设置，因为现在会自动提取数据文件。有关详细信息，请参阅 文档。

将数据文件位置从缓存更改为文件目录，以防止用户在应用程序运行时清除它。

在堆栈跟踪中隐藏导入器框架，除非异常源自导入器本身。

修复另一个元数据解析问题，这个问题影响包astroid。

修复“没有 DT_SONAME”警告（#112）。

## 6.2.1 (2019-04-19) 
现在支持 Android Gradle 插件版本 3.4。

更新到 OpenSSL 1.1.1b。这在 . 中启用 BLAKE2 和 SHA-3 算法hashlib。

将 CA 捆绑包更新为 certifi 2019.3.9。

实施pkgutil.iter_modules。

构建pkg_resources到所有应用程序中。许多包需要这个但不声明对 setuptools 的依赖。

## 6.0.0 (2019-03-08) 
现在支持 Android Gradle 插件版本 3.3。

[向后不兼容] 不再支持 Android Gradle 插件版本 3.0。

x86_64现在支持ABI 。

## 5.1.2 (2019-01-19) 
添加PyObject原始转换方法（toBoolean、toInt等）。

添加PyObject容器视图方法（asList,asMap和asSet）。

如果pkg_resources安装在您的应用程序中，它的“基本资源访问” 功能现在可以使用。

将异常堆栈跟踪从 Python 转换为 Java 时删除目录名称。这解决了 Google Play 中导致崩溃报告不完整的错误。

将默认字符编码从 ASCII 更改为 UTF-8。

使 APK 构建更具可重现性。

## 5.0.0 (2018-11-05) 
arm64-v8a现在支持ABI 。

[ BACKWARD INCOMPATIBLE ] 每个 Chaquopy 版本现在只包含一个 Python 版本，因此version不再需要设置。只需删除它即可使用当前版本 3.6.5。

不再包含 Python 2。但是，对于现有的 Python 2 用户，Chaquopy 4.x 将继续维护到 2019 年底（#39）。

[向后不兼容] buildPython现在必须至少是 Python 3.4。

[ BACKWARD INCOMPATIBLE ]minSdkVersion现在必须至少是 API 级别 16。这仍然涵盖99% 的活动设备。

运行时组件现在作为单独的 Maven 工件分发。chaquopy_java.jar这修复了涉及（#62 ）的各种间歇性构建错误。

如果pkg_resources安装在您的应用程序中，它现在将检测所有 pip 安装的包。

## 4.0.0 (2018-08-22) 
现在支持 Android Gradle 插件版本 3.2。

[向后不兼容] 不再支持 Android Gradle 插件版本 2.3。

添加resource模块。

删除损坏的select.kevent/ select.kqueueAPI。这影响了PyZMQ，它现在应该可以工作（Crystax 问题#1433）。

HOME如果系统还没有设置环境变量，那么 可以os.path.expanduser返回一个可用的位置。

实施importlib.abc.InspectLoader.get_code：这允许runpy.run_module使用。

## 3.3.2 (2018-08-01) 
修复涉及带有可选本机组件（例如websockets）的包的 pip 问题。

解决 API 22 及更早版本上的 Android 动态链接器无法加载具有相同基本名称的多个模块的问题（此处有详细信息）。

修复ctypes.pythonapi和sys.abiflags，并提供部分实现 sysconfig.get_config_vars。

修复lrintf//中feholdexcept的本机崩溃fegetenv（Crystax 问题#1369）。

pkgutil.get_data与 一起使用时修复extractPackages，并提高extractPackages 性能。

## 3.3.0 (2018-06-20) 
添加 Python bytes/bytearray和 Java之间的快速转换byte[]（#41）。

让 pip 评估环境标记 (PEP 508 ) 和data-requires-python属性 (PEP 503）针对目标平台而不是构建平台。

使 pip 仅优先于较新版本的 sdists。

修复多个包提供相同目录或文件名时的 pip 问题。

改进包尝试构建本机代码时的 pip 错误消息。

## 3.2.0 (2018-06-06) 
添加Python.getPlatform和 AndroidPlatform.getApplication。

确保__spec__在通过直接调用加载程序或通过 imp.

修复hashlibOpenSSL 集成。

修复 pip--no-binary选项。

改进对 Gradle 任务的最新检查。

## 3.1.0 (2018-05-30) 
添加对安装纯 Python sdists 的支持。这意味着 PyPI 上的所有纯 Python 包现在都应该可以与 Chaquopy 一起使用，无论它们是否有可用的轮子。如果您在安装软件包时遇到任何困难，请在我们的问题跟踪器中报告。

因为这个变化，现在使用pip时要求buildPython的Python大版本和app本身一致，默认值也 buildPython相应改变。

修复imp.find_module和imp.load_module。

在 Python 3 (政治公众人物 420）。

添加对. 当前仅执行以 开头的行 ：忽略所有其他行。.pth filesimport

添加消息，解释如何在 Android Studio 3.1 的新构建窗口中显示完整的 pip 输出。

修复 Android Studio 3.1 中的“注册无效输入”警告。

## 3.0.0 (2018-05-15) 
现在支持 Android Gradle 插件版本 3.1。

[向后不兼容] 不再支持 Android Gradle 插件版本 2.2。如果您仍在使用 Android Studio 2.2，那么我们强烈建议您升级到当前版本 3.1。我们的测试表明，无论您是否使用 Chaquopy，它构建应用程序的速度都要快两倍以上。

添加 Python 2.7.15 和 3.6.5 版本，并修复一些较少使用的标准库模块。

更新到 pip 版本 10.0.1。

构建可靠性修复程序，包括一个用于过度严格的元数据解析的修复程序。

进一步提高构建速度。

在重新安装与以前相同版本的要求时提高应用程序启动速度。

## 2.1.0 (2018-04-26) 
添加加载本机库依赖项的能力。这是新添加的 PyZMQ 和 SciPy 包所必需的。

提高 pip 安装性能。

## 2.0.1 (2018-03-22) 
修复在各种设备上报告的崩溃，尤其是三星 Galaxy J 系列手机。

修复 NumPy 对 API 级别 17 及更早版本中不存在的 libc 函数的依赖。

从本机模块中删除调试信息。所有本机包都从中受益，但尤其是 NumPy，它现在每个 ABI 小了 4 MB。

禁用 pip 捆绑副本的升级通知。

## 2.0.0 (2018-03-15) 
一般性能改进：Python 单元测试现在运行速度提高了约 25%。

[ BACKWARD INCOMPATIBLE ] 导入挂钩现在仅在无法从 Python 导入时在 Java 中查找名称。这显着加快了大型 Python 包的导入速度。但是，这意味着导入以两种语言存在的名称不再报告为错误：相反，将返回来自 Python 的值。

修复由许可证通知导致的 API 级别 15 崩溃。

## 1.4.0 (2018-03-05) 
Python 标准库现在默认从已编译的 .pyc 文件加载（参见 文档）。因此，最小应用程序的启动现在使用 Python 2 快 20-30%，使用 Python 3 快 50-60%。（Python 3 启动仍然比 Python 2 慢，但仅慢 15-20%。）

sys.stdin现在返回 EOF 而不是阻塞。如果您想运行一些需要交互式文本输入的代码，您可能会发现控制台应用程序模板很有用。

write的方法现在sys.stdout返回sys.stderr字符数。

写入的非常长的行sys.stdout现在sys.stderr被拆分成稍小的片段，以便在最新版本的 Android 中允许更短的 Logcat 消息长度限制。

修复多线程死锁。

使用未经许可的 SDK 副本构建的应用程序现在限制为 5 分钟的运行时间。

## 1.3.1 (2018-01-26) 
静态代理生成器现在可以正确处理非 ASCII 源文件（#27）。

## 1.3.0 (2018-01-15) 
以下内容现在返回合理的值：sys.argv、sys.executable和 platform.platform()。

以下模块现在可以正常工作：sqlite3、ssl( #23 ) 和tempfile. （要求 Python 版本为 2.7.14 或 3.6.3。）

sys.stdout现在sys.stderr定向到 Android Logcat。

添加extractPackages，默认情况下将其用于certifi。

## 1.2.0 (2018-01-07) 
Python 源目录位置现在可以在块中配置sourceSets，就像 Java 一样。

getClass，当在 Java 对象上调用时，现在返回 Java 对象类而不是代理对象类。

生成的static_proxyJava 文件不再产生构建警告。

如果本地要求或 wheel 文件发生更改，请确保重新运行 pip。

添加 Python 2.7.14。

包含distutils和doctest模块（#20）。（要求 Python 版本为 2.7.14 或 3.6.3。）

## 1.1.0 (2017-12-22) 
添加 Python 3.6 运行时（#1）。

buildPython现在可以是 Python 2.7 或 3.3+ ( #2 )。

支持产品口味配置（#6）。

提高启动性能。

## 0.6.1 (2017-12-11) 
应用程序现在可以使用某些本机包，包括 NumPy ( #14 )，以及一些 PyPI 无法以 wheel 格式提供的纯 Python 包。为了支持这一点，build.gradle调用的语法 已更改：请参阅文档。pip install

现在可以在 Python 中创建零初始化的 Java 数组，方法是将整数而不是序列传递给数组构造函数。

## 0.5.0 (2017-11-04) 
支持 Android Gradle 插件版本 2.2 ( #9 ) 和 3.0 ( #3 )。

将最低 API 级别提高到 15。这仍然涵盖99% 的活动设备。

修复旧 Android 版本上的数组存储类型检查。

添加java.detach并修复多个多线程问题。

## 0.4.5 (2017-10-26) 
删除对six（#13）的依赖。

## 0.4.4 (2017-10-24) 
修复隐式相对导入（#12）。

## 0.4.3 (2017-09-21) 
提高启动性能。

## 0.4.0 (2017-09-11) 
添加动态代理和静态代理。

## 0.3.0 (2017-07-28) 
在 Python 中反映 Java 类层次结构。

用它们的实际类表示 Java 异常。

调用 Java 方法时支持 Python 未绑定方法语法，即 .ClassName.method(instance, args)

调用 Java 构造函数时释放 GIL。

## 0.2.0 (2017-07-04) 
添加导入挂钩。

允许嵌套类作为属性访问。

提高性能。

## 0.1.0 (2017-06-24) 
首次公开发布。