# 常见问题

## 一般

## Chaquopy 的名字是什么意思？

它来自杰克伦敦对单词“chechaquo”（现在通常拼写为“cheechako”）的使用，这是一个美洲原住民术语，意思是“新人”。我们选择它来反映我们在如何使用 Python 方面开辟新领域的目标。

## Chaquopy 是否支持 React Native？

是的，它可以与任何允许您执行以下操作的框架一起使用：

将内容添加到应用程序的 build.gradle 文件中。

调用 Java 方法。

## Chaquopy 是否支持 iOS？

现在不行。有关在 iOS 应用程序中使用 Python 的方法列表，请参阅Python wiki（右侧的“iOS”列）。

BeeWare框架是一个不错的选择。例如，查看 Electron Cash iOS 应用程序（源代码，App Store），您可以将其与类似的基于 Chaquopy 的 Android 应用程序（源代码，Google Play）进行比较。

## 我怎样才能让我的应用程序更小？

如果您的应用太大，请检查以下内容：

您的Python 源代码目录：其中的所有文件都将内置到应用程序中。

您的pip 要求列表。

您还可以尝试减少APK 中的ABI 数量。由于 Chaquopy 打包其本机组件的方式，APK 拆分和应用程序捆绑包功能不会有太大帮助。相反，使用 产品风味维度为每个 ABI 构建单独的 APK 或应用程序包。如果您打算在 Google Play 上发布您的应用程序，则每种风格还必须具有不同的版本代码。例如：

```Groovy
android {
    def versionBase = 123
    flavorDimensions "abi"
    productFlavors {
        arm32 {
            dimension "abi"
            ndk { abiFilters "armeabi-v7a" }
            versionCode 1000000 + versionBase
        }
        arm64 {
            dimension "abi"
            ndk { abiFilters "arm64-v8a" }
            versionCode 2000000 + versionBase
        }
    }
}
```

如果您的应用程序使用 TensorFlow，请考虑将其替换为TensorFlow Lite：

tflite-runtime通过添加到build.gradle 文件的pip 块来安装它。

将您的模型转换为 tflite 格式。

使用 tflite API运行您的模型。

## 我怎样才能混淆我的代码？

如此处所述，如果可能，您的代码会自动编译为 .pyc 格式。如果找不到兼容的 Python 版本，要使构建失败，您可以使用该设置。src true

如果你想进一步隐藏你的代码，你可以使用 Cython 和我们的包构建工具将它编译成一个 .so 文件。有关详细信息，请参阅此处。

## Maven 或 pip 存储库在我的位置不可靠

制作您自己的 Maven 存储库镜像：

从Maven Central下载以下目录，并按照服务器的结构排列。要查找哪个 Python 版本与哪个 Chaquopy 版本相匹配，请参阅 此表。

com/chaquo/python/com.chaquo.python.gradle.plugin/CHAQUOPY_VERSION

com/chaquo/python/gradle/CHAQUOPY_VERSION

com/chaquo/python/runtime/*/CHAQUOPY_VERSION

com/chaquo/python/target/PYTHON_VERSION

编辑您的或文件repositories中的块 以在. 使用包含“com”的目录：可以使用 HTTP URL 或本地路径。settings.gradlebuild.gradlemavenCentral

为我们的 pip 存储库制作您自己的镜像：

从<https://chaquo.com/pypi-7.0下载您的应用程序所需的任何包，并将它们安排在与服务器相同的目录结构中。>

将以下行添加到build.gradle 文件的pip 块中：

options "--index-url", "https://pypi.org/simple/"
options "--extra-index-url", "YOUR_MIRROR"
YOUR_MIRROR包含您上面下载的包目录的目录在哪里。可以使用 HTTP URL 或本地路径。

## 我怎么

## 在 Python 中读取文件

要从源代码目录中读取文件，请使用相对于 的路径，如“数据文件__file__”部分所述。

要在您的应用程序运行时将文件上传到设备，请使用os.environ["HOME"]设备文件资源管理器，如“操作系统”部分中所述。

要从外部存储目录（“sdcard”）读取照片、下载和其他文件，请参阅 下面的问题。

## 从外部存储（“sdcard”）读取文件

从 API 级别 29 开始，Android 有一个范围内的存储策略，可以防止直接访问外部存储，即使您的应用程序具有权限也是如此READ_EXTERNAL_STORAGE。相反，您可以使用系统文件选择器，并将文件作为字节数组传递给 Python：

```python
val REQUEST_OPEN = 0

fun myMethod() {
    startActivityForResult(
        Intent(if (Build.VERSION.SDK_INT >= 19) Intent.ACTION_OPEN_DOCUMENT
               else Intent.ACTION_GET_CONTENT).apply {
            addCategory(Intent.CATEGORY_OPENABLE)
            setType("*/*")
        }, REQUEST_OPEN)
}

override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    if (requestCode == REQUEST_OPEN && resultCode == RESULT_OK) {
        val uri = data!!.data!!
        // For Java, see <https://stackoverflow.com/a/10297073>
        val content = contentResolver.openInputStream(uri)!!.use { it.readBytes() }
        myPythonModule.callAttr("process", content)
    }
}
```

Python 函数可以随心所欲地访问文件内容：

```python
def process(content):
    # `content` is already a bytes-like object, but if you need a standard bytes object:
    content = bytes(content)

    # If you need a file-like object:
    import io
    content_file = io.BytesIO(content)

    # If you need a filename (less efficient):
    import tempfile
    with tempfile.NamedTemporaryFile() as temp_file:
        temp_file.write(content)
        filename = temp_file.name  # Valid only inside the `with` block.
```

## 用 Python 写文件

使用os.environ["HOME"]，如“ os ”部分中所述。

## 将图像传入/传出 Python

最简单的方法是将图像编码为 PNG 或 JPG 文件，并将其作为字节数组传递。有关此示例，请参阅chaquopy-matplotlib 应用程序。

通过将原始图像数据作为array传递可能会获得更好的性能，但随后您将负责使用正确的图像尺寸和像素格式。

## 从 Python 回调

有很多方法可以做到这一点：这是 Electron Cash 项目的一个例子：

Kotlin 代码将方法引用传递 给 Python。

Python 代码创建一个后台线程，该线程稍后使用正常的 Python 语法调用该方法 。

## 构建错误

首先，确保您在 Android Studio 中看到完整的构建日志：

在 3.6 及更新版本中，单击消息左侧的“构建：失败”标题。

在 3.5 及更早版本中，单击消息左侧的“切换视图”按钮。

## Chaquopy 无法编译本机代码

您正在尝试安装我们尚未构建的本机包。可能有不同的版本可用，在这种情况下，构建日志中会出现“pre-built wheels”消息。否则，请访问我们的问题跟踪器寻求帮助。

## 没有为模块配置 Python 解释器

此消息是无害的：请参阅“ Android Studio 插件”部分。

## 没有与请求版本匹配的 NDK 版本

这可以通过安装消息中提到的NDK 版本或升级到 Android Gradle 插件版本 4.1 或更高版本来解决。

## 警告“Compatible side by side NDK version was not found”是无害的，但可以用同样的方法解决

## 运行时错误

根据您的 Android 版本，崩溃的应用程序可能会显示一条消息“已停止”或“一直停止”，或者该应用程序可能会消失。无论哪种方式，您都可以在Logcat中找到堆栈跟踪。下面列出了一些最常见的例外情况。

## FileNotFoundError

看上面关于读写文件的问题。

## 只读文件系统

请参阅上面关于写入文件的问题。

## ModuleNotFoundError

确保您已使用build.gradle 文件中的pip 块将所有必需的包构建到您的应用程序中。

## 没有与主机名关联的地址

确保您的应用具有INTERNET 权限，并且设备可以访问 Internet。
