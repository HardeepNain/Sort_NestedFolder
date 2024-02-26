# Sort NestedFolder <a href="https://drive.google.com/drive/folders/1xdUew9QkVN8pIGICDnVUZm3tsWzpB0Ez?usp=sharing" target="_blank"><img align="center" src="./Img-Icons/icons8-external-link-64.png" alt="download link" height="30" width="40" /></a>
         
We all are humans and we are lazy to manage things. 
But this little project can manage your files and can save a lot of time for you.

## Feature ✨
Organize files into relevant folders including files present in any nested folder if exists.

## Demo <a href="https://youtu.be/nIWi-y1Oa1I" target="_blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/youtube.svg" alt="Youtube" height="30" width="40" /></a>

https://user-images.githubusercontent.com/88960105/209341799-5aeb7063-fb76-4263-8362-38f864700fd7.mp4

## Working 📝 

- It process every file in that folder and Make relevant sub-folders by checking files extensions.
- It groups like files means all .txt,.docx,.pdf etc will be moved to a sub-folder named `Documents`.
- And due to `recursion` used in the code these steps gets repeated for nested folders and the process don't stop until no nested folder left to sort.
- This project utilizes the `fs` module to interact with the file system and move files into relevant subfolders.

## Tech Stack ⚒

**Javascript, Node.js & FS Module**