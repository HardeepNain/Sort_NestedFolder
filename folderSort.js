let fs = require("fs");  // fs module ko leke aayegi

let extensionsMapping = require("./util.js");  // util se obj import hoga


let testFolderPath = "./Downloads"; // jis folder pe test karna hai
let allFiles = fs.readdirSync(testFolderPath);   //sari files ko read krega

for(let i=0 ; i<allFiles.length ; i++){
    sortFile(allFiles[i]);   // ek ek karke files jaayegi
}
function sortFile(file){   // overall sort kar dega
    let extension = getExtension(file);  //idhar extension milegi
    // console.log(extension);
    let extensionFolderName = checkExtensionFolder(extension);  // folder ban jaane pe yaha mil jaayega 
    moveFile(file , extensionFolderName );  // file ko move kar denge us folder me
}
function getExtension(file){   // extensions laake dega
    file = file.split(".");
    return file[1];
}
function checkExtensionFolder(extension){   // overall agr folder nhi hoga to bna k dega
    // extension = "doc";
    let extensionFolderName = testFolderPath;  // ./Downloads
    for(let key in extensionsMapping){           //extensionMapping object se ek ek karke key uthayenge jaise first me document fir Images and goes on.
        let extensions = extensionsMapping[key];   //isse hum document key ke elements ko extenions me store krwa reh h jaise doc pdf etc
        if(extensions.includes(extension)){       // check krega ki extensions me hmari extension(e.g.for doc - pdf,txt etc.) h ki nhi
            extensionFolderName = extensionFolderName+"/"+key;    //agr file ki extension extensions me exist krti hogi to hum extensionFolderName me path daal denge eg: ./downloads/Documents
            break;
        }
    }
    let isFolderExist =  fs.existsSync(extensionFolderName);  // download me jaake check krega ki documents naam ka folder h ki nhi
    if(!isFolderExist){
        fs.mkdirSync(extensionFolderName);  // nhi hua to create krenge
    }
    return extensionFolderName;   
}
function moveFile(file , extensionFolderName){
    let sourceFile = testFolderPath+"/"+file;      // 1st path - jaha se uthani hai means copy krni hai
    let destinationFile = extensionFolderName+"/"+file;  //2nd path - jaha daalni hai means paste krni hai
    // copy file from the source path to destination path !!
    fs.copyFileSync(sourceFile , destinationFile);  // 2 path given hai
    // then delete file from the source path !!
    fs.unlinkSync(sourceFile);
}
