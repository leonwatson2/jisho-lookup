document.addEventListener('DOMContentLoaded', function () {

    const searchJishoBy = (section) => {
        return function (word) {
            var query = word.selectionText;
            const urlBase = `https://jisho.org/search/%23${section}%20`;
            var url = urlBase;
            url += query
            chrome.tabs.query({ url: 'https://jisho.org/*' }, (tabs)=>{
                if(tabs.length){
                    const tabId = tabs[0].id
                    chrome.tabs.update( tabId, { url });
                }else {
                    chrome.tabs.create({ url });

                }
            })

        };
    }
    chrome.contextMenus.create({
        title: "Lookup '%s' in Jisho in kanji",
        contexts: ["selection"],  // ContextType
        onclick: searchJishoBy('kanji') // A callback function
    });
    chrome.contextMenus.create({
        title: "Lookup '%s' in Jisho in words",
        contexts: ["selection"],  // ContextType
        onclick: searchJishoBy('words') // A callback function
    });
})