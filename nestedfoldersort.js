let fs = require("fs");

let extensionsMapping = require("./util.js");
let extensionMappingKeysArr = ["OtherMix"];

for (let key in extensionsMapping) {
  extensionMappingKeysArr.push(key);
}

function nestedSorting(folder) {
  let testFolderPath = `./${folder}`;
  let allFiles = fs.readdirSync(testFolderPath);

  for (let i = 0; i < allFiles.length; i++) {
    if (allFiles[i].includes(".")) {
      sortFile(allFiles[i]);
    } else {
      if (extensionMappingKeysArr.includes(allFiles[i])) {
      } else {
        nestedSorting(testFolderPath + "/" + allFiles[i]);
      }
    }
  }

  function sortFile(file) {
    let extension = getExtension(file);
    let extensionFolderName = checkExtensionFolder(extension);
    moveFile(file, extensionFolderName);
  }

  function getExtension(file) {
    file = file.split(".");
    return file[1];
  }

  function checkExtensionFolder(extension) {
    let extensionFolderName = testFolderPath;
    let extensionExist = false;
      
    for (let key in extensionsMapping) {
      let extensions = extensionsMapping[key];
      extensionExist = extensions.includes(extension);
      if (extensionExist) {
        extensionFolderName = extensionFolderName + "/" + key;
        break;
      }
    }
    
    if (!extensionExist) {
      extensionFolderName = extensionFolderName + "/OtherMix";
    }
    
    let isFolderExist = fs.existsSync(extensionFolderName);
    if (!isFolderExist) {
      fs.mkdirSync(extensionFolderName);
    }
    
    return extensionFolderName;
    }
    
  function moveFile(file, extensionFolderName) {
    let sourceFile = testFolderPath + "/" + file;
    let destinationFile = extensionFolderName + "/" + file;
    fs.copyFileSync(sourceFile, destinationFile);
    fs.unlinkSync(sourceFile);
  }
    
}

nestedSorting(process.argv[2]);