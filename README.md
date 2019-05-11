# Preparación de ambiente de programación:

Es importante denotar que la función de Unity a uilizar debe ser "2018.1.0f2". Esto debido a que, de otro  modo, el export de Android no funcionará, pues el módulo de react-native-unity-view no encontrará el .jar de UnityClasses.jar que genera el UnityExport.

## Windows:
(En Windows solo se podrá hacer el build de Android)

* En un CMD admin, instalar el administrador de paquetes [Chocolatey](https://chocolatey.org/install)

`@"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"`

* Cerrar cmd, volver a abrir cmd admin

* Prerapar el [ambiente de React Native](https://facebook.github.io/react-native/docs/getting-started.html) (pestaña Building Projects with Native Code)


**Variables de ambiente**

En un explorador de archivos, click derecho a This PC, Properties, Advanced, Environment Variables, New (en ambos)

VariableName: JAVA_HOME

Value: `C:\Program Files\Java\<versión JDK>`

VariableName: ANDROID_HOME 

Value: `C:\Users\<usuario>\AppData\Local\Android\Sdk`

## Linux (Ubuntu)
Lamentablemente, Unity no soporta Vuforia en su distribución de Linux, por lo tanto, no se puede desarrollar en este ambiente. 


## Mac
(en Mac se puede hacer el build de Android y iOS)
* Instalar [Brew](https://brew.sh/): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
* Prerapar el [ambiente de React Native](https://facebook.github.io/react-native/docs/getting-started.html) (pestaña Building Projects with Native Code)
* Instalar la última versión de XCode
* Instalar [CocoaPods](https://cocoapods.org/) `sudo gem install cocoapods`
* Después de ejecutar `npm install`, `cd ios && pod install`
* ...


## Todos

* `npm install -g react-native-cli`
* `git clone http://git.ec.tec.ac.cr/earias/AmonRA` ó `git clone git@git.ec.tec.ac.cr:earias/AmonRA.git`
* `cd Amon_RA`
* `npm install`
* `react-native run android`


# KeyHashes
Para el keystore de debug, el password puede ser vacío, y puede ser el que tiene en su computadora. Si es el de release, el password es el mismo que el primer password del correo de amonRA

##Get Hash for Facebook: 
### debug
`keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore | openssl sha1 -binary | openssl base64`

### release
`keytool -exportcert -alias androiddebugkey -keystore ./android/app/my-release-key.keystore | openssl sha1 -binary | openssl base64`

## Get Hash for firebase
### debug
`keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey`


### release
`keytool -list -v -keystore ./android/app/my-release-key.keystore -alias androiddebugkey`
