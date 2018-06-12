/** TRASH PANDA
                     ,,,
                  .'    `/\_/\
                .'      < @|@ >
        <(((((((  )__--(  \./
                \( \(   \(\(
                 "  "    " "
                    
* will dig in your dirt and eventually restore them
* by defect it will log how many folders and files you have in your trash
* you can un comment the section RECYCLAGE BIN in order to selectively recover specific files / folders
* set restore to TRUE to take the data out of the bin.
**/
function trashPanda(){
  var restore = false; // set to true to recover the data
  var ids = [];
  /* RECYCLAGE BIN #organicRecovery
  var ssid =""; // exemple: file generated with the admin audit report : who trashed on a data range
  var sheet = SpreadsheetApp.openById(ssid).getSheetByName("AuditReport-20180611-0601");
  var vals =sheet.getDataRange().getValues();
  ids = vals.map(function(row){return row[3]}); // ids are on the 4th column
  ids.shift(); // remove header
  */
  
  var trashedFiles = DriveApp.getTrashedFiles();
  var trashedFolders = DriveApp.getTrashedFolders();
  
  function trashLoop(iterator, type, ids){
    while (iterator.hasNext()){
      var item = iterator.next();
      if(ids != undefined && ids.length > 0 && ids.indexOf(item.getId()) == -1){
        continue;
      }
      this[type+"Count"] +=1;
      this[type+"Names"].push(item.getName());
      if(this.restore == true){
        item.setTrashed(false); 
      }
    }
  }
  
  var result = {filesCount:0, filesNames:[], foldersCount:0, foldersNames:[], restore:restore};
   
  trashLoop.call(result, trashedFolders, "folders", ids);
  trashLoop.call(result, trashedFiles, "files", ids);
  
  Logger.log(result.foldersCount);
  Logger.log(result.filesCount);
  return result;
}
