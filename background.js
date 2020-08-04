chrome.tabs.onUpdated.addListener(function(tab, props) {
    if (props.status == 'complete'){
        chrome.tabs.executeScript(tab, {
            file: 'voice.js'
        });
    }
});