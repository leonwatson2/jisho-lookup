document.addEventListener('DOMContentLoaded', function () {

    const searchJishoBy = (section) => {
        const urlBase = `https://jisho.org/search/%23${section}%20`;
        
        return function (word) {
            const query = word.selectionText;
            const url = urlBase + query;
            chrome.tabs.query({ url: 'https://jisho.org/*' }, (tabs)=>{
                if(tabs.length){
                    const tabId = tabs[0].id
                    chrome.tabs.update( tabId, { url });
                }else {
                    chrome.tabs.create({ url });

                }
            });

        };
    }
    chrome.contextMenus.create({
        title: "Lookup '%s' on Jisho by kanji",
        contexts: ["selection"],  // ContextType
        onclick: searchJishoBy('kanji') // A callback function
    });
    chrome.contextMenus.create({
        title: "Lookup '%s' on Jisho by word",
        contexts: ["selection"],  // ContextType
        onclick: searchJishoBy('words') // A callback function
    });
})