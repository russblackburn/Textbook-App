Textbook-App
============

*Directions to run this app*

##1. Install##

    $ npm install -g ionic
    $ npm install -g cordova ionic

##2. Clone##

    $ cd <choose a location> (the rest of these instructions assume you will stay in this directory)
    $ git clone https://github.com/russblackburn/Textbook-App.git

##3. Emulate/Serve##

    Emulate IOS
    $ ionic platform add ios
    $ ionic build ios
    $ ionic emulate ios

    Serve In Browser
    $ ionic serve

    Run IOS
    $ ionic build ios
    $ ionic run ios

##4. Plugins##

    To use the plugins add the following after you have added your platforms

    Camera

    $ cordova plugin add org.apache.cordova.camera

    Barcode Scanner
    $ cordova plugin add https://github.com/wildabeast/BarcodeScanner.git

    (See SampleBarcodes.jpg for barcode samples)

##5. Troubleshoot Plugins##

    If the plugins are not working you will need to delete a file, directory and follow a few other steps

    1. Delete file /plugins/ios.json
    2. Delete directory /platforms/ios
    3. then $ ionic platform add ios
    4. then $ ionic build ios
    5. then $ ionic run ios

    This should force the ios.json file to recompile and add the plugins

    (if running directly from Xcode, build an ios version and open directory platforms/ios in Xcode)