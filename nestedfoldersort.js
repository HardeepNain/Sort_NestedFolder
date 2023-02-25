let fs = require("fs");  // fs module ko leke aayegi

let extensionsMapping = require("./util.js");  // util se obj import hoga
let extensionMappingKeysArr = ["OtherMix"]; // yaha pe humne extension keys ka arr bna liye jisme by default 'OtherMix' daal rkha h

for (let key in extensionsMapping) {
    extensionMappingKeysArr.push(key);  // yhape hume ek ek krke extensionsMapping ki saari keys ko extensionMappingKeysArr me push kr diya
}                                       // jisse jab bhi hum nested folder dekhe to check krle kahi wo folder extension ke naam ka /OtherMix folder to nhi hai na 
                                        // (kyunki inko to humne hi create kra h ab inko dobara se check kyu krna kyunki yeto pahle se sorted honge)
function nestedSorting(folder) {
    let testFolderPath = `./${folder}`; // jis folder pe test karna hai
    // console.log(testFolderPath);
    let allFiles = fs.readdirSync(testFolderPath);   //sari files ko read krega

    
    for (let i = 0; i < allFiles.length; i++){
        // console.log(allFiles[i]);
        if (allFiles[i].includes(".")) {         // agr file . include krti hai to matlab folder nhi hai aur use sort krna hai
            sortFile(allFiles[i]);   // ek ek karke files jaayegi
        }
        else { 
            // (Note : The code in this else is written like taki aasani se smjh me aa ske)
            /*
            agr file . include nhi krti hogi to isme aayenge iska matlab file ek folder hai
            yaha pe hum check kr rhe hai ki folder kahi extension ke naam wala folder to nhi hai na
            aur agr wo folder extension ke naam wala folder hai to hume use sort nhi krna hai
            kyunki usme pahle se hi usi se related files pdi hogi to isiliye kuch nhi krna
            
            agr wo extension ke naam wala folder nhi hai iska matlab use sort krna pdega 
            to iss time hum folder me additional file path add krke bhejte hai jisse nested wale folder pe kaam ho
            */
            if (extensionMappingKeysArr.includes(allFiles[i])) {
                // kuch nhi krna     
            }
            else {
                nestedSorting(testFolderPath+"/"+allFiles[i]);
            }
        }
    }
    function sortFile(file){   // overall sort kar dega
        let extension = getExtension(file);  //idhar extension milegi
        // console.log(extension);
        let extensionFolderName = checkExtensionFolder(extension);  // folder ban jaane pe yaha mil jaayega 
        moveFile(file , extensionFolderName );  // file ko move kar denge us folder me
    }
    function getExtension(file) {   // extensions laake dega
            file = file.split(".");
            return file[1];  
    }
    function checkExtensionFolder(extension){   // overall agr folder nhi hoga to bna k dega
        // extension = "doc";
        let extensionFolderName = testFolderPath;  // ./Downloads
        let extensionExist = false;                // yha pe ye hume ek type ka flag bna liya jo filhal false h
        for(let key in extensionsMapping){           //extensionMapping object se ek ek karke key uthayenge jaise first me document fir Images and goes on.
            let extensions = extensionsMapping[key];   //isse hum document key ke elements ko extenions me store krwa reh h jaise doc pdf etc
            extensionExist = extensions.includes(extension); // check krega ki extensions me hmari extension(e.g.for doc - pdf,txt etc.) h ki nhi
            if (extensionExist) {                            // agr file ki extension extensions me exist krti hogi to extnesionExist true ho jaayega aur hum if me enter honge
                extensionFolderName = extensionFolderName+"/"+key;    //aur extensionFolderName me path daal denge eg: ./downloads/Documents
                break;
            }
        }
        // agr hume uper file ki extension extensions me mil gyi to extensionExist true hoga aur is niche wale if me enter nhi honge
        // lekin agr hume uper file ki extension extensions me nhi mili hui hogi to extensionExist false hi hoga aur hum iss niche wale if me enter honge
        //agr file ki extension nhi mili to iska matlab util.js me uss file ke liye koi extension nhi h to iss file ko hum alag se other folder me daal denge eg: ./downloads/Other
        if(!extensionExist){
            extensionFolderName = extensionFolderName+"/OtherMix";   
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
}
nestedSorting(process.argv[2]);


/*
New features implemented:

1. isme nested folder bhi sort ho skenge kyunki hume recursion ka use krke nya folder path deke code firse run kr diya 
to jab tak end tak folder khtam nhi honge tab tak recursion ki help se code ko nya folder path deke re-run krte rhenege

2. pahle jab bhi hum foldersort.js ko run krte the to download wali file sort ho jaati thi
lekin agr foldersort.js ko re-run krte the to sorted extension named folders ke andar firse usi naam ka folder bn jaata tha
jaise ki download/document/document 
jisko humne un extension keys ka array bnakar check kar liya jisse wo folder dobara na bne
*/